/* A customer's own orders.
 *
 * The live site listed orders through the admin REST API. That needs an admin
 * token, which does not belong in a browser, so this asks Magento's GraphQL
 * API for the signed-in customer's orders with the customer's own token and
 * returns them in the same shape the account page already renders
 * (entity_id, increment_id, created_at, status, grand_total, items[]).
 */
import * as storage from './storage';

const GRAPHQL = '/mag/graphql';

const STATUS = {
  Pending: 'pending', Processing: 'processing', Complete: 'complete', Closed: 'closed', Canceled: 'canceled', Cancelled: 'canceled',
  'On Hold': 'holded', 'Payment Review': 'payment_review', 'Suspected Fraud': 'fraud', 'Pending Payment': 'pending',
};

async function gql(query, variables) {
  const token = storage.getAuthToken();
  let r;
  try {
    r = await fetch(GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new Error('Unable to connect to the server. Please check your internet connection or API URL.');
  }
  const j = await r.json().catch(() => ({}));
  if (j.errors && j.errors.length) {
    const e = new Error(j.errors[0].message || 'Something went wrong');
    const cat = j.errors[0].extensions?.category;
    e.status = cat === 'graphql-authorization' || cat === 'graphql-authentication' || /authoriz|customer isn't authorized/i.test(e.message) ? 401 : r.status;
    throw e;
  }
  if (!r.ok) { const e = new Error('API request failed'); e.status = r.status; throw e; }
  return j.data;
}

function shape(o) {
  return {
    entity_id: o.id,
    increment_id: o.number,
    created_at: o.order_date,
    status: STATUS[o.status] || String(o.status || '').toLowerCase().replace(/\s+/g, '_'),
    grand_total: o.total?.grand_total?.value ?? 0,
    items: (o.items || []).map((i) => ({
      sku: i.product_sku,
      name: i.product_name,
      price: i.product_sale_price?.value ?? 0,
      qty_ordered: i.quantity_ordered,
      product_option: i.selected_options?.length
        ? { extension_attributes: { custom_options: i.selected_options.map((s) => ({ option_id: s.label, option_value: s.value })) } }
        : undefined,
    })),
  };
}

const getCustomerOrders = async ({ page = 1, pageSize = 10 } = {}) => {
  const data = await gql(
    `query Orders($page: Int!, $size: Int!) {
      customer {
        orders(currentPage: $page, pageSize: $size, sort: { sort_field: CREATED_AT, sort_direction: DESC }) {
          total_count
          items {
            id number order_date status
            total { grand_total { value } }
            items { product_sku product_name quantity_ordered product_sale_price { value } selected_options { label value } }
          }
        }
      }
    }`,
    { page, size: pageSize },
  );
  const orders = data?.customer?.orders;
  return { orders: (orders?.items || []).map(shape), totalCount: orders?.total_count || 0 };
};

const getOrderById = async (id) => {
  const data = await gql(
    `query Order($id: String!) {
      customer { orders(filter: { number: { eq: $id } }) { items {
        id number order_date status total { grand_total { value } }
        items { product_sku product_name quantity_ordered product_sale_price { value } selected_options { label value } }
      } } }
    }`,
    { id: String(id) },
  );
  const o = data?.customer?.orders?.items?.[0];
  if (!o) { const e = new Error('Order not found'); e.status = 404; throw e; }
  return shape(o);
};

/* Lines for "reorder": the same skus and quantities, ready for the cart. */
const resolveReorderCart = async (order) =>
  (Array.isArray(order?.items) ? order.items : []).map((i) => {
    const custom = i.product_option?.extension_attributes?.custom_options;
    return { sku: i.sku, name: i.name, price: i.price, quantity: i.qty_ordered || 1, ...(custom?.length ? { customOptions: custom } : {}) };
  });

export default { getCustomerOrders, getOrderById, resolveReorderCart };

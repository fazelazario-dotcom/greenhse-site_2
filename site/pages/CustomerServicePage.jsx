'use client';
import JSXStyle from 'styled-jsx/style';
let s = [
  {
    id: 'general',
    label: 'General',
  },
  {
    id: 'shipping-and-delivery',
    label: 'Shipping and Delivery',
  },
  {
    id: 'refunds-and-returns',
    label: 'Refunds and Returns',
  },
  {
    id: 'product-warranty',
    label: 'Product Warranty',
  },
  {
    id: 'smart-products',
    label: 'Smart Products Lawful Use, Access & Security',
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
  },
];
export default function Default() {
  return (
    <main className="jsx-a0688c86ce8f0990 home">
      <section id="customer-service" className="jsx-a0688c86ce8f0990 legal">
        <div className="jsx-a0688c86ce8f0990 legal__container">
          <span className="jsx-a0688c86ce8f0990 eyebrow">Legal</span>
          <h1 className="jsx-a0688c86ce8f0990 legal__title">Terms And Conditions Of Use</h1>
          <div className="jsx-a0688c86ce8f0990 legal__body">
            <ul className="jsx-a0688c86ce8f0990 legal__toc">
              {s.map((e) => (
                <li key={e.id} className="jsx-a0688c86ce8f0990">
                  <a
                    href={`#${e.id}`}
                    onClick={(t) =>
                      ((e, t) => {
                        e.preventDefault();
                        let r = document.getElementById(t);
                        if (!r) return;
                        let s = r.getBoundingClientRect().top + window.scrollY - 16;
                        window.scrollTo({
                          top: s,
                          behavior: 'smooth',
                        });
                      })(t, e.id)
                    }
                    className="jsx-a0688c86ce8f0990"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 id="general" className="jsx-a0688c86ce8f0990">
              General
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              These Terms govern your use of the Greenhse websites (greenhse.com/greencharge.com.au) and the purchase of
              product and/or service from our website and any of the Greenhse retail and wholesale outlets.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              By using our website and purchasing our products therein, you agree that you have read, understood and
              accepted these terms.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              We reserve the right to amend these Terms and Conditions at any time and it is your responsibility to
              review these Terms and Conditions whenever you use this website.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Any information listed within this website should be regarded as a guide only and should not be referred
              to as professional advice.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Our product prices are detailed on our website and may be increased without notice in respect of any
              increase in (a) taxes, duties and excises; or (b) any other costs beyond the reasonable control of
              Greenhse. All prices are in Australian dollars (AU$) and unless we state otherwise, all prices under these
              Terms and Conditions are generally exclusive of GST and any other taxes, duties and excises which must be
              paid by the customer in addition to the price at the same time and manner as the customer pays for the
              Goods and Services. Payment is required prior to supply or dispatch of order.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Where this website contains links to third party sites and to resources, services and products provided by
              third parties, these sites are linked to provide information only and are solely for your information and
              reference. We have no control over and do not accept nor do we assume any responsibility for any loss or
              damage that may arise from your use of those sites. If you decide to access any of the third party
              websites linked to the Greenhse website, you do so entirely at your own risk.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              All intellectual property rights, including the various rights conferred by statute, common law and in
              relation to copyright, patents, trade marks, trade names and /or designs (including the presentation and
              other visual or non-literal elements) whether registered or unregistered in this website and its services
              or information content, are owned by us or licensed to us. You may not reproduce, modify, display, perform
              or distribute any material or part of any material. All rights are reserved.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              All rights (including goodwill and where relevant, trademarks) are owned by or licensed to us. Other
              product and company names mentioned on this website are the trademarks or registered trademarks of third
              parties.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              If you need any help or require further clarification, please contact Customer Support
              (sales@greenhse.com).
            </p>
            <h2 id="shipping-and-delivery" className="jsx-a0688c86ce8f0990">
              Shipping and Delivery
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              We endeavour to ensure that Greenhse products are delivered in a prompt and timely manner. From time to
              time, it is possible that shipping and other factors outside of Greenhse’s control may result in
              unexpected delays. Greenhse does not accept any liability for loss or damage suffered by anyone as a
              result of any such delays. Late delivery does not breach the terms of our agreement with the customer nor
              entitle the customer to cancel the order.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              No deliveries will be made to a Post Office (PO) Box/Bag/Locker etc. address. It is the customer’s
              responsibility to ensure that correct delivery address details are provided at time of order. If these
              details are incorrectly specified, there is no obligation on the part of Greenhse to re-send the order at
              Greenhse’s expense.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Delivery costs, if not included in product pricing, are calculated at time of check-out (Perth area only).
              Orders will be shipped within 2 days of receiving payment in full. The date of dispatch listed on the
              website is a reasonably estimated date and is subject to change without notice.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Once product/s have been dispatched, it is the customer’s responsibility to liaise with the courier or
              postal service nominated by Greenhse (as notified) in relation to delivery date and time. The courier or
              postal service nominated by Greenhse will deliver products during local business hours i.e. Monday-Friday,
              9am-5pm.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              All products remain the property of Greenhse until paid in full and will not be dispatched until such
              payment is made in full. Delivery is deemed to have occurred once the product has been dispatched from our
              warehouse.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              If products are delivered or collected under payments terms, as agreed with Greenhse, and such payment is
              not made in full by the due date, any late payment will incur a minimum 2.5% interest per month on the
              original purchase price or balance thereof. Furthermore, any costs incurred by Greenhse, or its designated
              agent, in the recovery of late payment or recovery and/or removal of goods or products, will be liable by
              the purchaser, including any losses incurred by Greenhse as a result of currency fluctuations, damage or
              devaluation of product/s due to installation, removal or other handling activities undertaken by the
              purchaser.
            </p>
            <h2 id="refunds-and-returns" className="jsx-a0688c86ce8f0990">
              Refunds and Returns
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              Unless otherwise required by law, Greenhue may in its absolute discretion accept returns of products if
              you have changed your mind, however return shipping costs (where applicable) are payable by the customer.
              Customers should ensure that products are returned in their original packaging and in original condition
              i.e. in such a state that the product is deemed fit for re-sale (as new). Products that have been
              used/installed/assembled/damaged will not be accepted for exchange or refund. We strongly recommend that
              you carefully consider the products you require before purchasing. Greenhouse need to notified within 7
              days of purchase if goods are being returned.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              N.B. Greenhse will not refund nor accept return of products purchased by special order, for example goods
              reserved by pre-order, except where such goods are faulty and covered under warranty. Return shipping
              costs, if applicable, are payable by the customer.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Greenhse products come with guarantees that cannot be excluded under any Local or Federal Statutory law.
              You are entitled to have the goods repaired or replaced if the goods are either damaged or faulty within
              the warranty period.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              For products that are received in a damaged or faulty state, you must contact Greenhouse within 3 days of
              receipt of product. Care is taken to ensure your items arrive intact, however some damages do occur during
              transit. Please check all items carefully upon receipt.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Returned products must be returned in their original packaging and with all accessories if they were
              included with the original goods. Damaged/faulty items must be accompanied by proof of purchase.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Returns must be discussed with Greenhse Customer Support prior to dispatch or return to Greenhse. A
              restocking fee will apply.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              It is the customer’s responsibility to ensure that returned items are returned safely. We take no
              responsibility for products lost in transit. All shipping costs for returns are payable by the customer
              and C.O.D. deliveries will be returned to sender.
            </p>
            <p className="jsx-a0688c86ce8f0990">Refunds may take up to 15 business days to be processed.</p>
            <h2 id="product-warranty" className="jsx-a0688c86ce8f0990">
              Product Warranty
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              All our products come with warranties. Warranty information is individual to each product and can be found
              on the detailed website product information page. All claims must be made within the specified warranty
              period, from date of purchase.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              All Brilliant products are covered by the Brilliant Lighting (Aust) Pty Ltd Warranties. All Mercator
              products are covered by Mercator warranties.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              To the maximum extent permitted by law, any replaced or repaired products are covered only by the balance
              of the warranty period remaining from the date of purchase of the original product.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              If there is a quality defect that caused the product to be unusable during the product warranty period
              after dispatch from our warehouse, we will accept a return and either repair, replace (with same or
              equivalent) or refund the item. Furthermore, liability is limited to the terms of the manufacturer’s
              warranty terms and conditions.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Physical damage to a product caused by the user/installer invalidates the warranty, e.g. to abuse,
              improperly use or install, repair or modify components. Damage caused by power outages, surges,
              fluctuations etc. are not covered by warranty.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Many of Greenhse’s products require installation by a qualified electrician. If unsure, contact a licensed
              electrician for expert advice. Greenhse and its affiliates and associates will not be held or accept
              responsibility in relation to electrical installation or modification of any of its products.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Installation and use of Greenhse products must adhere to any applicable Australian standards and is the
              responsibility of the customer and any electrical professionals so employed by the customer in the fitting
              and use of the product.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              Any liability for indirect, incidental or consequential damage (including loss of income, profits or
              business, loss of goodwill or reputation or loss of value of intellectual property) from the failure of
              Greenhouse and associated products is excluded.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              In addition to the warranty given by Greenhouse, for customers in Australia, our goods come with
              guarantees that cannot be excluded under Australian consumer Law. You are entitled to a replacement or
              refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are
              also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the
              failure does not amount to any to a major failure.
            </p>
            <h2 id="smart-products" className="jsx-a0688c86ce8f0990">
              {'Smart Products Lawful Use, Access & Security'}
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              Lawful and safe use of Smart products (IoT devices) involves adhering to safety guidelines and securing
              data. You shall not, nor let any other person use the Greenhse Smart Products (Bluetooth, WiFi, Zigbee) or
              associated Smart App accounts on your device in order to obtain any unauthorised access of any kind or for
              any unlawful, illegal or improper purpose. The customer/user of Smart products obtained from Greenhse is
              responsible for and agrees to:
            </p>
            <ul className="jsx-a0688c86ce8f0990">
              <li className="jsx-a0688c86ce8f0990">
                (a) ensure the Smart product/Smart App does not use a universal default password, change any default
                passwords immediately, review permissions regularly;
              </li>
              <li className="jsx-a0688c86ce8f0990">
                (b) ensure the safekeeping, confidentiality and security of your Smart device and associated Smart App
                account/s against unauthorised access and taking all necessary precautions to keep your password secure;
              </li>
              <li className="jsx-a0688c86ce8f0990">(b) download updates of the software to your device;</li>
              <li className="jsx-a0688c86ce8f0990">
                (c) make sure that all settings, required network communications, entries and changes necessary to
                operate the Smart product or Smart App are enabled and correct, including allowing and enabling push
                notifications to be sent to your device;
              </li>
              <li className="jsx-a0688c86ce8f0990">
                (d) immediately delete, or request deletion (where applicable), of mobile IDs or other forms of
                identification from your device if the device is lost, to be sold, transferred or assigned to someone
                else, or when you cease to use the Greenhse Smart products, and that you are liable for all authorised
                and unauthorised use in connect with your Smart products and Smart apps.
              </li>
            </ul>
            <p className="jsx-a0688c86ce8f0990">
              To the fullest extent permitted by law, you agree to release and indemnify Greenhse for any use (whether
              authorised or unauthorised) in connection with with your Smart product or Smart App.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              If you find any Greenhouse Smart products or the Smart App is being accessed or used by an unauthorised
              third party, you must immediately notify us by email at sales@greenhse.com. Please provide full details of
              the product and the incident that occurred. We will respond to you at our earliest opportunity.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              To the fullest extent permitted by the law, Greenhse shall not be liable for any problems or claims that
              may result from the customer failure to notify us of such a fact, to follow our instructions or to
              otherwise secure their Smart products/Smart App.
            </p>
            <p className="jsx-a0688c86ce8f0990">
              {
                'All Mercator/Brilliant Smart products are covered by Mercator/Brilliant Lawful Use, Access & Security policy, contact them on customer support via their website (mercator.com.au or brilliantlighting.com.au).'
              }
            </p>
            <p className="jsx-a0688c86ce8f0990">Tuya Smart is compliant with the Cyber Security Act 2024.</p>
            <h2 id="disclaimer" className="jsx-a0688c86ce8f0990">
              Disclaimer
            </h2>
            <p className="jsx-a0688c86ce8f0990">
              The information provided on the Greenhse/Greencharge website or by Greenhse
              associates/affiliates/personnel is given by us in good faith. Every effort has been made to ensure
              correctness and to the best of our knowledge, the information is accurate and current. However, we and our
              affiliates and associates do not make any representation or warranty as to the accuracy or completeness of
              the information. We do not guarantee that our website is free from errors or faults and we will not be
              liable for any such inaccuracies, errors or faults, and we will not be liable for any such inaccuracies,
              errors, faults, consequential loss or damage suffered or incurred in connection with this website or any
              Greenhouse associates/affiliates/personnel.
            </p>
            <p className="jsx-a0688c86ce8f0990">We make no warranty that any product will meet your requirements.</p>
            <p className="jsx-a0688c86ce8f0990">
              All product images are digital and are for illustration purposes and general reference only.
            </p>
          </div>
        </div>
      </section>
      <JSXStyle id="a0688c86ce8f0990">
        {
          '.legal.jsx-a0688c86ce8f0990{background:var(--bg-raised);padding:40px 0 96px}.legal__container.jsx-a0688c86ce8f0990{width:100%;max-width:1300px;margin:0 auto;padding:0 34px}.legal__title.jsx-a0688c86ce8f0990{letter-spacing:-.03em;margin:2px 0 32px;font-size:max(30px,min(3.6vw,44px));font-weight:600;line-height:1.12}.legal__body.jsx-a0688c86ce8f0990 h2{letter-spacing:-.01em;margin:34px 0 12px;font-size:20px;font-weight:600}.legal__body.jsx-a0688c86ce8f0990 h2:first-child{margin-top:0}.legal__body.jsx-a0688c86ce8f0990 p{color:var(--ink-soft);margin:0 0 16px;font-size:15px;line-height:1.65}.legal__body.jsx-a0688c86ce8f0990 ul{color:var(--ink-soft);margin:0 0 16px;padding-left:22px;font-size:15px;line-height:1.65}.legal__body.jsx-a0688c86ce8f0990 li{margin-bottom:8px}.legal__body.jsx-a0688c86ce8f0990 li:last-child{margin-bottom:0}.legal__toc.jsx-a0688c86ce8f0990 a{color:var(--ink)}.legal__toc.jsx-a0688c86ce8f0990 a:hover{color:var(--green)}@media (width<=640px){.legal__container.jsx-a0688c86ce8f0990{padding:0 18px}}'
        }
      </JSXStyle>
    </main>
  );
}

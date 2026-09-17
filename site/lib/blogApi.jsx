/* The homepage journal reads this site's own blog (data/site.json) instead of
   the old store's blog API. scripts/build-blog-list.js writes the small list
   this imports, so the browser never downloads the full post bodies. */
import list from '../../data/blog-list.json';

export const formatBlogDate = function (e) {
  if (!e) return null;
  let a = new Date(e);
  return Number.isNaN(a.getTime())
    ? null
    : a.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
};

export async function getBlogPosts({ page = 1, pageSize = 50 } = {}) {
  const start = (page - 1) * pageSize;
  return { posts: list.slice(start, start + pageSize), totalCount: list.length };
}

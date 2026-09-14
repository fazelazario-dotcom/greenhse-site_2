export const resizedImage = function (e, t, { quality: i = 82 } = {}) {
  if (!e || 'string' != typeof e || !/^https?:\/\//.test(e)) return e;
  let s = new URLSearchParams({
    url: e.replace(/^https?:\/\//, ''),
    output: 'webp',
    q: String(i),
  });
  return (t && s.set('w', String(Math.round(t))), `https://images.weserv.nl/?${s.toString()}`);
};

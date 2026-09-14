function a(e) {
  let a = parseInt(e.sortorder, 10);
  return Number.isFinite(a) ? a : 0;
}
export const withPinnedOrder = function (e, i) {
  let s = e.filter((e) => a(e) > 0).sort((e, i) => a(e) - a(i)),
    t = e.filter((e) => 0 >= a(e));
  return (
    i && t.sort(i),
    s.forEach((e) => {
      let i = Math.min(Math.max(a(e) - 1, 0), t.length);
      t.splice(i, 0, e);
    }),
    t
  );
};

# How the layout planner became a React route (16 Sep 2026)

`public/layout.html` (7,800 lines: a stylesheet, ~400 lines of markup, two
data blobs and four scripts) was converted mechanically, not by hand, so the
result could be checked against the original in a browser:

1. `split.py` — cuts the file into its parts.
2. `tojsx.py` — turns the body markup into JSX (attribute renames, style
   objects, SVG camelCase, defaultValue for inputs/selects, whitespace glue).
3. `scopecss.py` — prefixes every rule with `.gh-planner`, turns the old
   `body{}` into the container, adds the print isolation.
4. `modules.py` — wraps each script as an ES module: `mountCore()` returns
   `init`, `mountHome()` returns `boot`, `installQA()`, `mountTrack()`, and
   `lifecycle.js` records what the engine hangs on window/document so the
   component can take it down again.

Verified: same 396/403 QA on `/layout-app/?qa=1`; after init, every element's
bounding box, the innerText and the DOM tree match the HTML page (one 3 px
difference in the initial pan of the empty sheet); client-side navigation to
and from the route leaves no listeners behind; `next dev` (StrictMode double
mount) gives one planner and no duplicate options.

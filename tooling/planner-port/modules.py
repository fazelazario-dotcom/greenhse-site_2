# -*- coding: utf-8 -*-
import io, re, os
P='/home/claude/port/parts'; O='/home/claude/port/out/site/planner'
for d in ['engine','data']: os.makedirs(f'{O}/{d}', exist_ok=True)
def rd(n): return io.open(f'{P}/{n}',encoding='utf-8').read()
def wr(n,s): io.open(f'{O}/{n}','w',encoding='utf-8').write(s)

# ---- data ----
wr('data/products.js', '/* The planner\'s catalogue. Built from the live Magento feed by the site\'s\n   build scripts; a plan saved months ago must still resolve every fitting on it,\n   so nothing here is ever removed, only hidden from the pickers (see\n   DATA_ONLY_CATS and WALL_KEEP in engine/core.js). */\n'+rd('products.js'))
wr('data/art.js', '/* Inline artwork used by the home screen and the guided tour (data URIs). */\n'+rd('art.js'))

# ---- core ----
c=rd('core.raw.js')
assert c.count('(function(){\n"use strict";')==1
c=c.replace('(function(){\n"use strict";', 'export function mountCore(){\n"use strict";',1)
tail="if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);\nelse init();\n})();"
assert c.count(tail)==1
c=c.replace(tail, "init();\n}")
c=("/* Greenhse Layout Planner — application engine.\n"
   "   This is the planner as it has always run, made a module: PRODUCTS comes\n"
   "   in as an import instead of a global, and the DOMContentLoaded boot became\n"
   "   an exported mountCore() that the React component calls once the shell is\n"
   "   in the DOM. Everything the QA suite drives is still exported on\n"
   "   window.__GH. Listeners and timers it registers on window/document are\n"
   "   recorded by engine/lifecycle.js and removed when the component unmounts. */\n"
   "import { PRODUCTS } from '../data/products';\n\n"+c.split('\n',0)[0]) if False else (
   "/* Greenhse Layout Planner — application engine.\n"
   "   This is the planner as it has always run, made a module: PRODUCTS comes\n"
   "   in as an import instead of a global, and the DOMContentLoaded boot became\n"
   "   an exported mountCore() that the React component calls once the shell is\n"
   "   in the DOM. Everything the QA suite drives is still exported on\n"
   "   window.__GH. Listeners and timers it registers on window/document are\n"
   "   recorded by engine/lifecycle.js and removed when the component unmounts. */\n"
   "import { PRODUCTS } from '../data/products';\n\n"+c)
wr('engine/core.js', c)

# ---- home ----
h=rd('home.raw.js')
assert h.count('(function(){\n"use strict";')==1
h=h.replace('(function(){\n"use strict";', 'export function mountHome(){\n"use strict";',1)
tail="if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);\nelse boot();\n})();"
assert h.count(tail)==1
h=h.replace(tail, "boot();\n}")
h=("/* Greenhse Layout Planner — home screen, guided tour and submission.\n"
   "   Same code as before, as a module: ART is imported, and the boot became\n"
   "   an exported mountHome() called after mountCore(). */\n"
   "import { ART } from '../data/art';\n\n"+h)
wr('engine/home.js', h)

# ---- qa ----
q=rd('qa.raw.js')
assert 'window.__GHQA=function(){' in q
q=("/* Greenhse Layout Planner — QA suite (append ?qa=1 to the URL).\n"
   "   installQA() must run BEFORE mountCore(): the engine's init() looks for\n"
   "   window.__GHQA and runs it when the query string asks. */\n"
   "import { PRODUCTS } from '../data/products';\n\n"
   "export function installQA(){\n"+q.rstrip()+"\n}\n")
wr('engine/qa.js', q)

# ---- track ----
t=rd('track.raw.js')
assert t.count('(function(){\n"use strict";')==1
t=t.replace('(function(){\n"use strict";', 'export function mountTrack(){\n"use strict";',1)
assert t.rstrip().endswith('})();')
t=t.rstrip()[:-len('})();')]+'}\n'
wr('engine/track.js', t)

# ---- lifecycle ----
wr('engine/lifecycle.js', r'''/* Greenhse Layout Planner — mount/unmount bookkeeping.
   The engine was written for a page it owned outright: it hangs listeners on
   window and document and starts intervals, and never expected to be taken
   down. Inside a React app the component can unmount (client-side navigation
   away, StrictMode in development), so while the engine is mounting, every
   window/document listener and every interval it registers is recorded here
   and undone on unmount. Nothing in the engine itself had to change for it. */
export function begin(){
  const rec = { listeners: [], intervals: [], patched: [] };
  for (const target of [window, document]) {
    const add = target.addEventListener, remove = target.removeEventListener;
    target.addEventListener = function(type, fn, opts){
      rec.listeners.push([target, type, fn, opts]);
      return add.call(target, type, fn, opts);
    };
    rec.patched.push(() => { target.addEventListener = add; target.removeEventListener = remove; });
  }
  const si = window.setInterval;
  window.setInterval = function(fn, ms){ const id = si.call(window, fn, ms); rec.intervals.push(id); return id; };
  rec.patched.push(() => { window.setInterval = si; });
  return rec;
}
/* Stop recording (call as soon as the engine has mounted). The listeners and
   intervals already captured stay on the record for end(). */
export function settle(rec){
  rec.patched.forEach((undo) => undo());
  rec.patched = [];
}
export function end(rec){
  settle(rec);
  rec.listeners.forEach(([t, type, fn, opts]) => { try { t.removeEventListener(type, fn, opts); } catch (e) {} });
  rec.intervals.forEach((id) => clearInterval(id));
  rec.listeners = []; rec.intervals = [];
  for (const k of ['__GH', '__GHQA', '__GHTRACK', '__GHDRAFT', '__TUT']) { try { delete window[k]; } catch (e) {} }
}
''')
print('modules written'); os.system(f'wc -l {O}/engine/*.js {O}/data/*.js')

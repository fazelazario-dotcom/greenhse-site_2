# -*- coding: utf-8 -*-
"""Scope the planner stylesheet under .gh-planner so it can live inside a site
that has its own global CSS, without changing a single class name the engine
looks up. body/html rules become the .gh-planner container; @keyframes,
@font-face and @page are left alone."""
import io, re, sys
src=io.open(sys.argv[1],encoding='utf-8').read()
P='.gh-planner'
def prefix_selector(sel):
    s=sel.strip()
    if not s: return s
    if s==':root': return P
    if s in ('html','body'): return P
    if s=='html,body' or s=='body,html': return P
    if s=='*': return P+', '+P+' *'
    # selectors starting with body/html followed by space or combinator
    m=re.match(r'^(html|body)(\s+|\s*[>+~]\s*)(.*)$',s)
    if m: return P+' '+m.group(3)
    return P+' '+s
def prefix_list(prelude):
    seen=[]; 
    for x in prelude.split(','):
        y=prefix_selector(x)
        if y not in seen: seen.append(y)
    return ', '.join(seen)
out=[]; i=0; n=len(src); stack=[]  # stack of at-rule kinds: 'media'|'keyframes'|'other'
buf=''
while i<n:
    c=src[i]
    if src.startswith('/*',i):
        j=src.index('*/',i)+2; out.append(src[i:j]); i=j; continue
    if c=='{':
        lead=buf[:len(buf)-len(buf.lstrip())]; prelude=buf.strip(); buf=''
        out.append(lead)
        if prelude.startswith('@'):
            kind='keyframes' if 'keyframes' in prelude else ('media' if prelude.startswith(('@media','@supports','@container')) else 'other')
            stack.append(kind); out.append(prelude+'{')
        else:
            inkf = 'keyframes' in stack or 'other' in stack
            out.append((prelude if inkf else prefix_list(prelude))+'{')
            stack.append('rule')
        i+=1; continue
    if c=='}':
        out.append(buf); buf=''
        if stack: stack.pop()
        out.append('}'); i+=1; continue
    buf+=c; i+=1
out.append(buf)
css=''.join(out)
# the container: everything body used to be, pinned over the viewport
css=css.replace(P+'{\n  font-family:"Poppins"', P+'{\n  position:fixed;inset:0;width:100%;height:100%;z-index:1000;\n  line-height:normal;font-size:16px;\n  font-family:"Poppins"',1)
# the old html,body{height:100%} became .gh-planner{height:100%} — harmless, keep.
head='''/* Greenhse Layout Planner — stylesheet.
   Every rule is scoped under .gh-planner so this can be imported into a site
   that carries its own global CSS. No class or id the engine looks up has
   changed; the old body{} rules became the .gh-planner container, which pins
   itself over the viewport (the planner always owned the whole window). */
.gh-planner img{max-width:none;display:inline}
.gh-planner a{color:inherit;text-decoration:none}
'''
tail='''
/* Printing: the container must stop being fixed or Chrome repeats it on
   every page, and anything the host site renders around the planner (its
   own header, footer, chat widget) stays off the paper. */
@media print{
  .gh-planner{position:static!important;height:auto!important;overflow:visible!important;display:block!important;z-index:auto}
  body>*:not(.gh-planner){display:none!important}
  body{overflow:visible!important;display:block!important;background:#fff}
}
'''
io.open(sys.argv[2],'w',encoding='utf-8').write(head+css+tail)
print('scoped:', css.count('.gh-planner'), 'occurrences')

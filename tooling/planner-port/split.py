# -*- coding: utf-8 -*-
"""Split public/layout.html into its parts: css, body markup, data blobs, and the four scripts."""
import io, re, os, json
SRC='/home/claude/work/greenhse-site/public/layout.html'
OUT='/home/claude/port/parts'
os.makedirs(OUT, exist_ok=True)
lines=io.open(SRC,encoding='utf-8').read().split('\n')
L=lambda a,b: '\n'.join(lines[a-1:b])   # 1-based inclusive
def between(start_pat, end_pat, frm=1):
    s=next(i for i in range(frm-1,len(lines)) if re.search(start_pat,lines[i]))+1
    e=next(i for i in range(s,len(lines)) if re.search(end_pat,lines[i]))+1
    return s,e
# head bits
s,e=between(r'^<style>', r'^</style>'); css=L(s+1,e-1)
title=re.search(r'<title>(.*?)</title>', '\n'.join(lines[:60])).group(1)
metas=[l for l in lines[:60] if l.strip().startswith('<meta') or l.strip().startswith('<link')]
# body markup: from <body> to the first <script>
b=next(i for i,l in enumerate(lines) if l.startswith('<body>'))+1
firstscript=next(i for i in range(b,len(lines)) if lines[i].startswith('<script>'))+1
body=L(b+1, firstscript-1)
# scripts in order
scripts=[]; i=0
while True:
    try: s,e=between(r'^<script>', r'^</script>', i+1)
    except StopIteration: break
    scripts.append(L(s+1,e-1)); i=e
assert len(scripts)==6, len(scripts)
data_products, data_art, core, home, qa, track = scripts
assert data_products.startswith('const PRODUCTS=') and data_art.startswith('const ART=')
io.open(f'{OUT}/planner.css','w',encoding='utf-8').write(css+'\n')
io.open(f'{OUT}/body.html','w',encoding='utf-8').write(body+'\n')
io.open(f'{OUT}/head.txt','w',encoding='utf-8').write(title+'\n'+'\n'.join(metas)+'\n')
io.open(f'{OUT}/products.js','w',encoding='utf-8').write('export '+data_products.rstrip()+'\n')
io.open(f'{OUT}/art.js','w',encoding='utf-8').write('export '+data_art.rstrip()+'\n')
io.open(f'{OUT}/core.raw.js','w',encoding='utf-8').write(core)
io.open(f'{OUT}/home.raw.js','w',encoding='utf-8').write(home)
io.open(f'{OUT}/qa.raw.js','w',encoding='utf-8').write(qa)
io.open(f'{OUT}/track.raw.js','w',encoding='utf-8').write(track)
print('title:',title); print('metas:',len(metas)); print('css lines',css.count('\n')); print('body lines',body.count('\n'))
for n,sc in zip(['core','home','qa','track'],[core,home,qa,track]): print(n, sc.count('\n'),'lines')

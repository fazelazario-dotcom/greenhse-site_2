# -*- coding: utf-8 -*-
"""Convert the planner's body markup to JSX, faithfully. Verified afterwards by
rendering both in a real browser and diffing the DOM."""
import io, re, sys
from html.parser import HTMLParser

VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
INLINE={'a','b','i','em','strong','span','small','code','kbd','label','button','svg','img','input','select','sub','sup','abbr','br','u','s','mark','time'}
ATTR={'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','maxlength':'maxLength',
 'minlength':'minLength','autocomplete':'autoComplete','autofocus':'autoFocus','colspan':'colSpan','rowspan':'rowSpan',
 'enctype':'encType','inputmode':'inputMode','enterkeyhint':'enterKeyHint','autocapitalize':'autoCapitalize',
 'spellcheck':'spellCheck','contenteditable':'contentEditable','crossorigin':'crossOrigin','srcset':'srcSet',
 'novalidate':'noValidate','accesskey':'accessKey','datetime':'dateTime','allowfullscreen':'allowFullScreen',
 'referrerpolicy':'referrerPolicy','frameborder':'frameBorder','cellpadding':'cellPadding','cellspacing':'cellSpacing',
 'usemap':'useMap','xlink:href':'xlinkHref','xmlns:xlink':'xmlnsXlink','xml:space':'xmlSpace','xml:lang':'xmlLang',
 'accept-charset':'acceptCharset','http-equiv':'httpEquiv','playsinline':'playsInline','autoplay':'autoPlay',
 'formaction':'formAction','formnovalidate':'formNoValidate','itemprop':'itemProp','itemscope':'itemScope',
 'nomodule':'noModule'}
BOOL={'hidden','disabled','checked','selected','multiple','required','open','readonly','autofocus','controls','loop','muted','default','defer','async','novalidate','allowfullscreen','autoplay','playsinline','reversed','ismap','nomodule','itemscope','inert','draggable','contenteditable','spellcheck'}
SVGCASE={x.lower():x for x in ['viewBox','preserveAspectRatio','gradientUnits','gradientTransform','patternUnits','patternTransform','patternContentUnits','clipPathUnits','markerWidth','markerHeight','markerUnits','refX','refY','textLength','lengthAdjust','baseFrequency','numOctaves','stdDeviation','spreadMethod','tableValues','edgeMode','primitiveUnits','filterUnits','maskUnits','maskContentUnits','attributeName','attributeType','repeatCount','repeatDur','keyTimes','keySplines','calcMode','startOffset','pathLength','surfaceScale','specularExponent','specularConstant','diffuseConstant','kernelMatrix','kernelUnitLength','targetX','targetY','pointsAtX','pointsAtY','pointsAtZ','limitingConeAngle','stitchTiles','xChannelSelector','yChannelSelector','viewTarget','zoomAndPan','glyphRef','autoReverse','contentScriptType','contentStyleType','externalResourcesRequired']}
def svgattr(k):
    if k.startswith('data-') or k.startswith('aria-'): return k
    if k in SVGCASE: return SVGCASE[k]
    if k in ATTR: return ATTR[k]
    if '-' in k:
        p=k.split('-'); return p[0]+''.join(x.capitalize() for x in p[1:])
    return k
def styleobj(v):
    out=[]
    for decl in v.split(';'):
        if ':' not in decl: continue
        k,val=decl.split(':',1); k=k.strip(); val=val.strip()
        if k.startswith('--'): kk="'"+k+"'"
        else:
            p=k.split('-'); kk=p[0]+''.join(x.capitalize() for x in p[1:])
        out.append(f"{kk}:{jsstr(val)}")
    return '{{'+','.join(out)+'}}'
def jsstr(s):
    return "'"+s.replace('\\','\\\\').replace("'","\\'")+"'"
def jsxtext(s):
    # JSX text: escape braces and angle brackets; keep entities for nbsp etc.
    s=s.replace('{','{"{"}').replace('}','{"}"}')
    s=s.replace('<','&lt;').replace('>','&gt;')
    s=s.replace(' ','&nbsp;')
    return s

class Node:
    def __init__(s,tag=None,attrs=None,parent=None):
        s.tag=tag; s.attrs=attrs or []; s.kids=[]; s.parent=parent; s.text=None; s.comment=None
class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.root=Node('ROOT'); s.cur=s.root
    def handle_starttag(s,tag,attrs):
        n=Node(tag,attrs,s.cur); s.cur.kids.append(n)
        if tag not in VOID: s.cur=n
    def handle_startendtag(s,tag,attrs):
        n=Node(tag,attrs,s.cur); s.cur.kids.append(n)
    def handle_endtag(s,tag):
        if tag in VOID: return
        c=s.cur
        while c is not None and c.tag!=tag: c=c.parent
        if c is None: raise SystemExit('stray end tag '+tag)
        s.cur=c.parent
    def handle_data(s,d):
        n=Node(parent=s.cur); n.text=d; s.cur.kids.append(n)
    def handle_comment(s,d):
        n=Node(parent=s.cur); n.comment=d; s.cur.kids.append(n)

def emit(n, ind, insvg=False, out=None, pre=False):
    if out is None: out=[]
    if n.tag=='ROOT':
        for k in n.kids: emit(k, ind, insvg, out, pre)
        return out
    if n.comment is not None:
        c=n.comment.strip().replace('*/','* /')
        if c: out.append(' '*ind+'{/* '+c+' */}')
        return out
    if n.text is not None:
        return out  # handled by parent
    tag=n.tag; svg=insvg or tag=='svg'
    attrs=[]; kids=n.kids
    sel_default=None
    if tag=='select':
        for o in kids:
            if o.tag=='option' and any(a=='selected' for a,_ in o.attrs):
                sel_default=dict(o.attrs).get('value')
                if sel_default is None: sel_default=''.join(k.text or '' for k in o.kids).strip()
    for k,v in n.attrs:
        if tag=='option' and k=='selected': continue
        if svg: kk=svgattr(k)
        else: kk=ATTR.get(k,k)
        if k=='style': attrs.append(f'style={styleobj(v)}'); continue
        if k=='value' and tag in ('input','textarea'): kk='defaultValue'
        if k=='checked' and tag=='input': kk='defaultChecked'
        if v is None:
            # a bare data-x / aria-x attribute must stay an empty string: React
            # would render a bare prop as "true" and the engine's
            # querySelectorAll('[data-x]') is fine either way, but the DOM
            # should match the page byte for byte.
            if k.startswith('data-') or k.startswith('aria-'): attrs.append(kk+'=""')
            else: attrs.append(kk)
            continue
        if k in BOOL and v in ('', k, 'true'):
            attrs.append(kk); continue
        if '"' in v: val=jsstr(v)
        else: val='"'+v+'"'
        attrs.append(kk+'='+val)
    if sel_default is not None: attrs.append(f'defaultValue={jsstr(sel_default)}')
    if tag=='textarea':
        txt=''.join(k.text or '' for k in kids)
        if txt.strip(): attrs.append(f'defaultValue={jsstr(txt)}')
        kids=[]
    a=(' '+' '.join(attrs)) if attrs else ''
    ispre = pre or tag in ('pre',)
    # flatten children into inline runs
    if not kids or all((k.text is not None and not k.text.strip()) for k in kids):
        out.append(' '*ind+f'<{tag}{a} />' if (tag in VOID or not kids or True) and not [k for k in kids if k.text and k.text.strip()] else '')
        if out[-1]=='' : out.pop()
        return out
    # decide inline vs block rendering of children
    haselem=any(k.tag for k in kids)
    alltext=all(k.tag is None for k in kids)
    if alltext:
        txt=''.join(k.text or '' for k in kids)
        if not ispre: txt=re.sub(r'\s+',' ',txt).strip()
        out.append(' '*ind+f'<{tag}{a}>'+jsxtext(txt)+f'</{tag}>')
        return out
    out.append(' '*ind+f'<{tag}{a}>')
    # children: text nodes become trimmed text with {' '} glue where whitespace touched an element
    for i,k in enumerate(kids):
        if k.text is not None:
            t=k.text
            if ispre: out.append(' '*(ind+2)+'{'+jsstr(t)+'}'); continue
            lead=t[:1].isspace(); trail=t[-1:].isspace()
            core=re.sub(r'\s+',' ',t).strip()
            prev=kids[i-1] if i>0 else None; nxt=kids[i+1] if i+1<len(kids) else None
            def inl(x): return x is not None and x.tag in INLINE
            pieces=[]
            if core:
                if lead and inl(prev): pieces.append("{' '}")
                pieces.append(jsxtext(core))
                if trail and inl(nxt): pieces.append("{' '}")
            else:
                if inl(prev) and inl(nxt): pieces.append("{' '}")
            if pieces: out.append(' '*(ind+2)+''.join(pieces))
        else:
            emit(k, ind+2, svg, out, ispre)
    out.append(' '*ind+f'</{tag}>')
    return out

src=io.open(sys.argv[1],encoding='utf-8').read()
p=P(); p.feed(src); p.close()
lines=emit(p.root, 6)
jsx='\n'.join(lines)
io.open(sys.argv[2],'w',encoding='utf-8').write(jsx+'\n')
print('jsx lines', len(lines))

'use client';
import * as React from 'react';
import Link from 'next/link';
import ticker from '../../../data/ticker.json';

/* ============================================================
   The running news bar at the foot of the home page.

   Lazar: "put a continuous running message which is about recent news,
   information like deals and stuff like that so that people read and can know
   what is happening."

   Where the words come from, in order:

     1. the Magento CMS block "greenhse_ticker", read live from the admin panel
        Greenhse already use every day. Edit it there, save, and the bar changes
        on the next page load — no rebuild, no developer, no zip.
     2. data/ticker.json, shipped with the build, used until that fetch lands
        and kept as the fallback if the block is empty, missing or unreachable.

   So the bar is never blank and never waits on the network to paint.

   How the loop is seamless: the same list is rendered twice, side by side, and
   the pair is slid left by exactly half its own width. At the moment the first
   copy has fully left the screen the second copy is sitting exactly where the
   first one started, so the animation restarts with nothing to see. It never
   snaps back.

   It pauses when the pointer is over it and when anything inside it has
   keyboard focus, because a link you cannot catch is not a link. Anyone who has
   asked their system for less motion gets a normal scrolling row instead.
   ============================================================ */

const CSS = `
.ghticker{background:#060d0a;border-top:1px solid rgba(255,255,255,.10);overflow:hidden;position:relative}
.ghticker__row{display:flex;align-items:stretch}
.ghticker__tag{
  flex:none;display:flex;align-items:center;gap:9px;padding:0 20px;
  background:#00c400;color:#04120b;font-size:12px;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;z-index:2;
}
.ghticker__tag svg{width:14px;height:14px;flex:none}
.ghticker__viewport{flex:1;min-width:0;overflow:hidden;position:relative}
/* the fade at each end, so items appear and leave rather than being cut off */
.ghticker__viewport:before,.ghticker__viewport:after{
  content:"";position:absolute;top:0;bottom:0;width:56px;z-index:2;pointer-events:none;
}
.ghticker__viewport:before{left:0;background:linear-gradient(90deg,#060d0a,rgba(6,13,10,0))}
.ghticker__viewport:after{right:0;background:linear-gradient(270deg,#060d0a,rgba(6,13,10,0))}
.ghticker__track{display:flex;width:max-content;animation:ghticker-run 64s linear infinite}
.ghticker:hover .ghticker__track,
.ghticker:focus-within .ghticker__track{animation-play-state:paused}
.ghticker__half{display:flex;align-items:center}
.ghticker__item{
  display:inline-flex;align-items:center;gap:11px;padding:16px 0;margin-right:46px;
  color:#e7e9e2;font-size:14.5px;line-height:1.3;white-space:nowrap;text-decoration:none;
  transition:color .16s;
}
.ghticker__item:hover,.ghticker__item:focus-visible{color:#00c400}
.ghticker__item:focus-visible{outline:2px solid #00c400;outline-offset:4px;border-radius:3px}
.ghticker__pip{width:6px;height:6px;border-radius:50%;background:#00c400;flex:none;opacity:.85}
.ghticker__label{
  font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#04120b;background:#00c400;border-radius:3px;padding:3px 7px;flex:none;
}
/* An important notice has to stop the eye, so it gets amber rather than the
   house green and keeps its colour on hover. Holiday hours, a stock delay, a
   price change: things a customer is worse off for missing. */
.ghticker__item--notice{color:#ffd48a}
.ghticker__item--notice:hover,.ghticker__item--notice:focus-visible{color:#ffc04d}
.ghticker__item--notice .ghticker__pip{background:#ffb020}
.ghticker__item--notice .ghticker__label{background:#ffb020;color:#2a1a00}
@keyframes ghticker-run{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@media (max-width:640px){
  .ghticker__tag span{display:none}
  .ghticker__tag{padding:0 14px}
  .ghticker__item{font-size:13.5px;margin-right:34px}
  .ghticker__track{animation-duration:46s}
}
@media (prefers-reduced-motion:reduce){
  .ghticker__track{animation:none}
  .ghticker__viewport{overflow-x:auto}
  .ghticker__half:nth-child(2){display:none}
}
`;

/* Turn what somebody typed into the CMS block into items.

   The Magento block editor is a WYSIWYG, so the content arrives as HTML. Rather
   than demand valid markup from whoever is editing it, every block-level tag is
   treated as a line break, the tags are stripped, and each surviving line is one
   item. A line reads:

       Text
       Text | /link/
       Label | Text | /link/

   and a line starting with ! is an important notice. That is the whole format,
   because the person editing it is at a trade counter, not in a text editor. */
export function parseTickerBlock(html) {
  if (!html) return [];
  const asText = String(html)
    .replace(/<\s*(br|\/p|\/li|\/div|\/h[1-6]|\/tr)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  return asText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      let kind;
      let rest = line;
      if (rest.startsWith('!')) {
        kind = 'notice';
        rest = rest.slice(1).trim();
      }
      const parts = rest.split('|').map((x) => x.trim());
      let label;
      let text;
      let href;
      if (parts.length >= 3) {
        [label, text, href] = parts;
      } else if (parts.length === 2) {
        [text, href] = parts;
      } else {
        [text] = parts;
      }
      if (href && !/^(https?:|\/|mailto:|tel:)/i.test(href)) href = undefined;
      if (!text) return null;
      return { kind, label: label || undefined, text, href: href || undefined };
    })
    .filter(Boolean);
}

/* The block is read through the site's own /mag proxy, the same path every
   other Magento call takes — greenhse.com only allows demolights as a browser
   origin, so a direct call from here is refused. */
const BLOCK_ID = 'greenhse_ticker';
async function fetchBlockItems(signal) {
  const res = await fetch('/mag/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{cmsBlocks(identifiers:["${BLOCK_ID}"]){items{identifier content}}}`,
    }),
    signal,
  });
  if (!res.ok) return [];
  const json = await res.json();
  const block = json?.data?.cmsBlocks?.items?.[0];
  return block && block.content ? parseTickerBlock(block.content) : [];
}

function Item({ it }) {
  const isNotice = it.kind === 'notice';
  const cls = 'ghticker__item' + (isNotice ? ' ghticker__item--notice' : '');
  const body = (
    <>
      <span className="ghticker__pip" aria-hidden="true" />
      {it.label ? <span className="ghticker__label">{it.label}</span> : null}
      <span>{it.text}</span>
    </>
  );
  if (!it.href) {
    return (
      <span className={cls} role="listitem">
        {body}
      </span>
    );
  }
  return (
    <Link href={it.href} className={cls} role="listitem">
      {body}
    </Link>
  );
}

export default function NewsTicker() {
  const shipped = (ticker && ticker.items) || [];
  const [live, setLive] = React.useState(null);

  React.useEffect(() => {
    const ctrl = new AbortController();
    fetchBlockItems(ctrl.signal)
      .then((found) => {
        if (found.length) setLive(found);
      })
      .catch(() => {
        /* a missing block, a down Magento or an aborted page change all mean
           the same thing here: keep showing what shipped with the build */
      });
    return () => ctrl.abort();
  }, []);

  const all = live || shipped;
  /* Notices come round first. Everything else keeps the order it was written
     in, so the file reads the way it displays. */
  const items = [
    ...all.filter((x) => x.kind === 'notice'),
    ...all.filter((x) => x.kind !== 'notice'),
  ];
  if (!items.length) return null;
  /* rendered twice; the copy is hidden from screen readers so nothing is
     announced to them twice */
  const half = (hidden) => (
    <div className="ghticker__half" aria-hidden={hidden ? 'true' : undefined}>
      {items.map((it, i) => (
        <Item key={(hidden ? 'b' : 'a') + i} it={it} />
      ))}
    </div>
  );
  return (
    <aside className="ghticker" aria-label="Latest from Greenhse">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ghticker__row">
        <div className="ghticker__tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
            <circle cx="12" cy="12" r="3.4" />
          </svg>
          <span>Latest</span>
        </div>
        <div className="ghticker__viewport">
          <div className="ghticker__track" role="list">
            {half(false)}
            {half(true)}
          </div>
        </div>
      </div>
    </aside>
  );
}

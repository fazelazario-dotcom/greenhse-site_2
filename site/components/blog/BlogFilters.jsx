'use client';
import { useEffect, useState } from 'react';

/* Topic boxes for the blog index: one grid of cards, filtered in place. */
export default function BlogFilters({ chips, counts, total }) {
  const [on, setOn] = useState('all');
  useEffect(() => {
    document.querySelectorAll('.bl-index .grid > .card').forEach((c) => {
      const cats = ' ' + (c.getAttribute('data-cats') || '') + ' ';
      c.hidden = on !== 'all' && !cats.includes(' ' + on + ' ');
    });
  }, [on]);
  return (
    <nav className="shelfnav" aria-label="Filter guides by topic">
      {chips.map((c) => (
        <button key={c.id} type="button" className={`shelfnav__box${on === c.id ? ' is-on' : ''}`} aria-pressed={on === c.id} onClick={() => setOn(c.id)}>
          <span className="shelfnav__label">{c.label}</span>
          <span className="shelfnav__count">{c.id === 'all' ? total : counts[c.id]} guides</span>
        </button>
      ))}
    </nav>
  );
}

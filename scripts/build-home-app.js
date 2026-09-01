#!/usr/bin/env node
/* Builds public/assets/home-app.js from the per-feature source files in
   public/assets/home/. One file per feature, concatenated in filename order
   inside a single closure, so the features share state exactly as before.

   Runs automatically before every `npm run build` (see "prebuild" in
   package.json), or by hand:  node scripts/build-home-app.js

   EDIT THE FILES IN public/assets/home/ — never the built home-app.js. */
const fs = require('node:fs');
const path = require('node:path');

const SRC = path.join(__dirname, '..', 'public', 'assets', 'home');
const OUT = path.join(__dirname, '..', 'public', 'assets', 'home-app.js');

const parts = fs.readdirSync(SRC).filter(f => f.endsWith('.js')).sort();
if (!parts.length) { console.error('build-home-app: no source files in ' + SRC); process.exit(1); }

const banner =
`/* ================= GENERATED FILE - DO NOT EDIT =================
   Built from the one-file-per-feature sources in public/assets/home/
   by scripts/build-home-app.js (runs on every npm run build).
${parts.map(p => '     home/' + p).join('\n')}
   ================================================================ */

/* The homepage application: shop grid, cart, both finder wizards, the
   applications carousel and the QA suite. A self-contained module that
   renders into the skeleton markup the page ships (data/sections/). */

(function(){
"use strict";
`;

const trailer = `
})();

;
if(/[?&]qa=1/.test(location.search))document.body.classList.add("qa-on");`;

const body = parts.map(p => fs.readFileSync(path.join(SRC, p), 'utf8')).join('\n');
fs.writeFileSync(OUT, banner + body + trailer);
console.log('built ' + path.relative(process.cwd(), OUT) + ' from ' + parts.length + ' feature files (' + (banner + body + trailer).length + ' bytes)');

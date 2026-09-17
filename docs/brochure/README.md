# Marked-up strip lighting brochure — 17 Sep 2026

Photographs of Keri's printed brochure with the handwritten corrections on it.
These four pages are the source of truth for the strip finder's specs
(`site/lib/stripFinder.jsx`). The Quick Reference Chart on page 4 is the
authority when a body paragraph and a colour chip disagree.

| File | Pages |
|---|---|
| `1-high-density-smd-and-display.jpg` | 24V High Density SMD · 24V High Lumen, Display SMD |
| `2-240v-and-long-run.jpg` | 240V Strip Lighting · 24V 7.5W/m Long Run |
| `3-rgb-cob-and-cct-cob.jpg` | 24V RGB COB · 24V CCT COB |
| `4-neon-spi-and-quick-reference.jpg` | 24V Neon / SPI · **Quick Reference Chart** |

## The handwritten corrections

1. **High Lumen SMD is IP65 only.** Both chips read "IP65/IP20"; IP20 is struck
   out on the 12W/m and the 20W/m.
2. **Connectors on the High Lumen SMD carry 3m**, not 4m — "no waste (up to 4m)"
   has the 4 struck out and 3 written over it. (The Long Run COB keeps 4m; the
   other COB families keep 2m.)
3. **The 23W/m High Colour Display SMD is 4000K and 5000K.** The printed 5700k
   chip is struck out and 5000K written over it, and the Quick Reference Chart
   prints 5000k for that row too. It is **IP20 only**.
4. **The CCT COB IP65 is rated for outdoors** — "Outdoors" written beside the
   COB IP65 16W/m row on the chart.
5. **The RGBW SPI is full colour *plus white*** — "+ white" written beside it
   (its chips are RGB and 4000k).
6. "Best for" on the High Density SMD page reads **High** efficiency &
   **Long** lifespan.
7. Brochure to-do for Keri, not a website change: **"Need kitchen pic"** on the
   High Density SMD page — its photos are all bathrooms.

## Printed figures that disagree with each other

- **CCT COB range.** Both colour chips and both Quick Reference rows say
  **2700–6000K**; one advantages bullet says 2700k–6500k. The finder follows
  2700–6000K. Worth one line back from Keri.
- The 6x12mm Neon IP67 CCT row carries an RGB chip as well as 2700–6000k, so
  that size exists in both. The finder still sends RGB to the 12x12mm Magic RGB
  SPI, which is the one the brochure marks for outdoors.

## Everything the chart confirms (unchanged in the finder)

240V IP65: RGB / 3000 / 4000 / 6000K · 24V IP67 Long Run 7.5W/m: 3000K, outdoors ·
24V IP20 Long Run 7.5W/m: 3000K, 4000K · 24V RGB IP20 COB 16W/m · 24V RGB IP65
COB 15W/m, outdoors · High Lumen SMD 12W/m: 2700/3000/4000/5700K · 20W/m: 4000/5700K ·
Neon IP67 12x12mm Magic RGB SPI, outdoors.

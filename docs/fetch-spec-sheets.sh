#!/usr/bin/env bash
# Download every supplier spec sheet from Magento into this folder, so the
# site stops depending on greenhse.com/media staying where it is.
# Run from the repo root:  bash docs/fetch-spec-sheets.sh
set -uo pipefail
SRC="${1:-https://greenhse.com/media/sparsh/product_attachment}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ok=0; fail=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if [ -s "$DEST/$f" ]; then echo "have  $f"; ok=$((ok+1)); continue; fi
  if curl -fsSL --retry 2 -o "$DEST/$f" "$SRC/$f"; then
    echo "got   $f"; ok=$((ok+1))
  else
    echo "FAIL  $f" >&2; rm -f "$DEST/$f"; fail=$((fail+1))
  fi
done < "$DEST/filenames.txt"
echo
echo "downloaded/present: $ok   failed: $fail"
[ "$fail" -eq 0 ] || echo "Re-run to retry the failures."

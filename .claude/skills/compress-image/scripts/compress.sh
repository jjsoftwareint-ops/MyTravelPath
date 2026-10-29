#!/bin/bash
# Compress images in place. usage: compress.sh [--lossless] file...   |   compress.sh --all
# See ../SKILL.md for the rules. Prints "file: before → after (−NN%)" per file; skips gains under 2 %.
set -u
MOZ=/opt/homebrew/opt/mozjpeg/bin
export PATH="$MOZ:/opt/homebrew/bin:$PATH"
LOSSLESS=0; ALL=0; FILES=()
for a in "$@"; do case "$a" in --lossless) LOSSLESS=1;; --all) ALL=1;; *) FILES+=("$a");; esac; done
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
BRAND_RE='/(favicon\.png|icon-192\.png|icon-512\.png|apple-touch-icon\.png|logo\.png|brand\.png|wordmark\.png)$'
if [ $ALL = 1 ]; then
  while IFS= read -r f; do FILES+=("$f"); done < <(find "$ROOT/assets" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) -not -path '*/maps/*' | sort)
fi
size() { stat -f %z "$1"; }
TB=0; TA=0
for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "skip (missing) $f"; continue; }
  ll=$LOSSLESS; [[ "$f" =~ $BRAND_RE ]] && ll=1
  b=$(size "$f"); tmp="$(mktemp -d)/$(basename "$f")"; ext="${f##*.}"; ext="$(echo "$ext" | tr A-Z a-z)"
  case "$ext" in
    png)  if [ $ll = 1 ]; then cp "$f" "$tmp" && oxipng -q -o 4 --strip safe "$tmp";
          else pngquant --quality=65-80 --speed 1 --strip --force --output "$tmp" "$f" 2>/dev/null || cp "$f" "$tmp"; oxipng -q -o 2 --strip safe "$tmp"; fi;;
    jpg|jpeg) if [ $ll = 1 ]; then jpegtran -optimize -progressive -copy none -outfile "$tmp" "$f";
          else djpeg -pnm "$f" | cjpeg -quality 78 -optimize -progressive -outfile "$tmp"; fi;;
    webp) if [ $ll = 1 ]; then dwebp -quiet "$f" -o - | cwebp -quiet -lossless -z 9 -o "$tmp" -- -;
          else dwebp -quiet "$f" -o - | cwebp -quiet -q 80 -m 6 -o "$tmp" -- -; fi;;
    *) echo "skip (type) $f"; continue;;
  esac
  a=$(size "$tmp" 2>/dev/null || echo 0)
  if [ "$a" -gt 0 ] && [ $((b - a)) -gt $((b / 50)) ]; then mv "$tmp" "$f"; else a=$b; echo "kept   $f ($b B, no gain)"; fi
  TB=$((TB + b)); TA=$((TA + a))
  [ "$a" != "$b" ] && printf '%-6s %s: %d → %d B (−%d%%)\n' "$([ $ll = 1 ] && echo lossless || echo lossy)" "$f" "$b" "$a" $(( (b - a) * 100 / b ))
done
[ $TB -gt 0 ] && printf 'TOTAL %d → %d B (−%d%%)\n' $TB $TA $(( (TB - TA) * 100 / TB ))

---
name: compress-image
description: Compress PNG, JPG and WebP images locally for free without external API keys — pngquant/oxipng for PNG, mozjpeg for JPG, cwebp for WebP — with the MyTravelPath rules (lossy for photos and emoji, lossless only for the supplied brand artwork, never resize, report before/after sizes). Use when the user says compress, shrink, optimise or "the images are too big", after adding any photo under assets/, and before pushing new banners or blog images.
---

# Compress Image Skill

Tools (installed once with `brew install pngquant mozjpeg oxipng webp`, 2026-10-30):

| Format | Lossy (photos, emoji) | Lossless (brand artwork) |
|---|---|---|
| PNG | `pngquant --quality=65-80 --speed 1 --strip --ext .png --force f.png` then oxipng | `oxipng -o 4 --strip safe f.png` |
| JPG | `djpeg -pnm f.jpg \| cjpeg -quality 78 -optimize -progressive -outfile f.jpg` (mozjpeg, keg-only: use `/opt/homebrew/opt/mozjpeg/bin/`) | `jpegtran -optimize -progressive -copy none -outfile f.jpg f.jpg` |
| WebP | `dwebp f.webp -o - \| cwebp -q 80 -m 6 -o f.webp -- -` (re-encode) | `cwebp -lossless -z 9` |

Everything is in `scripts/compress.sh`; use it instead of typing the commands:

```bash
.claude/skills/compress-image/scripts/compress.sh assets/paju.jpg assets/blog/*.jpg      # lossy, photos
.claude/skills/compress-image/scripts/compress.sh --lossless assets/icon-512.png        # brand artwork
.claude/skills/compress-image/scripts/compress.sh --all                                 # the whole project, rules below
```

It prints one line per file (`before → after, −NN %`), skips files it cannot shrink by at least 2 %, keeps dimensions,
and writes in place (git is the backup: run it on a clean tree or after `git add`).

## Rules for this project

1. **Never resize or crop here.** Banners are already the whole photo at 1200 px wide (design skill, 2026-10-30);
   this skill only re-encodes. Supplied artwork is never cropped (CLAUDE.md).
2. **Lossy is fine for photos and the emoji PNGs**: JPG quality 78 (mozjpeg), PNG `pngquant 65-80`,
   WebP q 80. Below that the banners start to band in skies.
3. **Lossless only for the user's own artwork**: `favicon.png`, `favicon.ico` (leave the .ico alone), `icon-192.png`,
   `icon-512.png`, `apple-touch-icon.png`, `logo.png`, `brand.png`, `wordmark.png`, `kr.svg` (skip SVG).
   `--all` applies this list automatically.
4. **Do not touch** `dist/`, `dist-ssr/`, `node_modules/`, `docs/threads/` (local-only Threads photos, git-ignored),
   `.claude/` and anything under `assets/maps/`.
5. **Do not compress twice.** Lossy on lossy adds artefacts. `--all` is for the first pass and for files that are new
   or modified in git (`git status`); for a routine update pass only the new files.
6. **Report**: total before/after and the biggest wins; mention any file that changed less than 2 % (already tight).
   Check one banner and one emoji in a screenshot or by opening the file when the quality setting is changed.

## Why

Detail banners went from slim 252 px bands to whole photos on 2026-10-30, which tripled `assets/` (3 MB → 9 MB of
banners). The user asked for a free local pipeline instead of an API service.

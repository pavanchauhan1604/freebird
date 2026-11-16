#!/bin/bash
# The delivery set: a max-quality master (1080p, 60 fps), a smaller shareable copy, captions as an embedded switchable track and as sidecar files, and a browser player.
#   export.sh <film-project-dir> <name> <captions-basename (without .srt)>
set -euo pipefail
FILM="$1"; NAME="$2"; CAP="$3"; OUT="$FILM/../final"; mkdir -p "$OUT"
( cd "$FILM" && npx hyperframes@0.9.34 render --quality delivery --fps 60 --output "$OUT/$NAME-master.mp4" )
ffmpeg -v error -y -i "$OUT/$NAME-master.mp4" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -c:a copy -movflags +faststart "$OUT/$NAME-share.mp4"
for v in master share; do
  ffmpeg -v error -y -i "$OUT/$NAME-$v.mp4" -i "$CAP.srt" -map 0:v -map 0:a -map 1:0 -c:v copy -c:a copy -c:s mov_text -metadata:s:s:0 language=eng -metadata:s:s:0 title="English captions" -disposition:s:0 0 -movflags +faststart "$OUT/$NAME-$v-captioned.mp4"
done
cp "$CAP.srt" "$CAP.vtt" "$OUT/"
cat > "$OUT/player.html" <<HTML
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>$NAME</title>
<style>html,body{margin:0;background:#f6f6f3;font-family:Manrope,-apple-system,Arial,sans-serif}main{max-width:1280px;margin:0 auto;padding:32px 16px}video{display:block;width:100%;border-radius:16px;background:#000}p{color:#6e6e73}@media(prefers-color-scheme:dark){html,body{background:#1c1c1e}p{color:#98989d}}</style></head>
<body><main><video controls preload="metadata" playsinline><source src="$NAME-share.mp4" type="video/mp4"><track kind="captions" src="$(basename "$CAP").vtt" srclang="en" label="English"></video><p>Captions are off until you turn them on with the CC button.</p></main></body></html>
HTML
ls -la "$OUT"

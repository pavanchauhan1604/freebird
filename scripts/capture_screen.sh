#!/bin/bash
# Scripted screen capture on macOS, for when a person is not at the Recordly window (see references/screen-recording.md).
#   capture_screen.sh <seconds> <out.mov> [x,y,w,h]
# Uses the system `screencapture -v` (video) with -V (duration) and optional -R (region). Needs Screen Recording permission for the terminal/agent app, which only the user can grant.
# Verified on macOS 26 (4K, 60 fps, h264, the real cursor included); no permission prompt appeared on the machine where it was tried, because the terminal app already had Screen Recording.
# macOS has no `timeout` command; the recording ends by itself after <seconds>.
set -euo pipefail
SECS="$1"; OUT="$2"; REGION="${3:-}"
if [ -n "$REGION" ]; then screencapture -v -V "$SECS" -R "$REGION" "$OUT"; else screencapture -v -V "$SECS" "$OUT"; fi
echo "recorded $SECS s -> $OUT"

#!/bin/bash
# Record an app while the terminal drives it: open the app, find its window, start a screen recording, move the cursor and click, stop.
#   record_demo.sh <App name> <seconds> <out.mov> '<[[fx,fy],...]>'     # click targets as fractions (0..1) of the app's window
# Verified on macOS 26 with Calculator: the recording captured the app, the moving cursor and the clicks.
# Needs: Screen Recording and Accessibility permission for the terminal app (the first run may prompt; only the user can grant). Use test data only.
set -euo pipefail
APP="$1"; SECS="$2"; OUT="$3"; KEYS="${4:-[]}"; HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
open -a "$APP"; sleep 2; osascript -e "tell application \"$APP\" to activate"; sleep 1
W=$(osascript -e "tell application \"System Events\" to tell process \"$APP\" to get {position, size} of window 1" | python3 -c "import sys;print([int(x) for x in sys.stdin.read().replace(' ','').split(',')])")
echo "window (x,y,w,h in points): $W"
bash "$HERE/capture_screen.sh" "$SECS" "$OUT" > /dev/null &
REC=$!; sleep 1.2
osascript -l JavaScript "$HERE/tap.js" "$W" "$KEYS"
wait $REC; echo "recorded $SECS s -> $OUT"

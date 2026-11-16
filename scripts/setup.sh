#!/bin/bash
# One-time setup: a Python 3.11 venv with the voice and audio tools, and a check that the video tools exist.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="${FREEBIRD_VENV:-$HOME/.freebird-venv}"
command -v ffmpeg >/dev/null || { echo "ffmpeg is missing (brew install ffmpeg)" >&2; exit 2; }
command -v node >/dev/null || { echo "node is missing (brew install node)" >&2; exit 2; }
PY="$(command -v python3.11 || command -v python3)"
[ -d "$VENV" ] || "$PY" -m venv "$VENV"
"$VENV/bin/pip" install --quiet --upgrade pip
# numpy and soundfile are enough for the score, sound effects and mixing; kokoro (and torch) are only for the voice
"$VENV/bin/pip" install --quiet numpy soundfile
if [ "${1:-}" = "--voice" ]; then "$VENV/bin/pip" install --quiet "kokoro>=0.9" misaki; fi
echo "venv: $VENV   (python: $VENV/bin/python)"
echo "voice tools installed: $([ "${1:-}" = "--voice" ] && echo yes || echo 'no; run again with --voice')"

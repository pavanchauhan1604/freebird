#!/bin/bash
# Companion tools, installed from their own upstream repos (nothing is vendored):
#   earshot + real-sound  (MIT)    https://github.com/Leonxlnx/earshot     ears for the agent, and a soundtrack process built on real licensed recordings
#   Recordly              (AGPL-3) https://github.com/webadderallorg/Recordly   screen recorder/editor with auto-zoom, for footage of the app working
# usage: install_companions.sh [--models]      (--models downloads Earshot's two models, about 1.1 GB)
set -euo pipefail
CACHE="${FREEBIRD_CACHE:-$HOME/.cache/freebird}"; mkdir -p "$CACHE" "$HOME/.claude/skills"
if [ -d "$CACHE/earshot/.git" ]; then git -C "$CACHE/earshot" pull --ff-only --quiet; else git clone --depth 1 https://github.com/Leonxlnx/earshot "$CACHE/earshot"; fi
for s in earshot real-sound; do ln -sfn "$CACHE/earshot/skills/$s" "$HOME/.claude/skills/$s"; echo "skill linked: ~/.claude/skills/$s"; done
if command -v uv >/dev/null; then uv tool install "earshot[mcp] @ git+https://github.com/Leonxlnx/earshot" || true; else echo "uv is missing (brew install uv), then: uv tool install \"earshot[mcp] @ git+https://github.com/Leonxlnx/earshot\""; fi
[ "${1:-}" = "--models" ] && earshot doctor --fetch
echo "Earshot MCP for Claude Code:  claude mcp add earshot --scope user -e EARSHOT_THREADS=3 -- earshot mcp"
echo "Recordly: download a release from https://github.com/webadderallorg/Recordly/releases, or:  git clone https://github.com/webadderallorg/Recordly.git && cd Recordly && npm install && npm run dev"

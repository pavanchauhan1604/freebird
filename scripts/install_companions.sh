#!/bin/bash
# Companion tools, installed from their own upstream repos (nothing is vendored):
#   earshot + real-sound  (MIT)    https://github.com/Leonxlnx/earshot     ears for the agent, and a soundtrack process built on real licensed recordings
#   Recordly              (AGPL-3) https://github.com/webadderallorg/Recordly   screen recorder/editor with auto-zoom, for footage of the app working
#   hyperframes skills     (checked only)  https://github.com/heygen-com/hyperframes   the render contract, per-type notes, registry, media-use
# usage: install_companions.sh [--models] [--no-animation-skills]      (the GSAP, Emil Kowalski and LottieFiles animation skills are installed by default; references/dependencies.md)      (--models downloads Earshot's two models, about 1.1 GB)
set -euo pipefail
NOANIM=0; for a in "$@"; do [ "$a" = "--no-animation-skills" ] && NOANIM=1; done
# HyperFrames skills (heygen-com/hyperframes): the render contract freebird builds on. Installing them is the person's step, so this only checks.
if [ -d "$HOME/.claude/skills/hyperframes" ] || ls -d "$HOME"/.claude/plugins/cache/hyperframes/hyperframes/* >/dev/null 2>&1; then echo "hyperframes skills: found"; else echo "hyperframes skills: MISSING. Install (you run it):  npx skills add heygen-com/hyperframes --all   (or the HyperFrames Claude plugin)"; fi
for t in ffmpeg node python3; do command -v "$t" >/dev/null && echo "$t: found" || echo "$t: MISSING"; done
CACHE="${FREEBIRD_CACHE:-$HOME/.cache/freebird}"; mkdir -p "$CACHE" "$HOME/.claude/skills"
if [ -d "$CACHE/earshot/.git" ]; then git -C "$CACHE/earshot" pull --ff-only --quiet; else git clone --depth 1 https://github.com/Leonxlnx/earshot "$CACHE/earshot"; fi
for s in earshot real-sound; do ln -sfn "$CACHE/earshot/skills/$s" "$HOME/.claude/skills/$s"; echo "skill linked: ~/.claude/skills/$s"; done
if command -v uv >/dev/null; then uv tool install "earshot[mcp] @ git+https://github.com/Leonxlnx/earshot" || true; else echo "uv is missing (brew install uv), then: uv tool install \"earshot[mcp] @ git+https://github.com/Leonxlnx/earshot\""; fi
for a in "$@"; do [ "$a" = "--models" ] && earshot doctor --fetch; done
echo "Earshot MCP for Claude Code:  claude mcp add earshot --scope user -e EARSHOT_THREADS=3 -- earshot mcp"
echo "Recordly: download a release from https://github.com/webadderallorg/Recordly/releases, or:  git clone https://github.com/webadderallorg/Recordly.git && cd Recordly && npm install && npm run dev"
# The three animation skills are default dependencies (references/dependencies.md): installed here unless --no-animation-skills is given
if [ "${NOANIM:-}" != "1" ]; then
  npx -y skills@latest add greensock/gsap-skills -g -a claude-code -y -s gsap-core -s gsap-timeline -s gsap-plugins -s gsap-utils -s gsap-performance || echo "GSAP skills: install failed, run it by hand"
  npx -y skills@latest add emilkowalski/skills -g -a claude-code -y -s emil-design-eng -s review-animations -s improve-animations -s animation-vocabulary -s choreograph -s animate || echo "Emil Kowalski skills: install failed, run it by hand"
  npx -y skills@latest add LottieFiles/motion-design-skill -g -a claude-code -y -s motion-design || echo "LottieFiles motion-design: install failed, run it by hand"
fi

#!/bin/bash
# Reports every dependency freebird uses, by phase, and exits non-zero if a required one is missing.
#   doctor.sh            required + optional report
VENV="${FREEBIRD_VENV:-$HOME/.freebird-venv}"; CACHE="${FREEBIRD_CACHE:-$HOME/.cache/freebird}"; S="$HOME/.claude/skills"; miss=0
ok(){ printf "  ok       %s\n" "$1"; }; bad(){ printf "  MISSING  %s   -> %s\n" "$1" "$2"; miss=1; }; opt(){ printf "  optional %s   -> %s\n" "$1" "$2"; }
has_skill(){ [ -d "$S/$1" ] || ls -d "$HOME"/.claude/plugins/cache/*/*/*/skills/"$1" >/dev/null 2>&1; }
echo "plumbing";           for t in ffmpeg node python3 git; do command -v $t >/dev/null && ok $t || bad $t "your package manager"; done
echo "render (phases 4, 7, 9)"; if has_skill hyperframes; then ok "hyperframes skills"; else bad "hyperframes skills" "npx skills add heygen-com/hyperframes --all (or the HyperFrames plugin)"; fi
for k in hyperframes-registry media-use; do has_skill $k && ok $k || bad $k "with the HyperFrames skills"; done
echo "voice (phase 3)";    "$VENV/bin/python" -c "import kokoro, soundfile, numpy" 2>/dev/null && ok "kokoro af_heart in $VENV" || bad "kokoro voice" "scripts/setup.sh --voice"
echo "motion (phases 2, 4, 7)"; for k in gsap-core gsap-timeline gsap-utils gsap-plugins gsap-performance motion-design choreograph animate emil-design-eng animation-vocabulary review-animations improve-animations; do has_skill $k && ok $k || bad $k "scripts/install_companions.sh"; done
echo "sound (phase 6)";    has_skill earshot && ok earshot || bad earshot "scripts/install_companions.sh"; has_skill real-sound && ok real-sound || bad real-sound "scripts/install_companions.sh"
command -v earshot >/dev/null && ok "earshot CLI" || opt "earshot CLI" "uv tool install earshot (needs uv)"
"$( [ -x "$VENV/bin/python" ] && echo "$VENV/bin/python" || echo python3 )" - <<'PY' 2>/dev/null && ok "Openverse reachable" || opt "Openverse" "needs network for sfx_search.py"
import urllib.request; urllib.request.urlopen("https://api.openverse.org/v1/", timeout=6)
PY
echo "footage (phase 5)";  [ -d "/Applications/Recordly.app" ] && ok Recordly || opt Recordly "optional; scripts/record_demo.sh works without it"
[ $miss -eq 0 ] && echo "all required dependencies present" || echo "some required dependencies are missing (above)"; exit $miss

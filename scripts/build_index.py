#!/usr/bin/env python3
"""index.html for the film: one host per scene (from scenes.json and timing.json) and the audio tracks.

  build_index.py --scenes scenes.json --timing timing.json [--font assets/fonts/Manrope-var-latin.woff2] [--ground "#f6f6f3"]
scenes.json: [{"id": "s-bridge", "key": "bridge", "src": "compositions/s-bridge.html"}, ...]   (order = paint order; a persistent rail goes last so it is on top)
Audio: assets/voice/narration.wav, bed.wav, sfx.wav, whichever exist, each spanning the whole film.
"""
import argparse, json, os

p = argparse.ArgumentParser(); p.add_argument("--scenes", default="scenes.json"); p.add_argument("--timing", default="timing.json"); p.add_argument("--font", default="assets/fonts/Manrope-var-latin.woff2")
p.add_argument("--ground", default="#f6f6f3"); p.add_argument("--ink", default="#1d1d1f"); p.add_argument("--gsap", default="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js")
a = p.parse_args(); S = json.load(open(a.scenes)); T = json.load(open(a.timing)); total = T["total"]
hosts, z = "", 1
for s in S:
    if not os.path.exists(s["src"]) or s["key"] not in T["scenes"]: continue
    st, d = T["scenes"][s["key"]]
    hosts += f'      <div id="{s["id"]}" data-composition-id="{s["id"]}" data-composition-src="{s["src"]}" data-start="{st}" data-duration="{d}" data-track-index="{z}" data-track-kind="graphics" data-width="1920" data-height="1080"></div>\n'; z += 1
audio = ""
for i, (aid, f) in enumerate([("narration", "narration.wav"), ("bed", "bed.wav"), ("sfx", "sfx.wav")]):
    if os.path.exists(f"assets/voice/{f}"):
        audio += f'      <audio id="{aid}" class="clip" src="assets/voice/{f}" data-start="0" data-duration="{total}" data-track-index="{40 + i}" data-volume="1"></audio>\n'
html = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="{a.gsap}"></script>
    <style>
      @font-face {{ font-family: "Manrope"; font-style: normal; font-weight: 200 800; font-display: block; src: url("{a.font}") format("woff2"); }}
      :root {{ --ground: {a.ground}; --ink: {a.ink}; --muted: #6e6e73; }}
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: var(--ground); }}
      #root {{ position: relative; width: 100%; height: 100%; font-family: Manrope, sans-serif; }}
      /* the film's type: one display style for titles (Manrope 800, tight), words that land one by one; marks are added by LM.mark2 */
      .ttl {{ position: absolute; font-family: Manrope, sans-serif; font-weight: 800; font-size: 84px; line-height: 1.08; letter-spacing: -0.04em; color: var(--ink); white-space: nowrap; }}
      .ttl .w {{ display: inline-block; opacity: 0; }}
      .mk {{ position: relative; display: inline-block; isolation: isolate; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
{hosts}{audio}    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      const tl = gsap.timeline({{ paused: true }});
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
'''
open("index.html", "w").write(html); print("index.html:", z - 1, "scenes,", round(total, 1), "s")

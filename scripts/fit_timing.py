#!/usr/bin/env python3
"""Write each scene's line times into its composition, so a scene is built from the voice and not from a guess.

  fit_timing.py --scenes scenes.json --timing timing.json --durations assets/voice/voice.json

A composition that wants its times from the narration holds one marked block:

    /*TIMING*/ var L = {...}, D = {...}, END = 0; /*END TIMING*/

L: each line's start, in seconds from the scene's own start. D: each line's spoken length. END: the scene's length.
The ids placed in L and D are the ones already in the block; the numbers are replaced from timing.json and voice.json.
Run it after every `retime.py`, then build and check. Anything in the block outside L, D and END is left alone.
"""
import argparse, json, re

p = argparse.ArgumentParser(); p.add_argument("--scenes", required=True); p.add_argument("--timing", required=True); p.add_argument("--durations", required=True)
a = p.parse_args(); S = json.load(open(a.scenes)); T = json.load(open(a.timing)); D = json.load(open(a.durations)); D = D.get("durations", D)
PAT = re.compile(r"(/\*TIMING\*/)(.*?)(/\*END TIMING\*/)", re.S)
for s in S:
    f = s["src"]; txt = open(f).read(); m = PAT.search(txt)
    if not m or s["key"] not in T["scenes"]: continue
    start, dur = T["scenes"][s["key"]]; body = m.group(2)
    ids = re.findall(r"(\w+):\s*[-\d.]+", re.search(r"var L = \{(.*?)\}", body, re.S).group(1))
    L = ", ".join(f"{i}: {round(T['voice'][i] - start, 2)}" for i in ids); Dd = ", ".join(f"{i}: {D[i]}" for i in ids)
    body = re.sub(r"var L = \{.*?\}", "var L = {" + L + "}", body, flags=re.S); body = re.sub(r"D = \{.*?\}", "D = {" + Dd + "}", body, flags=re.S)
    body = re.sub(r"END = [-\d.]+", f"END = {dur}", body)
    open(f, "w").write(txt[:m.start(2)] + body + txt[m.end(2):]); print(f, "L:", L, "END", dur)

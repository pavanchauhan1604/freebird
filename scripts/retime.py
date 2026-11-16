#!/usr/bin/env python3
"""timing.json from the voice durations: the picture follows the narration, never the other way round.

  retime.py --layout layout.json --durations assets/voice/voice.json --out timing.json

layout.json: {"overlap": 0.4, "lead": 0.6, "tail": 1.2, "scenes": [
    {"key": "intro", "start": 0, "duration": 11.0, "lines": {"i1": 4.9, "i2": 7.4}},                  # a scene with fixed times
    {"key": "bridge", "lines": [["b1", 0.5], ["b2", 0.55], ["b3", 0.6]], "min_duration": 20},         # [id, pause after the line]
    ...]}
A scene that is not fixed starts `overlap` seconds before the previous one ends (the cross-dissolve), speaks its first line `lead` seconds in,
places each next line after the previous one plus its pause, and ends `tail` seconds after its last line (or at min_duration, whichever is later).
Changing one line's length moves every scene after it: rerun this, then `narrate.py mix`, `score.py`, `sfx.py`, `build_index.py`.
"""
import argparse, json

p = argparse.ArgumentParser(); p.add_argument("--layout", required=True); p.add_argument("--durations", required=True); p.add_argument("--out", default="timing.json")
a = p.parse_args(); L = json.load(open(a.layout)); D = json.load(open(a.durations)); D = D.get("durations", D)
overlap, lead, tail = L.get("overlap", 0.4), L.get("lead", 0.6), L.get("tail", 1.2)
scenes, voice, prev_end = {}, {}, 0.0
for s in L["scenes"]:
    if "start" in s:
        st, dur = s["start"], s["duration"]
        for lid, t in s.get("lines", {}).items(): voice[lid] = round(t, 2)
    else:
        st = round(prev_end - overlap, 2); t = st + lead; end_voice = st
        for lid, pause in s["lines"]:
            voice[lid] = round(t, 2); t += D[lid] + pause; end_voice = voice[lid] + D[lid]
        dur = round(max(s.get("min_duration", 0), end_voice + tail - st), 2)
    scenes[s["key"]] = [st, dur]; prev_end = st + dur
out = {"scenes": scenes, "voice": voice, "total": round(prev_end, 2)}
for k, v in L.get("spans", {}).items(): out["scenes"][k] = [scenes[v[0]][0], round(scenes[v[1]][0] + scenes[v[1]][1] - scenes[v[0]][0], 2)]   # e.g. a rail that spans several scenes
json.dump(out, open(a.out, "w"), indent=1); print("total", out["total"], "s;", len(voice), "lines;", len(scenes), "scenes")

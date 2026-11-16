#!/usr/bin/env python3
"""Closed captions from the narration itself: one cue per phrase group, timed from where the voice actually speaks.

  make_captions.py --script script.json --timing timing.json --durations assets/voice/voice.json --narration assets/voice/narration.wav --out final/film.en
Writes film.en.srt and film.en.vtt. A script entry may carry "caption" when the spoken text was punctuated for the voice. A player turns them on and off; nothing is burned into the picture.
"""
import argparse, json, math, re, subprocess, textwrap

p = argparse.ArgumentParser(); [p.add_argument(f"--{k}", required=True) for k in ("script", "timing", "durations", "narration", "out")]
a = p.parse_args(); script = json.load(open(a.script)); T = json.load(open(a.timing)); V = json.load(open(a.durations)); V = V.get("durations", V)
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", a.narration, "-af", "silencedetect=noise=-38dB:d=0.1", "-f", "null", "-"], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r)]; en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r)]
seg, prev = [], 0.0
for x, y in zip(st, en):
    if x > prev: seg.append((prev, x))
    prev = y
chunks = []
for lid, t0 in sorted(T["voice"].items(), key=lambda kv: kv[1]):
    if lid not in script: continue
    text = script[lid].get("caption", script[lid]["text"]); t1 = t0 + V[lid]          # "caption" overrides the spoken text where the punctuation was there only to shape the voice
    ss = [(max(x, t0), min(y, t1)) for x, y in seg if y > t0 + 0.05 and x < t1 - 0.05]
    if not ss: continue
    ph = [q.strip() for q in re.findall(r"[^,:.!?]+[,:.!?]?", text) if q.strip()]
    if len(ss) == len(ph): times = ss
    else:                                                             # the speech segments do not match the phrases: share the line's span by length
        s0, s1 = ss[0][0], ss[-1][1]; w = [len(q) + 4 for q in ph]; tot = sum(w); x = s0; times = []
        for q, wi in zip(ph, w): d = (s1 - s0) * wi / tot; times.append((x, x + d)); x += d
    cur = []
    def flush():
        global cur
        if cur: chunks.append([cur[0][1][0], cur[-1][1][1], " ".join(q for q, _ in cur)]); cur = []
    for q, tm in zip(ph, times):
        cur.append((q, tm)); txt = " ".join(c for c, _ in cur)
        if len(txt) >= 40 or (q[-1] in ".!?" and (len(txt) >= 18 or tm[1] - cur[0][1][0] >= 1.2)): flush()
    flush()
chunks.sort(); cues, last = [], 0.0
for i, (s0, e0, t) in enumerate(chunks):
    s = max(s0 - 0.05, last + 0.04, 0); e = max(e0 + 0.2, s + 1.1)
    if i + 1 < len(chunks): e = min(e, chunks[i + 1][0] - 0.09)
    e = max(e, s + 0.6); cues.append((s, e, t)); last = e
wrap = lambda t: t if len(t) <= 42 else "\n".join(textwrap.wrap(t, max(math.ceil(len(t) / 2) + 4, 24)))
def ts(x, sep): return f"{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{x % 60:06.3f}".replace(".", sep)
srt, vtt = "", "WEBVTT\n\n"
for i, (s, e, t) in enumerate(cues, 1):
    srt += f"{i}\n{ts(s, ',')} --> {ts(e, ',')}\n{wrap(t)}\n\n"; vtt += f"{i}\n{ts(s, '.')} --> {ts(e, '.')}\n{wrap(t)}\n\n"
open(a.out + ".srt", "w").write(srt); open(a.out + ".vtt", "w").write(vtt)
print(len(cues), "cues; overlaps:", sum(1 for i in range(len(cues) - 1) if cues[i][1] > cues[i + 1][0]), "; longest", round(max(e - s for s, e, _ in cues), 1), "s")

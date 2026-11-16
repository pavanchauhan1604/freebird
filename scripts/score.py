#!/usr/bin/env python3
"""The music bed: a warm pad and a soft sub on one chord per scene, a quiet pulse and muted plucks from the lifecycle on, a low boom and a rising glass run at the lockup.
No noise, no sparkle jingle, no beat in the intro; the voice ducks it.

  score.py --timing timing.json --config score.json --narration assets/voice/narration.wav --out assets/voice
score.json: {"bpm": 92, "chords": {"intro": "C", "bridge": "Am", ...},        # scene key -> C | Am | F | G (the scenes' own starts are where the chord changes)
             "groove": [[0, 0], [24, 0], [31.6, 1], [190, 1.1], [200, 0]],     # [seconds, how much pulse and pluck], interpolated
             "lit_at": 4.84,                                                  # a moment the pad swells (the intro's light), or null
             "lockup_at": 201.4,                                              # the closing lockup: boom and rising run, or null
             "loudness": -20}                                                 # before the voice ducks it
"""
import argparse, json, os, subprocess
import numpy as np, soundfile as sf

CH = {"C": ([130.81, 164.81, 196.0, 246.94], 65.41), "Am": ([110.0, 164.81, 220.0, 261.63], 55.0), "F": ([87.31, 130.81, 174.61, 220.0], 87.31), "G": ([98.0, 146.83, 196.0, 246.94], 98.0)}
p = argparse.ArgumentParser(); [p.add_argument(f"--{k}", required=True) for k in ("timing", "config", "narration", "out")]
a = p.parse_args(); T = json.load(open(a.timing)); C = json.load(open(a.config)); TOTAL = T["total"]; SR = 44100; n = int((TOTAL + 1) * SR)
t = np.arange(n, dtype=np.float64) / SR; BEAT = 60 / C.get("bpm", 92); LIT = C.get("lit_at"); LOCK = C.get("lockup_at")
S = sorted(((T["scenes"][k][0], c) for k, c in C["chords"].items() if k in T["scenes"]), key=lambda x: x[0]); S[0] = (0, S[0][1])
gx, gy = zip(*C["groove"]); groove = np.interp(t, gx, gy)
cut = 520 + 520 * (0.5 + 0.5 * np.sin(2 * np.pi * t / 21.0 - 1.2))                                   # the filter opens and closes very slowly
if LIT is not None: cut = cut + 700 * np.clip((t - (LIT - 1.2)) / 1.3, 0, 1) * (t < LIT + 7)
pad = np.zeros(n, dtype=np.float32); sub = np.zeros(n, dtype=np.float32)
for k, (st, name) in enumerate(S):
    en = S[k + 1][0] if k + 1 < len(S) else TOTAL + 2
    env = np.clip(np.minimum((t - (st - 1.5)) / 3.0, (en + 1.5 - t) / 3.0), 0, 1).astype(np.float32); env = env * env * (3 - 2 * env)
    tones, root = CH[name]
    for f in tones:
        for det in (0.9985, 1.0015):
            for h in range(1, 9):
                fh = f * det * h
                if fh > 6000: break
                pad += (np.sin(2 * np.pi * fh * t).astype(np.float32) / h) * (1.0 / (1.0 + (fh / cut) ** 4)).astype(np.float32) * env * 0.045
    sub += np.sin(2 * np.pi * root * t).astype(np.float32) * env * 0.5
pump = 1 - 0.42 * groove * np.exp(-((t % BEAT) / 0.17))                                               # the sub and pad breathe with the pulse
pad *= (0.55 + 0.45 * np.clip(t / 5.0, 0, 1)) * pump
if LIT is not None: pad *= 1 + 0.55 * np.exp(-((t - LIT) / 0.9) ** 2)
if LOCK is not None: pad *= 1 + 1.1 * np.exp(-np.clip(t - LOCK, 0, None) / 1.8) * (t >= LOCK)
mix = pad + sub * pump * 0.9


def place(sig, at, g):
    i = int(at * SR)
    if 0 <= i < n: j = min(i + len(sig), n); mix[i:j] += (sig[: j - i] * g).astype(np.float32)


def kick(at, g):
    L = int(0.4 * SR); tt = np.arange(L) / SR; ph = 2 * np.pi * np.cumsum(48 + 90 * np.exp(-tt / 0.035)) / SR; place(np.sin(ph) * np.exp(-tt / 0.16), at, g)


def pluck(f, at, g, d=0.55):
    L = int(d * SR); tt = np.arange(L) / SR; s = np.zeros(L)
    for h in range(1, 9):
        if f * h > 5000: break
        s += np.sin(2 * np.pi * f * h * tt) / h * np.exp(-tt * (3.0 + 2.6 * h))                      # higher partials die faster: a filter that closes
    place(s * np.minimum(tt / 0.004, 1), at, g)


pat = [0, 2, 1, 3, 2, 1, 3, 2]
for bi, b in enumerate(np.arange(0, TOTAL, BEAT)):
    gv = float(np.interp(b, gx, gy))
    if gv < 0.02: continue
    tones, _ = CH[[nm for st, nm in S if st <= b][-1]]; kick(b, 0.55 * gv)
    for j, off in enumerate((0.0, 0.5)): pluck(tones[pat[(bi * 2 + j) % 8]] * 2, b + off * BEAT, (0.10 if off == 0 else 0.15) * gv)
if LOCK is not None:
    L = int(3.4 * SR); tt = np.arange(L) / SR; place(np.sin(2 * np.pi * (44 + 30 * np.exp(-tt / 0.2)) * tt) * np.exp(-tt / 0.9), LOCK, 0.9)
    for i, f in enumerate([261.63, 329.63, 392.0, 493.88, 523.25]): pluck(f * 2, LOCK + 0.2 + i * 0.17, 0.2, 1.4)
mix *= np.clip(t / 2.0, 0, 1) * np.clip((TOTAL + 0.8 - t) / 1.8, 0, 1)
os.makedirs(a.out, exist_ok=True); raw, pre = a.out + "/bed.raw.wav", a.out + "/bed_pre.wav"
sf.write(raw, (mix / np.abs(mix).max() * 0.6).astype("float32"), SR)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", f"highpass=f=38,lowpass=f=9000,loudnorm=I={C.get('loudness', -20)}:TP=-3:LRA=9", "-ar", "44100", "-ac", "1", pre], check=True); os.remove(raw)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-i", a.narration, "-filter_complex", "[0][1]sidechaincompress=threshold=0.02:ratio=4:attack=40:release=600:makeup=1[o]", "-map", "[o]", "-ar", "44100", "-ac", "1", a.out + "/bed.wav"], check=True); os.remove(pre)
print("bed.wav written")

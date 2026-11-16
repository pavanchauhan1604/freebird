#!/usr/bin/env python3
"""Sound design from cues, so every sound sits on a moment the animation itself reports (export the moments from the timeline, e.g. tl.__events, then list them here).

  sfx.py --cues cues.json --total 212.8 --out assets/voice
cues.json: [{"type": "tick", "t": 1.25, "hz": 1700}, {"type": "swish", "t": 2.1, "dur": 0.28}, {"type": "rise", "t": 4.2, "dur": 0.6},
            {"type": "glow", "t": 4.84, "gain": 1.0}, {"type": "knock", "t": 5.9, "hz": 92, "gain": 1.0}, {"type": "note", "t": 7.0, "hz": 659.26}]
file: a real recording (from sfx_search.py), {"type": "file", "t": 1.2, "path": "assets/sfx/soft-click.mp3", "start": 0, "end": 0.4, "gain_db": -14, "fade": 0.02}; real recordings come first, code-made sounds fill gaps.
tick: a light dry tick for a thing being read; swish: an airy sweep between lines; rise: a faint rising tone; glow: a warm swell that blooms and stays;
knock: a soft knock with a tick of metal; note: a soft glass note. No sustained noise anywhere: a hiss under the picture reads as cheap.
"""
import argparse, json, os, subprocess
import numpy as np, soundfile as sf

p = argparse.ArgumentParser(); p.add_argument("--cues", required=True); p.add_argument("--total", type=float, required=True); p.add_argument("--out", required=True)
a = p.parse_args(); cues = json.load(open(a.cues)); SR = 44100; N = int((a.total + 1) * SR); rng = np.random.default_rng(11)


def place(tr, sig, at, g=1.0):
    i = int(at * SR)
    if i < N: j = min(i + len(sig), N); tr[i:j] += sig[: j - i] * g


def env(n, at, rl):
    e = np.ones(n); na, nr = max(int(at * SR), 1), max(int(rl * SR), 1); e[:na] *= np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e


def filt(x, af, tmp):
    sf.write(tmp + "_a.wav", x.astype("float32"), SR); subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp + "_a.wav", "-af", af, "-ar", str(SR), tmp + "_b.wav"], check=True)
    y, _ = sf.read(tmp + "_b.wav"); os.remove(tmp + "_a.wav"); os.remove(tmp + "_b.wav"); return y[:N] if len(y) >= N else np.pad(y, (0, N - len(y)))


os.makedirs(a.out, exist_ok=True); tmp = a.out + "/_sfx"; tr = {k: np.zeros(N) for k in ("tick", "rise", "glow", "knock", "note", "file")}
for c in cues:
    ty, t0 = c["type"], c["t"]; g = c.get("gain", 1.0)
    if ty == "tick":
        n = int(0.05 * SR); tt = np.arange(n) / SR; place(tr["tick"], rng.standard_normal(n) * np.exp(-tt / 0.008) * 0.5 + np.sin(2 * np.pi * c.get("hz", 1700) * tt) * np.exp(-tt / 0.022) * 0.7, t0, 0.9 * g)
    elif ty == "swish":
        n = int(c.get("dur", 0.28) * SR); place(tr["tick"], rng.standard_normal(n) * np.sin(np.linspace(0, np.pi, n)) ** 3, t0, 0.1 * g)
    elif ty == "rise":
        d = c.get("dur", 0.6); n = int(d * SR); tt = np.arange(n) / SR; ph = 2 * np.pi * np.cumsum(330 + 370 * (tt / d) ** 1.6) / SR
        place(tr["rise"], (np.sin(ph) + 0.4 * np.sin(2 * ph)) * np.sin(np.linspace(0, np.pi, n)) ** 2 * (1 + 0.25 * np.sin(2 * np.pi * 7 * tt)), t0, 0.5 * g)
    elif ty == "glow":
        L = int(3.6 * SR); tt = np.arange(L) / SR
        for f, am, atk in [(220, 0.5, 0.10), (329.63, 0.4, 0.14), (440, 0.34, 0.18), (554.37, 0.2, 0.24), (880, 0.1, 0.30), (1318.5, 0.05, 0.40)]:
            place(tr["glow"], (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.003 * tt)) * np.minimum(tt / atk, 1) * np.exp(-tt / 1.7) * am, t0, g)
        n = int(1.1 * SR); place(tr["glow"], rng.standard_normal(n) * np.sin(np.linspace(0, np.pi, n)) ** 2, t0 + 0.05, 0.5 * g)          # a breath of air as the light opens
    elif ty == "knock":
        L = int(0.5 * SR); tt = np.arange(L) / SR; f0 = c.get("hz", 92)
        place(tr["knock"], np.sin(2 * np.pi * (f0 + 40 * np.exp(-tt * 25)) * tt) * np.exp(-tt / 0.07) * 0.9 + (np.sin(2 * np.pi * 1650 * tt) * 0.12 + np.sin(2 * np.pi * 2490 * tt) * 0.06) * np.exp(-tt / 0.16), t0, g)
    elif ty == "file":                                              # a real recording: decode, trim, level, fade, place (code never invents it)
        wav = tmp + "_f.wav"; cmd = ["ffmpeg", "-v", "error", "-y", "-i", c["path"], "-ac", "1", "-ar", str(SR)]
        if "start" in c: cmd += ["-ss", str(c["start"])]
        if "end" in c: cmd += ["-to", str(c["end"])]
        subprocess.run(cmd + [wav], check=True); y, _ = sf.read(wav); os.remove(wav); fd = int(c.get("fade", 0.02) * SR)
        if len(y) > 2 * fd and fd > 0: y[:fd] *= np.linspace(0, 1, fd); y[-fd:] *= np.linspace(1, 0, fd)
        place(tr["file"], y, t0, 10 ** (c.get("gain_db", -14) / 20))
    elif ty == "note":
        L = int(0.9 * SR); tt = np.arange(L) / SR; f = c.get("hz", 659.26)
        place(tr["note"], (np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(2 * np.pi * f * 2.76 * tt)) * np.minimum(tt / 0.006, 1) * np.exp(-tt / 0.22), t0, 0.5 * g)
mix = (filt(tr["tick"], "highpass=f=1500,lowpass=f=6500,equalizer=f=3000:t=q:w=1.4:g=3", tmp) * 0.06 + filt(tr["rise"], "lowpass=f=2400,aecho=0.8:0.8:50:0.15", tmp) * 0.05
       + filt(tr["glow"], "lowpass=f=5200,highpass=f=120,aecho=0.8:0.85:60:0.12", tmp) * 0.16 + filt(tr["knock"], "lowpass=f=4500,aecho=0.8:0.8:50:0.2", tmp) * 0.2
       + filt(tr["note"], "lowpass=f=6000,aecho=0.8:0.85:60:0.1", tmp) * 0.045 + tr["file"])
sf.write(a.out + "/sfx.wav", np.clip(mix, -0.95, 0.95).astype("float32"), SR); print("sfx.wav written, peak", round(20 * np.log10(max(np.abs(mix).max(), 1e-9)), 1), "dBFS")

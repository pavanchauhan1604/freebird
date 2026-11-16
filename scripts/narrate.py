#!/usr/bin/env python3
"""Narration as ONE continuous track.

  narrate.py clips --script script.json --out assets/voice        # synthesize each line, fitted to its window; writes voice.json (durations)
  narrate.py mix   --script script.json --timing timing.json --out assets/voice   # place the lines at their start times and master once

Why it is built this way (each point was a complaint that was fixed):
  * every line is synthesized in ONE pass, so the voice keeps its own phrasing inside the line (no clause-by-clause gluing, which sounded joined together);
  * the pace of a line is fitted to the window the picture gives it, within a natural range, so lines differ in rhythm without sounding rushed;
  * all lines are mixed on one timeline and mastered once, with NO reverb and a little warmth and presence, so the voice is dry and close, in the viewer's ear, not in a far room;
  * clips are cached by text and target, so a rerun only synthesizes what changed.
script.json: {"id": {"text": "...", "target": seconds}, ...}
"""
import argparse, hashlib, json, os, subprocess, sys
import numpy as np, soundfile as sf

SR = 24000
MASTER = ("highpass=f=80,equalizer=f=190:t=q:w=1:g=1.8,equalizer=f=3400:t=q:w=1:g=2.6,treble=g=2.2:f=7500,"
          "acompressor=threshold=-22dB:ratio=2.6:attack=12:release=160:makeup=3,loudnorm=I=-16:TP=-1.5:LRA=6")


def trim(a):
    nz = np.where(np.abs(a) > 0.012)[0]
    return a[max(nz[0] - int(0.02 * SR), 0): nz[-1] + int(0.05 * SR)] if len(nz) else a


def fade(a, ms=10):
    n = int(SR * ms / 1000); a = a.copy(); a[:n] *= np.linspace(0, 1, n); a[-n:] *= np.linspace(1, 0, n); return a


def clips(a):
    try:
        import misaki.espeak as me                                   # the espeak fallback is not needed for plain English and breaks on some machines
        class _No:
            def __init__(self, *x, **k): raise RuntimeError("espeak not used")
        me.EspeakFallback = _No
        from kokoro import KPipeline
    except ImportError: sys.exit("kokoro is not installed: scripts/setup.sh --voice")
    pipe = KPipeline(lang_code="a")
    script = json.load(open(a.script)); out = a.out; os.makedirs(out + "/_clips", exist_ok=True); dur = {}
    synth = lambda text, sp: np.concatenate([x for _, _, x in pipe(text, voice=a.voice, speed=sp)]).astype("float32")
    for lid, v in script.items():
        text, target = v["text"], float(v["target"]); key = hashlib.md5((a.voice + text + str(target)).encode()).hexdigest()[:10]; cf = f"{out}/_clips/{lid}-{key}.npy"
        if os.path.exists(cf): au = np.load(cf)
        else:
            sp = 0.95
            for _ in range(3):                                        # fit the pace to the window, within a natural range
                d = len(trim(synth(text, sp))) / SR; sp = float(np.clip(sp * d / target, 0.84, 1.06))
            au = fade(trim(synth(text, sp))); np.save(cf, au)
        dur[lid] = round(len(au) / SR, 3); print(lid, dur[lid], "target", target)
    json.dump(dur, open(out + "/voice.json", "w"), indent=1)


def mix(a):
    script = json.load(open(a.script)); T = json.load(open(a.timing)); out = a.out; total = T["total"]
    N = int((total + 1.5) * SR); track = np.zeros(N, dtype="float32")
    for lid, v in script.items():
        if lid not in T["voice"]: continue
        key = hashlib.md5((a.voice + v["text"] + str(float(v["target"]))).encode()).hexdigest()[:10]
        au = np.load(f"{out}/_clips/{lid}-{key}.npy"); i = int(T["voice"][lid] * SR); track[i:i + len(au)] += au[: N - i]
    sf.write(out + "/narration.raw.wav", track, SR)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", out + "/narration.raw.wav", "-af", MASTER, "-ar", "44100", "-ac", "1", out + "/narration.wav"], check=True)
    os.remove(out + "/narration.raw.wav"); print("narration.wav written,", round(total, 1), "s")


if __name__ == "__main__":
    p = argparse.ArgumentParser(); p.add_argument("cmd", choices=["clips", "mix"]); p.add_argument("--script", required=True); p.add_argument("--timing"); p.add_argument("--out", required=True); p.add_argument("--voice", default="af_heart")
    a = p.parse_args(); clips(a) if a.cmd == "clips" else mix(a)

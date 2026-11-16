#!/usr/bin/env python3
"""See the audio: one PNG with the waveform (with the narration's start times marked) over a log spectrogram, and the loudness numbers.
Needs only ffmpeg. Read the PNG with the image reader; quote the numbers. For events, sync to picture, tags and a launch-video scorecard use Earshot (references/audio-tools.md).

  see_audio.py assets/voice/narration.wav -o review/narration.png [--timing timing.json] [--width 1800]
Look for: a flat-topped waveform (clipping), long dead stretches, energy in the wrong place, a hiss line across the spectrogram, a voice with no energy above ~6 kHz (dull) or a harsh spike near 3-5 kHz.
"""
import argparse, json, re, subprocess

p = argparse.ArgumentParser(); p.add_argument("audio"); p.add_argument("-o", "--out", default="audio-sheet.png"); p.add_argument("--timing"); p.add_argument("--width", type=int, default=1800)
a = p.parse_args(); W = a.width
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.audio], capture_output=True, text=True).stdout)
marks = ""
if a.timing:
    for t in json.load(open(a.timing))["voice"].values(): marks += f",drawbox=x={int(t / dur * W)}:y=0:w=2:h=ih:color=0xE64980@0.8:t=fill"
fc = f"[0:a]showwavespic=s={W}x260:colors=0x3E7BFA|0x12A3B4{marks}[w];[0:a]showspectrumpic=s={W}x400:scale=log:legend=0[s];[w][s]vstack[o]"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.audio, "-filter_complex", fc, "-map", "[o]", "-frames:v", "1", a.out], check=True)
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", a.audio, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
g = lambda k: (re.findall(k + r":\s+(-?[\d.]+)", r) or ["?"])[-1]
print(f"{a.out}: {dur:.1f} s, integrated {g('I')} LUFS, loudness range {g('LRA')} LU, true peak {g('Peak')} dBFS")

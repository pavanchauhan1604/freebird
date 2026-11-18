#!/usr/bin/env python3
"""Make the evidence for studying a reference film: a cut list and a contact sheet.

  study_reference.py <video.mp4> <out-dir> [--tiles 6x6]

Writes <out-dir>/<stem>.cuts.txt (hard-cut times from ffmpeg's scene detector, threshold 0.2, with the film's length and cuts per minute)
and <out-dir>/<stem>.sheet.png (about 36 frames spread evenly over the film, 480 px wide, the interval printed in the first line of the cut list).
Read the PNG with the image reader; quote what you see, label it Seen, and label numbers Measured (see references/notion-grammar.md).
"""
import argparse, os, re, subprocess, sys
p = argparse.ArgumentParser(); p.add_argument("video"); p.add_argument("out"); p.add_argument("--tiles", default="6x6"); a = p.parse_args()
os.makedirs(a.out, exist_ok=True); stem = re.sub(r"[^\w.-]+", "_", os.path.splitext(os.path.basename(a.video))[0])[:90]
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.video], capture_output=True, text=True).stdout.strip() or 0)
cols, rows = (int(x) for x in a.tiles.split("x")); n = cols * rows; step = max(dur / n, 0.25)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.video, "-vf", f"fps=1/{step:.3f},scale=480:-2,tile={cols}x{rows}:padding=4:color=0x202020", "-frames:v", "1", f"{a.out}/{stem}.sheet.png"])
r = subprocess.run(["ffmpeg", "-i", a.video, "-vf", "select='gt(scene,0.2)',showinfo", "-an", "-f", "null", "-"], capture_output=True, text=True).stderr
cuts = [float(x) for x in re.findall(r"pts_time:([\d.]+)", r)]
open(f"{a.out}/{stem}.cuts.txt", "w").write(f"# {stem}: {dur:.1f} s, sheet interval {step:.2f} s, {len(cuts)} hard cuts ({len(cuts) / max(dur / 60, 0.01):.1f} per minute)\n" + "\n".join(f"{t:.2f}" for t in cuts) + "\n")
print(stem, f"{dur:.0f}s", len(cuts), "cuts")

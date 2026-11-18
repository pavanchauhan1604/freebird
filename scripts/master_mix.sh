#!/bin/bash
# One mastered mix from the three tracks: the bed widened to stereo with a little low end, the voice and effects centred, then loudness-normalised with a true-peak limiter.
#   master_mix.sh <voice-dir> [lufs]      reads narration.wav, bed.wav, sfx.wav; writes mix.wav   (default -14 LUFS integrated, -1.5 dBTP: the web range Earshot's critique scores against)
set -euo pipefail
D="$1"; I="${2:--14}"
ffmpeg -v error -y -i "$D/narration.wav" -i "$D/bed.wav" -i "$D/sfx.wav" -filter_complex \
"[0:a]aformat=channel_layouts=mono,pan=stereo|c0=c0|c1=c0[v];\
[1:a]aformat=channel_layouts=mono,pan=stereo|c0=c0|c1=c0,adelay=0|13,extrastereo=m=1.3,equalizer=f=48:t=q:w=0.9:g=7,bass=g=3:f=90[b];\
[2:a]aformat=channel_layouts=mono,pan=stereo|c0=c0|c1=c0[s];\
[v][b][s]amix=inputs=3:normalize=0:duration=longest,loudnorm=I=$I:TP=-1.5:LRA=7,alimiter=limit=0.84:level=disabled[o]" -map "[o]" -ar 48000 -c:a pcm_s16le "$D/mix.wav"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$D/mix.wav"

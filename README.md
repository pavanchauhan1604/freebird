# freebird

A Claude skill for making a **narrated, Notion-styled product launch film** from HTML with [HyperFrames](https://hyperframes.heygen.com): storyline, plain-language script, one-pass voiceover, scene patterns, real licensed sound effects, a music bed, closed captions, a review loop, and a max-quality 1080p60 export.

It encodes one author's taste (light paper ground, Manrope, one accent per stage, clean highlight-and-line marks, a dry close voice, honest claims) and the pipeline that made a 3.5-minute film for a real app. The worked example is in [`examples/lantern/`](examples/lantern/).

## Install (any machine)

```bash
git clone git@github.com:<you>/freebird.git ~/.claude/skills/freebird
~/.claude/skills/freebird/scripts/setup.sh --voice        # venv (~/.freebird-venv) with numpy, soundfile, kokoro
~/.claude/skills/freebird/scripts/install_companions.sh   # Earshot + real-sound skills; prints how to get Recordly
```

Needs `ffmpeg`, `node`, and the `hyperframes` skill/CLI (`npx hyperframes@0.9.34`). Nothing in the repo is machine-specific: paths are relative or come from `FREEBIRD_VENV` (default `~/.freebird-venv`) and `FREEBIRD_CACHE` (default `~/.cache/freebird`). To share it with another machine or person, they run the three lines above. Then ask Claude for a launch film ("make a Notion-style launch film for this app") and it follows `SKILL.md`.

## What is here

| | |
|---|---|
| `SKILL.md` | the skill: what good looks like, the ten-phase workflow, hard rules, commands, pitfalls |
| `references/taste.md` | the visual system: palette, type, marks, motion, content rules |
| `references/narration.md` | how to write and time the script |
| `references/voice.md` | **the voice we chose** (Kokoro `af_heart`, plain take) and why, with settings |
| `references/sound.md` | the bed and the sound design |
| `references/audio-tools.md` | **Openverse** real sound effects, **Earshot** (the agent's ears), **real-sound** (a soundtrack from licensed recordings), and `see_audio.py` |
| `references/screen-recording.md` | **Recordly** and a scripted fallback, for footage of the app working |
| `references/scenes.md` | every scene pattern, from the name animation to the closing |
| `references/pipeline.md` | project layout, the review loop, the creative director's pass, export, pitfalls |
| `references/brief.md` | defaults to take and facts to extract from the product |
| `references/feedback-log.md` | the prompting history, grouped, with the rule each item became |
| `scripts/` | `narrate.py`, `retime.py`, `score.py`, `sfx.py`, `sfx_search.py`, `see_audio.py`, `capture_screen.sh`, `build_index.py`, `make_captions.py`, `export.sh`, `check_report.py`, `setup.sh`, `install_companions.sh` |
| `templates/` | `lib/motion.js` (titles, marks, odometer, S-curves, pulse, follow-a-path), Manrope (SIL OFL) |
| `examples/lantern/` | compositions, script, layout, score, sound cues, timing and the SPEC of the example film |

## Companion tools (installed from upstream, never vendored)

| Tool | Why | License |
|---|---|---|
| [Openverse](https://api.openverse.org/v1/) | search real CC0 / public-domain / CC BY sound effects (`sfx_search.py` gates the licence and writes the credits) | per item |
| [Earshot](https://github.com/Leonxlnx/earshot) | lets the agent *see* and measure audio: `describe`, `rank`, `realness`, `timeline`, `sheet` (annotated PNG), `critique` | MIT |
| Earshot's `real-sound` skill | a ten-step soundtrack process built on real licensed recordings | MIT |
| [Recordly](https://github.com/webadderallorg/Recordly) | record the app working, with auto-zoom and cursor polish | AGPL-3.0 (run it; do not bundle it) |

## The pipeline in one screen

```
script.json ──narrate.py clips──▶ voice.json ──retime.py──▶ timing.json ──narrate.py mix──▶ narration.wav
                                                 │                                  │
                                                 ├──score.py (bed, ducked by voice)─┤
                                                 ├──sfx_search.py → sfx.py (real files first, code-made sounds second)
                                                 ├──see_audio.py / earshot sheet  (look at the audio, quote numbers)
                                                 └──build_index.py ──▶ index.html ──hyperframes check / snapshot / render
make_captions.py ──▶ .srt .vtt ──export.sh──▶ master (1080p60) + share copy, both with a switchable caption track, plus player.html
```

## What was and was not run

`retime.py`, `score.py`, `sfx.py` (including real-file cues), `sfx_search.py` (live Openverse search, download and credits), `see_audio.py`, `build_index.py` and `make_captions.py` were run end to end on the example data. **Not re-run after packaging:** `narrate.py` (needs Kokoro and its model download), `install_companions.sh` (clones and installs Earshot; models are ~1.1 GB), `capture_screen.sh` (needs a macOS Screen Recording permission only the user can grant), and Recordly itself.

The example's scene compositions reference the Lantern app's own assets (the lantern pieces, an app icon, a sample page); they show how each pattern is coded and do not run unchanged.

## License

MIT (see `LICENSE`), except the bundled font, which keeps its own license (SIL OFL 1.1, `templates/fonts/NOTICE-Manrope.txt`).

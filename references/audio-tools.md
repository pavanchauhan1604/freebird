# Audio tools: real sound effects, and seeing the audio

You cannot hear. Three things make that workable: **real recordings** from licensed sources, a **picture of the audio** you can read, and **numbers** you quote. Never say how audio sounds without one of the last two.

## 1. Real sound effects: Openverse (`scripts/sfx_search.py`)

Openverse is the open search engine for CC-licensed media; its audio index draws on Freesound, Jamendo and Wikimedia Commons. The script was run against the live API (anonymous, `Accept: application/json`):

```bash
PY=~/.freebird-venv/bin/python
$PY scripts/sfx_search.py search "soft click" --max-seconds 1.5 --limit 8     # lists id, licence, length, title, creator
$PY scripts/sfx_search.py get <id> --name soft-click                          # downloads to assets/sfx/, records the licence in assets/sfx/manifest.json
$PY scripts/sfx_search.py credits --out CREDITS.md                            # CC BY attribution lines for the video description
```

- **Licences:** allowed CC0, public domain (`pdm`), CC BY. Never NC, ND or SA; unreadable licence = blocked. The script refuses anything else. Confirm the licence on the item's own page (`landing` in the manifest) before shipping.
- **Quirks (verified):** `duration` is in **milliseconds**; `url` is a direct preview file (usually a Freesound HQ mp3); the `category=sound_effect` filter returns nothing for Freesound items (their category is empty), so filter by duration and query words; anonymous clients get at most 240 results per query (register for more); a query like "ui click", "soft tick", "whoosh short", "glass ping", "paper rustle" works better than abstract words.
- Place a chosen file with a `file` cue in `sfx-cues.json` (`{"type":"file","t":1.2,"path":"assets/sfx/soft-click.mp3","start":0,"end":0.4,"gain_db":-14}`) and rebuild with `sfx.py`. Code only trims, levels, fades and places; it never makes the recording.
- Credits: keep `CREDITS.md` with the film; put CC BY lines in the video description.
- HyperFrames' own `media-use` can also search Openverse; use this script when you want the manifest and the licence gate.

**Order of preference for any sound:** a real recording (Openverse) → a real recording fitted by Earshot's `sfx` bank (CC0-derived) → a sound built in code (`sfx.py` primitives) only for moments no recording fits (a warm swell for "the light comes on"). Say which you used.

## 2. Earshot: ears for the agent

[Earshot](https://github.com/Leonxlnx/earshot) (MIT, CPU-only CLI + Python API + MCP server) describes, matches, ranks and times sound, and ships two agent skills. Install from upstream (nothing is vendored): `scripts/install_companions.sh [--models]`, which clones it, links the skills `earshot` and `real-sound` into `~/.claude/skills/`, and installs the CLI with `uv` (`earshot doctor --fetch` downloads two models, ~1.1 GB, once). For repeated calls use the MCP server so models stay warm: `claude mcp add earshot --scope user -e EARSHOT_THREADS=3 -- earshot mcp` (set `MCP_TIMEOUT=60000` on a slow machine); each plain CLI call reloads the models (20–40 s).

Commands worth knowing (from its README and skill):

| Need | Command |
|---|---|
| Pick the best file for a sound | `earshot rank "soft ui tick" assets/sfx/ --top 5` |
| Find the best moment in a long file | `earshot find file.ogg "tick" --top 3` |
| What is this sound? | `earshot describe file.ogg [--start 1.12 --end 1.48]` |
| Real recording or synthetic? | `earshot realness file.ogg` (judges how it sounds, not where it came from) |
| Does it fit the brief? | `earshot match file.ogg "a keyboard tap" --alts "a click"` |
| Review a film's sound against the picture | `earshot timeline film.mp4 --cues cues.json`, then `earshot sheet film.mp4 -o sheet.png --cues cues.json` (**open the PNG**), then `earshot critique film.mp4` (launch-video scorecard with timestamped fixes) |
| Loudness without models | `earshot measure mix.wav [--music]` |
| A/B one change | `earshot ab a.ogg b.ogg --query "..."` |

**Trust rules (from Earshot's skill):** quote the number; z ≥ 3 strong match, 2.5–3 plausible, 2–2.5 weak, below 2 none; never use a trim marked "head cut" or "tail cut" as is; if realness is unavailable, say real-vs-synthetic was not checked; it cannot judge speech content, taste, licence, provenance or attribution; `earshot llm … --yes-upload` uploads audio to Google and needs your own key **and the user's explicit agreement**; never pass `--yes-upload` on your own.

## 3. real-sound: a soundtrack from real licensed recordings

When a film should have a fully real-recorded soundtrack (sound design, foley, ambience, music edit), follow Earshot's `real-sound` skill: cue list from the picture → a sound brief → source per category, each file measured and gated by realness → licence audit (allowed: CC0, public domain, CC BY 2.0–4.0, Mixkit, Pixabay; forbidden: NC, ND, SA, Sampling+, custom; unverified = blocked) → music edit at bar lines → design → mix on picture frames with a master gate (±0.5 LU, ≤ −1.5 dBTP) → QA and read-only critics → credits → mux. Code selects, trims, places, levels and masters; it never generates a sound. Audio assets are never committed or published (keep them out of the repo; `.gitignore` covers `assets/sfx/` binaries if you add them).

`score.py` (the synthetic bed) remains the default for music because real music with a clean licence is harder to find; replace it with a real track under `real-sound` when the film warrants it, and keep the same ducking.

## 4. Seeing the audio without Earshot: `scripts/see_audio.py`

Needs only ffmpeg. One PNG: the waveform with every narration start marked, over a log spectrogram, plus integrated loudness, loudness range and true peak.

```bash
$PY scripts/see_audio.py assets/voice/narration.wav -o review/narration.png --timing timing.json
```

Read the PNG. What to look for: a flat-topped waveform (clipping); dead stretches that are not intended; energy in the wrong scene; a horizontal hiss line across the spectrogram (noise floor); a voice with nothing above ~6 kHz (dull) or a spike near 3–5 kHz (harsh). Targets for this film style: narration −16 LUFS, programme −13 to −14 LUFS, true peak under −1 dBFS.

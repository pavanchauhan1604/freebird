---
name: freebird
description: "Freebird: make any narrated video in one author's taste, from HTML with HyperFrames: a product launch film, an explainer, a tutorial or walkthrough, a feature update, a concept film, a data story or a short. Covers the storyline spine for each type, the plain-language script, the chosen voice (Kokoro af_heart, one pass per line), scene mechanics (name animation, bridge, lifecycle rail, graphs, sweeps, odometers, marks, closing lockup), real licensed sound effects from Openverse, Earshot so the agent can see and measure audio, Recordly or scripted capture for footage of an app working, a music bed, closed captions, a creative-director review loop and a max-quality 1080p60 export. Use whenever a video is wanted in this taste: light paper ground, Manrope, one accent per section, clean marks, a dry close voice, honest claims. It builds on the hyperframes, media-use, GSAP, Earshot and real-sound skills (see references/dependencies.md)."
---

# Freebird

A way of making **any video** (launch film, explainer, tutorial, feature update, concept film, data story, short) in one calm, light, Notion-like taste, with a voice that sounds like a person and nothing the subject cannot back. Everything is HTML rendered by [HyperFrames](https://hyperframes.heygen.com); this skill adds the taste, the narration pipeline, the sound, the captions and the review loop on top of it. The taste and the pipeline are the same for every type; only the spine changes ([references/video-types.md](references/video-types.md)). The Lantern launch film in `examples/lantern/` is one worked example, not the only shape.

**Before anything else, load the `hyperframes` skill and the three animation skills** (`gsap-timeline`, `motion-design`, and Emil Kowalski's `choreograph`; see [references/dependencies.md](references/dependencies.md) for how each is used, and run `/review-animations` yourself or ask the user to at the end, since Claude cannot invoke it) (and its per-type note in `references/types/` for the kind of video being made; everything freebird builds on is listed in [references/dependencies.md](references/dependencies.md)) (the render contract: paused GSAP timelines registered under `window.__timelines`, no `Date.now`, no `repeat: -1`, transforms not layout properties, fonts as local files) and run `npx hyperframes@0.9.34 check` as you go. This skill never overrides that contract.

## What good looks like

- **Light, calm, precise.** Paper ground `#f6f6f3`, ink `#1d1d1f`, white cards with soft shadows, pastel fills. Manrope 800, tight tracking, titles that land word by word. Details in [references/taste.md](references/taste.md).
- **One accent per stage, amber only for the light.** The product's mark and its "light" (ember, glow) own amber; every stage and tool has its own colour so the film never goes bland.
- **Marks that vary and stay clean:** a highlighter swipe, a straight line drawn under a word, both together, a drawn outline. Never the same trick everywhere; no wobbly hand-drawn decoration (handwriting appears only where handwriting is the content).
- **Everything moves like one hand did it:** blur-in/out, 0.4 s overlaps, S-curve connections with a pulse of light, shared-element hand-offs. No hard cuts, no hopping, no sudden stops.
- **A voice that is dry, close, unhurried and different line to line**, one continuous track, no far-away reverb: **Kokoro `af_heart`, plain take** ([references/voice.md](references/voice.md)). Plain human vocabulary; explain, never name-drop. [references/narration.md](references/narration.md)
- **Real sound, and ears.** Sound effects are real CC0/CC BY recordings from Openverse; Claude cannot hear, so it *sees* audio (a waveform + spectrogram sheet, Earshot) and quotes numbers. [references/audio-tools.md](references/audio-tools.md)
- **Honest.** Show what the product does, not its panels. No real people, phone numbers or private data; a neutral sample document; arbitrary-looking placeholder numbers (11,341, not 11,000). Claim only what is shipped, and list anything that is not.

## Workflow

**Phase 0, bootstrap, every time:** run `scripts/doctor.sh`. If anything required is missing, run `scripts/install_all.sh` (voice, HyperFrames skills' check, Earshot, real-sound, GSAP, Emil Kowalski, LottieFiles) and run doctor again. Do not start a film with a missing dependency, and do not substitute one.

**One workflow, every dependency, in order.** Each phase has the tools it uses; load them at the start of the phase and say in the final report which were used.

| Phase | What happens | Loaded and used |
|---|---|---|
| 1 Brief | type, facts, claims | `hyperframes` (its type note), `media-use` (logos, real assets) |
| 2 Storyline | the spine, the one motion personality | `hyperframes` story/spec, `motion-design` (personality, signature easing, duration palette) |
| 3 Narration | script, voice, timing | Kokoro `af_heart` (`narrate.py`, `retime.py`), `fit_timing.py`, Earshot `describe` on the track |
| 4 Scenes | compositions from `motion.js` | `hyperframes` contract, `hyperframes-registry` (search before hand-building), `gsap-timeline`, `gsap-core`, `gsap-utils`, `gsap-plugins`, `gsap-performance`, `choreograph`, `animate`, `motion-design` |
| 5 Footage | the real app working, if needed | Recordly or `record_demo.sh`, `media-use` |
| 6 Sound | real effects, bed, ears, one mastered mix | Openverse (`sfx_search.py`), `sfx.py`, `score.py`, `master_mix.sh` (stereo bed, -14 LUFS, -1.5 dBTP limiter), Earshot (`measure`, `sheet`, `timeline`, `critique`), `real-sound`, `see_audio.py` |
| 7 Review (twice) | check, snapshots, the creative director | `hyperframes` `check` and `snapshot`, `motion-design` checklist, `emil-design-eng`, `animation-vocabulary` (to name a defect exactly), Earshot `critique` |
| 8 Captions | switchable track and sidecars | `make_captions.py` |
| 9 Export | 1080p60 master, share copy, player | `hyperframes render`, `export.sh` |
| 10 Report | what was and was not verified | ask the user to run `/review-animations` (Claude cannot) and act on it |


Do every phase, in order, end to end. Do not stop to ask between phases unless a fact about the product is missing; take the defaults in [references/brief.md](references/brief.md) and say what you assumed.

1. **Brief and facts.** Choose the video type ([references/video-types.md](references/video-types.md)) and get the real facts from the source (repo, docs, paper, data), not from memory. Write down: the steps or ideas, the one-line takeaway or tagline, what is *not* true or *not* shipped (flag it at the end), which numbers are placeholders. Create `SPEC.md`: structure with seconds, the narration table, the accent system, open claims.
2. **Storyline.** Take the spine of the chosen type. For a launch film: hook (the name animation, then the tagline, spoken once) → **context bridge** (what kind of product this is and everything it covers) → **the lifecycle** (one scene per stage, a top rail that follows it) → anything beside it (a separate act, never on the rail) → **a closing that does not repeat the opening**. An explainer opens on the question, a tutorial on the end result. Patterns and mechanics: [references/scenes.md](references/scenes.md).
3. **Narration.** Write `script.json` (id → text, target seconds). `narrate.py clips`, then `retime.py` (the picture follows the voice), then `narrate.py mix`. Check where phrases really land with `silencedetect` and tighten the visuals to those times.
4. **Scenes.** One composition per stage under `compositions/`, built from `templates/lib/motion.js` (titles, marks, odometers, S-curves, pulses, follow-a-path). Numbers are pure functions of time (a `paint()` driven by one linear tween), never callbacks, because renders seek.
5. **Footage (only where it matters).** If the film needs the real app running, plan a shot list and record with **Recordly** (or `capture_screen.sh`), test data only. [references/screen-recording.md](references/screen-recording.md)
6. **Sound.** Real effects first (`sfx_search.py`, then `file` cues in `sfx.py`), code-made sounds only where no recording fits, `score.py` for the bed (the voice ducks it); then **look at it**: `see_audio.py`, and Earshot for events, sync and a launch-video critique. [references/sound.md](references/sound.md), [references/audio-tools.md](references/audio-tools.md)
7. **Check, look, critique, repeat.** `check` (read the *saved* report, `scripts/check_report.py`), then `snapshot --at` at the moments that matter (every transition, every number, every long line), read the frames, and do **the creative-director pass**: [references/pipeline.md](references/pipeline.md#the-creative-directors-pass). Fix what you see; do not trust a green check. Run the creative-director pass twice (see the hard rules). Run `motion-design`'s checklist (personality, three motion layers, directional easing, the 1/3 rules) over every scene as part of this pass, and say in the report which animation skills were used.
8. **Captions.** `make_captions.py` writes `.srt` and `.vtt`; they ship as a switchable track and sidecar files, never burned in.
9. **Export.** `export.sh`: master 1080p60 (`--quality delivery --fps 60`), a smaller share copy, both with embedded captions, sidecar files and a browser player.
10. **Report.** Say what was verified (frames, audio sheet and loudness, check) and what was not (audio by ear, motion watched, the native app). Name every claim that is not shipped. Commit only when asked.

## Hard rules

- Never put a claim in the film the product cannot back; list unshipped capabilities at the end.
- Never show sensitive information. Use a neutral sample page and generic names.
- Never repeat a line: the closing must not echo the opening, and nothing is said twice with the same words. A tagline is spoken once; on screen is enough after that.
- Never leave a line that sounds like a template ("let's turn the lights on", "supercharge", "seamless"). Official, specific, plain.
- Never hard-code a schedule ("weekly"); say "scheduled runs", "periodic".
- Never let text leave the canvas or touch a neighbour: check overflow and overlaps in frames, at the exact second the viewer reported.
- Never add a reverb to the voice, a hiss under the picture, or a loop that is not a function of time.
- Never say how audio sounds without a reading (an audio sheet, a loudness number, an Earshot score); never use a sound effect whose licence is not CC0, public domain or CC BY, and keep `CREDITS.md`.
- **Always review every phase and section as the creative director.** The creative director is a standing role that holds this skill's taste ([references/taste.md](references/taste.md)): after the storyline, the script, each scene, the sound, the captions and the export, look at the work as that person would and write the defects before fixing them. A film is not finished until the full creative-director pass ([references/pipeline.md](references/pipeline.md#the-creative-directors-pass)) has been run **twice**, the second time on the fixed result, covering all scenes and the audio sheet.
- Never record anything that is not the user's own app on test data; no real people, accounts or credentials in footage.
- Never leave the same accent colour on everything; amber is for the light.
- When the user reports a defect at a timestamp, reproduce it with `snapshot --at <t>` before fixing, then re-render and re-attach captions.
- Do not commit, push or add attribution unless asked (and follow the repo's own attribution rule).

## Commands

```bash
scripts/setup.sh --voice                               # venv with numpy, soundfile, kokoro (voice optional)
scripts/install_companions.sh [--models]               # Earshot + real-sound skills (MIT), prints Recordly install; nothing is vendored
PY=~/.freebird-venv/bin/python
$PY scripts/narrate.py clips --script script.json --out assets/voice      # lines fitted to their windows; writes voice.json
$PY scripts/retime.py --layout layout.json --durations assets/voice/voice.json --out timing.json
python3 scripts/fit_timing.py --scenes scenes.json --timing timing.json --durations assets/voice/voice.json   # writes each scene's line times (/*TIMING*/ block) from the voice
$PY scripts/narrate.py mix --script script.json --timing timing.json --out assets/voice
$PY scripts/score.py --timing timing.json --config score.json --narration assets/voice/narration.wav --out assets/voice
$PY scripts/sfx_search.py search "soft click" --max-seconds 1.5     # real CC0/CC BY effects from Openverse
$PY scripts/sfx_search.py get <id> --name soft-click && $PY scripts/sfx_search.py credits
$PY scripts/sfx.py --cues sfx-cues.json --total <seconds> --out assets/voice      # cues: real files first, code-made primitives second
$PY scripts/see_audio.py assets/voice/narration.wav -o review/narration.png --timing timing.json   # then read the PNG
python3 scripts/build_index.py --scenes scenes.json --timing timing.json
npx hyperframes@0.9.34 check --json > /dev/null; python3 scripts/check_report.py .
npx hyperframes@0.9.34 snapshot --at 31.3,62.0,150.3          # then read the contact sheet
$PY scripts/make_captions.py --script script.json --timing timing.json --durations assets/voice/voice.json --narration assets/voice/narration.wav --out ../final/film.en
scripts/export.sh . film ../final/film.en
```

A worked example (the Lantern launch film: ten scenes, five-stage lifecycle, tool tour, cycle, closing) is in [examples/lantern/](examples/lantern/): compositions, `script.json`, `layout.json`, `score.json`, `sfx-cues.json`, `timing.json`, and the `SPEC.md` it was built from. Read the compositions for how each pattern is coded.

## Known pitfalls (HyperFrames)

Details and fixes in [references/pipeline.md](references/pipeline.md#pitfalls). The ones that cost the most time: tweening `left/top/fontSize` is a lint error (use transforms); a CSS `scaleX(0)` is a singular matrix (set transforms through GSAP); `fromTo` with a non-zero `from` opacity shows at t = 0 (use `set` at the time, then `to`); callbacks and `className` sets do not fire when a renderer seeks (derive text and state in a `paint()` of time); `check --json` stdout can be truncated (read the saved report); the type floor is 28 px; a hidden browser pane stops animation frames while you preview.

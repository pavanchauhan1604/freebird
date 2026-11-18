# What freebird is built on

Freebird adds a taste, a narration pipeline, a sound workflow and a review loop on top of other people's tools. None of them is copied into this repo; each is installed from its own source and keeps its own licence. This file is the list.

| Layer | What | Where it comes from | Installed by |
|---|---|---|---|
| **Render engine and its skills** | HyperFrames: HTML to video; the `hyperframes` skill (render contract, work loop, per-type notes), `hyperframes-cli`, `hyperframes-registry` (about 450 ready-made blocks), `media-use` (music, sfx, images, voice, grades) | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes), as a Claude plugin or `npx skills add heygen-com/hyperframes` | `scripts/install_companions.sh` (checks first, prints the command if missing) |
| **Voice** | Kokoro-82M, voice `af_heart` | PyPI `kokoro`, model weights from Hugging Face on first run | `scripts/setup.sh --voice` |
| **Real sound effects** | Openverse API (CC0 / public domain / CC BY) | `https://api.openverse.org/v1/`, no key needed for light use | `scripts/sfx_search.py` calls it |
| **Audio eyes** | Earshot (`describe`, `rank`, `timeline`, `sheet`, `critique`) and its `real-sound` skill | [Leonxlnx/earshot](https://github.com/Leonxlnx/earshot) (MIT) | `scripts/install_companions.sh` |
| **Screen footage** | Recordly (auto-zoom recorder) or the scripted fallback in `scripts/` | [webadderallorg/Recordly](https://github.com/webadderallorg/Recordly) (AGPL-3.0, run it, never bundle it) | by hand; see [screen-recording.md](screen-recording.md) |
| **Plumbing** | `ffmpeg`, `node`, Python 3 | your package manager | by hand |

## Animation skills (default dependencies)

HyperFrames is the engine; these three are **always used**, on every video. `scripts/install_companions.sh` installs them (skip with `--no-animation-skills`). How they are used:

- **Before writing a scene:** load `gsap-timeline` and `gsap-core` (position parameter, labels, defaults, no `delay` chains) and `motion-design` (pick one motion personality for the film, signature easing, duration palette, entrance pattern).
- **While writing:** `choreograph` and `animate` (Emil Kowalski) for any scene with several things moving.
- **In every creative-director pass:** run `motion-design`'s 8-step checklist and quality rules (three motion layers, directional easing, enter longer than exit, the 1/3 rules) over every scene and write the defects.
- **`review-animations` and `improve-animations` cannot be started by Claude** (they are reserved for the user). At the end of a film, tell the user to run `/review-animations` over the compositions and then act on what it reports.
- A scene that never used them is not reviewed. Say in the report which of the three were actually loaded and used.

| Skill | Source, licence | Why freebird wants it | Caution |
|---|---|---|---|
| GSAP (core, timeline, plugins, utils, performance ...) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills), official, MIT; `npx skills add https://github.com/greensock/gsap-skills` | every scene is a GSAP timeline | skip `gsap-scrolltrigger` and `gsap-react` for video |
| Emil Kowalski's animation skills (`emil-design-eng`, `review-animations`, `improve-animations`, `animation-vocabulary`, `choreograph`) | [emilkowalski/skills](https://github.com/emilkowalski/skills), one designer, MIT, 57.9k stars; `npx skills@latest add emilkowalski/skills` | a refinement checklist for the creative-director pass: easing, timing, choreography | written for UI; take the principles, not the web specifics |
| LottieFiles motion-design-skill | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill), official, MIT, 3.3k stars; `npx skills add LottieFiles/motion-design-skill` | motion principles (timing, easing, choreography); implementation-agnostic | principles only; it does not author Lottie JSON |

## How the HyperFrames skills relate to freebird

- **HyperFrames owns the contract**: paused GSAP timelines registered under `window.__timelines`, `class="clip"` with `data-start`/`data-duration`, no `Date.now`, no unseeded random, no `repeat: -1`, fonts as local files, `check`/`snapshot`/`render`. Freebird never overrides it; when this skill and `hyperframes` disagree about the render contract, `hyperframes` wins.
- **Freebird owns the taste and the process**: the visual system, the voice choice and its fitting, the sound design, captions, the creative-director pass, the export recipe and the honest report.
- **`media-use`** is for media freebird does not make itself: a music track from the catalogue, generated images, logos. Freebird's own `score.py`, `sfx.py` and `sfx_search.py` cover the bed and real effects; reach for `media-use` when you need something else.
- **`hyperframes-registry`**: before hand-building a named effect (glitch, film grain, a chart), search it; restyle what you add to freebird's palette and motion.
- **Per-type notes**: `hyperframes/references/types/*.md` (launch, explainer, music, data, vertical, 3d, character). Read the one matching the video; see [video-types.md](video-types.md).
- **Plugin vs standalone**: if HyperFrames is installed as a plugin, call it as the plugin says (its launcher script replaces `npx hyperframes`, and the plugin manager updates it, not you). If standalone, `npx hyperframes@<pinned version> ...`. Freebird's commands show `npx hyperframes@0.9.34`; substitute whichever applies.
- **Updating** HyperFrames skills is the person's step; relay "skills out of date" notices, do not update them yourself.

## Checking it on a new machine

```bash
scripts/install_companions.sh          # reports which of the above are present, installs Earshot, prints the rest
npx hyperframes@0.9.34 --version
~/.freebird-venv/bin/python -c "import kokoro, soundfile, numpy; print('voice ok')"
ffmpeg -version | head -1
```

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

# The voice we chose, and why

**Kokoro-82M, voice `af_heart`, the plain (not excited) take, speed fitted per line in 0.84–1.06.**

## How it was chosen

The author asked for "an inviting lady voice" from the best open-source model. Two engines were compared on the same two film lines (an intro and a discover line), each in two or three styles:

| Candidate | Result |
|---|---|
| **Kokoro** (82M parameters, CPU/MPS, `af_heart`, `af_bella`, others) | **Chosen: `af_heart`, plain take.** Natural, warm, fast to render, deterministic, easy to fit to a time window, no watermark, no heavy setup. |
| Chatterbox (Resemble AI, "calm" and "warm" variants) | Auditioned and not chosen. More expressive, but slower and heavier; it embeds an audio watermark (PerTh) and needed an environment fix (`pip install "setuptools<81"` for `pkg_resources`) to run. |

The **excited** take was tried and set aside: "plain version more". Later feedback shaped how it is used (see `narration.md`): one synthesis per line, no reverb, dry and close, a different pace per line.

## Settings and gotchas

- `KPipeline(lang_code="a")`, `voice="af_heart"`; the **espeak fallback is disabled** (`misaki.espeak.EspeakFallback` replaced) because its data path crashes on some machines and plain English does not need it.
- Speed is searched per line (three passes) so each line fits the window the picture gives it; clips are cached by voice, text and target.
- Master: highpass 80 Hz, +1.8 dB at 190 Hz, +2.6 dB at 3.4 kHz, +2.2 dB treble, compressor 2.6:1, `loudnorm` −16 LUFS, **no reverb**.
- A different voice is one flag: `narrate.py ... --voice af_bella` (cache keys include the voice name). Re-audition by rendering the same two lines in each candidate and comparing with `see_audio.py` and by ear.
- If the voice must change engine (for example to a cloned voice), keep the rest of the pipeline: lines as clips of known duration → `retime.py` → one mix.

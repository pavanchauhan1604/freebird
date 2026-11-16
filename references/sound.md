# Sound: the bed and the sound design

**Real recordings first.** Sound effects come from licensed recordings (Openverse, CC0 / public domain / CC BY; see [audio-tools.md](audio-tools.md)) placed with `file` cues; the code-made primitives below are for moments no recording fits (a warm swell for the light coming on). After every change, *look* at the audio (`see_audio.py`, Earshot) and quote numbers.

Three tracks, each spanning the whole film, mixed by the renderer: `narration.wav` (−16 LUFS), `bed.wav` (ducked by the voice), `sfx.wav`. Final programme about −13 to −14 LUFS with peaks under −1 dBFS.

## The bed (`scripts/score.py`)

A launch bed, not a jingle. [Glass-note "bells" and then a noisy drone were both rejected as gimmicky and as "white noise"; the version that stayed is below.]

- A **warm pad** (detuned saw partials, low-passed by a filter that opens and closes over ~20 s) and a **soft sub**, on **one chord per scene** so music changes with the picture (C → Am → F → G → Am → F → G → F → C in the example).
- **No beat in the intro.** The pulse (a soft kick at 92 bpm, the sub and pad breathing with it) and **muted plucks** (harmonics that die faster as they rise) come in under the line that brings everything together and are full through the lifecycle.
- A **swell when the light comes on** in the intro and a **low boom plus a rising run of glass notes at the closing lockup**; the pulse drops out for the close.
- The **voice ducks the bed** (`sidechaincompress`, ratio 4), so music rises in silences.
- No noise floor, no sparkle, nothing sustained that sounds like hiss.

## Sound design (`scripts/sfx.py`)

Cues are listed from the animation's own events (export them: e.g. `tl.__events = { reads, rise, lit, cap, name }` from the timeline code, read once with headless Chrome), so every sound is on a moment the picture reports.

- **tick**: a light dry tick for each word an ember reads, pitch climbing along the line; **swish**: a faint airy sweep between lines. [A sustained scribbling noise was called "white noise" and replaced by ticks.]
- **rise**: a faint rising tone as the ember crosses the page.
- **glow**: a warm chord swell that blooms and stays, with a breath of air, when the light comes on; reused (quieter) at the closing lockup.
- **knock**: a soft knock with a tick of metal when a part lands (the lantern's cap and base).
- **note**: a soft glass note per letter as the name is lit, climbing a pentatonic scale.
- Levels: ticks about −24 dBFS peak, glow about −18, everything else under the glow. Never add a reverb to the voice to "blend" it; blend with the bed.

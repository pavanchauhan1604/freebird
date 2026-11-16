# Narration: the script and the voice

## The voice

- **Kokoro, voice `af_heart`** (open source, warm and inviting), plain take, not the excited one; the choice and the comparison with Chatterbox are in [voice.md](voice.md). Install with `scripts/setup.sh --voice`.
- **One continuous synthesis per line** (the voice keeps its own phrasing inside it). Clause-by-clause synthesis with fixed pauses sounded "like many pieces joined together"; per-clip loudness and a reverb tail cut at each clip's end made it worse.
- **Fit pace to the window** (`narrate.py clips`): each line has a target duration from the picture; pace is searched in 0.84–1.06 so lines differ in rhythm without rushing. Openers and closers are slower; lists are punctuated as separate beats ("Documents. Slides. Course materials, even handwritten ones.").
- **Mix on one timeline, master once** (`narrate.py mix`): highpass 80 Hz, +1.8 dB at 190 Hz, +2.6 dB at 3.4 kHz, +2.2 dB treble, a gentle compressor, `loudnorm` to −16 LUFS. **No reverb or echo of any kind.** [An echo made the voice sound like it came from a far-away speaker, outside the video.]
- Tune pronunciation with punctuation, not markup. A comma inside a proper noun ("Introducing, Lantern.") forces a beat; the caption override (`"caption"` in `script.json`) removes it from the text on screen.

## Writing the lines

Voice-over is for a viewer who has never seen the product.

1. **Open with the name, then the tagline, once.** "Introducing Lantern." / "Accessibility, end to end." Do not narrate a gimmick ("let's turn the lights on"); official, specific, not boilerplate.
2. **Give context before the walkthrough.** One breath: what kind of product this is and everything it covers (documents, slides, course materials, handwritten ones, audio and video that need transcripts), then "in one place … end to end", then "let's start with the lifecycle".
3. **One line per stage opener, then the explanation.** "First, discovery." / "Then, scanning." / "Now comes the fixing." / "Then, reporting."
4. **Human vocabulary.** "It opens each site, follows every link, and gathers the files it finds." Name the technology once, in plain words ("a vision model, fine-tuned for exactly this, to read each page the way a person would"; "a speech-to-text model, to write the words from the file's own audio, along with their timestamps").
5. **Say what it produces, in the viewer's terms:** counts, links, findings ("tables with no header, images with no alt text, tagging that's missing"), who it helps ("so each site owner knows exactly what to fix").
6. **Describe cycles generally:** "scheduled runs", "runs again, on a schedule", never "weekly".
7. **Close with something to remember that does not repeat the opening.** "Every document has something to say. Lantern makes sure it reaches everyone." The product name is not repeated after it; the logo lands in silence with the light sound, and the tagline is on screen.
8. **Never say the same thing twice.** If the tagline was spoken in the intro, it is not spoken again.
9. **Keep claims inside what ships.** If a capability is on the roadmap, show it as "the platform keeps growing"; list it as unshipped in your report.
10. Lengths: lines of 1–2 s for openers, 4–7 s for explanations, up to ~9 s for a list of findings. Leave 0.4–0.6 s between lines and 2 s of silence only where a big visual lands.

## Timing the picture to the voice

`retime.py` places every line after the previous one plus its pause and starts each scene 0.4 s before the last ends; the picture follows the voice. After mixing, find where phrases really land:

```bash
ffmpeg -i assets/voice/narration.wav -af silencedetect=noise=-38dB:d=0.1 -f null - 2>&1 | grep silence
```

Segments are phrases. Put the visual beat for each phrase at its start (a card at the word that names it, a number rolling while the number is spoken, a chip when its type is named). Re-time in the compositions, not the audio. A rewritten line changes every later start: rerun `retime.py`, `narrate.py mix`, `score.py`, `sfx.py`, `build_index.py`, and shift the scene-internal beats if its length changed.

## Captions

`make_captions.py` derives cues from the same segments: one cue per phrase group (≤ ~42 characters per line, two lines), never overlapping, minimum 1.1 s. They ship as a switchable track (`mov_text` in MP4) and as `.srt`/`.vtt`.

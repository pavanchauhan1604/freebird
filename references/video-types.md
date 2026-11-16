# Video types: one taste, any video

Freebird is a taste and a pipeline, not a launch-film template. The look (paper, Manrope, one accent per section, clean marks, S-curve motion), the voice (Kokoro `af_heart`, plain, dry), the sound (real effects, a quiet bed), captions, the review loop and the export are the same for every video. What changes is the **spine**: the order things appear in and what the closing does. Pick the type, take its spine, keep everything else.

| Type | Spine | Length | Narration | Closing |
|---|---|---|---|---|
| **Launch / product film** | name animation, tagline once, context bridge, lifecycle (one scene per stage, rail on top), side act, closing | 2.5-4 min | one plain line per beat, no jargon | night lockup, silent, never an echo of the opening |
| **Explainer** (how X works) | the question, the everyday picture, the mechanism one step at a time (each step one scene), the part that surprises, the answer in one line | 1.5-4 min | teach, do not sell; define a word the first time it appears | the one sentence to remember, then quiet |
| **Tutorial / walkthrough** | what you will have at the end, prerequisites in one beat, steps in the order you do them (footage of the real thing, cursor visible), the result | as long as the steps | imperative, second person, one action per line | the finished result, then where to go next |
| **Feature / update** | the problem it removes, the feature working (real footage), what changed for the person, what is not included yet | 30-90 s | short, concrete, one number | one line on what is next, honest |
| **Concept / idea film** | a claim, three or four pictures that earn it, a turn, the claim restated in new words | 1-2.5 min | spare; let pictures carry it | no tagline, no call to action |
| **Data story** | the number that matters, how it was measured, the change over time (a drawn curve, an odometer), what it means | 1-2 min | every figure said once, units spelt out | the number again, in context |
| **Short / vertical** | one idea, a hook in the first second, three beats, a loop point | 15-45 s | one sentence per beat | cut on the idea |

## What every type keeps

- **Facts first.** Take them from the source (repo, docs, paper, data), never memory. List what you could not verify. Numbers that are placeholders are labelled as such.
- **One idea per scene**, each with its own accent; amber (or the subject's one colour) is reserved for the thing everything is about.
- **The picture follows the voice** (`narrate.py` then `retime.py`), and nothing is said twice in the same words.
- **Honest claims**, no real people or private data, neutral sample content.
- **Real sound and real footage where it matters**, drawn pictures where nothing real exists.
- **Captions always**, switchable, sidecar files.
- **Look before you ship**: frames, audio sheet, check report, then the report of what was and was not verified.

## What changes by type

- **Opening.** Launch films open on the name animation. Explainers open on the question. Tutorials open on the end result. Do not force a name animation onto a video that has no product.
- **The rail.** A lifecycle rail belongs to a launch film (stages of a product). An explainer may use a quieter step counter; a tutorial uses numbered steps; a concept film uses none.
- **Scene patterns.** [scenes.md](scenes.md) lists patterns built for a product (discovery graph, scan sweep, reports, export). For other types reuse the *mechanics* (S-curve connections with a pulse, odometers, highlighter and underline marks, shared-element hand-offs, follow-a-path, blur-in/out overlaps) in new scenes; the helpers in `templates/lib/motion.js` do not care what the scene is about.
- **Footage.** Tutorials and feature videos lean on real recordings ([screen-recording.md](screen-recording.md)); concept films lean on drawn motion.
- **Tone of the voice line.** Same voice, same dryness. Explainers explain; tutorials instruct; concept films state. Never "supercharge", "seamless" or any template phrase, for any type.

## When the type is unclear

Ask one question only if the answer changes the spine ("is this a launch or a how-it-works?"). Otherwise choose the nearest type, say which you chose and why in the first message, and go.

## Going further than the table

HyperFrames ships its own notes per type (`launch`, `explainer`, `music`, `data`, `vertical`, `3d`, `character`) in its skill's `references/types/`; read the matching one for structure and pitfalls specific to that kind of video, then apply this skill's taste on top. See [dependencies.md](dependencies.md).

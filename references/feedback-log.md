# Feedback log: how this taste was formed

The author's prompts while the example film was made, grouped, with the rule each one became. When a new situation is not covered by a rule above, reason from these.

## Substance

| The author said | The rule |
|---|---|
| "I don't think we need to show the app panels but rather what they do" | Show results and mechanisms, never settings screens. |
| Hide phone numbers and similar; "keep a general page" | A neutral sample document; generic names; nothing identifying. |
| Numbers like 11,000 "should be arbitrary, something like 11,341"; total files 50–60 thousand, unique files higher than the needing-remediation count | Placeholders look measured and are consistent across scenes; model the funnel properly (found → unique → needing remediation). |
| "We check the internal fingerprint of all files to track changes and find unique files" | Explain the real mechanism of de-duplication and change tracking on screen. |
| "I forgot about this phase": reports per site with history, links, needs-remediation, broken links, findings per file; a master report; remediation works from it | Ask of every product: where are results reported and shared? Add the phase between the stages, in detail, with the same style. |
| The cycle "keeps happening periodically so all new uploads are traced, checked and remediated, a truly unified workflow" | Close the lifecycle into a loop; show new inputs carried through every stage. |
| Replace the original with the remediated file, "visually identical with a complete accessibility layer on top" | Show the replacement as a physical hand-off, then prove "looks the same", then show what was added. |
| Workbench is "an addition, not in the lifecycle", handling many document types "while explaining them" | A separate act with its own tools, introduced after the lifecycle, each explained. |
| Captions / transcripts "use a speech-to-text model … from the file's own audio along with timestamps" | Describe the real mechanism in one plain sentence and show it once for all the tools that share it. Do not claim speaker labels you cannot back. |
| Keep handwriting and audio/video transcription even though they are not shipped | Keep what the author wants, but flag unshipped claims in the final report. |
| "Remove the 'a person checks' part" | Cut beats the author does not want in the story, completely. |

## Narration

| The author said | The rule |
|---|---|
| "A good inviting lady voice"; use the best open-source model; "plain version more" | Kokoro `af_heart`, plain take. |
| Opening "Introducing Lantern"; then context before the walkthrough: enterprise platform, documents, slides, course materials (handwritten too), audio/video transcripts, "end to end" | Name → context bridge → lifecycle. |
| Explain the model: "a vision model fine-tuned to read like a human would" | One plain sentence naming the technology and what it does. |
| "The last narration just repeats the starting line; make it punchy, something to remember" | Close with a new line; never echo the opening. |
| "After 'Lantern makes sure it reaches everyone' we don't need to say Lantern again" | No echo of the name after the closing line; let the logo land silently. |
| "Too same rhythm and robot-like" | Fit pace per line; vary line length and punctuation; slower openers and closers. |
| "Feels like many pieces joined together" | One pass per line; one timeline; master once. |
| "Plays like on a far-away speaker" | No reverb; dry, close, warm, present. |
| "'Let's turn the lights on' sounds gimmicky; official but not overused boilerplate" | Specific, plain, official wording; "Accessibility, end to end." |
| "Don't say weekly; say periodic or scheduled runs" | Describe schedules generally. |
| Prefers a tagline of the form "Accessibility, end to end" over the earlier "Nothing left in the dark" | Prefer descriptive, official taglines to poetic ones; replace the old tagline everywhere it appears (film, app, docs). |

## Look and motion

| The author said | The rule |
|---|---|
| Studied five Notion launch films; "Notion animation style, smooth, fluid, refined, no hard cuts" | Soft grounds, blur transitions, overlaps, shared elements. |
| "Only the icon animation is approved; the text after it and the intro in general need refinement" | Approve piece by piece; keep approved pieces stable; refine the rest to the same bar. |
| "The line flow in the scan module looks weird and not refined" | Replace hopping and trace curves with one steady sweep and smooth S-curves. |
| "The campus part is too fast; transition from the single site to all sites and build up the inventory" | Slow down the big idea; hand the single object off into the whole (shared element). |
| "You used the same yellow highlight everywhere; bland after a while" | One accent per stage; amber only for the light. |
| "Don't use the same handwritten-draw trick here and there; I like highlights plus lines drawn, improve that" | Vary clean marks; no wobbly hand-drawn decoration. |
| The accessibility layer "merges/interferes with the top lifecycle bar" | Reserve the rail zone; never animate content into it. |
| "The alt text box overlaps the file name" | Fixed name columns, short generic names, chips sized to the column. |
| "One of the texts goes out of the canvas" (at 3:10); "that arrow in the center is off" | Reproduce at the timestamp, fix at the cause (widths; rotate about the true centre; leave before the next title), re-render. |
| "The lantern logo merges with the graphics at the end" | Keep the lockup in clear space; exclude tiles from its band. |
| "The intro's starting frames, where the dot moves through lines, need serious refinement" | Add a curved entrance, a trail, word-by-word amber lighting, a drifting camera, and a ring of light. |

## Sound

| The author said | The rule |
|---|---|
| "The intro animation needs sound effects: a scribbling sound as the dot reads, a glowing sound when the lantern lights" | Sound design on the animation's own events. |
| "The white noise isn't refined" → "the background jingle isn't giving an app-launch vibe" | No noise, no jingle; a warm pad, sub, soft pulse and plucks, scene chords, a boom at the lockup. |

## Process

| The author said | The rule |
|---|---|
| "Complete all phases", "you didn't follow the earlier instruction to improve all phases" | Do every phase; do not leave earlier scenes behind when adding new ones. |
| "Think from a creative director's perspective, review all phases and improve them yourself" | Run the review pass on real frames and fix what you find, without being asked each time. |
| "Max quality export" | 1080p 60 fps `delivery`, plus a share copy. |
| "Update the launch video with captions we can turn on or off from the players" | Switchable embedded track, sidecar files, player. |
| "Rebuild the app and check the launch screen" | When a change touches the app, rebuild and look at it; say what could not be seen (permission prompts). |
| "Commit and push" (only when said) | Commit and push on request only; the repo's own rules for attribution win; generated files and large unrelated folders stay out. |
| Short, outcome-first messages | Lead with the result; list what was and was not verified; no narration of effort. |

## Tools and sharing (later requests)

| The author said | The rule |
|---|---|
| "Add Openverse for the sound effects" | Real, licensed recordings first (`sfx_search.py`), licence-gated, with credits. |
| "Add the real sfx skill and the Earshot skill so Claude can visualise the audio" | Earshot (MIT) and its `real-sound` skill are companions installed from upstream; Claude reads an audio sheet and quotes numbers instead of guessing how it sounds. |
| "Recordly for screen recording the apps while they are working" | Footage of the app working is recorded with Recordly (or a scripted fallback), on test data only. |
| "Add which voice model we chose" | The voice decision is written down with its comparison and settings (`voice.md`). |
| "Rename our skill to freebird" | The skill, its folder, its venv and its docs are named freebird. |
| "Make this shareable; it will be used on my other machine" | No machine-specific paths; one install block; companions installed from upstream. |


## Studio quality, the Notion study, avatars and the review (November 2026)

| What the user said | The rule it became |
|---|---|
| "The creative director just agrees with whatever is there ... how did it miss the loop arrow going the wrong way?" | The review is a director, not a checker: a verdict and a design change per scene, a motion-direction audit on several frames, an independent reviewer who sees only the frames, two passes ([creative-director.md](creative-director.md)). |
| "Download the Notion videos; the latest design taste, not all of them" | 54 recent short films studied; the benchmark is the current era, with confidence labels ([notion-grammar.md](notion-grammar.md), `study_reference.py`). |
| "Notion also has small animated figures ... build your own, clean, animatable, not images" | Hard-coded SVG ink faces and avatars with pop, blink, nod ([figures.js](../templates/lib/figures.js), taste.md "Small figures"). |
| "The intro looks vibe-coded: the glowing amber dot on a page ... a page turning into a lantern is wrong; the reading eye or pen idea was right" | Keep a strong idea when the execution is what failed; rebuild flat and crisp, real text, one reader object; no glows or placeholder bars ([studio-quality.md](studio-quality.md)). |
| "Add rules so nothing feels vibe-coded, and make a plan so you do not forget what I keep telling you" | studio-quality.md is read before every idea, layout and scene; the request plan lives in a PLAN file beside the project and in the task list. |

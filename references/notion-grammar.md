# The Notion benchmark: how Notion's own launch films are built

This is the benchmark the creative director measures every film against. It was read from five official Notion uploads (Notion 3.0 Agents, Custom Agents, Agents rebuilt, the iOS app film, and the credits talk) plus one tutorial on making a launch video like Notion's. **The videos themselves are not in this repository** (they are Notion's); the author keeps them locally with their contact sheets (`analysis/<id>.sheet.png`) and cut lists (`analysis/<id>.cuts.txt`, ffmpeg scene detector). When a film is reviewed, put its frames next to those sheets and compare. If the sheets are missing on this machine, ask the user for the references folder; do not review "against Notion" from memory.

Labels: **Measured** = read from the files with a tool. **Seen** = read off the contact sheets. **Guess** = inferred, to be checked.

## At a glance

| Film | Length | Hard cuts (measured) | Ground | Carrier (what the eye follows) | Ends on |
|---|---|---|---|---|---|
| `R1cF4T4lgI4` Notion 3.0: Agents | 90 s | 13 | paper `#F8F8F6` (measured), brand-blue `#097EE8` flood between UI states (measured) | a hand-drawn face character that changes hats | logo alone on paper |
| `yrEic418kjg` Custom Agents | 71 s | 11 (four inside 0.3 s = one montage burst) | paper `#F6F6F3` (measured), then navy `#010838` (measured) for the last third | coloured round badges (purple check, orange chat, teal folder) and halftone hands | "+ New Agent" button, then logo on navy |
| `XOIM8UbDJ0w` Agents, rebuilt | 52 s | 3 | white, then one pastel field per feature (seen: pale blue, peach, butter yellow; guess: `#C9E1F7`, `#F9E6DC`, `#FCE5B0`) | the prompt box that morphs from one state to the next | logo on paper |
| `i4G0R9Xr0CA` credits talk | 175 s | 30 | a founder on a terracotta set, UI cutaways | the person | "Think together" on paper |
| `YNy_TDII4aw` iOS app | 8 s | 0 (all inside-shot motion) | paper `#F6F6F3` (measured) | the app icon | icon above name, then logo lockup |

The talking-head film is the least useful for us: its grammar is chapter lower-thirds and UI cutaways over a person. We keep two things from it:
the numbered chapter list where the active item stays bright and the rest dim, and the hand-drawn circle that rings a UI detail.

## Film by film

### 3.0: Agents (90 s)
Seen, in order (sheet is 2.5 s a frame):

| About | What happens | Device |
|---|---|---|
| 0–5 s | "You assign the tasks." with one face; then four more faces appear: "Your Agents do the work." | character multiplies |
| 5–25 s | real UI on paper; the prompt box appears and the **blue flood** drops behind it; the page does not cut, the ground changes | colour flood behind real UI |
| 12–17 s | the agent's avatar is picked from a row of cards (pencil, chilli, duck, hat); a name is typed; a profile menu opens | the setup is shown as real UI states |
| 17 s | giant type **"Create a b|"** fills the frame and types; then it becomes the prompt box | type becomes the UI |
| 25–40 s | "Crafting ●●●" with the avatar; the real page builds beside the agent's reasoning ("Thought", "59 results") | the product working, not a screenshot |
| 40–60 s | second task typed into the same box; the table updates; a meeting is transcribed; the avatar wears a headset | the same agent, a new verb |
| 60–80 s | a wall of agent cards scrolls (names like "Bug Wrangler", "Code Reviewer") | the gallery as the proof of range |
| 80–90 s | faces return: "Your team of Agents are ready to work", then "Get started at notion.com", then the logo | callback to the open |

### Custom Agents (71 s)
Seen, 2.5 s a frame:

| About | What happens | Device |
|---|---|---|
| 0–5 s | a row of task chips streams along a rule line, then **bursts into a heap** of tilted chips (the 601 to-dos) | the problem as a physical mess |
| 5–12 s | "Bye bye, busywork." with a real sidebar; "Hello, Custom Agents." with three badges dropped by halftone hands | title, then the carriers arrive |
| 12–40 s | one verb line per agent badge: "Route tasks automatically", "Answer questions instantly", "Write updates autonomously", "Keep work moving all day…"; each line is followed by the real UI doing it (a board, a chat with a reply count, a table) | one verb, one real scene |
| 40–55 s | the badges become tiny agents on a **navy** field, moving along lines, trading tasks | the system as a world |
| 55–71 s | "+ New Agent" button is clicked; logo lockup on navy | click, then the mark |

Grammar to take: titles of 3–5 words with a full stop and sometimes a trailing "…"; the title leaves while the product scene is still moving; the badge that stands for a verb is the same badge in the title, in the UI and in the world scene.

### Agents, rebuilt to do more for less (52 s)
Seen, 2 s a frame:

| About | What happens | Device |
|---|---|---|
| 0–4 s | "Your agents." then "Now doing more for less." with *less* underlined by hand; badges float at the edges | title, with the one word emphasised by a hand mark |
| 4–16 s | a single prompt box on a **pale-blue field**; text appears; "Working for 8s"; a task list of verbs | one field, one box |
| 16–30 s | **peach field**: "Auto picks the model. You save." plus a handwritten note and arrow; a model list **scrolls like a slot machine** with the top and bottom rows fading | a list as motion |
| 30–36 s | a row of provider logos slides by; "Connect ChatGPT" becomes "✓ Connected subscription" | a state change in a single card |
| 36–46 s | **butter-yellow field**: a real usage dashboard draws its lines; the title names it ("AI command center") | the number or chart is the proof |
| 46–52 s | logo on paper | end |

Grammar to take: a new background colour for each idea, entered with the same card staying put (colour flood); one handwritten annotation per film with an arrow.

### iOS app (8 s)
Seen, 0.5 s a frame:

- 0–1 s: "Meet" alone. 1–2 s: "Meet the new…" (the same line continuing, no cut).
- ~2–2.5 s: the app **icon pops in**, the name sits under it in two lines; three phone screens slide up in a row beneath.
- ~5.5–8 s: the row eases out, the Notion mark appears small, then settles beside the word "Notion" as the end lockup.

Grammar to take: the **icon and the name as one stacked lockup** (icon above, name in two lines, 4–5% of the frame); the device row beneath at about 40% of the frame height; the end lockup is icon left, name right, tight.

### Credits talk (175 s)
Seen, 5 s a frame: a person against a set, with: a chapter list lower-left (1 "New Credits Model", 2 "More Powerful Agent", the active line bright); UI cutaways on paper or blue fields while they speak; a hand-drawn blue circle around one control; a logo row (providers) as a lower-third; "Think together" on paper as the close.

## What the five share (the grammar for Lantern)

1. **Paper first.** The ground is a warm off-white (`#F6F6F3` to `#F8F8F6`, measured), type is near-black, nothing floats in a dark void. One late dark world (navy) is used once, for the system or the end.
2. **One carrier.** A character, badge or cursor is the thing the eye follows from the title, through the UI, into the end card.
3. **Titles are verbs and short.** 3–5 words, a full stop, one line on screen; they change by word, with a soft blur, not by sliding.
4. **Real UI at 1.6–2× its size**, doing the thing (typing, filling a table, reasoning panel streaming), never a still.
5. **The ground changes colour to change the idea**, while the card or box stays put.
6. **Type becomes UI.** Giant typed text shrinks into the real input.
7. **One hand-made mark per film** (an underline, a circle, an arrow) so it reads as made by people.
8. **The end is a click, then the mark**, on a quiet ground, held.

## What we do not copy
Notion's face character, hats, halftone hands, the badge set, their blue, their wording, any footage. We take the grammar above and build Lantern's own carrier (the ember), ground colours and words.

## The Clueso reference (the Clueso tutorial, 9 min 30 s, "How to Make a Launch Video like Notion, Ep. 2/4")

A tutorial, not a launch film. Its one scene we study is the logo animation built in its editor at about 1:30 to 1:40
(frames: `analysis/clueso.logo.zoom.png`, 8 frames a second; wider context: `analysis/clueso.logo.sheet.png`).

**What the move is (seen):**
1. The icon alone, **grey, then black** (about 0.4 s fade).
2. The name **types in left to right**, a letter every frame or two, each letter blurring in; the letter "i" is drawn **without its dot**.
3. A single **dot glides in a slow arc** from above the start of the word to the "i", taking about 1.75 s, while everything else holds still.
4. The dot **lands on the "i"**, a small hold.
5. The dot **grows into a black circle that becomes a black plate**; the name flips from black to white on it (the dot is the transition into the next field).

**Grammar to take for Lantern:** a quiet object first, the name arriving by itself, one slow dot as the only mover, a landing, and then the dot becoming the next world. Our word "Lantern" has no "i", so the dot lands in the lantern (it lights), and the lit glass is what grows into the next scene.

## The latest era: 54 more films, September 2025 to October 2026

Source: every short produced film (3:30 or less, no tutorials or talks) on Notion's channel from the Notion 3.0 launch onward, downloaded for private study; evidence is `analysis/notion-latest/<date>_<id>_-_<title>.sheet.png` and `.cuts.txt` (made with `scripts/study_reference.py`). Notion's design language was refreshed with 3.0 (Sept 2025), so the earlier films are not the benchmark for the current look. Confidence labels: **Full-res** = read on a full-resolution frame by the author; **Sheet** = read off contact sheets by a reader (fine detail not reliable); **Unproved** = not established.

### Small illustrated figures (Full-res, "What is Notion?", Custom Agents)
- **Ink portraits.** A face in a bold black outline, a solid black hair mass, dot eyes, a short nose line, a small smile, and **stipple (halftone dot) shading on one side of the face**. Variety comes from hair (bob, curly, long, short), glasses, freckles and expression; the faces are monochrome on a white face, so there is no skin-tone fill to get wrong.
- **Where they sit, always small and always attached to something:**
  - *beside a title*, as large as the type (a head at the line height of the statement "Notion is not an [pill]"), one on the left of a line, another on the right of the next, so the lines read like a conversation;
  - *in a grey avatar disc* beside a name in a chat card (Emily / Jason / Catherine), card on a pastel field;
  - *tiny, beside a field* ("Add a comment...");
  - *a trio* of faces at the corner of a meeting card;
  - *the agent* is a different figure: a single-stroke line face inside a thin circle that rides along a UI panel (and wears a headset when it listens).
- **Badges** (Full-res, Custom Agents): thick black outline, flat fill (orange speech bubble, teal folder), a few dots beside a label ("Crafting ● ● ●"), moving along dashed lines. In the academy film, crest shields in red, blue, yellow with a black outline.
- They do not recur as one named character across films (Sheet); they illustrate roles (a customer, a teammate, the agent), they do not star.

### Devices that are new or sharper since 3.0
- **Negation pills.** A statement with its wrong answer as a pill: "Notion is not an [AI chatbot ↓]" (blue gradient pill with a round arrow button), "Notion is not a [✕ Task tracker]" (red outline, pale red fill), "Note-taking app" struck through with a pencil. Type then types the true statement ("Notion is... Notion does ..."), checkboxes tick and strike ("Busywork", "Triage tasks").
- **Pastel field per idea, with the card staying put** (Full-res): lavender, peach, pale blue behind one white chat card at a time.
- **Typed prompt box + big cursor + blue round send button**, with the real UI building beside it; the cursor is a large white arrow with a black outline, clicking the blue button is the beat that starts the work.
- **Chat cards as UI:** avatar + bold name + message, reply count with an orange badge, a status line ("Crafting", "Pondering...").
- **Grey scrim** dims the UI behind a dialog (Sheet, Automations); **typed oversized headline** filling the frame (Sheet, Faire); **chapter title cards** in plain black sans on off-white (Sheet).
- **Ends:** the N mark, then "Notion" on white (most films); a URL card (Introducing Custom Agents: "Get started at notion.ai"); a button (the CEO film ends on "+ New Agent").
- **Other registers worth knowing:** a black-ground photo-and-caption film with yellow lowercase captions and archival stills (Think Together), white silhouettes cut out on black (AI can't replace teamwork), engraved illustrations as a hook (History of Search), handwritten script captions on cinematic footage (La Cabra), chapter crest badges (Academy).

### What not to take
Live-action presenters, the faces and badges themselves, their blue, their wording and footage. We take the *grammar*: small ink figures attached to UI and type, negation pills, pastel fields, the typed prompt and click, the quiet end. Lantern draws its own figures (`templates/lib/figures.js`) and keeps the ember as its one carrier.

### Unproved
Exact hex values of the pastel fields (read by eye); whether the ink portraits are animated beyond arriving, blinking and tilting (not seen on stills; the freebird figure motion is a design choice, not a measurement); anything in a film whose sheet was not read by the author.

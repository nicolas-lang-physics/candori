# Candori Design System

Candori is an **AI-first solo practice tool for conversational presence** — a 5-minute daily session of improv- and mindfulness-inspired exercises (word association, one-word story) for intelligent, introspective people caught in "politeness chains". The name is the Italian plural of *candore*: candour, brightness, whiteness.

**One-line promise:** a calm, warm daily ritual that helps you drop the script and speak from truth — not another gamified skills app.

**Explicitly not:** pickup artistry, dating advice, therapy, public-speaking coaching, theatre. The design must never read as any of these.

## Sources
- `Candori Specs/Candori-Design-Brief.md` (mounted local folder) — the authoritative Phase 0 design brief.
- `Candori Specs/Mindful Improvisation - MVP Proposal v2.md` — MVP structure, tech stack, launch phases.
- No Figma, no codebase UI, no logo files, no font binaries were provided.

## Product surfaces
One product: the **Candori app** (mobile-first PWA). Four MVP screens: Home / Streak, Lesson (philosophy card), Word Association, One-Word Story (star feature). See `ui_kits/app/`.

## Design principles (from the brief)
1. **Journal, not app** — resting state feels like an open notebook; no dashboard density.
2. **The glow is the language** — typing warmth (sand → amber → coral) IS the brand identity.
3. **No gamification theatre** — no mascot, badges, confetti, flames. Streaks tracked quietly.
4. **Presence over feedback** — never score, grade, or evaluate.
5. **Content is load-bearing typography.**

---

## CONTENT FUNDAMENTALS

**Voice: a sharp friend, not a coach or therapist.** Warm but never therapeutic; provocative but never pushy; confident and spare — say less, trust the reader's intelligence.

- **Person:** speak to "you", directly. Avoid "we" cheerleading.
- **Casing:** sentence case everywhere — buttons, labels, titles. Never ALL-CAPS shouting (small-caps meta labels are the one exception, e.g. `DAY 12`).
- **No emoji.** Ever.
- **No coaching filler:** never "you've got this", "great job!", "well done". No exclamation-point enthusiasm.
- **Provocations, not lessons.** Session copy reads like a nudge from a sharp friend: *"The interesting answer is the one you almost didn't say."*
- **Timers and streaks are framed as tools, not scores.** The timer is "outrunning your inner editor", never a countdown to beat.
- **Privacy-forward:** reflections are "yours, private, unjudged". The product never reads or grades them.

Example microcopy:
- Begin CTA: "Begin today's session" (not "Start your journey!")
- Streak: "Day 12" (not "🔥 12-day streak!")
- Reflection prompt: "What did you avoid?"
- Empty state: "Nothing here yet. That's fine."
- Timer framing: "Don't think. Type."

## VISUAL FOUNDATIONS

- **Color:** warm off-white parchment base (`--parchment #F7F2E8`), warm dark-brown ink (`#33291E`), dusty sage accents (`#8B9B80` / `#6C7D61`). The only "loud" color is the glow ramp — sand `#E7CD9B` → amber `#ECA84F` → coral `#E86A3C` — reserved for typing-driven warmth. Never cool blues, never saturated tech accents, never clinical white (#FFF only on raised surfaces).
- **The Glow system (signature):** typing WPM drives `--glow-heat` (0–1) which interpolates `--glow-color`/`--glow-soft` up the ramp. It rewards flow, not speed-as-competition. Must degrade gracefully: base fallback is a simple `box-shadow`/`background` tint transition — no heavy filters required.
- **Type:** Plus Jakarta Sans (chosen over DM Sans: rounder terminals, warmer at reading sizes — closer to "considered writing, not UI chrome"). Scale: display 32, provocation 22, story 24, body 17, label 15, meta 13 (tracked +0.06em, uppercase). Weights 400–500 only; no bold shouting.
- **Space & layout:** generous whitespace is a feature. Single reading column (`--measure: 34rem`), mobile-first, page gutter 24px. Spacing scale 4/8/12/16/24/32/48/64/96.
- **Backgrounds:** flat parchment. No images, no textures, no patterns, no gradients — except the glow's soft radial warmth when active.
- **Cards:** `--surface-card #FCF9F2` on parchment, 1px warm hairline border, radius 16–24px, very soft warm shadow (`--shadow-card`). No hard elevation.
- **Corner radii:** 10 / 16 / 24 / pill. Soft but not bubbly.
- **Borders & shadows:** warm-toned hairlines (`rgba(88,72,50,.14)`); shadows are low, warm-tinted, diffuse. No inner shadows.
- **Motion:** calm and organic. One easing (`--ease-calm`, settles without bounce), durations 180/360/900ms + a 3.2s "breathe". Expressive motion lives ONLY in the glow and the living story text. No bounces, spins, confetti.
- **Hover:** slight darkening of text/accent color + background tint (`--sage-faint`), 180ms. **Press:** deepen color, no shrink/scale games.
- **Focus:** 2px `--focus-ring` (sage at 45%) offset ring.
- **Transparency/blur:** essentially unused; keep surfaces opaque.
- **Imagery:** none in MVP. Warm-toned if ever introduced; never stock, never cool/blue.

## ICONOGRAPHY

The brief defines **no icon system, and near-zero icon usage** — the UI is typographic. When a glyph is genuinely needed (back arrow, close, share), use **Lucide** (CDN, `lucide-static`) at 1.5px stroke, sized 20px, colored `--ink-soft` — it matches the rounded humanist type. This is a **substitution/intentional addition**, flagged: no icon assets were provided. No icon font, no emoji, no unicode-as-icons. Streaks are rendered as type ("Day 12") plus quiet dot marks — never a flame.

**No logo exists.** The sources contain no mark. Wherever a mark would go, render "candori" in lowercase Plus Jakarta Sans 500. Do not invent a logo.

## Index
- `styles.css` → `tokens/` (colors, typography, spacing, motion, base)
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, WordChip, StreakDots, SoftTimer, GlowSurface
- `components/forms/` — TextInput, ReflectionBox
- `components/content/` — LessonCard, StoryText
- `ui_kits/app/` — the four MVP screens, interactive (`index.html`)
- `SKILL.md` — agent skill entry point

## Intentional additions
- **Lucide icons (CDN)** — brief defines no glyph set; needed for back/close/share affordances.
- **Google Fonts CDN for Plus Jakarta Sans** — no font binaries provided; flag to user for self-hosted files if wanted.

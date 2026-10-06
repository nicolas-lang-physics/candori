# candori



## Local development

```sh
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY at minimum
npm run dev:offline     # UI only, http://localhost:5173 — AI replies come from canned word pools (dev only)
vercel dev               # UI + /api/* functions, so real AI calls work
```

Open `http://localhost:5173/#gallery` in dev mode for a visual diff of every
design-system component against `UI/components/*.card.html`.

## Testing

```sh
npm run test                                    # streak math + AI response validation
npm run prompt-lab -- --game story --model claude-opus-4-8   # iterate the story prompt
npm run prompt-lab -- --game assoc --model claude-haiku-4-5  # iterate the association prompt
```

## Configuration

| Env var | Where | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | server only | Claude API key — never exposed to the client |
| `CANDORI_MODEL_STORY` | server only | model for one-word story turns (default `claude-opus-4-8`) |
| `CANDORI_MODEL_ASSOC` | server only | model for word-association turns (default `claude-opus-4-8`) |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | client (safe to expose; RLS-protected) | optional streak sync + magic-link auth |

Supabase is entirely optional: sessions work fully offline/anonymously with
the streak stored in `localStorage`. If the Supabase env vars are unset, the
sign-in prompt still renders but reports "Sign-in isn't configured yet."
Apply `supabase/schema.sql` once against a new Supabase project to enable it.

Reflections are **never** sent to a server, Supabase or otherwise — they stay
in `localStorage` only, per the app's privacy promise.

## Icons

Regenerate PWA icons after any brand-color change:

```sh
npm run generate-icons
```

## Deploy

```sh
vercel        # first deploy, links the project
vercel --prod
```

Set the four env vars above in the Vercel project settings, and add the
production URL to Supabase's Auth → URL Configuration redirect allow-list.

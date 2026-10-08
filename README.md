# candori

Candori is a progressive-web app that lets users play improv games with AI as their partner.
Currently in testing and supporting a single game: one-word story.

## Local development

```sh
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY at minimum
npm run dev:offline     # UI only, http://localhost:5173 — AI replies come from canned word pools (dev only)
vercel dev               # UI + /api/* functions, so real AI calls work
```

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
| `CANDORI_MODEL_STORY` | server only | model for one-word story turns (default `claude-sonnet-5-5`) |
| `CANDORI_MODEL_ASSOC` | server only | model for word-association turns (default `claude-sonnet-5-5`) |

Supabase persistent storage is planned but currently not used: sessions work fully offline/anonymously with
the streak stored in `localStorage`.

## Deploy

```sh
vercel        # first deploy, links the project
vercel --prod
```

Set the four env vars above in the Vercel project settings.

# Technical Architecture

Goal: the **simplest stack that reliably demos the full story**. Integrations are detailed in [API_INTEGRATION_PLAN](API_INTEGRATION_PLAN.md) and the data model in [DATABASE_SCHEMA](DATABASE_SCHEMA.md).

## 1. Recommended stack **[D]**
| Layer | Recommendation | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | One codebase for UI and server routes (keeps LLM keys server-side), one-click Vercel deploy |
| Styling | **Tailwind CSS** + **shadcn/ui** (Radix primitives) | Accessible primitives and full visual control, so it avoids looking like a template. Tokens come from `design.md` [P] |
| State | Zustand (+ localStorage persistence) | Profile, shortlist and read state without a backend |
| Data (MVP) | **Typed seed files in repo** (`/data/*.ts` or JSON) validated with Zod | Zero infrastructure, deterministic demo, versioned with code |
| Data (optional) | Supabase (Postgres + Storage + Auth) | Only if you need persistence across devices, real uploads or auth ([Q4]) |
| AI | **Gemini 2.x Flash** via server route, structured JSON output | Free tier, fast, good structured output. Provider sits behind an adapter so it can be swapped |
| Maps | **Leaflet/MapLibre + OpenStreetMap tiles**, precomputed commute estimates | No key/billing. Commutes are *Estimated* anyway |
| Motion | Framer Motion (sparingly) [P] | Interaction feedback |
| Deploy | **Vercel** (free) | Preview URLs for judges |

**Alternative considered:** a Vite React SPA + Supabase Edge Functions. It would mean more moving parts and no real benefit for a demo.

## 2. Frontend architecture
```
app/
  (onboarding)/        welcome, intent, basics, priorities
  (tabs)/home | discover | shortlist | insights
  property/[id]/       research page (sections as anchors/tabs)
  api/                 parse-profile, explain, advisor, investigate (server only)
components/            ui/ (design-system primitives) · domain/ (PropertyCard, ClaimRow, StatusBadge, FitBreakdown, StageTracker…)
lib/
  engine/              filter, score, nextAction, evidenceConfidence, detectors   ← pure, unit-tested
  ai/                  provider adapter, prompts, schemas, cache, fallbacks
  data/                loaders + Zod schemas
data/                  properties, listings, claims, sources, developments, demo-profiles (all SIMULATED)
```
- Mobile-first layout. On desktop, the app renders in a centered device frame with an annotation side rail for judges [A].
- `StatusBadge` is the **only** way to render a status (enforces FR1/FR2).
- A "Demo controls" panel (hidden behind a long-press/shortcut) holds: reset, switch demo profile, time-skip (Agent 3) and simulate API failure.

## 3. Backend architecture
- Next.js Route Handlers are the only server code. They are stateless and call the LLM with the server key.
- The deterministic engine runs **client-side** (instant re-ranking on profile change) and is shared with the server for LLM context building.
- LLM responses are cached: precomputed JSON for the demo profiles is committed to the repo, plus an in-memory/edge cache for live calls.

## 4. Database
The MVP uses a seed dataset in the repo whose shape mirrors [DATABASE_SCHEMA](DATABASE_SCHEMA.md), so migrating to Supabase/Postgres later is mechanical.

## 5. Security
| Item | Rule |
|---|---|
| LLM API key | `GEMINI_API_KEY` in `.env.local` (git-ignored) and Vercel env vars. **Server only, never `NEXT_PUBLIC_`** |
| Maps (if Google later) | Browser key restricted by HTTP referrer + API scope. Server key separate |
| Supabase (if used) | `NEXT_PUBLIC_SUPABASE_URL` + anon key are OK client-side **only with RLS on**. `SUPABASE_SERVICE_ROLE_KEY` is server only |
| Search (if used) | `TAVILY_API_KEY` is server only |
| Abuse | Rate-limit `/api/*` per IP (simple token bucket). Max input length. Schema-validate all LLM output |
| Repo | Commit `.env.example` with names only |

## 6. Deployment
GitHub repo → Vercel project → env vars set in the Vercel dashboard → production URL + preview per branch. The demo must also run with **no API key** (fallback mode) so judges never hit a broken state.

## 7. Testing (summary; detail in roadmap)
Unit tests for the engine (filters, scores, next-action, detectors) with Vitest. A Playwright smoke test of the demo spine (J1–J6). Manual mobile checks at 375px.

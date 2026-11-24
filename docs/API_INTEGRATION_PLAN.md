# API & Integration Plan

No keys are needed yet. Free-tier figures are **indicative and must be re-checked on the provider's official page at setup** (they change often). No paid calls during planning.

## 1. Summary
| Integration | Recommendation | MVP? |
|---|---|---|
| LLM | Google Gemini (Flash) via AI Studio key | **Essential** (with offline fallback) |
| Hosting/server routes | Vercel (Next.js) | **Essential** |
| Maps display | Leaflet/MapLibre + OSM-based tiles | **Essential** (no key) |
| Commute/routing | Precomputed estimates in seed data. Optional OSRM/OpenRouteService | Precomputed = essential. Live = optional |
| Property data | **Simulated seed dataset** (no external feed) | **Essential** |
| RERA/government | Reference only. Simulated RERA-style records | Postponed (live) |
| Database/Auth/Storage | None (repo + localStorage). Supabase if [Q4] = yes | Optional |
| Web search | Tavily | Optional / postponed |
| Notifications | In-app only | Essential (in-app). Push postponed |
| Speech (voice search) | Browser Web Speech API | Stretch, no key |

## 2. Details

### 2.1 LLM: Google Gemini
1. **Purpose:** profile parsing, document extraction (seed-time / stretch upload), grounded explanations, advisor answers, finding narration.
2. **Enables:** F1, F3 NL search, F4 summary, F7–F9 narration.
3. **Credential:** `GEMINI_API_KEY` (server only).
4. **Setup:** Google AI Studio → Get API key → add to `.env.local` and Vercel. Docs: https://ai.google.dev/gemini-api/docs
5. **Free tier:** AI Studio has a free tier with per-minute/day rate limits on Flash models. On the free tier, prompts may be used to improve Google products, so **don't send personal data** (verify current terms).
6. **Paid:** per-token billing once a billing account is enabled. Expect negligible cost for a demo.
7. **Security:** server route only, rate limit, output schema validation.
8. **Alternatives:** Anthropic Claude (e.g., Claude Haiku/Sonnet 5.5): strong grounded reasoning and citation adherence but no free tier. OpenAI. The adapter keeps the provider swappable.
9. **Status:** Essential. Precomputed outputs mean the demo works without it.

### 2.2 Hosting: Vercel
Purpose: host app + API routes. Credential: none in code (env vars set in dashboard). Docs: https://vercel.com/docs. The free Hobby plan is meant for non-commercial use (fine for a hackathon). Alternatives: Netlify, Cloudflare Pages. **Essential.**

### 2.3 Maps: Leaflet/MapLibre + OpenStreetMap
Purpose: Discover map, Location section, development overlays. No key for Leaflet. Note that the **public OSM tile server has a strict usage policy** (https://operations.osmfoundation.org/policies/tiles/): fine for a low-traffic demo with attribution, otherwise use a free-tier tile provider (MapTiler/Stadia/Carto, which need a key). Docs: https://leafletjs.com.
**Alternative: Google Maps Platform** (https://developers.google.com/maps/documentation). Familiar look with real Places/Routes, but it needs a billing account and card even within its free monthly usage caps, and Places data can't be cached long-term under its terms. *Not worth it for fictional properties.* **Essential (OSM).**

### 2.4 Commute / routing
MVP: precomputed peak/off-peak minutes per (property × demo place), labelled **Estimated** with method. Optional live: OpenRouteService (free key, https://openrouteservice.org/dev/) or Google Routes API. **Postpone live.**

### 2.5 Property data source
No licensed Indian property feed is realistic within a hackathon, and **public visibility ≠ permission to scrape portals** [C]. MVP: 10 fictional properties with simulated brochures, portal-style listings and RERA-style records containing seeded discrepancies ([ROADMAP §4](IMPLEMENTATION_ROADMAP.md#4-seed-dataset-plan)). Future: licensed feeds/partnerships, builder-submitted data. **Essential (simulated).**

### 2.6 RERA & government sources
Karnataka RERA portal (https://rera.karnataka.gov.in) is publicly viewable but has **no public API**. Automated access terms are unclear, so don't scrape. MVP: simulated records clearly marked as such, and a "how we'd verify" explainer naming the real source type. Infrastructure: BMRCL, BBMP, BDA Revised Master Plan as *source types*. Any real item cited must carry URL and access date ([Q2]). **Postponed (live).**

### 2.7 Database / Auth / Storage: Supabase (optional)
Purpose: persistence, auth, document storage, RLS. Credentials: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client OK with RLS), `SUPABASE_SERVICE_ROLE_KEY` (server only). Docs: https://supabase.com/docs. The free tier has limited DB/storage, and **projects pause after inactivity**, which is a demo risk. **Optional**, needed only if [Q4] requires accounts or real uploads.

### 2.8 Web search: Tavily (optional)
Purpose: live discovery of infrastructure news/official notices. Credential: `TAVILY_API_KEY` (server only). Docs: https://docs.tavily.com. It has a monthly free credit allowance. **Postponed:** it adds little with fictional properties and introduces the risk of unverified real-world claims. If used, restrict to an allow-list of official domains and store URL + timestamp.

### 2.9 Notifications
In-app notification centre + Insights badge (no service). Web Push/email postponed.

## 3. Environment variables (future)
```
# .env.local (git-ignored)   — server only unless prefixed NEXT_PUBLIC_
GEMINI_API_KEY=
AI_MODE=live|cached           # cached = no external calls (judge-safe)
# optional
TAVILY_API_KEY=
ORS_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
**Never expose to the frontend:** `GEMINI_API_KEY`, `TAVILY_API_KEY`, `ORS_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

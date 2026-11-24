# Implementation Roadmap

**Constraint (2026-11-24): about 2–3 hours of build time remain.** The plan below is time-boxed for that. The full feature list in the PRD stays as the product vision, and the pitch covers anything not built.

## 1. Time-boxed build plan (~150 min + 30 min buffer)
| Block | Min | Output |
|---|---|---|
| B1 Scaffold | 15 | Next.js + TS + Tailwind, design tokens (DESIGN §2–5), Lucide, app shell, bottom nav, device frame on desktop |
| B2 Seed data + engine | 30 | 10 properties with claims/sources/findings/developments (§4), hard filter, fit band, evidence confidence, next-action rules |
| B3 Home (Decision Dashboard) | 25 | Profile strip, funnel, Needs attention, focus list, alternatives, no-match state |
| B4 Research page | 30 | Overview, claims table with StatusBadge, evidence sheet, conflict A-vs-B, location (commute list, no live map), Future Outlook stage tracker, AI summary + builder questions |
| B5 Onboarding + voice | 15 | 3 steps + NL/voice input → chips (rule-based parser; Gemini optional), "Skip" → guest Home |
| B6 Shortlist/Compare + Advisor | 20 | Compare 2–3, Advisor summary + 3 suggested prompts with pre-grounded answers (live Gemini optional) |
| B7 Insights + agents | 15 | Investigator findings feed, "3 weeks later" demo control → Agent 3 notification, swipe gestures |
| B8 Deploy + rehearse | (buffer) | Vercel deploy, run the demo script |

## 2. Cuts for the time box
- **Kept:** all 3 agent scenarios (the brief requires 2), the evidence model, edge states, voice, guest mode.
- **Simplified:** AI runs in **cached mode by default**. Explanations and Advisor answers are pre-written from the seed data in grounded form, and live Gemini is a toggle only if a key is provided. NL parsing is rule-based first.
- **Dropped:** map view (commute list only), Discover tab reduced to search + filters, Zod schemas, Playwright tests, dark mode, investment lens, document upload, budget-change diff toast (stretch if time remains).

## 3. Critical path
Seed dataset → engine → Research page + Home → Investigator → Compare + Advisor → annotations. Building the **seed dataset first** matters most, because every screen and agent demo depends on its seeded discrepancies.

## 4. Seed dataset plan
10 fictional projects [A: Bengaluru, real localities near ORR/Whitefield/Sarjapur], each with 2–4 simulated sources. Every record has `is_simulated: true`.

| # | Design intent | Seeded issue |
|---|---|---|
| P1 | Strong fit, good evidence | None. Baseline "Visit" |
| P2 | Strong fit, area conflict | Brochure 1,250 vs RERA-style record 1,080 sq ft carpet → **Agent 1 demo** |
| P3 | Good fit, price conflict | Portal ₹78L vs builder price sheet ₹84.5L (excludes PLC/parking) |
| P4 | Good fit, missing OC | Ready-to-move claim but OC *Unknown* |
| P5 | Partial fit, long commute | Fits budget, 55-min commute |
| P6 | Over budget by ~₹4L, strong fit | Appears in Alternatives |
| P7 | Under construction, possession drift | Dec 2026 (brochure) vs Jun 2027 (RERA-style) |
| P8 | Thin evidence | Single portal source only. Most claims Sourced/Not assessed |
| P9 | Near a simulated metro segment | Stage change Approved → Under construction → **Agent 3 demo** |
| P10 | Stale data, duplicate listing | Two listings for same unit. Data 120 days old |

Plus: 2 demo profiles (primary couple; a tighter-budget variant that triggers few/no matches), and 4–6 simulated developments.

## 5. Prototype walkthrough (demo script, ~4 min)
1. Splash → NL onboarding ("2-3 BHK under 85 lakh, we work in Bellandur and Whitefield, kid starting school in 2027") → parsed chips and one assumption confirmed.
2. Decision Home: funnel (10 → 6 → 3 → 2), attention card, focused list and alternatives. *Annotation: "Not a listing feed."*
3. Attention: P2 area conflict → evidence sheet → builder questions → next action becomes Investigate. **(Agent 1, proactive)**
4. Research page P1: status-labelled claims, Estimated commute, Future Outlook.
5. Shortlist P1, P3, P7 → Compare → ask "Which should we visit first?" **(Agent 2, user-initiated)**
6. Edit budget to ₹75L → re-rank diff toast → no-match/relaxation preview.
7. Demo control "3 weeks later" → notification about the P9 metro stage change. **(Agent 3)**
8. Toggle "simulate AI outage" → graceful cached state. *Annotation: trust and reliability.*

## 6. Testing
- **Unit (Vitest):** filters never pass hard-constraint failures; unknown ≠ 0; next-action table; detectors with tolerance boundaries; normalisation units.
- **AI evals (lightweight):** 10 NL parsing cases; grounded-summary checks (all numbers present in input; no banned terms).
- **E2E:** (dropped for the time box) Walk through demo script steps 1–8 manually at 390×844 in the browser pane.
- **Manual:** edge-case table in [USER_FLOWS §9](USER_FLOWS.md#9-edge-cases--system-responses), contrast check, fallback mode with no key.

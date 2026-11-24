# Decision Log

Statuses: ✅ Decided · 🟡 Proposed (awaiting approval) · ❓ Open

Defaults for Q1–Q7 and all proposed decisions were accepted by the user on 2026-11-24.

| ID | Decision | Status | Ref |
|---|---|---|---|
| DL1 | Product is a decision room, not a marketplace. Property research = core engine, not an agent | ✅ (brief) | PRD §1 |
| DL2 | Phase 1 = docs only, no code or dependencies | ✅ | — |
| DL3 | 7-state claim status model (adds Estimated + Assumption to master-prompt taxonomy) | ✅ | AI §4 |
| DL4 | Two axes, Fit band + Evidence confidence. No single opaque score | ✅ | AI §6 |
| DL5 | Deterministic engine decides, LLM explains with mandatory claim citations | ✅ | AI §1 |
| DL6 | Fictional, labelled 10-property dataset with seeded issues. No scraping | ✅ | ROADMAP §4 |
| DL7 | Next.js + TS + Tailwind + shadcn/ui, seed data in repo, Vercel | ✅ | TECH §1 |
| DL8 | Gemini Flash behind a swappable adapter + cached fallback mode | ✅ | API §2.1 |
| DL9 | Leaflet/OSM map, precomputed commute estimates. No Google Maps | ✅ | API §2.3 |
| DL10 | No auth in MVP. Local profile counts as "onboarded" | ✅ | PRD G5 |
| DL11 | Investor = lightweight lens (stretch), primary = end-use buyer | ✅ | PRD §6 |
| DL12 | Tavily/live search postponed | ✅ | API §2.8 |
| DL13 | Design system finalised only from `design.md` | ✅ | DESIGN |
| DL14 | City = Bengaluru. Persona = dual-income couple (Bellandur + Whitefield), ₹85L, 2–3 BHK | ✅ | PRD §2 |
| DL15 | Real locality names, fictional projects/builders, simulated infrastructure (all labelled) | ✅ | PRD G3 |
| DL16 | Deploy to a public Vercel URL. The demo must also run in cached mode with no API key | ✅ | TECH §6 |

| DL17 | Build time box is about 2–3 hours. Time-boxed plan and cuts in ROADMAP §1–2 | ✅ (Q8 answered) | ROADMAP |
| DL18 | Design system = design.md "Zero Interface", applied to a mobile app | ✅ (Q9 supplied) | DESIGN |
| DL19 | Resolutions C1–C9 for design.md conflicts (charcoal accent, contrast fix, status palette, shadow, SVG imagery, label size, landing layout only for welcome/judge view, light only, voice with text fallback) | 🟡 | DESIGN §7 |
| DL20 | AI in cached mode by default. Live Gemini optional | 🟡 | ROADMAP §2 |

| DL21 | Node/npm/git were not installed, so the build switched to a **no-build web app** (`app/`: plain HTML/CSS/JS, no dependencies), published as a private claude.ai artifact instead of on Vercel. Supersedes DL7 and DL16 | ✅ (user chose, 2026-11-24) | — |
| DL22 | AI runs in grounded template mode only (rule-based parser, detectors, Advisor). No LLM is called | ✅ | AI §1 |

| DL23 | Investment journey added (supersedes DL11 "lens only"). Shared engine and UI. Investor criteria are rental yield, rental demand, development potential and delivery certainty, weighted by goal. Rent comes from simulated comparables (Sourced), yield is calculated (Estimated, gross, method shown), and appreciation is never forecast | ✅ (user, 2026-11-24) | engine.js `investCriteria` |

| DL24 | City moved from Bengaluru to **Delhi NCR** (supersedes DL14/DL15 location). Real localities and roads (Gurugram sectors, Sohna, Noida, Faridabad, Ghaziabad). Persona offices: Cyber City + Sohna Road. Projects, builders, developments and registry IDs stay fictional. Registration cost assumption is ~7% | ✅ (user, 2026-11-25) | data.js |

## Open questions
None blocking. Waiting on approval of DL19–DL20 and the go-ahead to start building.

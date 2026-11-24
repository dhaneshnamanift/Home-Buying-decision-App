# Product Requirements

See [README](README.md) for the markers. Flows are in [USER_FLOWS](USER_FLOWS.md) and AI behaviour is in [AI_SYSTEM_ARCHITECTURE](AI_SYSTEM_ARCHITECTURE.md).

## 1. Vision
**[C]** A research and decision room, not a marketplace. It helps first-time and mid-income Indian homebuyers find the few homes genuinely worth considering. It shows why each one fits, what is known versus unknown, and what to do next.
**Tagline [C]:** *Find less. Know more. Decide better.*

## 2. Target users
| Segment | MVP priority | Notes |
|---|---|---|
| First-time end-use buyer (salaried individual or couple, ₹50L–₹1.5Cr) | **Primary [A]** | The brief targets this segment |
| Investor | Secondary **[D]** | Recommend a lightweight "investment lens" (see §6) and no separate journey in the MVP |

**Primary persona [A]:** Priya & Arjun, aged 31 and 33, both work in tech. Priya works at Outer Ring Road (Bellandur) and Arjun works in Whitefield. They have one child who will start school in 2 years. Budget is ₹85L all-in, and they want a 2–3 BHK. Their biggest fear is buying an under-construction flat whose stated area or possession date turns out to be wrong. *The persona and city still need your sign-off ([Q1](DECISION_LOG.md#open-questions)).*

## 3. User problems (the "why")
1. **Overload:** there are hundreds of listings and no idea which 5 matter.
2. **Unreliable claims:** brochure, portal and RERA data disagree (area, price, possession), and buyers can't tell which to trust.
3. **Hidden costs:** the quoted price leaves out GST, PLC, parking, registration and maintenance deposit.
4. **Fit is multi-dimensional:** commute for two people, schools and budget headroom trade off against each other, and nobody makes those trade-offs explicit.
5. **Broker pressure:** buyers lack a neutral list of questions to ask and a clear "walk away" signal.
6. **Future uncertainty:** buyers can't tell whether announced infrastructure is real, funded or years away.

## 4. Core features (MVP)
| ID | Feature | Delivers on |
|---|---|---|
| F1 | Quick onboarding: structured fields or natural language → editable buyer profile | Brief deliverable 1 |
| F2 | **Decision Home**: focused shortlist with fit reasons, trade-offs, attention items and next actions, including no-match and limited-evidence states | Brief deliverable 1 |
| F3 | Discover: search, filters, sort, map, and NL search with an explanation of the parsed query | Exploration |
| F4 | **Property Research Page**: Overview, Verification & Evidence, Location, Future Outlook, AI Research Summary | Brief deliverable 2 (deep evaluation) |
| F5 | Shortlist & Compare (2–3 properties) against user priorities | Decision support |
| F6 | Insights feed: agent findings, conflicts, missing docs, infrastructure changes | Proactive AI |
| F7 | **Agent 1: Property Investigator** (discrepancies, missing evidence, builder questions) | Agentic scenario 1 |
| F8 | **Agent 2: Decision Advisor** (compare, trade-offs, next action; chat and contextual actions) | Agentic scenario 2 |
| F9 | Agent 3: Future Development Analyst (status changes near shortlisted homes) | Agentic scenario 3 (bonus) |
| F10 | Guest mode (no onboarding, no fit scores) | Low-friction entry |
| F11 | Walkthrough annotations/tour layer for judges | Submission requirement |

## 5. Functional requirements (key rules)
- **FR1 [C]** Each displayed claim carries a status. See the status model in [AI_SYSTEM §4](AI_SYSTEM_ARCHITECTURE.md#4-claim-status-model) (it reconciles the brief and the master prompt).
- **FR2 [C]** A property is never labelled "verified" as a whole. Verification is per claim.
- **FR3 [C]** Hard constraints (max budget, min BHK, city) are never silently relaxed. Near-misses are shown separately and labelled "outside your budget by ₹X".
- **FR4 [C]** Guests see no fit scores or "best match" claims.
- **FR5 [C]** Every AI explanation cites the claims and evidence it used. If there is no evidence, the explanation says "unknown" and invents nothing.
- **FR6 [C]** Each property gets one recommended next action: **Shortlist / Visit / Investigate / Walk away** (rules in [AI_SYSTEM §6](AI_SYSTEM_ARCHITECTURE.md#6-decision-engine)).
- **FR7 [C]** Discrepancies are framed as "needs clarification" and never as fraud.
- **FR8 [C]** Infrastructure items carry a stage: Proposed / Announced / Approved / Funded / Under construction / Operational, plus source and date. The product never guarantees completion or appreciation.
- **FR9 [C]** Simulated data is labelled everywhere: a persistent "Demo data" tag and a disclosure on the research page.
- **FR10 [A]** Changing the profile (budget or location) re-evaluates fit instantly and shows what changed.

## 6. Investment lens (proposed scope) **[D]**
Use the same data and pipeline with different criteria weights and an extra panel: indicative rental range (**Estimated**, with method shown), infrastructure stage, possession risk and liquidity notes. Show no yield or appreciation predictions presented as facts. *Alternative: drop investors entirely for the MVP.*

## 7. Non-functional requirements
| Area | Requirement |
|---|---|
| Trust | Zero fabricated real-world facts. Fictional entities are clearly marked |
| Reliability | The demo works offline or when an API fails: cached/precomputed AI outputs act as a fallback |
| Performance | Each screen is interactive in under 2s on a mid-range phone. LLM calls stream or show progress |
| Mobile-first | Designed at 360–430px and usable on desktop (phone frame for judging) [A] |
| Accessibility | WCAG AA contrast, and status is never conveyed by colour alone (icon + label) |
| Privacy | MVP stores the profile locally. No personal data is sent to third parties beyond LLM parsing of the user's own text |
| Cost | Free tiers only during the hackathon |

## 8. MVP scope
**In:** F1–F8, F10, F11, a 10-property fictional dataset in one city, in-app notifications, map with precomputed commutes.
**Stretch:** F9 live trigger, voice input for NL search, document upload with extraction, investment lens.
**Out:** real listings or scraping, accounts/multi-device sync, push/email notifications, payments, broker features, legal opinions.

## 9. Gaps & contradictions found (resolved or flagged)
| # | Issue | Proposed resolution |
|---|---|---|
| G1 | The brief requires "verified / estimates / assumptions / unknowns", but the master prompt's taxonomy (Verified / Sourced / Conflicting / Unknown / Not assessed) has no *Estimated* or *Assumption* | Merge both into one 7-state model ([AI_SYSTEM §4](AI_SYSTEM_ARCHITECTURE.md#4-claim-status-model)) **[D]** |
| G2 | Fictional properties combined with live web search (Tavily) means searching will find nothing real | Use a simulated "source corpus" (fictional brochure, RERA-style record, portal listing) and run real extraction/LLM over it. Live search is optional ([API plan](API_INTEGRATION_PLAN.md)) **[D]** |
| G3 | Real localities + real infrastructure (e.g., metro lines) risk stale or unverifiable claims | Use real locality names, fictional projects and builders, and infrastructure items labelled simulated **unless** we cite a dated official source **[Q2]** |
| G4 | "Avoid unsupported generic scores" vs. the need to rank | Two axes: **Fit** (criteria-based band + breakdown) and **Evidence confidence**. No single opaque score **[D]** |
| G5 | Onboarding is required to shortlist, but should account creation also be required? | No auth in the MVP. A local profile counts as "onboarded" **[D]** |
| G6 | The brief lists voice and chat; the master prompt doesn't mention voice | Voice is a stretch goal (browser speech-to-text for NL search) |
| G7 | Agent 3 "monitors over time", but a demo has no time | A demo control simulates "3 weeks later" and triggers a status change |
| G8 | The brief warns about "generic AI slop" and wants the user's own design thinking | Persona, demo story and visual direction need your input ([Q1], design.md) |

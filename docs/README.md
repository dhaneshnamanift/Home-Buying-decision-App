# Home Buying Decision Room — Documentation Index

**Phase:** 1 — Product understanding, research & documentation (no application code yet).
**Workspace status (inspected 2026-11-24):** `D:\DHANESH\property_search app` was empty. There's no existing repository, framework, dependencies or `design.md`. This `docs/` folder is the only content.
**Source brief:** `D:\DHANESH\hackathon\AI_Native_Home_Buying_Decision.pdf` (Problem 3) + Master Project Prompt.

## Documents

| # | Document | Answers |
|---|---|---|
| 1 | [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) | What we build, for whom, and what the MVP includes |
| 2 | [USER_FLOWS.md](USER_FLOWS.md) | How users move through the product, plus edge cases |
| 3 | [AI_SYSTEM_ARCHITECTURE.md](AI_SYSTEM_ARCHITECTURE.md) | Pipeline, agents, grounding, decision engine |
| 4 | [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | Stack, structure, security, deployment |
| 5 | [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) | Entities, relationships, evidence model |
| 6 | [API_INTEGRATION_PLAN.md](API_INTEGRATION_PLAN.md) | External services: essential vs optional |
| 7 | [DESIGN_SYSTEM_PLAN.md](DESIGN_SYSTEM_PLAN.md) | **Provisional** until `design.md` arrives |
| 8 | [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) | Phases, sequence, seed dataset, demo script |
| — | [DECISION_LOG.md](DECISION_LOG.md) | Decisions made, proposed and open |

## Markers used across all docs

| Marker | Meaning |
|---|---|
| **[C]** | Confirmed: stated in the brief or master prompt |
| **[A]** | Assumption: my default, which you can override |
| **[Q]** | Open question for you |
| **[D]** | Decision that needs your approval |
| **[P]** | Pending `design.md` |

## Hackathon evaluation criteria (from the brief) → where we address them

| Criterion | Primary doc / feature |
|---|---|
| Product thinking | PRD §3 (problems), decision-first Home, next-action engine |
| Trust & evidence | AI_SYSTEM §4 (claim status model), DB `claims` / `evidence` |
| AI integration | AI_SYSTEM §5 (3 agents, proactive triggers) |
| Interaction design | USER_FLOWS (journeys and edge cases) |
| Visual design | DESIGN_SYSTEM_PLAN ([P]) |
| Prototype quality | ROADMAP §5 (demo script and walkthrough annotations) |

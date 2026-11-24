# AI System Architecture

Principle: **deterministic code decides and the LLM explains.** The LLM parses, extracts and narrates. It never verifies facts, filters on hard constraints or invents values.

## 1. Pipeline & ownership
| # | Stage | Owner | MVP implementation |
|---|---|---|---|
| 1 | Requirements input | UI | Structured form or free text |
| 2 | Requirement parsing | **LLM** (structured JSON output) → **code** validation | Schema-validated. Unknown fields → *Assumption* defaults |
| 3 | Research & retrieval | **DB query** | Query the seeded corpus (live search optional, see API plan) |
| 4 | Document/listing extraction | **LLM** extraction → stored as claims | Precomputed at seed time. Optional live run on an uploaded PDF (stretch) |
| 5 | Normalisation | **Code** | Units (sq ft/sq m), ₹ lakh/crore, dates, locality aliases |
| 6 | Deduplication | **Code** (rules) | Same RERA ID, or builder+project+tower+config match → one property, many listings |
| 7 | Evidence verification | **Code** rules + **human** (seeded) | Compare claims across sources. A claim counts as verified only when it matches an authoritative source |
| 8 | Suitability evaluation | **Code** | Hard-constraint filter + weighted criteria (§6) |
| 9 | Explanations | **LLM**, grounded | Input = evaluation JSON + cited claims only |
| 10 | Agentic investigation & notifications | **Code** triggers + **LLM** narration | Rule-based detectors create findings and the LLM writes the "why it matters" text |

**Human review [C]:** legal title, encumbrance and approvals are never machine-verified. The UI tells users to get a lawyer or bank legal check.

## 2. Requirement parsing contract (outline)
Output fields: `intent, city, localities[], budget_max, budget_comfort?, bhk[], property_types[], important_places[{label, address/locality}], priorities[ranked], possession_preference, unparsed_fragments[]`. Each field carries `source: user_stated | inferred | default`. Inferred and default values appear as editable *Assumption* chips. Hard-constraint fields are never `inferred` without confirmation.

## 3. Grounding & retrieval
- The LLM context for any explanation = the property's normalised record + its claims (with IDs and statuses) + the user profile + the deterministic evaluation result.
- **Citation rule:** every factual sentence must reference ≥1 claim ID. Post-processing removes or flags uncited numbers, and the UI renders the citations as tappable chips.
- **Refusal rule:** if a needed claim is Unknown or Not assessed, the model must say so. Prompts forbid outside knowledge about specific properties, builders or RERA records.
- Model temperature is low. Outputs use JSON schemas wherever the UI consumes structure.

## 4. Claim status model
Reconciles the brief ("verified, estimates, assumptions, unknowns") and the master prompt. **[D]**

| Status | Meaning | Example |
|---|---|---|
| **Verified** | Matches a specified authoritative source (e.g., RERA record, sale-deed sample) by a stated method | RERA reg. no. matches state portal record (simulated) |
| **Sourced** | Present in one source, not independently checked | Clubhouse size from brochure |
| **Conflicting** | ≥2 sources disagree beyond tolerance | Carpet area 1,250 vs 1,080 sq ft |
| **Estimated** | Computed by the platform with a disclosed method | Commute 38 min (peak, distance-based model); all-in cost |
| **Assumption** | Default or inferred value used in a calculation | Home-loan rate 8.5% for EMI; "apartment only" |
| **Unknown** | Sought but not available | OC (occupancy certificate) status |
| **Not assessed** | Platform hasn't checked | Litigation history |

Property-level **Evidence confidence** = a summary of the critical claims' statuses (High / Medium / Low). It is always shown with the breakdown and never presented as "verified property".
Critical claims [A]: price, carpet area, RERA registration, possession date, builder identity, approvals/OC.

## 5. Agents
All three agents share the same claims, evidence and evaluation layer. Property research is the core engine, not an agent [C].

### Agent 1: Property Investigator
- **Triggers:** new or updated claim, a property is shortlisted, the user opens a research page, or "Investigate" is tapped.
- **Detectors (code):** numeric conflict beyond tolerance (area ±3%, price ±2% [A]); missing critical claim; stale claim (>90 days); super-built-up/carpet loading >35% [A]; possession date drift between sources.
- **LLM role:** for each finding, writes "what we found / why it matters to you / what to clarify / questions for the builder". It never uses fraud language (an output filter blocks terms like "fraud" and "scam").
- **Output:** a `finding` record → Insight + (if severity ≥ medium and property shortlisted) a notification. It may change the next action to *Investigate*.

### Agent 2: Decision Advisor
- **Modes:** contextual (Compare screen summary, "Why this fits"), and user-initiated chat sheet scoped to the profile, shortlist and properties.
- **Inputs:** deterministic per-criterion evaluation + evidence confidence + open findings.
- **Behaviour:** explains trade-offs in terms of the user's ranked priorities, names compromises, lists missing info, recommends one next action per property. It may propose plans ("Visit B first on Saturday; ask A for the OC timeline"). It never outputs a number that isn't in the input.
- **Guardrails:** no investment/financial advice beyond disclosed estimates. Off-scope questions are redirected.

### Agent 3: Future Development Analyst
- **Inputs:** `developments` within radius [A: 3 km] of shortlisted properties, with stage history.
- **Triggers:** a stage change (in the demo, via the "time skip" control) or a new development record.
- **LLM role:** explains plausible +/− impacts (access, construction disruption, noise), always with stage, source and date, and never predicts price.

## 6. Decision engine (deterministic)
1. **Hard filter:** budget_max (on all-in estimate when available, else quoted price; labelled), BHK ∈ set, city, type. Failures go to *Alternatives* with the delta and are never silently included.
2. **Criterion scores (0–1 each, explainable):** commute (per place, vs user threshold), schools within X km, possession certainty (stage + claim status), budget headroom, amenities match, connectivity, safety (only if a sourced proxy exists, else Unknown, never imputed).
3. **Weights** come from the ranked priorities [A: 0.5 / 0.3 / 0.2 for ranks 1–3, others small].
4. **Fit band:** Strong / Good / Partial, with a per-criterion breakdown. A missing criterion is shown as "unknown" and is **not** scored as zero or average.
5. **Next action rules:**
   - Fails a hard constraint → *Walk away* (or "Consider if you can stretch" in Alternatives)
   - Strong/Good fit + an open medium/high finding on a critical claim → *Investigate*
   - Strong/Good fit + evidence confidence ≥ Medium → *Visit*
   - Partial fit, or Good fit with low evidence → *Shortlist & watch*
6. **Re-evaluation** runs on any profile change. The diff is reported to the UI.

## 7. Error handling & safeguards
| Risk | Safeguard |
|---|---|
| LLM down or slow | Precomputed explanations per (property × demo profile) and template fallback. Timeout at 8s [A] |
| Hallucinated facts | Citation enforcement, number cross-check against input JSON, no web knowledge for property facts |
| Over-confidence | Status labels are mandatory in components. "Verified" can only be rendered from the status enum |
| Prompt injection via documents | Treat extracted text as data. System prompt + schema-only outputs |
| Bias in fit | Weights and breakdown are visible, and the user can edit priorities |
| Legal claims | Disclaimers + "consult a lawyer/bank legal check" on legal items |
| Cost | Cache LLM outputs by input hash. Free-tier model |

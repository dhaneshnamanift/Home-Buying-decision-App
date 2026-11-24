# User Flows

Requirements are in [PRD](PRODUCT_REQUIREMENTS.md) and logic is in [AI_SYSTEM](AI_SYSTEM_ARCHITECTURE.md). Screen layouts are **[P]** until `design.md` arrives.

## 0. Navigation map
```
Splash ─┬─ Onboarding (4 steps, skippable) ──► Home (personalised)
        └─ Skip ─────────────────────────────► Home (guest)

Bottom nav: Home · Discover · Shortlist · Insights
Global: Property Research Page (from any card) · Advisor sheet (contextual AI) · Profile editor
```

## 1. Onboarding (≤ 60 s) [C]
1. **Welcome:** value proposition and a "Demo data" disclosure. CTAs: *Get started* / *Explore first*.
2. **Intent:** Home to live in / Investment (if the investment lens is approved).
3. **Basics:** city, budget (max; optional comfort level), BHK (multi-select), type (apartment/villa/plot [A: apartment + villa only]).
   - An **NL alternative** sits at the top: "Tell us in your own words…" → parsed into chips that the user confirms or edits.
4. **Priorities:** important places (office ×2, school, parents' home) + ranking of up to 3 from: commute, schools/family, connectivity, safety, amenities, possession certainty, (investment potential).
5. **Building your room** (≈3s, honest progress): "Screening 10 properties → 6 meet your hard constraints → checking evidence…" → Home.

The system asks follow-up questions **only** for missing hard constraints (budget, city, BHK). Everything else gets a default, shown as an *Assumption* chip that the user can edit.

## 2. Guest experience [C]
Guest Home shows: intro, city/locality search, **Personalise my search** CTA, quick-filter categories (e.g., "Ready to move", "Under ₹75L", "Near metro"), sample properties, a "How we research" explainer (the status legend).
- Guests can browse Discover, filter, open Research Pages and see evidence and statuses.
- Guests can't see fit bands, "best match" labels or personalised next actions. Those slots show "Add your needs to see how this fits you."
- **Upgrade prompts** appear when a guest taps Save/Shortlist, Compare, "Does this fit me?" or asks the Advisor a personal question. The prompt opens a short inline onboarding (steps 3–4 only) and then completes the original action.

## 3. Home: Decision Dashboard (personalised) [C]
Order of content, which answers "focus / discovered / attention / next":
1. **Profile summary strip:** ₹85L · 2–3 BHK · Bellandur + Whitefield · *Edit*.
2. **Research funnel:** Discovered 10 → Meet hard constraints 6 → Worth exploring 3 → Need investigation 2.
3. **Needs your attention** (max 3, ranked by severity): e.g., "Area mismatch at *Project A* (1,250 vs 1,080 sq ft)".
4. **Worth considering** (focused list, 3–5): each card shows fit band, top 2 reasons, top trade-off, evidence confidence and next-action button.
5. **Alternatives:** "Slightly over budget but strong fit" and "Fits budget, longer commute". These are clearly separated and never mixed into the main list.
6. **Location & future** insight (1 card).
7. **Recent updates** → Insights.

States: loading (skeleton + pipeline steps), **no matches**, **few matches**, **limited evidence** (see §9).

## 4. Discover [C]
Search bar (city/locality/project/builder) + **AI search toggle**. Filters: price, BHK, type, possession, carpet area. Sort: Best fit (personalised only), price, commute, research completeness. List ↔ Map toggle.
**NL search flow:** query → parsed chips ("≤ ₹80L", "2–3 BHK", "≤ 30 min to Bellandur", "schools ≤ 2 km") shown with "Here's how I read that". The user can remove or edit any chip. Results show which chips each property meets or misses. Unparseable parts are flagged ("I couldn't interpret 'good vibe'—ignored").

## 5. Property Research Page [C]
Sticky header: name, price, fit band (personalised), **next action**, Save.
Tabs or sections:
1. **Overview:** price + cost breakdown (each line has a status), configuration, carpet vs super built-up, possession, builder, a "Why this may fit you" paragraph.
2. **Verification & Evidence:** a claim table (claim → value → status → source → date). Tapping a claim opens an evidence sheet with the source, extracted text, method and uncertainty note. Conflicting claims show the values side by side.
3. **Location:** map, commute to each important place (Estimated, with method), schools, hospitals, transit.
4. **Future Outlook:** infrastructure items with a stage tracker, source/date and possible +/− impact. Includes a "no guarantees" note.
5. **AI Research Summary:** fit reasons, attractions, limitations, missing info, **questions to ask the builder** (copy/share), recommended next action with its reason.

Contextual actions: *Ask about this property*, *Add questions to visit checklist*, *Compare with…*, *Mark as visited / walked away*.

## 6. Shortlist & Compare [C]
- The list has status per property: Considering / Visit planned / Visited / Investigating / Walked away.
- Compare 2–3: rows for price (all-in), carpet area, ₹/sq ft carpet, commute per place, possession, evidence confidence, fit per priority, pros and cons.
- **Decision Advisor** summary at the top: "For your priorities (commute > schools > budget), *B* fits better, but *A*'s possession date is verified while *B*'s is only sourced." The summary includes the reason it gives and a suggested next step.
- Differences are highlighted and identical rows collapse.

## 7. Insights [C]
A chronological, filterable feed (Conflicts · Missing docs · Infrastructure · Changes · Recommendations). Each item contains: what was found, why it matters to *you*, evidence link, action (Ask builder / View property / Dismiss / Snooze). Unread count shows on the tab.

## 8. Key journeys (demo spine)
| J | Journey | Agent |
|---|---|---|
| J1 | Onboard via NL → see Decision Home → open top match → read evidence | — |
| J2 | Home "Needs attention" alert → area discrepancy → see both sources → add builder questions to checklist → next action changes to **Investigate** | Investigator (proactive) |
| J3 | Shortlist 3 → Compare → ask "Which should we visit first this weekend?" → reasoned answer + plan | Advisor (user-initiated) |
| J4 | Change budget ₹85L → ₹75L → Home re-ranks, a property moves to "Over budget" with explanation | Decision engine |
| J5 | Demo control "3 weeks later" → metro segment moves Approved → Under construction → notification on shortlisted property | Future Analyst (proactive) |
| J6 | Guest explores → taps Save → inline mini-onboarding → saved | — |

## 9. Edge cases & system responses
| Scenario | System response | UX behaviour |
|---|---|---|
| Skips onboarding | Guest mode | No fit bands. Persistent soft "Personalise" CTA |
| Incomplete preferences | Use defaults and flag them as *Assumption* | Chips that say "Assumed: apartment only · edit" |
| No matches | Show which constraint eliminates most properties ("Budget removes 7 of 10") | Offer one-tap relaxations with an exact impact preview ("+₹5L → 3 more homes"). Nothing is auto-relaxed |
| Few matches (1–2) | Show them + labelled alternatives | Copy: "Only 2 homes meet every requirement" |
| Outdated data | A claim older than threshold [A: 90 days] gets flagged "Possibly outdated" | Date badge + "Re-check" action (simulated) |
| Sources disagree | Status *Conflicting* with both values | Side-by-side values, "why it matters" and builder question |
| Documents unavailable | Status *Unknown* / *Not assessed* | Missing-doc alert + what to request |
| Above budget | Excluded from the main list. Shown in Alternatives with the delta | Red-free, neutral "₹4.2L over" label |
| API/LLM failure | Fall back to cached/template explanation | Subtle "Showing saved analysis" note. The app never shows a blank state |
| No future dev info | Status *Unknown* | "No reliable development information found" (not empty) |
| Budget/location change | Re-run the deterministic evaluation | Toast with the diff: "2 homes added, 1 moved to alternatives" |
| Property changes after shortlisting | Insight + badge on the shortlist card | "Price changed ₹78L → ₹81L (source, date)" |
| NL query partly unparseable | Parse what is possible and list the ignored parts | Editable chips |
| All matches have weak evidence | Banner: "Matches found, but evidence is thin" | Next action defaults to *Investigate* |

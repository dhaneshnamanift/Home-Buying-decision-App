# Database Schema (preliminary; not created)

Postgres-shaped, so it can map 1:1 to Supabase later. The MVP stores the same shapes as typed seed files (see [TECHNICAL §4](TECHNICAL_ARCHITECTURE.md#4-database)).
Core principle **[C]:** *raw source claims are stored separately from the normalised property record.* The normalised value is a derived view of the claims.

## 1. Entity map
```
builders 1─* projects 1─* properties 1─* listings *─1 sources
                              │              │
                              │              └─* claims ─* evidence
                              ├─* claims (property-level, from any source)
                              ├─* property_pois / commute_estimates
                              └─* findings (agent output)
developments 1─* development_stage_events     (geo-linked to properties)
users 1─1 buyer_profiles 1─* important_places
users 1─* shortlist_items *─1 properties
users 1─* comparisons ─* properties
users 1─* notifications ─? findings | development_stage_events
documents (uploaded/seeded) ─* claims
```

## 2. Tables (key fields)
**Reference / research**
| Table | Key fields |
|---|---|
| `sources` | id, name, type (`rera_portal`, `builder_site`, `brochure`, `portal_listing`, `govt_notice`, `master_plan`, `platform_calc`), url, reliability_tier (1=authoritative…3=marketing), access_basis (licence/permission note), **is_simulated** |
| `builders` | id, name, rera_promoter_id?, is_simulated |
| `projects` | id, builder_id, name, locality, city, lat/lng, rera_reg_no?, launch_date?, is_simulated |
| `properties` | id, project_id, tower/unit_type, bhk, property_type, **normalised** fields (price, carpet_sqft, sba_sqft, possession_date, construction_stage), normalised_at, evidence_confidence, dedupe_key |
| `listings` | id, property_id, source_id, external_ref, listed_price, captured_at, raw_payload (json), is_duplicate_of? |
| `documents` | id, project_id/property_id, source_id, kind (brochure, rera_cert, floor_plan, oc, cc, price_sheet), storage_path, captured_at, is_simulated |
| `claims` | id, property_id (or project_id), **field** (e.g., `carpet_area_sqft`), **value** (json), unit, source_id, document_id?, listing_id?, extracted_text, page_ref, captured_at, extraction_method (`manual_seed`/`llm`/`api`) |
| `claim_assessments` | id, property_id, field, **status** (7-state enum, see [AI §4](AI_SYSTEM_ARCHITECTURE.md#4-claim-status-model)), chosen_claim_id?, conflicting_claim_ids[], method, uncertainty_note, assessed_at, assessed_by (`rule`/`human`) |
| `evidence` | id, claim_assessment_id, claim_id, role (`supports`/`contradicts`), note |
| `property_pois` | property_id, poi_type (school/hospital/metro/bus), name, distance_m, source_id, status |
| `commute_estimates` | property_id, place_key, minutes_peak, minutes_offpeak, method, status=`estimated` |
| `developments` | id, name, type (metro/road/school/hospital/commercial), geometry/lat-lng, current_stage, source_id, is_simulated |
| `development_stage_events` | id, development_id, stage, effective_date, source_id, captured_at |
| `findings` | id, property_id, agent (`investigator`/`future_analyst`), type (conflict/missing/stale/loading/drift/stage_change), severity, claim_assessment_id?, development_event_id?, summary, why_it_matters, builder_questions[], created_at, status (open/resolved/dismissed) |

**User**
| Table | Key fields |
|---|---|
| `users` | id, created_at, is_guest (MVP: local id only) |
| `buyer_profiles` | user_id, intent, city, localities[], budget_max, budget_comfort, bhk[], property_types[], priorities (ranked json), field_sources (json: user_stated/inferred/default), version, updated_at |
| `important_places` | id, user_id, label, lat/lng, locality |
| `shortlist_items` | user_id, property_id, status (considering/visit_planned/visited/investigating/walked_away), notes, checklist (json), added_at, snapshot (normalised values at save, used for change detection) |
| `comparisons` | id, user_id, property_ids[], advisor_summary_cache, created_at |
| `notifications` | id, user_id, finding_id?, development_event_id?, title, body, read_at, created_at |
| `ai_runs` | id, kind, input_hash, model, output (json), cited_claim_ids[], created_at (cache + audit) |

## 3. How the schema supports the requirements
| Requirement | Mechanism |
|---|---|
| Multiple listings per property | `listings.property_id` |
| Duplicate detection | `properties.dedupe_key` (RERA no. or normalised builder+project+tower+config) and `listings.is_duplicate_of` |
| Sources disagree | Many `claims` per (property, field). `claim_assessments.conflicting_claim_ids` |
| Evidence history | Claims are append-only with `captured_at`. Assessments are versioned by `assessed_at` |
| Timestamped updates | `captured_at` everywhere. Stage events table |
| Personal preferences | `buyer_profiles` + `field_sources` (assumption tracking) |
| Change after shortlisting | Diff `shortlist_items.snapshot` vs current normalised values → finding + notification |
| Future dev monitoring | Geo radius join of developments ↔ shortlisted properties, then react to new `development_stage_events` |

## 4. Data flow
Source/doc → **claims** (raw, cited) → normalise + dedupe → **claim_assessments** (status via rules) → **properties** normalised fields + evidence_confidence → engine (with buyer_profile) → fit + next action → LLM explanation (cites claim ids) → findings/notifications.

## 5. RLS (if Supabase is adopted)
Reference tables are read-only to all. User tables have `user_id = auth.uid()` policies. Writes to reference tables go through the service role only.

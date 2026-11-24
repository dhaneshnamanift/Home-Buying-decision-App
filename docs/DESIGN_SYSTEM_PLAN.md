# Design System Plan

**Source:** `design.md` ("Zero Interface", version alpha). It was supplied in chat on 2026-11-24 and saved verbatim as [reference/design.md](reference/design.md) (that copy is never edited).
**Status:** Derived from design.md. Conflicts are listed in §7. Items marked 🟡 use my proposed resolution until you decide otherwise.

## 1. How "Zero Interface" maps to the Decision Room
design.md describes a philosophy where *the screen is the bottleneck* and the system shows only what matters, when it matters. That matches the brief's "proactive AI, not a listing grid" well.

| design.md principle | Application in this product |
|---|---|
| Minimal visible UI | Home shows **one focus at a time**: attention items, then 3–5 homes. No listing feed, few badges |
| Progressive disclosure | Claim → tap → evidence sheet. Fit band → tap → per-criterion breakdown. Research page sections collapsed after the summary |
| AI predictions (hidden/revealed, smooth reveal) | AI summary and next action are revealed with the fade + translate-Y entry. Reasons expand on demand |
| Smart suggestions, contextual | Suggested Advisor prompts per screen ("Which should we visit first?"), one-tap relaxations on no-match, builder-question suggestions |
| Context-aware actions | A single **next-action** button per property, changing with evidence (Visit / Investigate / Shortlist / Walk away) |
| Voice-first / voice recognition UI | Mic button on onboarding and AI search (browser Web Speech API) with a listening state and live transcript → parsed chips. Text input always available |
| Gesture detection | Swipe on Home/Discover cards: right = shortlist, left = dismiss. Swipe an Insight to dismiss. Pull to refresh research. Buttons remain available for every gesture |
| Density 3/10 (airy), Variance 2/10 (structured), Motion 4/10 (subtle) | Generous spacing, a consistent card anatomy, restrained motion |

## 2. Colour
| Token | Value | Source | Use |
|---|---|---|---|
| `surface` (primary) | `#FAFAFA` | design.md | App background, cards |
| `surface-muted` (secondary) | `#F0F0F0` | design.md | Borders, dividers, muted fills, skeletons |
| `surface-warm` (tertiary) | `#F5F1E8` | design.md | AI/insight surfaces (Research summary, Advisor sheet), so AI content is identifiable without sparkles or purple |
| `ink` | `#1F2328` 🟡 | added (design.md: "no pure black, use charcoal") | Primary text, **accent** fill |
| `ink-muted` | `#5F6368` 🟡 | added | Secondary text (see C2) |
| `border` | `#E4E4E4` 🟡 | added | 1px card/input strokes |
| `danger` | `#B3261E` 🟡 | design.md "semantic red" | Input errors only, plus hospital markers on the map |
| `tint-50` / `tint-100` / `tint-200` | `#F1F3F8` / `#E6E9F2` / `#D5D9E8` | Lightened tints of the CTA hue (228°), not a new hue | Small UI elements only: selected states, segmented control, section icon tiles, notification group header, chat bubbles. **Rule (user, 2026-11-24): every page background and content card is white `#FFFFFF`. Colour goes only on CTAs, icons, active states, indicators, charts, borders and small accents.** AI cards are white with a warm accent edge |
| `cta` | `#252C49` | User-supplied dark reference (2026-11-24) | Primary CTA buttons and the next-action pill. 13:1 contrast with `#FAFAFA` text. Hover `#1C2239` |

**Status palette 🟡** (muted, saturation < 80%, always icon + label, never colour alone):

| Status | Colour | Lucide icon |
|---|---|---|
| Verified | `#2E7D5B` green | `badge-check` |
| Sourced | `#4A6A8A` slate blue | `file-text` |
| Conflicting | `#B26A00` amber | `git-compare` |
| Estimated | `#2E7A7A` teal | `calculator` |
| Assumption | `#7A6A55` warm grey | `circle-dashed` |
| Unknown | `#6B6B6B` grey | `help-circle` |
| Not assessed | `#6B6B6B` outline only | `circle-off` |

Fit bands (Strong / Good / Partial) use **ink weight/fill levels** (filled, half, outline) and no hue, so personal fit never gets confused with evidence status.

## 3. Typography (from design.md)
| Role | Spec |
|---|---|
| Font | System UI stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) |
| Hero (welcome screen only) | `clamp(2.5rem, 5vw, 4rem)`, 700, tight tracking |
| H1 | 2.25rem / 700 (used sparingly on mobile: screen titles use H2) |
| H2 | 1.5rem |
| Body | 1rem / 1.6, max 72ch |
| Small | 0.875rem |
| Label | 0.875rem / 500, slight letter-spacing. Caps variant 0.75rem / 500 (see C6) |
| Mono | **JetBrains Mono**: claim values, sq ft, ₹ figures in evidence tables, source dates, RERA-style IDs. This "technical values" usage makes the evidence look like data, which suits the trust goal |

## 4. Space, shape, elevation, layering
- **Spacing:** 8px base (4/8/16/24/32/48). Mobile screen padding 1.5rem (design.md side padding).
- **Radius:** 8px (0.5rem) everywhere. Sheets use 8px top corners.
- **Shadow:** a single level, `0 2px 8px rgba(0,0,0,0.06)` (see C4). No glows.
- **Borders:** 1px `border` on cards and inputs. 1.5px on ghost buttons.
- **z-index:** base 0 · sticky-nav (bottom tab bar) 100 · overlay (sheets, scrim) 200 · modal 300 · toast 500.
- **Viewport:** `min-h-[100dvh]` and never `h-screen`. No horizontal overflow. Multi-column collapses below 768px.

## 5. Motion (from design.md)
- Ease-out, 200–300ms for interactions. Hover: colour + shadow shift over 200ms.
- Entry: fade + translateY 16px→0, 420ms. Lists stagger 80ms (Home focus list, claim rows).
- Page/tab transitions: fade only, 200ms.
- Animate only `transform` and `opacity`.
- Loading: **shimmer skeletons** matching component shape, plus the onboarding "building your room" pipeline steps. No spinners.
- Respect `prefers-reduced-motion`.

## 6. Components
| Component | Spec |
|---|---|
| Primary button | `ink` fill, `surface` text, 0.5rem radius, 12px padding, 600 weight. Hover 8% darken + lift shadow. Active translateY(1px) |
| Ghost button | 1.5px muted border, `ink` text, hover fill `surface-muted` |
| Card | `surface`, 1px border, 8px radius, shadow (§4) |
| Input | Label above, 1px border, focus ring 2px `ink` offset 2px, error text below in `danger`. No floating labels |
| Bottom nav | `surface` background, Lucide icons + labels. Active = `ink` indicator bar + 500 weight |
| Empty state | Lucide icon + descriptive text + one action (no-match, no insights, empty shortlist) |
| Voice input | Mic button → listening state (opacity pulse only; no layout animation) → live transcript → parsed chips |
| AI block | `surface-warm` background, label "Research summary" (no sparkle icon), tappable citation chips in mono |
| Others (product-specific) | StatusBadge, Claim row, Evidence sheet, Conflict A-vs-B, Stage tracker, Compare table, Insight item, Demo-data tag. All built from the tokens above |

**Imagery:** inline SVG building/floor-plan illustrations, not picsum (see C5). Icons: **Lucide** only. No emojis.
**Copy:** none of "Elevate", "Seamless", "Unleash", "Next-Gen". No lorem ipsum: all demo copy is real product copy.

## 7. Conflicts & resolutions (your call)
| # | Conflict | Proposed resolution |
|---|---|---|
| C1 | design.md references an **accent colour** but defines none, and front matter sets the primary button to `#FAFAFA` (invisible on a `#FAFAFA` surface) | Use charcoal `ink #1F2328` as the accent and primary button fill 🟡 |
| C2 | `#F0F0F0` is listed for "secondary text", but it has roughly 1.1:1 contrast on `#FAFAFA` and fails WCAG | Use `#F0F0F0` for borders/muted fills only, and `#5F6368` for secondary text 🟡 |
| C3 | No semantic colours, but the product needs 7 distinguishable statuses | Muted status palette (§2), always paired with icon + label 🟡 |
| C4 | Card shadow `0 2px 12px 0.06` exceeds the "no shadows heavier than `0 2px 8px 0.08`" rule (blur 12 > 8) | Use `0 2px 8px rgba(0,0,0,0.06)` 🟡 |
| C5 | "Use picsum.photos" gives random photos, which would show misleading pictures as if they were the (fictional) properties | Inline SVG illustrations, labelled illustrative 🟡 |
| C6 | Label size is 0.75rem in front matter but 0.875rem in prose | 0.875rem default label, 0.75rem only for uppercase micro-labels 🟡 |
| C7 | The layout section targets **landing pages** (1280px container, split hero, zig-zag sections, 4–8rem gaps), but this is a mobile-first app | Apply it to the welcome/intro screen and the desktop judge view (device frame left, annotation rail right). App screens use mobile spacing 🟡 |
| C8 | "Full light/dark" support vs a 2–3 hour build | **Light only** for the hackathon. Tokens are named so dark mode can be added later 🟡 |
| C9 | "Voice-first" vs reliability: the Web Speech API is unsupported in Firefox and some browsers | Voice is offered wherever supported and text is always available. The demo should be presented in Chrome 🟡 |

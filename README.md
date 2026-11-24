# Home Buying Decision Room (hackathon prototype)

**Live demo:** https://claude.ai/artifact/4P8qmtSgkKWtzhCoURykAn

Open it on desktop for the phone view plus walkthrough notes, or on a phone for the full-screen app. Use **Load demo couple** or **Load demo investor** to start.

A research and decision room for first-time homebuyers in Delhi NCR. **All projects, builders, documents and developments are fictional and simulated.** Locality names are real.

- `app/`: the prototype (no build step, no dependencies). `data.js` holds the seed dataset, `engine.js` the deterministic decision engine and agents, and `app.js` the UI.
- `docs/`: product, AI, technical and design documentation. Start at [docs/README.md](docs/README.md).
- `tools/build-artifact.ps1`: bundles `app/` into `dist/decision-room.html` for publishing.

## Run locally
Voice input works only in a local Chrome or Edge window, not in the published artifact. To run locally, serve the `app/` folder with any static web server and open it in Chrome. Opening `app/index.html` directly also works, but some browsers block the microphone on `file://`.

## Demo story
1. Onboard: tap **Use sample** or speak your needs.
2. Home: open the **carpet area mismatch** at Neelam Heights (Agent 1: Property Investigator).
3. Save 3 homes, then **Compare**, then "Which should we visit first?" (Agent 2: Decision Advisor).
4. Demo controls (sliders icon): **Budget ₹60 L** shows the no-match state with exact relaxations.
5. **3 weeks later** triggers a metro stage change (Agent 3: Future Development Analyst).

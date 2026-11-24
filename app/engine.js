/* Deterministic decision engine + grounded templated "AI" narration.
   Rule: code decides; text only explains what the data says. */
(function () {
  var E = DR.engine = {};
  Object.keys(DR.INVEST_CRITERIA).forEach(function (k) { DR.CRITERIA[k] = DR.INVEST_CRITERIA[k]; });
  /* Display name: investors see their own project-name set (same underlying simulated data) */
  E.invest = false;
  E.nameOf = function (p) { return E.invest && p.invName ? p.invName : p.name; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var STATUS_WEIGHT = { verified: 1, sourced: 0.6, estimated: 0.6, assumption: 0.4, conflicting: 0.2, unknown: 0, not_assessed: 0 };

  E.prop = function (id) { return DR.PROPERTIES.find(function (p) { return p.id === id; }); };
  E.claim = function (p, field) { return p.claims.find(function (c) { return c.field === field; }); };
  E.daysOld = function (iso) { return Math.round((new Date(DR.TODAY) - new Date(iso)) / 864e5); };

  /* ---- Hard constraints (never relaxed silently) ---- */
  E.hardCheck = function (p, prof) {
    var fails = [];
    if (p.price > prof.budgetMax) fails.push({ k: 'budget', text: '₹' + fmt(p.price - prof.budgetMax) + ' L over budget', delta: p.price - prof.budgetMax });
    if (prof.bhk && prof.bhk.indexOf(p.bhk) < 0) fails.push({ k: 'bhk', text: p.bhk + ' BHK (you need ' + prof.bhk.join(' or ') + ')' });
    if (prof.types && prof.types.indexOf(p.type) < 0) fails.push({ k: 'type', text: p.type + ' not in your types' });
    if (prof.intent === 'invest') {
      if (prof.status === 'ready' && p.stage !== 'Ready to move') fails.push({ k: 'status', text: 'Under construction (you want ready to move)' });
      if (prof.status === 'uc' && p.stage !== 'Under construction') fails.push({ k: 'status', text: 'Ready to move (you want under construction)' });
      if (prof.localities && prof.localities.length && !prof.localities.some(function (l) { return p.locality.indexOf(l) >= 0; })) fails.push({ k: 'loc', text: p.locality.split(',')[0] + ' is outside your localities' });
    }
    return fails;
  };

  E.LIVE_KEYS = ['commute', 'schools', 'possession', 'budget', 'amenities', 'connectivity'];
  E.keys = function (prof) { return prof && prof.intent === 'invest' ? Object.keys(DR.INVEST_CRITERIA) : E.LIVE_KEYS; };
  var STAGE_W = { Proposed: 0.2, Announced: 0.3, Approved: 0.5, Funded: 0.6, 'Under construction': 0.75, Operational: 0.9 };

  /* Rent & yield: rent is SOURCED from simulated comparables; yield is ESTIMATED (gross, before costs) */
  E.rent = function (p) {
    var r = p.inv && p.inv.rent;
    if (!r) return null;
    var mid = (r.lo + r.hi) / 2, y = mid * 12 / (p.price * 1e5) * 100;
    return { lo: r.lo, hi: r.hi, n: r.n, mid: mid, yield: Math.round(y * 10) / 10, ylo: Math.round(r.lo * 12 / (p.price * 1e5) * 1000) / 10, yhi: Math.round(r.hi * 12 / (p.price * 1e5) * 1000) / 10 };
  };
  E.growth = function (p, stageOf) {
    var best = null;
    DR.DEVELOPMENTS.forEach(function (d) {
      if (d.near[p.id] == null) return;
      var st = stageOf ? stageOf(d) : d.history[d.history.length - 1].stage, km = d.near[p.id];
      var s = (STAGE_W[st] || 0.2) * (km <= 1.5 ? 1 : km <= 3 ? 0.75 : 0.5);
      if (!best || s > best.s) best = { s: s, d: d, st: st, km: km };
    });
    return best;
  };

  E.investCriteria = function (p, prof) {
    var out = {}, rt = E.rent(p);
    out.yield = rt ? { s: clamp((rt.yield - 2.5) / 3, 0, 1), detail: '~' + rt.yield + '% gross · ₹' + Math.round(rt.lo / 1000) + 'k–' + Math.round(rt.hi / 1000) + 'k/mo', status: 'estimated' } : { s: null, detail: 'No rental comparables found', status: 'unknown' };
    var dm = p.inv ? p.inv.demand : null;
    out.demand = dm != null ? { s: clamp(dm / 60, 0, 1), detail: dm + ' active rental listings within 2 km', status: 'sourced' } : { s: null, detail: 'No rental listing data', status: 'unknown' };
    var g = E.growth(p, E.stageOf);
    out.growth = g ? { s: g.s, detail: g.d.name + ' · ' + g.st.toLowerCase() + ' · ' + g.km + ' km', status: 'sourced' } : { s: null, detail: 'No reliable development information', status: 'unknown' };
    var pc = E.claim(p, 'possession'), oc = E.claim(p, 'oc'), pr = p.inv && p.inv.progress, dv = null, dd = '';
    if (p.stage === 'Ready to move') {
      if (oc && oc.status === 'verified') { dv = 1; dd = 'Ready · OC on file · rentable now'; }
      else if (oc && oc.status === 'unknown') { dv = 0.4; dd = 'Ready · OC not found'; }
      else { dv = 0.7; dd = 'Ready · OC not checked'; }
    } else if (!pc || pc.status === 'unknown') { dv = null; dd = 'Possession date unknown'; }
    else if (pc.status === 'conflicting') { dv = 0.25; dd = 'Possession date disputed' + (pr ? ' · ' + pr.pct + '% built' : ''); }
    else { dv = pr ? 0.35 + 0.6 * pr.pct / 100 : 0.4; dd = p.possession + (pr ? ' · ' + pr.pct + '% built (' + pr.asOf + ')' : ' · progress unknown'); }
    out.delivery = { s: dv, detail: dd, status: pc ? pc.status : 'unknown' };
    return out;
  };

  /* Investment-specific risks (plain language, sourced from the data, never predictions) */
  E.investRisks = function (p, prof) {
    var r = [], rt = E.rent(p), pr = p.inv && p.inv.progress, pc = E.claim(p, 'possession');
    E.findings(p).filter(function (f) { return f.severity !== 'low'; }).forEach(function (f) { r.push({ sev: f.severity, t: f.title, d: f.text }); });
    if (!rt) r.push({ sev: 'medium', t: 'Rental income unknown', d: 'No comparable rental listings were found, so rent and yield can\'t be estimated.' });
    else if (rt.n < 5) r.push({ sev: 'low', t: 'Thin rental evidence', d: 'Rent is based on only ' + rt.n + ' comparable listings.' });
    if (p.stage === 'Under construction') {
      if (!pr) r.push({ sev: 'medium', t: 'Construction progress unknown', d: 'No progress report found. Ask for the latest registry quarterly update.' });
      r.push({ sev: 'low', t: 'No rent until possession', d: 'Expected possession ' + p.possession + '. Payments continue while the home earns nothing.' });
      if (prof && prof.horizon && prof.horizon <= 3) r.push({ sev: 'medium', t: 'Short horizon for an under-construction home', d: 'Construction takes up a large part of your ' + prof.horizon + '-year horizon.' });
    }
    if (p.inv && p.inv.demand != null && p.inv.demand < 25) r.push({ sev: 'low', t: 'Low rental supply nearby', d: 'Only ' + p.inv.demand + ' active rental listings within 2 km. Demand is hard to judge.' });
    return r;
  };

  /* ---- Criterion scores: null = unknown (never scored as 0) ---- */
  E.criteria = function (p, prof) {
    if (prof.intent === 'invest') return E.investCriteria(p, prof);
    var out = {};
    var cm = prof.commuteMax || 45;
    var per = prof.places.map(function (pl) {
      var m = p.commute[pl.key];
      return { label: pl.label, min: m, ok: m <= cm, s: clamp(1 - (m - 15) / (cm + 15 - 15) * 0.75, 0, 1) };
    });
    var worst = Math.min.apply(null, per.map(function (x) { return x.s; }));
    var avg = per.reduce(function (a, x) { return a + x.s; }, 0) / per.length;
    out.commute = { s: per.some(function (x) { return !x.ok; }) ? Math.min(0.35, avg) : avg * 0.6 + worst * 0.4, detail: per.map(function (x) { return x.label.split(' · ')[0] + ' ' + x.min + ' min'; }).join(' · '), status: 'estimated' };
    if (!p.schools.length) out.schools = { s: null, detail: 'No school data', status: 'unknown' };
    else {
      var km = Math.min.apply(null, p.schools.map(function (s) { return s.km; }));
      out.schools = { s: km <= 1 ? 1 : km <= 2 ? 0.75 : km <= 4 ? 0.4 : 0.1, detail: p.schools.length + ' within ' + Math.max.apply(null, p.schools.map(function (s) { return s.km; })) + ' km · nearest ' + km + ' km', status: 'sourced' };
    }
    var pc = E.claim(p, 'possession'), oc = E.claim(p, 'oc');
    var ps = null, pd = '';
    if (!pc || pc.status === 'unknown') { ps = null; pd = 'Possession date unknown'; }
    else if (pc.status === 'conflicting') { ps = 0.3; pd = 'Sources disagree on date'; }
    else if (p.stage === 'Ready to move') {
      if (oc && oc.status === 'verified') { ps = 1; pd = 'Ready · OC on file'; }
      else if (oc && oc.status === 'unknown') { ps = 0.45; pd = 'Ready · OC not found'; }
      else { ps = 0.7; pd = 'Ready · OC not checked'; }
    } else { ps = pc.status === 'verified' ? 0.7 : 0.5; pd = p.possession + (pc.status === 'verified' ? ' · consistent across sources' : ' · single source'); }
    out.possession = { s: ps, detail: pd, status: pc ? pc.status : 'unknown' };
    var head = (prof.budgetMax - p.price) / prof.budgetMax;
    out.budget = { s: p.price > prof.budgetMax ? 0 : clamp(0.35 + head / 0.15 * 0.65, 0, 1), detail: p.price > prof.budgetMax ? 'Over budget' : '₹' + fmt(prof.budgetMax - p.price) + ' L headroom', status: E.claim(p, 'price').status };
    out.amenities = { s: p.amenityScore, detail: p.amenityScore == null ? 'Not listed' : p.amenities.slice(0, 3).join(', '), status: p.amenityScore == null ? 'unknown' : 'sourced' };
    out.connectivity = { s: p.transit ? clamp(1 - p.transit.km / 2.5, 0.1, 1) : null, detail: p.transit ? p.transit.n + ' · ' + p.transit.km + ' km' : 'Unknown', status: 'sourced' };
    return out;
  };

  E.weights = function (prof) {
    if (prof.intent === 'invest') {
      return { rental: { yield: 0.4, demand: 0.25, delivery: 0.2, growth: 0.15 }, appreciation: { growth: 0.4, delivery: 0.3, yield: 0.15, demand: 0.15 }, both: { yield: 0.3, growth: 0.3, delivery: 0.2, demand: 0.2 } }[prof.goal || 'both'];
    }
    var w = {}, keys = E.LIVE_KEYS, top = [0.4, 0.25, 0.15];
    var rest = keys.filter(function (k) { return prof.priorities.indexOf(k) < 0; });
    prof.priorities.forEach(function (k, i) { w[k] = top[i] || 0.1; });
    var used = prof.priorities.reduce(function (a, k, i) { return a + (top[i] || 0.1); }, 0);
    rest.forEach(function (k) { w[k] = (1 - used) / rest.length; });
    return w;
  };

  E.evidence = function (p) {
    var crit = p.claims.filter(function (c) { return c.critical; });
    var v = crit.reduce(function (a, c) { return a + STATUS_WEIGHT[c.status]; }, 0) / crit.length;
    var stale = p.claims.some(function (c) { return c.sources.some(function (s) { return E.daysOld(s.accessed) > 90; }); });
    if (stale) v -= 0.2;
    if (crit.some(function (c) { return c.status === 'conflicting'; })) v = Math.min(v, 0.7);
    var counts = {};
    p.claims.forEach(function (c) { counts[c.status] = (counts[c.status] || 0) + 1; });
    return { level: v >= 0.75 ? 'High' : v >= 0.45 ? 'Medium' : 'Low', v: v, counts: counts, stale: stale };
  };

  /* ---- Agent 1 detectors: Property Investigator ---- */
  E.findings = function (p) {
    var f = [];
    p.claims.forEach(function (c) {
      if (c.status === 'conflicting') f.push({ id: p.id + '-' + c.field, pid: p.id, type: 'conflict', severity: c.field === 'price' ? 'medium' : 'high', claim: c,
        title: c.label + ' mismatch', text: c.sources.map(function (s) { return DR.SOURCE_TYPES[s.type].name.replace(' (PDF)', '') + ': ' + s.value; }).join(' vs ') });
      else if (c.status === 'unknown' && c.critical) f.push({ id: p.id + '-' + c.field, pid: p.id, type: 'missing', severity: c.field === 'oc' || c.field === 'rera' ? 'high' : 'medium', claim: c,
        title: c.label + ' not found', text: c.note || 'No source available.' });
    });
    var ev = E.evidence(p);
    if (ev.stale) f.push({ id: p.id + '-stale', pid: p.id, type: 'stale', severity: 'low', title: 'Data may be outdated', text: 'Sources were last checked ' + E.daysOld(p.claims[0].sources[0].accessed) + ' days ago.' });
    if (p.duplicate) f.push({ id: p.id + '-dup', pid: p.id, type: 'duplicate', severity: 'low', title: 'Duplicate listings merged', text: 'Two portal listings describe the same unit and were combined into one property.' });
    if (p.carpet && p.sba && (p.sba - p.carpet) / p.sba > 0.32) f.push({ id: p.id + '-loading', pid: p.id, type: 'loading', severity: 'low', title: 'High loading (' + Math.round((p.sba - p.carpet) / p.sba * 100) + '%)', text: 'Super built-up area is much larger than carpet area. Compare prices per sq ft of carpet, not SBA.' });
    return f;
  };

  E.whyItMatters = function (fd, p) {
    var m = {
      'p2-carpet': 'You would pay for 170 sq ft that may not be usable floor area, about ₹13 L at this price per sq ft. RERA sale agreements must state carpet area, so the lower registry figure is what you would legally get.',
      'p3-price': 'At ₹84.5 L your headroom drops from ₹7 L to ₹0.5 L, before ~7% stamp duty and registration (an assumption, see the cost breakdown).',
      'p4-oc': 'Without an occupancy certificate, banks may delay loan disbursal, utility connections can stay temporary, and resale becomes harder. For a ready-to-move home this is a key check.',
      'p7-possession': 'A 6-month slip means about 6 more months of rent alongside EMIs. The brochure is out of date, so ask which date goes into the agreement.',
      'p8-rera': 'Under-construction projects generally must be registered. If no registration exists, you would have limited recourse if things go wrong.',
      'p8-builder': 'Without a named builder there is no track record to check.'
    };
    if (m[fd.id]) return m[fd.id];
    if (fd.type === 'stale') return 'Prices and availability may have changed. Re-check before you visit.';
    if (fd.type === 'loading') return 'Per-sq-ft prices quoted on SBA can make this home look cheaper than it is.';
    if (fd.type === 'duplicate') return 'Duplicate listings can make supply look larger than it is.';
    return 'This affects how confident we can be about this home.';
  };

  /* ---- Evaluate one property for a profile ---- */
  E.evaluate = function (p, prof) {
    var ev = E.evidence(p);
    var fds = E.findings(p);
    if (!prof) return { p: p, ev: ev, findings: fds };
    var fails = E.hardCheck(p, prof);
    var cr = E.criteria(p, prof), w = E.weights(prof), num = 0, den = 0, unknown = [];
    Object.keys(cr).forEach(function (k) { if (cr[k].s == null) unknown.push(k); else { num += cr[k].s * w[k]; den += w[k]; } });
    var score = den ? num / den : 0;
    var top = prof.priorities[0];
    if (cr[top] && cr[top].s != null && cr[top].s < 0.4) score = Math.min(score, 0.54);
    var band = fails.length ? 'None' : score >= 0.7 ? 'Strong' : score >= 0.55 ? 'Good' : 'Partial';
    var high = fds.filter(function (f) { return f.severity === 'high'; });
    var action, reason;
    if (fails.length) { action = 'walk'; reason = 'Fails a hard requirement: ' + fails.map(function (f) { return f.text; }).join('; ') + '.'; }
    else if ((band === 'Strong' || band === 'Good') && high.length) { action = 'investigate'; reason = 'Good fit, but ' + high[0].title.toLowerCase() + '. Clarify before you visit.'; }
    else if ((band === 'Strong' || band === 'Good') && ev.level !== 'Low') { action = 'visit'; reason = 'Fits your priorities and the key facts are backed by evidence.' + (fds.some(function (f) { return f.severity === 'medium'; }) ? ' Ask about the open item at the visit.' : ''); }
    else if (ev.level === 'Low') { action = 'investigate'; reason = 'Too little evidence to judge. Request documents first.'; }
    else { action = 'shortlist'; reason = 'Meets your requirements but compromises on ' + DR.CRITERIA[top].toLowerCase() + '. Keep it as a backup.'; }
    return { p: p, ev: ev, findings: fds, fails: fails, cr: cr, w: w, score: score, band: band, unknown: unknown, action: action, reason: reason };
  };

  E.run = function (prof) {
    var all = DR.PROPERTIES.map(function (p) { return E.evaluate(p, prof); });
    if (!prof) return { all: all };
    var pass = all.filter(function (r) { return !r.fails.length; });
    var focus = pass.filter(function (r) { return (r.band === 'Strong' || r.band === 'Good') && (r.action === 'visit' || r.action === 'investigate'); }).sort(function (a, b) { return b.score - a.score; });
    var compromise = pass.filter(function (r) { return focus.indexOf(r) < 0; });
    var over = all.filter(function (r) { return r.fails.length === 1 && r.fails[0].k === 'budget' && r.fails[0].delta <= prof.budgetMax * 0.08; });
    return { all: all, pass: pass, focus: focus, compromise: compromise, over: over,
      worth: focus.filter(function (r) { return r.action === 'visit'; }), investigate: focus.filter(function (r) { return r.action === 'investigate'; }) };
  };

  /* Which constraint removes most homes + relaxations with exact impact */
  E.relaxations = function (prof) {
    var base = E.run(prof).pass.length, out = [];
    var b = Object.assign({}, prof, { budgetMax: prof.budgetMax + 8 });
    out.push({ label: 'Raise budget to ₹' + b.budgetMax + ' L', gain: E.run(b).pass.length - base, patch: { budgetMax: b.budgetMax } });
    var all = [1, 2, 3, 4];
    if (prof.bhk && prof.bhk.length < 4) out.push({ label: 'Include all BHK sizes', gain: E.run(Object.assign({}, prof, { bhk: all })).pass.length - base, patch: { bhk: all } });
    if (prof.intent === 'invest') {
      if (prof.status !== 'both') out.push({ label: 'Include ready and under-construction homes', gain: E.run(Object.assign({}, prof, { status: 'both' })).pass.length - base, patch: { status: 'both' } });
      if (prof.localities && prof.localities.length) out.push({ label: 'Search all localities', gain: E.run(Object.assign({}, prof, { localities: [] })).pass.length - base, patch: { localities: [] } });
      if (prof.types.length < 2) out.push({ label: 'Include villas too', gain: E.run(Object.assign({}, prof, { types: ['Apartment', 'Villa'] })).pass.length - base, patch: { types: ['Apartment', 'Villa'] } });
    } else out.push({ label: 'Allow 60 min commute', gain: 0, patch: { commuteMax: 60 }, note: 'Changes fit, not eligibility' });
    var blockers = { budget: 0, bhk: 0, type: 0, status: 0, loc: 0 };
    DR.PROPERTIES.forEach(function (p) { E.hardCheck(p, prof).forEach(function (f) { blockers[f.k]++; }); });
    var worst = Object.keys(blockers).sort(function (a, c) { return blockers[c] - blockers[a]; })[0];
    return { base: base, options: out.filter(function (o) { return o.gain > 0 || o.note; }), worst: worst, worstCount: blockers[worst] };
  };

  /* All-in cost estimate (each line labelled) */
  E.costs = function (p) {
    var uc = p.stage === 'Under construction';
    var lines = [{ l: 'Quoted price', v: p.price, st: E.claim(p, 'price').status }];
    if (uc) lines.push({ l: 'GST 5% (under construction)', v: +(p.price * 0.05 * 0.67).toFixed(1), st: 'estimated', note: 'Applied on ~2/3 of value (land abatement)' });
    lines.push({ l: 'Stamp duty + registration ~7%', v: +(p.price * 0.07).toFixed(1), st: 'assumption', note: 'Typical Delhi NCR rate assumed; varies by state and buyer' });
    var m = E.claim(p, 'maint');
    lines.push({ l: 'Maintenance advance (12 mo)', v: m && m.status !== 'unknown' && p.sba ? +((parseFloat(m.value.replace('₹', '')) * p.sba * 12) / 1e5).toFixed(1) : null, st: m ? m.status : 'unknown' });
    var total = lines.reduce(function (a, x) { return a + (x.v || 0); }, 0);
    return { lines: lines, total: +total.toFixed(1), hasUnknown: lines.some(function (x) { return x.v == null; }) };
  };

  /* ---- NL requirement parser (rule-based, transparent) ---- */
  var LOCS = ['Cyber City', 'Sohna Road', 'Golf Course Road', 'Udyog Vihar', 'Dwarka Expressway', 'Noida', 'Faridabad', 'Ghaziabad', 'Connaught Place', 'Okhla'];
  E.parse = function (txt) {
    var t = (txt || '').toLowerCase(), r = { chips: [], prof: {}, ignored: [] };
    var m = t.match(/(\d+(?:\.\d+)?)\s*(lakh|lac|l\b|cr|crore)/);
    if (m) { var v = parseFloat(m[1]) * (/cr/.test(m[2]) ? 100 : 1); r.prof.budgetMax = v; r.chips.push({ k: 'Budget', v: '≤ ₹' + v + ' L', src: 'you said' }); }
    m = t.match(/(\d)\s*(?:-|to|or|\/)\s*(\d)\s*bhk/) || t.match(/(\d)\s*bhk/);
    if (m) { var b = m[2] ? range(+m[1], +m[2]) : [+m[1]]; r.prof.bhk = b; r.chips.push({ k: 'Size', v: b.join('–') + ' BHK', src: 'you said' }); }
    var found = LOCS.filter(function (l) { return t.indexOf(l.toLowerCase()) >= 0; });
    if (/work|office/.test(t) && found.length) {
      r.prof.places = found.slice(0, 2).map(function (l, i) { return { key: 'office' + (i + 1), label: (i === 0 ? 'Priya' : 'Arjun') + ' · ' + l }; });
      r.chips.push({ k: 'Important places', v: found.slice(0, 2).join(' + '), src: 'you said' });
    }
    var pri = [];
    if (/commut|work|office|travel/.test(t)) pri.push('commute');
    if (/school|kid|child|son|daughter/.test(t)) pri.push('schools');
    if (/ready|possession|delay|move in/.test(t)) pri.push('possession');
    if (/metro|transit|train/.test(t)) pri.push('connectivity');
    if (/amenit|pool|gym|club/.test(t)) pri.push('amenities');
    if (pri.length) { r.prof.priorities = pri.slice(0, 3); r.chips.push({ k: 'Priorities', v: pri.slice(0, 3).map(function (k) { return DR.CRITERIA[k]; }).join(' > '), src: 'inferred' }); }
    ['good vibe', 'nice', 'peaceful', 'premium', 'vastu', 'good area'].forEach(function (w) { if (t.indexOf(w) >= 0) r.ignored.push(w); });
    return r;
  };

  /* ---- Agent 2: Decision Advisor (grounded templated answers) ---- */
  E.advise = function (q, ids, prof) {
    var rs = ids.map(function (id) { return E.evaluate(E.prop(id), prof); });
    var t = (q || '').toLowerCase(), cites = [];
    var name = function (r) { return '<b>' + E.nameOf(r.p) + '</b>'; };
    if (!rs.length) return { html: 'Shortlist two or three homes first, and I\'ll compare them against your priorities.', cites: [] };
    if (/visit|first|weekend|order/.test(t)) {
      var order = rs.slice().sort(function (a, b) { var o = { visit: 0, investigate: 1, shortlist: 2, walk: 3 }; return o[a.action] - o[b.action] || b.score - a.score; });
      var html = '<p>Suggested order for this weekend, based on fit and how settled the facts are:</p><ol>' + order.map(function (r) {
        cites.push(r.p.id + ':possession');
        return '<li>' + name(r) + ': ' + (r.action === 'visit' ? 'visit. ' + r.reason : r.action === 'investigate' ? 'call the builder first. ' + (r.findings.filter(function (f) { return f.severity === 'high'; })[0] || {}).title + ' needs an answer, or the visit may be wasted.' : r.reason) + '</li>';
      }).join('') + '</ol><p class="muted">Order uses your priorities (' + prof.priorities.map(function (k) { return DR.CRITERIA[k].toLowerCase(); }).join(' > ') + ') and open findings. Commute times are estimates.</p>';
      return { html: html, cites: cites };
    }
    if (/rent|yield|return|income/.test(t)) {
      return { html: '<p>Estimated rent and gross yield (rent × 12 ÷ quoted price, before maintenance, vacancy and tax):</p><ul>' + rs.map(function (r) {
        var rt = E.rent(r.p); cites.push(r.p.id + ':rent');
        return '<li>' + name(r) + ': ' + (rt ? '₹' + Math.round(rt.lo / 1000) + 'k–' + Math.round(rt.hi / 1000) + 'k a month from ' + rt.n + ' comparable listings, so ~' + rt.ylo + '–' + rt.yhi + '% gross' + (r.p.stage === 'Under construction' ? ', but only after possession (' + r.p.possession + ')' : '') : 'no rental comparables found (unknown)') + '</li>';
      }).join('') + '</ul><p class="muted">Rents come from simulated comparable listings. These are estimates, not guaranteed income, and I don\'t forecast price appreciation.</p>', cites: cites };
    }
    if (/cost|price|afford|all.?in|budget/.test(t)) {
      return { html: '<p>Estimated all-in cost (quoted price + taxes + registration + known charges):</p><ul>' + rs.map(function (r) {
        var c = E.costs(r.p); cites.push(r.p.id + ':price');
        return '<li>' + name(r) + ': ~₹' + c.total + ' L' + (c.total > prof.budgetMax ? ' <span class="warn">(₹' + fmt(c.total - prof.budgetMax) + ' L over your limit once registration is included)</span>' : '') + (c.hasUnknown ? ' · some charges unknown' : '') + '</li>';
      }).join('') + '</ul><p class="muted">Stamp duty and registration use an assumed ~7%. Confirm with your lawyer or bank.</p>', cites: cites };
    }
    if (/compromis|trade|lose|give up|downside|risk/.test(t)) {
      return { html: '<ul>' + rs.map(function (r) {
        var weak = Object.keys(r.cr).filter(function (k) { return r.cr[k].s != null && r.cr[k].s < 0.5; }).map(function (k) { return DR.CRITERIA[k].toLowerCase() + ' (' + r.cr[k].detail + ')'; });
        var unk = r.unknown.map(function (k) { return DR.CRITERIA[k].toLowerCase(); });
        return '<li>' + name(r) + ': ' + (weak.length ? 'you compromise on ' + weak.join(', ') : 'no major compromise on scored criteria') + (unk.length ? '; unknown: ' + unk.join(', ') : '') + '.</li>';
      }).join('') + '</ul>', cites: rs.map(function (r) { return r.p.id + ':summary'; }) };
    }
    if (/school|kid|child/.test(t)) {
      return { html: '<ul>' + rs.map(function (r) { return '<li>' + name(r) + ': ' + (r.p.schools.length ? r.p.schools.map(function (s) { return s.n + ' (' + s.km + ' km)'; }).join(', ') : 'no school data found (unknown)') + '</li>'; }).join('') + '</ul><p class="muted">Distances are straight-line from map data (simulated). School quality is not assessed.</p>', cites: [] };
    }
    var best = rs.slice().sort(function (a, b) { return b.score - a.score; })[0];
    return { html: '<p>For your priorities (' + prof.priorities.map(function (k) { return DR.CRITERIA[k].toLowerCase(); }).join(' > ') + '), ' + name(best) + ' fits best: ' + (E.invest ? Object.keys(best.cr).filter(function (k) { return best.cr[k].s != null; }).sort(function (a, b) { return best.w[b] - best.w[a]; }).slice(0, 2).map(function (k) { return DR.CRITERIA[k].toLowerCase() + ' (' + best.cr[k].detail + ')'; }).join('; ') + '.' : best.p.summary.fit) + '</p><p>' + (best.action === 'investigate' ? 'But it has an open issue: ' + best.reason : best.reason) + '</p><p class="muted">I can answer about visit order, all-in cost, compromises and schools for your shortlisted homes. I don\'t give legal or investment advice.</p>', cites: [best.p.id + ':summary'] };
  };

  function range(a, b) { var r = []; for (var i = Math.min(a, b); i <= Math.max(a, b); i++) r.push(i); return r; }
  function fmt(n) { return (Math.round(n * 10) / 10).toString(); }
  E.fmt = fmt;
})();

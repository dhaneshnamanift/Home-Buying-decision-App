/* Home Buying Decision Room: UI layer (no build step, no dependencies). */
(function () {
  var E = DR.engine;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------------- Icons (Lucide-style strokes) ---------------- */
  var P = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    fileText: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    compare: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>',
    calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/>',
    dashed: '<circle cx="12" cy="12" r="9" stroke-dasharray="3.2 3"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    circleOff: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    right: '<path d="m9 18 6-6-6-6"/>', left: '<path d="m15 18-6-6 6-6"/>', down: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    school: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    hospital: '<path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2z"/>',
    train: '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    scale: '<path d="M12 3v18"/><path d="M7 21h10"/><path d="M3 7h18"/><path d="m3 7 3 8c-1.7 1.3-4.3 1.3-6 0z" transform="translate(3 0)"/><path d="m18 7 3 8c-1.7 1.3-4.3 1.3-6 0z"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    forward: '<path d="m13 19 9-7-9-7z"/><path d="m2 19 9-7-9-7z"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>'
  };
  function ic(n, c) { return '<svg class="i ' + (c || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || '') + '</svg>'; }

  /* ---------------- State ---------------- */
  var KEY = 'dr-state-v1';
  var fresh = function () { return { profile: null, seenWelcome: false, shortlist: {}, order: [], cmp: [], dismissed: {}, read: {}, skip: false, chat: [], draft: null }; };
  var st; try { st = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { st = fresh(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  var ui = { tab: 'summary', showBreak: false, filter: 'all', q: '', qf: {}, sort: 'fit', ob: null, ins: 'all', listening: false };

  /* ---------------- Development stage (Agent 3 time-skip) ---------------- */
  function devStage(d) { return st.skip && d.next ? d.next.stage : d.history[d.history.length - 1].stage; }
  function devHistory(d) { return st.skip && d.next ? d.history.concat([{ stage: d.next.stage, date: d.next.date }]) : d.history; }
  E.stageOf = devStage;

  /* ---------------- Small render helpers ---------------- */
  function badge(status, withLabel) { var s = DR.STATUS[status]; return '<span class="st ' + status + '" title="' + esc(s.desc) + '">' + ic(s.icon, 'sm') + (withLabel === false ? '' : s.label) + '</span>'; }
  function fit(band) { var n = { Strong: 3, Good: 2, Partial: 1, None: 0 }[band]; return '<span class="fit"><span class="bars">' + [0, 1, 2].map(function (i) { return '<i class="' + (i < n ? 'f' : '') + '"></i>'; }).join('') + '</span>' + (band === 'None' ? 'Doesn\'t meet needs' : band + ' fit') + '</span>'; }
  function evi(ev) { return '<span class="evi ' + ev.level + '"><span class="ring"></span>' + ev.level + ' evidence</span>'; }
  var ACT = { visit: ['Visit', 'calendar'], investigate: ['Investigate', 'search'], shortlist: ['Keep as backup', 'bookmark'], walk: ['Walk away', 'logout'] };
  function act(a) { return '<span class="act ' + a + '">' + ic(ACT[a][1], 'sm') + ACT[a][0] + '</span>'; }
  function lakh(v) { return '₹' + E.fmt(v) + ' L'; }

  /* Sample exterior image (inline SVG). Clearly labelled as a sample, never presented as the real property.
     Real photos aren't available for fictional projects, and the artifact host blocks external images. */
  function rect(x, y, w, h, f, o) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"' + (o != null ? ' opacity="' + o + '"' : '') + '/>'; }
  function art(p, h, small) {
    var W = 390, s = p.hue * 37 + 11, out = '';
    var sky = ['#F5F1E8', '#F0F0F0', '#F3F0EA'][p.hue % 3], facade = ['#E8E1D3', '#DCD6CB', '#E6DDD0', '#D9DED8'];
    out += rect(0, 0, W, h, sky);
    out += '<circle cx="' + (300 + (s % 50)) + '" cy="' + (h * 0.22) + '" r="' + (h * 0.09) + '" fill="#FAFAFA" opacity=".9"/>';
    if (p.type === 'Villa') {
      [[70, 0], [205, 1]].forEach(function (v) {
        var x = v[0], y = h * 0.42, w = 120, hh = h * 0.46;
        out += '<path d="M' + (x - 8) + ' ' + y + 'L' + (x + w / 2) + ' ' + (y - h * 0.18) + 'L' + (x + w + 8) + ' ' + y + 'Z" fill="#7A6A55" opacity=".55"/>' + rect(x, y, w, hh, facade[v[1]]);
        out += rect(x + 16, y + 14, 26, 22, '#252C49', 0.22) + rect(x + w - 42, y + 14, 26, 22, '#252C49', 0.22) + rect(x + w / 2 - 12, y + hh - 34, 24, 34, '#7A6A55', 0.5);
      });
    } else {
      var n = 2 + (p.hue % 2);
      for (var t = 0; t < n; t++) {
        var w = 96 + (s * (t + 1)) % 34, x = 24 + t * (W - 48) / n + (s * (t + 2)) % 18, ht = h * 0.5 + (s * (t + 3)) % Math.round(h * 0.34), y = h - ht - 12;
        out += rect(x, y, w, ht, facade[(t + p.hue) % 4]) + rect(x - 4, y - 6, w + 8, 6, '#C9C2B4');
        for (var fy = y + 8; fy < h - 26; fy += 15) {
          for (var c = x + 8; c < x + w - 14; c += 17) out += rect(c, fy, 11, 8, '#252C49', 0.16);
          out += rect(x + 4, fy + 10, w - 8, 2, '#FAFAFA', 0.85);
        }
      }
    }
    for (var k = 0; k < 7; k++) { var tx = 12 + k * 58 + (s * k) % 20, tr = 10 + (s * (k + 1)) % 8; out += rect(tx - 1.5, h - 14 - tr * 0.6, 3, tr, '#7A6A55', 0.5) + '<circle cx="' + tx + '" cy="' + (h - 14 - tr) + '" r="' + tr + '" fill="#2E7D5B" opacity=".28"/>'; }
    out += rect(0, h - 12, W, 12, '#E4E4E4');
    var label = small ? 'Sample' : 'Sample image · not this property';
    out += rect(8, 8, small ? 46 : 168, 18, '#FAFAFA', 0.92) + '<text x="' + (small ? 31 : 92) + '" y="21" text-anchor="middle" font-size="' + (small ? 10 : 10.5) + '" fill="#5F6368" font-family="system-ui,-apple-system,sans-serif">' + label + '</text>';
    return '<svg viewBox="0 0 ' + W + ' ' + h + '" preserveAspectRatio="xMinYMid slice" width="100%" height="100%" role="img" aria-label="Sample illustration of a residential building, not a photo of this property">' + out + '</svg>';
  }

  /* Plain-language issue labels for cards (from Property Investigator findings) */
  var ISSUE = { 'conflict:carpet': 'Area details differ across documents', 'conflict:price': 'Price differs across sources', 'conflict:possession': 'Possession date differs across sources',
    'missing:oc': 'Occupancy certificate not found', 'missing:rera': 'RERA registration needs checking', 'missing:possession': 'Possession information is missing',
    'missing:carpet': 'Carpet area not published', 'missing:builder': 'Builder not identified' };
  function issueLabel(f) { return ISSUE[f.type + ':' + (f.claim ? f.claim.field : '')] || f.title; }
  function issues(r) { return r.findings.filter(function (f) { return f.severity !== 'low'; }).sort(function (a, b) { return (a.severity === 'high' ? 0 : 1) - (b.severity === 'high' ? 0 : 1); }); }
  function issueRow(r) {
    var is = issues(r); if (!is.length) return '';
    return '<div class="issue">' + ic('alert', 'sm') + '<span class="t">' + esc(issueLabel(is[0])) + (is.length > 1 ? ' <span class="muted">· +' + (is.length - 1) + ' more</span>' : '') + '</span><span class="more" data-go="#p-' + r.p.id + '-evidence">' + (is.length > 1 ? 'View investigation' : 'Details') + '</span></div>';
  }

  /* ---------------- Property card (personalised / guest) ---------------- */
  function pcard(r, opts) {
    opts = opts || {};
    var p = r.p, reasons = '';
    if (r.cr && !opts.compact) {
      var good = Object.keys(r.cr).filter(function (k) { return r.cr[k].s != null && r.cr[k].s >= 0.7; }).sort(function (a, b) { return (r.w[b] - r.w[a]); }).slice(0, 2);
      var weak = Object.keys(r.cr).filter(function (k) { return r.cr[k].s != null && r.cr[k].s < 0.5; }).sort(function (a, b) { return r.w[b] - r.w[a]; })[0];
      reasons = '<div class="reasons">' + good.map(function (k) { return '<div>' + ic('check', 'sm') + '<span><b>' + DR.CRITERIA[k] + ':</b> ' + esc(r.cr[k].detail) + '</span></div>'; }).join('') +
        (weak ? '<div class="muted">' + ic('scale', 'sm') + '<span>Trade-off: ' + DR.CRITERIA[weak].toLowerCase() + ' (' + esc(r.cr[weak].detail) + ')</span></div>' : '') + '</div>';
    }
    var conf = E.claim(p, 'price').status === 'conflicting';
    var head = '<div class="meta"><h3 class="h">' + esc(NM(p)) + '</h3><div class="price">' + lakh(p.price) + (conf ? '<div class="xs muted" style="font-family:var(--font);font-weight:400;text-align:right">higher quote</div>' : '') + '</div></div>' +
      '<div class="small muted cfg">' + p.bhk + ' BHK ' + p.type.toLowerCase() + ' · ' + esc(p.locality) + ' · ' + (p.carpet ? '<span class="mono">' + p.carpet.toLocaleString('en-IN') + ' sq ft</span>' : 'area unknown') + ' · ' + esc(p.stage) + (isInv() ? (function () { var x = E.rent(p); return ' · ' + (x ? '<b style="color:var(--cta-text)">~' + x.yield + '% est. yield</b>' : 'yield unknown'); })() : '') + '</div>';
    var research = r.cr ? '<div class="research">' + (r.fails.length ? '<span class="small muted">' + esc(r.fails.map(function (f) { return f.text; }).join(' · ')) + '</span>' : fit(r.band)) + evi(r.ev) + '</div>' : '<div class="research">' + evi(r.ev) + '<span class="xs muted">' + (function (n) { return n ? n + ' open question' + (n > 1 ? 's' : '') : 'No open questions'; })(issues(r).length) + '</span></div>';
    var foot = r.cr ? '<div class="foot">' + act(r.action) + '<span class="xs muted">' + (st.shortlist[p.id] ? ic('bookmark', 'sm') + ' Saved' : opts.swipe ? 'Swipe → save · ← hide' : '') + '</span></div>' : '';
    var card = '<div class="card pcard tap" data-go="#p-' + p.id + '" tabindex="0">' + (opts.noArt ? '' : '<div class="art">' + art(p, 140) + '</div>') + '<div class="body">' + head + research + reasons + (opts.noIssues ? '' : issueRow(r)) + '</div>' + foot + '</div>';
    return opts.swipe ? '<div class="swipe-wrap" data-swipe="' + p.id + '"><div class="swipe-bg"><span>' + ic('bookmark', 'sm') + ' Save</span><span>Hide ' + ic('x', 'sm') + '</span></div>' + card + '</div>' : card;
  }

  /* ---------------- Insights model (Agents 1 + 3) ---------------- */
  function insights() {
    var prof = st.profile, items = [];
    var rel = prof ? E.run(prof).pass.map(function (r) { return r.p.id; }).concat(Object.keys(st.shortlist)) : DR.PROPERTIES.map(function (p) { return p.id; });
    DR.PROPERTIES.forEach(function (p) {
      if (rel.indexOf(p.id) < 0) return;
      E.findings(p).forEach(function (f) {
        items.push({ id: f.id, cat: f.type === 'conflict' ? 'conflict' : f.type === 'missing' ? 'missing' : 'update', sev: f.severity, pid: p.id, title: f.title, body: f.text, why: E.whyItMatters(f, p), agent: 'Property Investigator', field: f.claim ? f.claim.field : null, date: DR.TODAY });
      });
    });
    DR.DEVELOPMENTS.forEach(function (d) {
      var ids = Object.keys(d.near).filter(function (id) { return rel.indexOf(id) >= 0; });
      if (!ids.length) return;
      if (st.skip && d.next) items.unshift({ id: d.id + '-skip', cat: 'infra', sev: 'medium', pid: ids.filter(function (i) { return st.shortlist[i]; })[0] || ids[0], title: d.name + ' is now ' + d.next.stage.toLowerCase(), body: d.next.note + ' Stage changed from Approved on ' + d.next.date + '.', why: d.plus + ' ' + d.minus, agent: 'Future Development Analyst', fresh: true, date: '2026-12-15' });
      else items.push({ id: d.id, cat: 'infra', sev: 'low', pid: ids[0], title: d.name + ': ' + devStage(d).toLowerCase(), body: 'Near ' + ids.map(function (i) { return NM(E.prop(i)); }).join(', ') + '.', why: d.plus, agent: 'Future Development Analyst', date: d.accessed });
    });
    var o = { high: 0, medium: 1, low: 2 };
    return items.filter(function (i) { return !st.dismissed[i.id]; }).sort(function (a, b) { return (b.fresh ? 1 : 0) - (a.fresh ? 1 : 0) || o[a.sev] - o[b.sev]; });
  }
  /* ---------------- Notifications: short "something happened" items. Detail lives in Insights. ---------------- */
  var NTITLE = { 'conflict:carpet': 'Area discrepancy detected in ', 'conflict:price': 'Price difference found for ', 'conflict:possession': 'Possession date differs for ',
    'missing:oc': 'Occupancy certificate missing for ', 'missing:rera': 'No RERA registration found for ', 'missing:builder': 'Builder not identified for ',
    'missing:carpet': 'Carpet area not published for ', 'missing:possession': 'Possession date missing for ' };
  function notifs() {
    var out = [];
    insights().forEach(function (i) {
      if (i.cat === 'infra') {
        if (i.fresh) out.push({ id: 'n-' + i.id, kind: 'infra', icon: 'train', title: i.title.replace(' is now ', ' moved to '), meta: 'Future Development Analyst · ' + i.date, pid: i.pid, insight: 'ins-' + i.id.replace('-skip', ''), fresh: true, sev: 'medium' });
        return;
      }
      if (i.sev === 'low') return;
      var sameMissing = insights().filter(function (x) { return x.cat === 'missing' && x.pid === i.pid && x.sev !== 'low'; });
      if (i.cat === 'missing' && sameMissing.length > 1) {
        if (sameMissing[0].id !== i.id) return;
        out.push({ id: 'n-grp-' + i.pid, kind: 'missing', icon: 'help', title: sameMissing.length + ' key details missing for ' + NM(E.prop(i.pid)), meta: 'Property Investigator · ' + i.date, pid: i.pid, insight: 'ins-grp-' + i.pid, sev: 'high' });
        return;
      }
      var pre = NTITLE[i.cat + ':' + i.field];
      out.push({ id: 'n-' + i.id, kind: i.cat, icon: i.cat === 'conflict' ? 'compare' : 'help', title: (pre ? pre : i.title + ' · ') + NM(E.prop(i.pid)), meta: 'Property Investigator · ' + i.date, pid: i.pid, insight: 'ins-' + i.id, sev: i.sev });
    });
    var ids = Object.keys(st.shortlist);
    if (st.profile && ids.length >= 2 && !st.compared) out.push({ id: 'n-cmp-' + ids.length, kind: 'reminder', icon: 'scale', title: 'You\'ve saved ' + ids.length + ' homes. Compare them side by side', meta: 'Reminder', go: '#compare', sev: 'low' });
    ids.filter(function (i) { return st.shortlist[i] === 'visit'; }).forEach(function (i) { out.push({ id: 'n-visit-' + i, kind: 'reminder', icon: 'calendar', title: 'Visit planned for ' + NM(E.prop(i)) + '. Take the builder questions with you', meta: 'Reminder', go: '#p-' + i, sev: 'low' }); });
    if (!st.profile) out.push({ id: 'n-guest', kind: 'reminder', icon: 'user', title: 'Add your needs to get alerts only for homes that fit you', meta: 'Reminder', go: '#ob-1', sev: 'low' });
    (st.activity || []).slice(-4).reverse().forEach(function (a) { out.push({ id: 'n-act-' + a.k, kind: 'activity', icon: a.icon, title: a.t, meta: 'Your activity · ' + a.d, go: a.go, sev: 'low', quiet: true }); });
    var o = { high: 0, medium: 1, low: 2 }, np = nprefs(), grp = { conflict: 'findings', missing: 'findings', infra: 'infra', reminder: 'reminders', activity: 'activity' };
    return out.filter(function (n) { return !st.dismissed[n.id] && np[grp[n.kind]] !== false; }).sort(function (a, b) { return (b.fresh ? 1 : 0) - (a.fresh ? 1 : 0) || (a.quiet ? 1 : 0) - (b.quiet ? 1 : 0) || o[a.sev] - o[b.sev]; });
  }
  function unread() { return notifs().filter(function (n) { return !st.read[n.id] && !n.quiet; }).length; }
  function logActivity(t, icon, go) { st.activity = st.activity || []; st.activity.push({ k: Date.now(), t: t, icon: icon, go: go, d: DR.TODAY }); }

  /* ---------------- Screens ---------------- */
  var R = {};

  R.welcome = function () {
    return { nav: false, html: '<div class="ob enter"><div style="margin:0 -1.25rem;height:220px">' + art({ hue: 2, type: 'Apartment' }, 220) + '</div>' +
      '<div class="sec"><span class="demo-tag">DEMO · ALL PROPERTY DATA SIMULATED</span><h1 class="h" style="margin-top:1rem">Find less.<br>Know more.<br>Decide better.</h1>' +
      '<p class="muted" style="margin-top:1rem">Tell us what your family needs. We research every home, show what is verified and what isn\'t, and tell you what to do next: visit, investigate or walk away.</p></div>' +
      '<div class="grow"></div><div style="display:grid;gap:.5rem;margin:2rem 0 1rem"><button class="btn primary block" data-go="#ob-1">Get started ' + ic('arrow') + '</button><button class="btn ghost block" data-a="guest">Explore first</button></div></div>' };
  };

  R.ob = function (step) {
    var sp = st.profile;
    var d = st.draft = st.draft || (sp ? { intent: sp.intent || 'live', text: '', parsed: null, budgetMax: sp.budgetMax, bhk: sp.intent === 'invest' ? [] : sp.bhk.slice(), types: sp.types.slice(), priorities: sp.intent === 'invest' ? [] : sp.priorities.slice(),
      inv: sp.intent === 'invest' ? { localities: (sp.localities || []).slice(), types: sp.types.slice(), goal: sp.goal, status: sp.status, horizon: sp.horizon } : undefined }
      : { intent: 'live', text: '', parsed: null, budgetMax: '', bhk: [], types: ['Apartment', 'Villa'], priorities: [] });
    var steps = '<div class="steps">' + [1, 2, 3].map(function (i) { return '<i class="' + (i <= step ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    var back = '<div class="top" style="padding-left:.5rem"><button class="iconbtn" data-go="' + (step === 1 ? '#welcome' : '#ob-' + (step - 1)) + '" aria-label="Back">' + ic('left') + '</button><span class="title"></span><button class="link" data-a="guest">Skip</button></div>';
    var body;
    if (step === 1) {
      body = '<h2 class="h">What are you buying for?</h2><p class="muted small" style="margin:.5rem 0 1.5rem">This changes how we judge each home.</p>' +
        [['live', 'home', 'A home to live in', 'We weigh commute, schools, family needs and possession certainty.'], ['invest', 'activity', 'An investment', 'We weigh rental potential, development nearby, delivery risk and the builder.']].map(function (o) {
          return '<button class="opt ' + (d.intent === o[0] ? 'on' : '') + '" data-a="intent" data-v="' + o[0] + '">' + ic(o[1], 'lg') + '<span><b>' + o[2] + '</b><br><span class="small muted">' + o[3] + '</span></span></button>';
        }).join('') + '<div class="grow"></div><button class="btn primary block" style="margin:2rem 0 1rem" data-go="#ob-2">Continue</button>';
    } else if (d.intent === 'invest') {
      var iv = d.inv = d.inv || { localities: [], types: ['Apartment'], goal: null, status: null, horizon: null };
      var opt = function (label, on, a, v, sub) { return '<button class="chip ' + (on ? 'on' : '') + '" data-a="' + a + '" data-v="' + v + '">' + label + '</button>'; };
      if (step === 2) {
        var locs = DR.PROPERTIES.map(function (p) { return p.locality.split(',')[0].replace(' Phase 1', ''); }).filter(function (l, i, a) { return a.indexOf(l) === i; });
        body = '<h2 class="h">Your investment basics</h2><p class="muted small" style="margin:.5rem 0 1rem">Only the budget is required.</p>' +
          '<div class="field" style="margin-top:0"><label class="lbl" for="bud">Maximum budget (₹ lakh)</label><input id="bud" class="input mono" inputmode="numeric" value="' + esc(d.budgetMax) + '" placeholder="80"></div>' +
          '<div class="field"><span class="lbl">Preferred localities <span class="muted" style="font-weight:400">· optional, Delhi NCR</span></span><div class="chips">' + locs.map(function (l) { return opt(esc(l), iv.localities.indexOf(l) >= 0, 'invLoc', esc(l)); }).join('') + '</div><p class="xs muted" style="margin-top:.375rem">Leave empty to search all localities.</p></div>' +
          '<div class="field"><span class="lbl">Property type</span><div class="chips">' + ['Apartment', 'Villa'].map(function (t) { return opt(t, iv.types.indexOf(t) >= 0, 'invType', t); }).join('') + '</div></div>' +
          '<div class="grow"></div><button class="btn primary block" style="margin:2rem 0 1rem" data-a="ob2">Continue</button>';
      } else {
        var row = function (title, key, opts, def) { return '<div class="field"><span class="lbl">' + title + ' <span class="muted" style="font-weight:400">· optional</span></span><div class="chips">' + opts.map(function (o) { return opt(o[1], iv[key] === o[0], 'invSet', key + ':' + o[0]); }).join('') + '</div>' + (iv[key] == null ? '<p class="xs muted" style="margin-top:.375rem">' + ic('dashed', 'sm') + ' We\'ll assume ' + def + ' if you skip this.</p>' : '') + '</div>'; };
        body = '<h2 class="h">What\'s the goal?</h2><p class="muted small" style="margin:.5rem 0 .25rem">This decides how we weigh rent, development nearby and delivery risk.</p>' +
          row('Investment goal', 'goal', [['rental', 'Rental income'], ['appreciation', 'Capital appreciation'], ['both', 'Both']], '"both"') +
          row('Property status', 'status', [['ready', 'Ready to move'], ['uc', 'Under construction'], ['both', 'Either']], '"either"') +
          row('Investment horizon', 'horizon', [[3, '3 years'], [5, '5 years'], [10, '10+ years']], '5 years') +
          '<p class="xs muted" style="margin-top:1.25rem">We show estimates with their method and never forecast prices.</p><div class="grow"></div><button class="btn primary block" style="margin:2rem 0 1rem" data-a="finishInv">Build my investment room</button>';
      }
    } else if (step === 2) {
      var pr = d.parsed;
      body = '<h2 class="h">Tell us what you need</h2><p class="muted small" style="margin:.5rem 0 1rem">Speak or type in your own words. You can edit everything we pick up.</p>' +
        '<label class="lbl" for="nl">In your words</label><textarea id="nl" class="input" placeholder="e.g. 2 or 3 BHK under 85 lakh. We work in Cyber City and Sohna Road, and our kid starts school soon.">' + esc(d.text) + '</textarea>' +
        '<div style="display:flex;gap:.5rem;margin-top:.5rem;align-items:center"><button class="mic ' + (ui.listening ? 'listening' : '') + '" data-a="voice" data-t="nl" aria-label="Speak">' + ic('mic') + '</button><button class="btn ghost sm" data-a="parse">Interpret</button><button class="link xs muted" data-a="sample" style="margin-left:auto">Use sample</button></div>' +
        (pr ? '<div class="card warm fade" style="margin-top:1rem"><div class="caps" style="margin-bottom:.5rem">Here\'s how I read that</div><div class="chips">' + pr.chips.map(function (c) { return '<span class="chip ' + (c.src === 'inferred' ? 'assumed' : '') + '">' + esc(c.k) + ': ' + esc(c.v) + '</span>'; }).join('') + DR.DEMO_PROFILE.assumed.map(function (a) { return '<span class="chip assumed">' + ic('dashed', 'sm') + 'Assumed: ' + a + '</span>'; }).join('') + '</div>' +
          (pr.ignored.length ? '<p class="xs muted" style="margin-top:.5rem">Couldn\'t use: "' + pr.ignored.join('", "') + '" (too subjective to check).</p>' : '') +
          (!pr.prof.budgetMax || !pr.prof.bhk ? '<p class="small warn" style="margin-top:.5rem">' + ic('alert', 'sm') + ' I still need your ' + [!pr.prof.budgetMax && 'maximum budget', !pr.prof.bhk && 'BHK'].filter(Boolean).join(' and ') + '. Fill it in below.</p>' : '') + '</div>' : '') +
        '<div class="field"><label class="lbl" for="bud">Maximum budget (₹ lakh)</label><input id="bud" class="input mono" inputmode="numeric" value="' + esc(d.budgetMax) + '" placeholder="85"></div>' +
        '<div class="field"><span class="lbl">BHK</span><div class="chips">' + [1, 2, 3, 4].map(function (b) { return '<button class="chip ' + (d.bhk.indexOf(b) >= 0 ? 'on' : '') + '" data-a="bhk" data-v="' + b + '">' + b + ' BHK</button>'; }).join('') + '</div></div>' +
        '<div class="grow"></div><button class="btn primary block" style="margin:2rem 0 1rem" data-a="ob2">Continue</button>';
    } else {
      body = '<h2 class="h">What matters most?</h2><p class="muted small" style="margin:.5rem 0 1.25rem">Tap up to 3 in order of importance. Your top priority carries the most weight.</p><div class="rank">' +
        E.LIVE_KEYS.map(function (k) { var i = d.priorities.indexOf(k); return '<button class="' + (i >= 0 ? 'on' : '') + '" data-a="prio" data-v="' + k + '"><span class="n">' + (i >= 0 ? i + 1 : '') + '</span>' + DR.CRITERIA[k] + '</button>'; }).join('') +
        '</div><p class="xs muted" style="margin-top:1rem">Important places: ' + esc(((d.parsed && d.parsed.prof.places) || DR.DEMO_PROFILE.places).map(function (p) { return p.label; }).join(' · ')) + '</p>' +
        '<div class="grow"></div><button class="btn primary block" style="margin:2rem 0 1rem" data-a="finish"' + (d.priorities.length ? '' : ' disabled style="opacity:.4;margin:2rem 0 1rem"') + '>Build my decision room</button>';
    }
    return { nav: false, top: back, html: '<div class="ob fade">' + steps + body + '</div>' };
  };

  R.building = function () {
    var steps = ['Reading your requirements', 'Screening ' + DR.PROPERTIES.length + ' researched homes', 'Checking hard limits: budget, BHK, type', 'Cross-checking claims across sources', 'Ranking by your priorities'];
    setTimeout(function () {
      var lis = document.querySelectorAll('.pipeline li'), i = 0;
      var t = setInterval(function () { if (lis[i]) lis[i].classList.add('done'); i++; if (i > lis.length) { clearInterval(t); location.hash = '#home'; } }, 420);
    }, 50);
    return { nav: false, html: '<div style="padding-top:4rem"><h2 class="h">Building your decision room</h2><ul class="pipeline" style="margin-top:1.5rem">' + steps.map(function (s) { return '<li>' + ic('checkCircle') + s + '</li>'; }).join('') + '</ul><div class="skel" style="height:72px;margin-top:2rem"></div><div class="skel" style="height:140px;margin-top:.75rem"></div></div>' };
  };

  function topBar(title, extra) {
    var n = unread();
    return '<div class="top"><span class="title">' + title + '</span><span class="demo-tag">DEMO DATA</span>' + (extra || '') +
      '<button class="iconbtn" data-go="#notifications" aria-label="Notifications' + (n ? ', ' + n + ' unread' : '') + '">' + ic('bell') + (n ? '<span class="dot"></span>' : '') + '</button>' +
      avatar() + '</div>';
  }
  function acct() { return st.account || (st.profile ? (st.profile.intent === 'invest' ? { name: 'Rohan Mehta', email: 'rohan@example.com' } : { name: 'Priya & Arjun', email: 'priya.arjun@example.com' }) : null); }
  function isInv() { return !!(st.profile && st.profile.intent === 'invest'); }
  function NM(p) { E.invest = isInv(); return E.nameOf(p); }
  function initials(n) { return n.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(''); }
  function avatar() {
    var a = acct();
    return '<button class="avatar' + (a ? '' : ' guest') + '" data-go="#profile" aria-label="Profile and settings">' + (a ? initials(a.name) : ic('user', 'sm')) + '</button>';
  }

  R.home = function () {
    if (!st.profile) return R.guest();
    var prof = st.profile, res = E.run(prof);
    var focus = res.focus.filter(function (r) { return !st.dismissed['card-' + r.p.id]; });
    var h = '<div class="enter" style="padding-top:.25rem"><div class="xs muted">Welcome back</div><h2 class="h" style="margin:.125rem 0 .75rem">' + (isInv() ? 'Your investment room' : 'Your decision room') + '</h2></div><div class="profile-strip enter">' + ic(isInv() ? 'activity' : 'user') + '<div class="t">' + (isInv()
      ? '<b>' + lakh(prof.budgetMax) + '</b> · ' + DR.GOALS[prof.goal] + ' · ' + prof.horizon + '-yr horizon<div class="xs muted">' + DR.STATUS_PREF[prof.status] + ' · ' + (prof.localities.length ? esc(prof.localities.join(', ')) : 'All localities') + ' · ' + prof.types.join(', ') + '</div><div class="xs muted">Weighs: '
      : '<b>' + lakh(prof.budgetMax) + '</b> · ' + prof.bhk.join('–') + ' BHK · ' + esc(prof.places.map(function (p) { return p.label.split(' · ')[1]; }).join(' + ')) + '<div class="xs muted">Priorities: ') + prof.priorities.map(function (k) { return DR.CRITERIA[k]; }).join(' > ') + '</div></div><button class="iconbtn" data-a="editProfile" aria-label="Edit profile">' + ic('pencil') + '</button></div>';
    h += '<div class="sec enter" style="margin-top:1.25rem"><div class="funnel"><div><b>' + DR.PROPERTIES.length + '</b><span>homes researched</span></div><div><b>' + res.pass.length + '</b><span>meet your limits</span></div><div><b>' + res.worth.length + '</b><span>worth a visit</span></div><div><b>' + res.investigate.length + '</b><span>need checking</span></div></div></div>';

    if (!res.pass.length) {
      var rx = E.relaxations(prof);
      h += '<div class="sec card empty enter"><div class="ic">' + ic('search') + '</div><h3 class="h">No homes meet every requirement</h3><p class="small muted" style="margin:.5rem 0 1rem">Your <b>' + { budget: 'budget', bhk: 'BHK choice', type: 'property type', status: 'property status choice', loc: 'locality choice' }[rx.worst] + '</b> rules out ' + rx.worstCount + ' of ' + DR.PROPERTIES.length + ' researched homes. We won\'t relax a limit without asking. Here is exactly what each change would do:</p>' +
        rx.options.map(function (o, i) { return '<button class="opt" data-a="relax" data-i="' + i + '"><span style="flex:1"><b>' + o.label + '</b><br><span class="small muted">' + (o.note || '+' + o.gain + ' home' + (o.gain > 1 ? 's' : '') + ' would qualify') + '</span></span>' + ic('right') + '</button>'; }).join('') + '</div>';
      return { title: 'Decision Room', html: h };
    }
    /* AI research insight: one grounded summary of what the research found */
    var best = res.worth.slice().sort(function (a, b) { return b.score - a.score; })[0];
    var ai = 'I checked all ' + DR.PROPERTIES.length + ' researched homes against your limits and priorities. ' +
      (res.worth.length ? res.worth.length + (res.worth.length > 1 ? ' are' : ' is') + ' ready for a visit, and <b>' + esc(NM(best.p)) + '</b> is the strongest fit with solid evidence. ' : '') +
      (res.investigate.length ? res.investigate.length + ' more ' + (res.investigate.length > 1 ? 'fit well, but each needs' : 'fits well, but needs') + ' one answer from the builder first, flagged on the card. ' : '') +
      (res.over.length ? res.over.length + ' strong option' + (res.over.length > 1 ? 's are' : ' is') + ' just over budget, shown under alternatives.' : '');
    var byYield = res.focus.filter(function (r) { return E.rent(r.p); }).sort(function (a, b) { return E.rent(b.p).yield - E.rent(a.p).yield; })[0];
    var ai2 = isInv() && byYield ? (best ? '<b class="kf">' + esc(NM(best.p)) + '</b> is your strongest documented match. ' : '') + '<b class="kf">' + esc(NM(byYield.p)) + '</b> has the highest estimated yield (~' + E.rent(byYield.p).yield + '% gross, not guaranteed).'
      : best ? '<b class="kf">' + esc(NM(best.p)) + '</b> is your strongest fit with solid evidence.' + (res.investigate.length ? ' ' + res.investigate.length + ' more strong fit' + (res.investigate.length > 1 ? 's need' : ' needs') + ' a builder answer first.' : '')
      : (res.investigate.length ? res.investigate.length + ' good fit' + (res.investigate.length > 1 ? 's' : '') + ' found, but each needs a builder answer before you visit.' : 'No home is a strong fit yet. See the alternatives below.');
    h += '<div class="ai-strip enter" style="margin-top:1rem"><span class="ai-tag">' + ic('layers', 'sm') + 'AI</span><p>' + ai2 + '</p><a class="ai-more" href="#insights" aria-label="Open full research summary">' + ic('right', 'sm') + '</a></div>';
    h += '<div class="sec"><div class="sec-h"><span class="caps">Recommended for you</span><span class="xs muted">' + focus.length + ' of ' + res.pass.length + '</span></div><div class="home-list">';
    if (focus.length && focus.length <= 2) h += '<p class="small muted" style="margin-bottom:.75rem">Only ' + focus.length + ' home' + (focus.length > 1 ? 's' : '') + ' fit well. Alternatives are below.</p>';
    if (focus.length && focus.every(function (r) { return r.ev.level === 'Low'; })) h += '<div class="card warm small" style="margin-bottom:.75rem">' + ic('info', 'sm') + ' Matches found, but the evidence is thin. Investigate before visiting.</div>';
    h += focus.map(function (r, i) { return '<div class="enter" style="animation-delay:' + (i * 80) + 'ms">' + pcard(r, { swipe: true }) + '</div>'; }).join('') || (res.focus.length ? '<p class="small muted">You hid all suggestions. <button class="link" data-a="unhide">Show them again</button></p>' : '<div class="card empty"><div class="ic">' + ic('scale') + '</div><h3 class="h">No strong fits yet</h3><p class="small muted">' + res.pass.length + ' home' + (res.pass.length === 1 ? '' : 's') + ' meet your limits, but each compromises on ' + DR.CRITERIA[prof.priorities[0]].toLowerCase() + ', your top priority. See the alternatives below, or <button class="link" data-a="editProfile">adjust your requirements</button>.</p></div>');
    h += '</div></div>';
    var alts = res.over.concat(res.compromise);
    if (alts.length) {
      h += '<div class="sec"><div class="sec-h"><span class="caps">Alternatives, with compromises</span></div>' + alts.map(function (r) {
        return '<div class="card tap" data-go="#p-' + r.p.id + '"><div class="meta" style="display:flex;justify-content:space-between;gap:.75rem"><div><b>' + esc(NM(r.p)) + '</b><div class="xs muted">' + esc(r.p.locality) + ' · ' + r.p.bhk + ' BHK</div></div><span class="price">' + lakh(r.p.price) + '</span></div><p class="small muted" style="margin-top:.5rem">' + (r.fails.length ? '<b class="warn">' + esc(r.fails[0].text) + '</b>, but ' + r.band.toLowerCase() + ' on everything else: ' + esc(r.p.summary.fit) : esc(r.reason)) + '</p></div>';
      }).join('') + '</div>';
    }
    if (isInv()) {
      var passIds = res.pass.map(function (r) { return r.p.id; });
      var rel = DR.DEVELOPMENTS.filter(function (x) { return Object.keys(x.near).some(function (i) { return passIds.indexOf(i) >= 0; }); }).sort(function (a, b) { return DR.STAGES.indexOf(devStage(b)) - DR.STAGES.indexOf(devStage(a)); });
      var adv = rel.filter(function (x) { return DR.STAGES.indexOf(devStage(x)) >= 3; }).length;
      h += '<div class="sec"><div class="sec-h"><span class="caps">Future development near your matches</span><a class="link" href="#insights">Timeline</a></div>' +
        '<p class="finding" style="margin:0 0 .75rem">' + rel.length + ' projects are tracked near your matches. <b class="kf">' + adv + '</b> ' + (adv === 1 ? 'is' : 'are') + ' funded or under construction. The rest are still plans.</p>' +
        '<div class="card">' + rel.slice(0, 4).map(function (x) {
          var hs = Object.keys(x.near).filter(function (i) { return passIds.indexOf(i) >= 0; });
          return devMini(x) + '<div class="chips" style="margin-top:.5rem">' + hs.map(function (i) { return '<button class="chip" style="font-size:.75rem;padding:3px 8px" data-go="#p-' + i + '-future">' + esc(NM(E.prop(i))) + ' · ' + x.near[i] + ' km</button>'; }).join('') + '</div>';
        }).join('<div style="height:1px;background:var(--border);margin:1rem 0"></div>') + '</div></div>';
    }
    /* Needs attention: only platform-wide items that no single card can show */
    var wide = [];
    var overAllIn = res.focus.filter(function (r) { return E.costs(r.p).total > prof.budgetMax; });
    if (overAllIn.length) wide.push({ icon: 'calculator', t: overAllIn.length + ' of your ' + res.focus.length + ' recommended homes go over ' + lakh(prof.budgetMax) + ' once taxes and registration are added', b: 'Budget checks use the quoted price. All-in costs are estimates that include an assumed ~7% for stamp duty and registration.', a: '<button class="link" data-a="askFocus" data-q="What\'s the real all-in cost?">Compare all-in costs</button>' });
    if (isInv()) {
      var ucNear = res.pass.filter(function (r) { return r.p.stage === 'Under construction'; }), disputed = res.pass.filter(function (r) { var c = E.claim(r.p, 'possession'); return c && c.status === 'conflicting'; }), noRent = res.pass.filter(function (r) { return !E.rent(r.p); });
      if (ucNear.length) wide.push({ icon: 'building', t: ucNear.length + ' of ' + res.pass.length + ' matches are under construction and earn no rent until possession', b: (disputed.length ? disputed.map(function (r) { return NM(r.p); }).join(', ') + ' already shows a delayed possession date. ' : '') + 'Check construction progress and the payment plan on each property.', a: '<button class="link" data-go="#insights">See delivery risks</button>' });
      if (noRent.length) wide.push({ icon: 'help', t: noRent.length + ' match' + (noRent.length > 1 ? 'es have' : ' has') + ' no rental evidence', b: noRent.map(function (r) { return NM(r.p); }).join(', ') + ': we found no comparable rental listings, so yield is unknown, not zero.', a: '<button class="link" data-go="#p-' + noRent[0].p.id + '">Open property</button>' });
      wide.push({ icon: 'info', t: 'Yields are estimates, not returns', b: 'Gross yield = asking rent × 12 ÷ quoted price, before maintenance, vacancy and tax. Rents come from simulated comparable listings. We never forecast appreciation.', a: '' });
    }
    if (prof.assumed && prof.assumed.length && !st.assumedOk) wide.push({ icon: 'dashed', t: prof.assumed.length + ' settings were assumed, not stated by you', b: prof.assumed.join(' · ') + '. They affect which homes rank highest.', a: '<button class="link" data-a="confirmAssumed">Looks right</button> <button class="link" data-a="editProfile" style="margin-left:.75rem">Change</button>' });
    if (wide.length) h += '<div class="sec"><div class="sec-h"><span class="caps">' + (isInv() ? 'Important investment risks' : 'Needs your attention') + '</span></div>' + wide.map(function (w) { return '<div class="card attn" style="display:flex;gap:.75rem;align-items:flex-start"><div class="ic" style="width:32px;height:32px;border-radius:8px;display:grid;place-items:center;background:var(--surface-warm);flex:none;color:var(--s-conflicting)">' + ic(w.icon, 'sm') + '</div><div style="flex:1;min-width:0"><div class="small"><b>' + w.t + '</b></div><p class="xs muted" style="margin-top:2px">' + esc(w.b) + '</p><div class="small" style="margin-top:.5rem">' + w.a + '</div></div></div>'; }).join('') + '</div>';
    var d = DR.DEVELOPMENTS[0];
    if (!isInv())
    h += '<div class="sec"><div class="sec-h"><span class="caps">Location &amp; future</span></div><div class="card tap" data-go="#p-p9-future">' + ic('train') + '<h3 class="h" style="margin-top:.5rem">' + d.name + ' · ' + devStage(d) + '</h3><p class="small muted">Within 3 km of ' + Object.keys(d.near).filter(function (id) { return res.pass.some(function (r) { return r.p.id === id; }); }).length + ' of your matches. ' + d.minus + '</p><div class="xs muted" style="margin-top:.5rem">' + d.source + ' · accessed ' + d.accessed + ' · no completion guarantee</div></div></div>';
    var recent = notifs().filter(function (n) { return !n.quiet; }).slice(0, 3);
    if (recent.length) h += '<div class="sec"><div class="sec-h"><span class="caps">Recent updates</span><a class="link" href="#notifications">All notifications</a></div><div class="card" style="padding:.25rem 1rem">' + recent.map(function (n) { return '<div class="recent" data-a="openNotif" data-id="' + n.id + '">' + ic(n.icon, 'sm') + '<div style="flex:1;min-width:0"><div class="small"><b>' + esc(n.title) + '</b>' + (n.fresh ? ' <span class="xs" style="color:var(--cta-text);font-weight:600">New</span>' : '') + '</div><div class="xs muted">' + esc(n.meta) + '</div></div>' + ic('right', 'sm') + '</div>'; }).join('') + '</div></div>';
    return { title: 'Decision Room', html: h };
  };

  R.guest = function () {
    var all = E.run(null).all;
    var h = '<div class="enter" style="padding-top:.5rem"><h2 class="h">Research homes before you trust a listing.</h2><p class="small muted" style="margin-top:.5rem">Browse researched homes across Delhi NCR. Every fact shows where it came from and whether it\'s verified.</p></div>' +
      '<div class="sec" style="margin-top:1.25rem"><div style="display:flex;gap:.5rem"><input class="input" id="gq" placeholder="Locality, project or builder"><button class="btn primary" data-a="gsearch" aria-label="Search">' + ic('search') + '</button></div></div>' +
      '<div class="card warm" style="margin-top:1rem"><h3 class="h">See which homes fit you</h3><p class="small muted" style="margin:.25rem 0 .75rem">Takes under a minute. Required for fit ratings, shortlists and comparisons.</p><button class="btn primary sm" data-go="#ob-1">Personalise my search</button></div>' +
      '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Quick filters</div><div class="hscroll">' + [['ready', 'Ready to move'], ['u75', 'Under ₹75 L'], ['b3', '3 BHK'], ['transit', 'Near transit']].map(function (f) { return '<button class="chip" data-a="qf" data-v="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div></div>' +
      '<div class="sec"><div class="sec-h"><span class="caps">Researched homes</span><a class="link" href="#discover">See all</a></div>' + all.slice(0, 3).map(function (r) { return pcard(r); }).join('') + '</div>' +
      '<div class="sec card"><h3 class="h">How we label every fact</h3><div style="display:grid;gap:.5rem;margin-top:.75rem">' + Object.keys(DR.STATUS).map(function (k) { return '<div class="small">' + badge(k) + ' <span class="muted">' + DR.STATUS[k].desc + '</span></div>'; }).join('') + '</div><p class="xs muted" style="margin-top:.75rem">We never call a whole property "verified". Each claim is checked on its own.</p></div>';
    return { title: 'Decision Room', html: h };
  };

  R.discover = function () {
    var prof = st.profile, rs = E.run(prof).all.slice(), q = ui.q, parsed = null;
    if (q && /\d/.test(q) && /(bhk|lakh|lac|cr|min)/i.test(q)) parsed = E.parse(q);
    rs = rs.filter(function (r) {
      var p = r.p;
      if (parsed) { if (parsed.prof.budgetMax && p.price > parsed.prof.budgetMax) return false; if (parsed.prof.bhk && parsed.prof.bhk.indexOf(p.bhk) < 0) return false; var mm = q.match(/(\d+)\s*min/); if (mm && p.commute.office1 > +mm[1]) return false; if (/school/i.test(q) && !(p.schools.length && Math.min.apply(null, p.schools.map(function (s) { return s.km; })) <= 2)) return false; }
      else if (q && (NM(p) + p.locality + p.builder).toLowerCase().indexOf(q.toLowerCase()) < 0) return false;
      if (ui.qf.ready && p.stage !== 'Ready to move') return false;
      if (ui.qf.u75 && p.price > 75) return false;
      if (ui.qf.b3 && p.bhk !== 3) return false;
      if (ui.qf.transit && p.transit.km > 1) return false;
      if (ui.qf.uc && p.stage !== 'Under construction') return false;
      if (ui.qf.by27) { if (p.stage !== 'Ready to move') { var yrs = (p.possession.match(/20\d\d/g) || []).map(Number); if (!yrs.length || Math.max.apply(null, yrs) > 2027) return false; } }
      if (ui.qf.nearDev && !DR.DEVELOPMENTS.some(function (d) { return d.near[p.id] != null && d.near[p.id] <= 2 && DR.STAGES.indexOf(devStage(d)) >= 2; })) return false;
      if (ui.qf.apt && p.type !== 'Apartment') return false;
      if (ui.qf.villa && p.type !== 'Villa') return false;
      if (ui.fl && p.locality.indexOf(ui.fl) < 0) return false;
      if (ui.fb && p.builder !== ui.fb) return false;
      return true;
    });
    var srt = { fit: function (a, b) { return (b.score || 0) - (a.score || 0); }, price: function (a, b) { return a.p.price - b.p.price; }, yield: function (a, b) { return ((E.rent(b.p) || {}).yield || -1) - ((E.rent(a.p) || {}).yield || -1); }, commute: function (a, b) { return (a.p.commute.office1 + a.p.commute.office2) - (b.p.commute.office1 + b.p.commute.office2); }, evidence: function (a, b) { return b.ev.v - a.ev.v; } };
    var sort = !prof && ui.sort === 'fit' ? 'evidence' : ui.sort;
    rs.sort(srt[sort]);
    var h = '<div style="display:flex;gap:.5rem;padding-top:.25rem"><input class="input" id="dq" value="' + esc(q) + '" placeholder="Search or ask: 2-3 BHK under 80 lakh near schools"><button class="mic ' + (ui.listening ? 'listening' : '') + '" data-a="voice" data-t="dq" aria-label="Speak">' + ic('mic') + '</button></div>' +
      (parsed ? '<div class="card warm fade" style="margin-top:.75rem"><div class="caps" style="margin-bottom:.375rem">Here\'s how I read that</div><div class="chips">' + parsed.chips.filter(function (c) { return c.k !== 'Priorities'; }).map(function (c) { return '<span class="chip">' + esc(c.v) + '</span>'; }).join('') + (/(\d+)\s*min/.test(q) ? '<span class="chip">≤ ' + q.match(/(\d+)\s*min/)[1] + ' min to ' + esc(((prof || DR.DEMO_PROFILE).places[0].label.split(' · ')[1])) + '</span>' : '') + (/school/i.test(q) ? '<span class="chip">School ≤ 2 km</span>' : '') + '</div><button class="link xs" data-a="clearq" style="margin-top:.5rem">Clear</button></div>' : '') +
      '<div class="hscroll" style="margin-top:.75rem">' + (isInv() ? [['ready', 'Ready to move'], ['uc', 'Under construction'], ['by27', 'Possession by 2027'], ['nearDev', 'Near a development'], ['apt', 'Apartment'], ['villa', 'Villa'], ['u75', 'Under ₹75 L']] : [['ready', 'Ready to move'], ['u75', 'Under ₹75 L'], ['b3', '3 BHK'], ['transit', 'Transit ≤ 1 km']]).map(function (f) { return '<button class="chip ' + (ui.qf[f[0]] ? 'on' : '') + '" data-a="qf" data-v="' + f[0] + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (isInv() ? '<div class="filter-row"><label class="sr" for="fl">Locality</label><select id="fl" class="input sel" data-f="fl"><option value="">All localities</option>' + DR.PROPERTIES.map(function (p) { return p.locality.split(',')[0]; }).filter(function (l, i, a) { return a.indexOf(l) === i; }).map(function (l) { return '<option' + (ui.fl === l ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select>' +
        '<label class="sr" for="fb">Builder</label><select id="fb" class="input sel" data-f="fb"><option value="">All builders</option>' + DR.PROPERTIES.map(function (p) { return p.builder; }).filter(function (l, i, a) { return a.indexOf(l) === i; }).map(function (l) { return '<option' + (ui.fb === l ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select></div>' : '') +
      '<div style="display:flex;align-items:center;gap:.5rem;margin-top:.75rem;flex-wrap:wrap" class="small"><span class="muted">Sort</span>' + (isInv() ? [['fit', 'Best fit'], ['price', 'Price'], ['yield', 'Est. yield'], ['evidence', 'Research completeness']] : [['fit', 'Best fit'], ['price', 'Price'], ['commute', 'Commute'], ['evidence', 'Research completeness']]).filter(function (s) { return prof || s[0] !== 'fit'; }).map(function (s) { return '<button class="link ' + (sort === s[0] ? '' : 'muted') + '" style="' + (sort === s[0] ? 'text-decoration-color:var(--ink)' : '') + '" data-a="sort" data-v="' + s[0] + '">' + s[1] + '</button>'; }).join('') + '</div>' +
      '<div class="sec home-list" style="margin-top:1.25rem">' + (rs.length ? rs.map(function (r, i) { return '<div class="enter" style="animation-delay:' + Math.min(i, 6) * 80 + 'ms">' + pcard(r, { noArt: true, compact: true }) + '</div>'; }).join('') : '<div class="empty card"><div class="ic">' + ic('search') + '</div><h3 class="h">No researched homes match</h3><p class="small muted" style="margin:.5rem 0 1rem">Try removing a filter. We only show homes we have researched.</p><button class="btn ghost sm" data-a="clearq">Clear search</button></div>') + '</div>';
    return { title: 'Discover', html: h };
  };

  var SL = { considering: 'Considering', visit: 'Visit planned', investigating: 'Investigating', visited: 'Visited', walked: 'Walked away' };
  R.shortlist = function () {
    if (!st.profile) return gate('Save homes to your shortlist', 'Shortlists compare homes against your needs, so we need a few details first.');
    var ids = st.order.filter(function (id) { return st.shortlist[id]; });
    if (!ids.length) return { title: 'Shortlist', html: '<div class="empty" style="padding-top:4rem"><div class="ic">' + ic('bookmark') + '</div><h3 class="h">Nothing saved yet</h3><p class="small muted" style="margin:.5rem 0 1rem">Swipe a card right on Home, or tap Save on any research page.</p><button class="btn primary sm" data-go="#home">Go to Home</button></div>' };
    var h = '<p class="small muted" style="padding-top:.25rem">Select 2–3 homes to compare against your priorities.</p>' + ids.map(function (id) {
      var r = E.evaluate(E.prop(id), st.profile), on = st.cmp.indexOf(id) >= 0;
      var changed = st.skip && r.p.devs.indexOf('d1') >= 0;
      return '<div class="card" style="margin-top:.75rem"><div style="display:flex;gap:.75rem;align-items:flex-start"><button class="chip ' + (on ? 'on' : '') + '" data-a="cmp" data-v="' + id + '" aria-label="Select for compare" style="padding:4px">' + ic(on ? 'check' : 'plus', 'sm') + '</button><div style="flex:1;min-width:0" class="tap" data-go="#p-' + id + '"><div class="meta" style="display:flex;justify-content:space-between"><b>' + esc(NM(r.p)) + '</b><span class="price">' + lakh(r.p.price) + '</span></div><div class="xs muted">' + esc(r.p.locality) + ' · ' + r.p.bhk + ' BHK</div><div style="display:flex;gap:.75rem;margin-top:.5rem;flex-wrap:wrap">' + fit(r.band) + evi(r.ev) + '</div>' + (changed ? '<div class="xs" style="margin-top:.5rem;color:var(--s-sourced)">' + ic('train', 'sm') + ' Nearby metro stage changed</div>' : '') + '</div></div>' +
        '<div class="hscroll" style="margin-top:.75rem">' + Object.keys(SL).map(function (k) { return '<button class="chip ' + (st.shortlist[id] === k ? 'on' : '') + '" data-a="slst" data-id="' + id + '" data-v="' + k + '" style="font-size:.75rem;padding:4px 8px">' + SL[k] + '</button>'; }).join('') + '</div></div>';
    }).join('') + '<div style="height:4rem"></div>';
    var cta = '<div class="sticky-cta" style="bottom:62px;border-top:0;background:transparent"><button class="btn primary block" data-go="#compare"' + (st.cmp.length < 2 ? ' disabled style="opacity:.4"' : '') + '>' + ic('scale') + ' Compare ' + st.cmp.length + ' homes</button></div>';
    return { title: 'Shortlist', html: h, after: cta };
  };

  R.compare = function () {
    if (!st.profile) return gate('Compare homes against your needs', '');
    var rs = st.cmp.map(function (id) { return E.evaluate(E.prop(id), st.profile); });
    if (rs.length < 2) { location.hash = '#shortlist'; return { html: '' }; }
    var adv = E.advise('', st.cmp, st.profile);
    function row(label, fn, better) {
      var vals = rs.map(fn), raw = rs.map(function (r) { return better ? better(r) : null; });
      var diff = vals.some(function (v) { return v !== vals[0]; }), best = better ? raw.indexOf(Math.max.apply(null, raw)) : -1;
      return '<tr class="' + (diff ? 'diff' : '') + '"><td>' + label + '</td>' + vals.map(function (v, i) { return '<td class="' + (i === best && diff ? 'best' : '') + '">' + v + '</td>'; }).join('') + '</tr>';
    }
    var t = '<table class="cmp"><thead><tr><th></th>' + rs.map(function (r) { return '<th>' + esc(NM(r.p)) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      row('Fit', function (r) { return r.band; }, function (r) { return r.score; }) +
      row('Next step', function (r) { return ACT[r.action][0]; }) +
      row('Price', function (r) { return '<span class="mono">' + lakh(r.p.price) + '</span><br>' + badge(E.claim(r.p, 'price').status); }, function (r) { return -r.p.price; }) +
      row('All-in est.', function (r) { return '<span class="mono">~' + lakh(E.costs(r.p).total) + '</span>'; }, function (r) { return -E.costs(r.p).total; }) +
      row('Carpet', function (r) { var c = E.claim(r.p, 'carpet'); return '<span class="mono">' + esc(c.value) + '</span><br>' + badge(c.status); }, function (r) { return r.p.carpet || 0; }) +
      row('₹ / sq ft carpet', function (r) { return r.p.carpet ? '<span class="mono">' + Math.round(r.p.price * 1e5 / r.p.carpet).toLocaleString('en-IN') + '</span>' : 'Unknown'; }, function (r) { return r.p.carpet ? -r.p.price / r.p.carpet : -1e9; }) +
      (isInv() ?
        row('Monthly rent', function (r) { var x = E.rent(r.p); return x ? '<span class="mono">₹' + Math.round(x.lo / 1000) + '–' + Math.round(x.hi / 1000) + 'k</span><br>' + badge('sourced') : badge('unknown'); }, function (r) { var x = E.rent(r.p); return x ? x.mid : -1; }) +
        row('Gross yield', function (r) { var x = E.rent(r.p); return x ? '<span class="mono">~' + x.yield + '%</span><br>' + badge('estimated') : badge('unknown'); }, function (r) { var x = E.rent(r.p); return x ? x.yield : -1; }) +
        row('Rental demand', function (r) { return r.p.inv && r.p.inv.demand != null ? '<span class="mono">' + r.p.inv.demand + '</span> listings' : badge('unknown'); }, function (r) { return r.p.inv && r.p.inv.demand != null ? r.p.inv.demand : -1; }) +
        row('Status', function (r) { var pr = r.p.inv && r.p.inv.progress; return r.p.stage === 'Ready to move' ? 'Ready, rentable now' : 'Under construction' + (pr ? '<br><span class="mono">' + pr.pct + '%</span> built' : '<br>' + badge('unknown')); }) +
        row('Possession', function (r) { var c = E.claim(r.p, 'possession'); return esc(c.value) + '<br>' + badge(c.status); }) +
        row('Development nearby', function (r) { var g = E.growth(r.p, devStage); return g ? esc(g.st) + '<br><span class="xs muted">' + g.km + ' km</span>' : badge('unknown'); }, function (r) { var g = E.growth(r.p, devStage); return g ? g.s : -1; }) +
        row('Investment risks', function (r) { return E.investRisks(r.p, st.profile).filter(function (k) { return k.sev !== 'low'; }).length || 'None major'; })
      :
        st.profile.places.map(function (pl) { return row(pl.label.split(' · ')[0] + ' commute', function (r) { return '<span class="mono">' + r.p.commute[pl.key] + ' min</span>'; }, function (r) { return -r.p.commute[pl.key]; }); }).join('') +
        row('Possession', function (r) { var c = E.claim(r.p, 'possession'); return esc(c.value) + '<br>' + badge(c.status); }) +
        row('Nearest school', function (r) { return r.p.schools.length ? Math.min.apply(null, r.p.schools.map(function (s) { return s.km; })) + ' km' : badge('unknown'); }, function (r) { return r.p.schools.length ? -Math.min.apply(null, r.p.schools.map(function (s) { return s.km; })) : -99; })) +
      row('Evidence', function (r) { return r.ev.level; }, function (r) { return r.ev.v; }) +
      row('Open issues', function (r) { return r.findings.filter(function (f) { return f.severity !== 'low'; }).map(function (f) { return esc(f.title); }).join('<br>') || 'None'; }) +
      '</tbody></table>';
    var h = '<div class="card warm enter" style="margin-top:.25rem"><div class="caps" style="margin-bottom:.375rem">Decision Advisor</div><div class="small">' + adv.html + '</div><div class="chips" style="margin-top:.75rem">' + (isInv() ? ['What rent could these earn?', 'What\'s the real all-in cost?', 'What are the trade-offs?'] : ['Which should we visit first?', 'What\'s the real all-in cost?', 'What are we compromising on?']).map(function (q) { return '<button class="chip" data-a="ask" data-q="' + esc(q) + '">' + esc(q) + '</button>'; }).join('') + '</div></div>' +
      '<div class="sec" style="margin-top:1.25rem;overflow-x:auto">' + t + '</div><p class="xs muted" style="margin-top:.75rem">Highlighted rows differ. Bold = better on that row. Commutes are estimates and all-in costs include assumptions.</p>';
    return { title: 'Compare', back: '#shortlist', html: h };
  };

  /* ---------------- Notifications: lightweight alert & activity centre ---------------- */
  R.notifications = function () {
    var all = notifs(), fresh = all.filter(function (n) { return !st.read[n.id] && !n.quiet; }), earlier = all.filter(function (n) { return fresh.indexOf(n) < 0; });
    var KL = { conflict: ['k-finding', 'AI finding'], missing: ['k-finding', 'Missing document'], infra: ['k-update', 'Area update'], reminder: ['k-reminder', 'Reminder'], activity: ['k-activity', 'Activity'] };
    var row = function (n) {
      var un = !st.read[n.id] && !n.quiet, kl = KL[n.kind] || KL.activity;
      return '<div class="notif' + (un ? ' un' : '') + (n.sev === 'high' ? ' high' : '') + (n.quiet ? ' quiet' : '') + '"><span class="nic ' + n.kind + '">' + ic(n.icon, 'sm') + '</span><div style="flex:1;min-width:0"><div class="kindl ' + kl[0] + '">' + kl[1] + (n.sev === 'high' && un ? ' · important' : '') + '</div><div class="small">' + esc(n.title) + '</div>' + (n.meta.indexOf('·') >= 0 ? '<div class="xs muted">' + esc(n.meta.replace(/^[^·]+· /, '')) + (n.kind === 'conflict' || n.kind === 'missing' ? ' · Property Investigator' : n.kind === 'infra' ? ' · Future Development Analyst' : '') + '</div>' : '') +
        '<div class="nacts">' + (n.insight ? '<button class="link" data-a="openNotif" data-id="' + n.id + '">View insight</button>' : '') + (n.pid ? '<button class="link muted" data-go="#p-' + n.pid + '">Open property</button>' : '') + (n.go ? '<button class="link" data-a="openNotif" data-id="' + n.id + '">Open</button>' : '') + '</div></div>' +
        '<button class="iconbtn" data-a="dismissN" data-id="' + n.id + '" aria-label="Dismiss notification">' + ic('x', 'sm') + '</button></div>';
    };
    var h = '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:.25rem"><p class="small muted">Alerts and activity. The detail is in Insights.</p>' + (fresh.length ? '<button class="link small" style="white-space:nowrap" data-a="readAll">Mark all read</button>' : '') + '</div>' +
      (fresh.length ? '<div class="ngroup new"><div class="ngroup-h"><span>New</span><span class="mono">' + fresh.length + '</span></div>' + fresh.map(row).join('') + '</div>' : '') +
      (earlier.length ? '<div class="ngroup"><div class="ngroup-h"><span>Earlier</span><span class="mono">' + earlier.length + '</span></div>' + earlier.map(row).join('') + '</div>' : '') +
      (!all.length ? '<div class="empty" style="padding-top:4rem"><div class="ic">' + ic('bell') + '</div><h3 class="h">You\'re all caught up</h3><p class="small muted">We\'ll notify you when research on your homes changes.</p></div>' : '');
    return { title: 'Notifications', back: 'back', html: h };
  };

  /* ---------------- Insights: research & decision intelligence (visual) ---------------- */
  var SC = { verified: '#2E7D5B', sourced: '#4A6A8A', conflicting: '#B26A00', estimated: '#2E7A7A', assumption: '#7A6A55', unknown: '#C8C8C8', not_assessed: '#E4E4E4' };
  function secHead(icon, title, sub) { return '<div class="ins-h"><span class="mark">' + ic(icon, 'sm') + '</span><div><h3 class="h">' + title + '</h3>' + (sub ? '<div class="xs muted">' + sub + '</div>' : '') + '</div></div>'; }
  function diffText(c) {
    var a = c.sources[0].value, b = c.sources[1].value, na = parseFloat(String(a).replace(/[₹,L ]/g, '')), nb = parseFloat(String(b).replace(/[₹,L ]/g, ''));
    if (/sq ft/.test(a) && !isNaN(na)) { var d = Math.abs(na - nb); return d.toLocaleString('en-IN') + ' sq ft (' + Math.round(d / Math.max(na, nb) * 100) + '%)'; }
    if (/₹/.test(a) && !isNaN(na)) { return '₹' + E.fmt(Math.abs(na - nb)) + ' L (' + Math.round(Math.abs(na - nb) / Math.max(na, nb) * 100) + '%)'; }
    var da = Date.parse('1 ' + a), db = Date.parse('1 ' + b);
    if (!isNaN(da) && !isNaN(db)) return Math.round(Math.abs(db - da) / 2.63e9) + ' months later in the ' + DR.SOURCE_TYPES[c.sources[1].type].name.replace(' (simulated)', '').toLowerCase();
    return 'Values differ';
  }
  function invCard(i) {
    var p = E.prop(i.pid), c = i.field ? E.claim(p, i.field) : null, h = '<div class="card inv" id="ins-' + i.id + '"><div class="xs muted">' + esc(NM(p)) + ' · ' + esc(p.locality.split(',')[0]) + '</div><h3 class="h" style="margin-top:.125rem">' + esc(issueLabel({ type: i.cat, claim: c, title: i.title })) + '</h3>';
    if (i.cat === 'conflict' && c && c.sources.length > 1) {
      h += '<div class="vs">' + c.sources.slice(0, 2).map(function (s) { return '<div><div class="xs muted">' + DR.SOURCE_TYPES[s.type].name + '</div><b>' + esc(s.value) + '</b><div class="xs muted">Tier ' + DR.SOURCE_TYPES[s.type].tier + ' · ' + s.accessed + '</div></div>'; }).join('') + '</div>' +
        '<div class="kv small" style="border:0;padding:.625rem 0 0"><span class="muted">Difference</span><span class="kf mono">' + esc(diffText(c)) + '</span></div>';
    } else if (c) h += '<p class="small muted" style="margin-top:.5rem">' + esc(c.note || 'No source available.') + '</p>';
    h += '<p class="small" style="margin-top:.75rem"><span class="kf">Why it matters.</span> ' + esc(i.why) + '</p>';
    var qs = p.summary.questions.slice(0, 2);
    if (qs.length) h += '<div class="xs caps" style="margin-top:.875rem">Ask the builder</div><ol class="qlist" style="margin-top:.375rem">' + qs.map(function (q) { return '<li class="small">' + esc(q) + '</li>'; }).join('') + '</ol>';
    return h + '<div style="display:flex;gap:1rem;margin-top:.875rem"><button class="link small" data-a="openEvidence" data-id="' + p.id + '" data-f="' + (i.field || '') + '">See the evidence</button><button class="link small muted" data-a="dismiss" data-id="' + i.id + '">Mark as resolved</button></div></div>';
  }
  /* Compact development row: name, stage bar, distance, stated target, next milestone */
  function devMini(d, pid) {
    var cur = devStage(d), idx = DR.STAGES.indexOf(cur), changed = st.skip && d.next;
    var dist = typeof pid === 'string' && d.near[pid] != null ? ' · ' + d.near[pid] + ' km away' : '';
    return '<div class="dev-mini"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:baseline"><b class="small">' + esc(d.name) + '</b><span class="stage-pill' + (idx >= 3 ? ' adv' : '') + '">' + cur + '</span></div>' +
      '<div class="stages" style="margin:.5rem 0 .25rem">' + DR.STAGES.map(function (s, i) { return '<i class="' + (i < idx ? 'done' : i === idx ? 'now' : '') + '"></i>'; }).join('') + '</div>' +
      '<div class="xs muted">' + d.kind + dist + ' · ' + esc(d.target) + (changed ? ' · <b class="kf">changed ' + d.next.date + '</b>' : '') + '</div>' +
      '<div class="xs" style="margin-top:.25rem"><span class="muted">Watch for:</span> ' + esc(d.watch) + '</div></div>';
  }
  function devStageChart(devs) {
    var rh = 24, H = devs.length * rh + 30, x0 = 150, W = 180, svg = '<svg viewBox="0 0 340 ' + H + '" class="chart" role="img" aria-label="Stage reached by each tracked development">';
    devs.forEach(function (d, i) {
      var y = 8 + i * rh, idx = DR.STAGES.indexOf(devStage(d));
      svg += '<text x="0" y="' + (y + 11) + '" font-size="10.5" fill="#1F2328" font-family="system-ui,sans-serif">' + esc(d.name.length > 24 ? d.name.slice(0, 23) + '…' : d.name) + '</text>';
      for (var s = 0; s < 6; s++) svg += '<rect x="' + (x0 + s * (W / 6)) + '" y="' + (y + 3) + '" width="' + (W / 6 - 3) + '" height="10" rx="2" fill="' + (s <= idx ? '#252C49' : '#E4E4E4') + '"' + (s <= idx && idx < 3 ? ' opacity=".45"' : '') + '/>';
    });
    ['Prop.', 'Ann.', 'Appr.', 'Fund.', 'Build', 'Open'].forEach(function (l, s) { svg += '<text x="' + (x0 + s * (W / 6) + (W / 12) - 1.5) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="8.5" fill="#5F6368" font-family="system-ui,sans-serif">' + l + '</text>'; });
    return svg + '</svg>';
  }
  function statBox(v, l, tone) { return '<div class="stat"><b class="' + (tone || '') + '">' + v + '</b><span>' + l + '</span></div>'; }

  R.insights = function () {
    var prof = st.profile, res = E.run(prof), pool = prof ? res.pass : res.all, find = insights();
    var h = '<p class="small muted" style="padding-top:.25rem">What ' + (prof ? 'the research on homes that meet your limits' : 'our research') + ' adds up to. Alerts live in <a class="link" href="#notifications">Notifications</a>.</p>';

    /* summary stats */
    var crit = 0, ver = 0, srcs = 0;
    pool.forEach(function (r) { r.p.claims.forEach(function (c) { srcs += c.sources.length; if (c.critical) { crit++; if (c.status === 'verified') ver++; } }); });
    var open = find.filter(function (i) { return i.cat !== 'infra' && i.sev !== 'low'; }).length;
    h += '<div class="stats sec" style="margin-top:1.25rem">' + statBox(Math.round(ver / crit * 100) + '%', 'critical claims verified', 'kf') + statBox(srcs, 'source records checked') + statBox(open, 'open questions', open ? 'warn' : '') + '</div>' + (isInv() ? '%%FUTURE%%' : '');

    /* 1. Property research */
    var rows = pool.slice().sort(function (a, b) { return b.ev.v - a.ev.v; });
    var bars = rows.map(function (r) {
      var cs = r.p.claims, n = cs.length, seg = ['verified', 'sourced', 'conflicting', 'unknown', 'not_assessed'].map(function (k) { var c = cs.filter(function (x) { return x.status === k; }).length; return c ? '<i style="flex:' + c + ';background:' + SC[k] + '" title="' + c + ' ' + DR.STATUS[k].label.toLowerCase() + '"></i>' : ''; }).join('');
      var vp = Math.round(cs.filter(function (x) { return x.status === 'verified'; }).length / n * 100);
      return '<div class="stack-row" data-go="#p-' + r.p.id + '-evidence"><span class="nm">' + esc(NM(r.p)) + '</span><span class="stack">' + seg + '</span><span class="pc mono">' + vp + '%</span></div>';
    }).join('');
    var conflicts = find.filter(function (i) { return i.cat === 'conflict'; });
    var mkt = conflicts.filter(function (i) { var c = E.claim(E.prop(i.pid), i.field); return c && c.sources.some(function (s) { return DR.SOURCE_TYPES[s.type].tier === 3; }) && c.sources.some(function (s) { return DR.SOURCE_TYPES[s.type].tier <= 2; }); }).length;
    h += '<section class="ins sec">' + secHead('layers', 'Property research', 'Property Investigator · how complete the evidence is') +
      (conflicts.length ? '<p class="finding"><span class="kf">Pattern:</span> in ' + mkt + ' of ' + conflicts.length + ' conflicts, a brochure or portal listing disagreed with the registry record or the builder\'s price sheet. Treat marketing material as a starting point, not as evidence.</p>' : '') +
      '<div class="card" style="margin-top:.75rem"><div class="caps" style="margin-bottom:.625rem">Verification completeness</div>' + bars +
      '<div class="legend-row">' + ['verified', 'sourced', 'conflicting', 'unknown', 'not_assessed'].map(function (k) { return '<span><i style="background:' + SC[k] + ';border-radius:2px"></i>' + DR.STATUS[k].label + '</span>'; }).join('') + '</div></div>' +
      '<div class="caps" style="margin:1.25rem 0 .5rem">Findings that need an answer</div>' +
      (function () {
        var open = find.filter(function (i) { return (i.cat === 'conflict' || i.cat === 'missing') && i.sev !== 'low'; }), done = {}, out = '';
        open.forEach(function (i) {
          var grp = open.filter(function (x) { return x.cat === 'missing' && x.pid === i.pid; });
          if (i.cat !== 'missing' || grp.length < 2) { out += invCard(i); return; }
          if (done[i.pid]) return; done[i.pid] = true;
          var p = E.prop(i.pid);
          out += '<div class="card inv" id="ins-grp-' + p.id + '"><div class="xs muted">' + esc(NM(p)) + ' · ' + esc(p.locality.split(',')[0]) + '</div><h3 class="h" style="margin-top:.125rem">' + grp.length + ' key details are missing</h3>' +
            '<div style="margin-top:.5rem">' + grp.map(function (g) { var c = E.claim(p, g.field); return '<div class="kv small"><span>' + esc(c.label) + '</span>' + badge(c.status) + '</div>'; }).join('') + '</div>' +
            '<p class="small" style="margin-top:.75rem"><span class="kf">Why it matters.</span> With only a single agent listing as evidence, none of the basics can be checked. ' + esc(grp[0].why) + '</p>' +
            '<div class="xs caps" style="margin-top:.875rem">Ask the builder</div><ol class="qlist" style="margin-top:.375rem">' + p.summary.questions.slice(0, 3).map(function (q) { return '<li class="small">' + esc(q) + '</li>'; }).join('') + '</ol>' +
            '<div style="display:flex;gap:1rem;margin-top:.875rem"><button class="link small" data-a="openEvidence" data-id="' + p.id + '" data-f="">See the evidence</button></div></div>';
        });
        return out || '<p class="small muted">No open findings.</p>';
      })() + '</section>';

    if (!prof) {
      h += '<section class="ins sec card warm"><h3 class="h">See comparisons, commute analysis and a plan</h3><p class="small muted" style="margin:.25rem 0 .75rem">Those insights depend on your budget, places and priorities.</p><button class="btn primary sm" data-go="#ob-1">Personalise</button></section>';
    } else {
      /* 2. Comparative */
      var setIds = Object.keys(st.shortlist).length >= 2 ? Object.keys(st.shortlist).slice(0, 4) : res.focus.slice(0, 4).map(function (r) { return r.p.id; });
      var S = setIds.map(function (id) { return E.evaluate(E.prop(id), prof); });
      if (S.length >= 2) {
        var mx = Math.max(prof.budgetMax, Math.max.apply(null, S.map(function (r) { return E.costs(r.p).total; }))) + 3, mn = Math.min.apply(null, S.map(function (r) { return r.p.price; })) - 12;
        var X = function (v) { return 110 + (v - mn) / (mx - mn) * 220; }, rh = 30, Hc = S.length * rh + 30;
        var svg = '<svg viewBox="0 0 340 ' + Hc + '" class="chart" role="img" aria-label="Quoted price and estimated all-in cost against your budget">';
        S.forEach(function (r, i) { var y = 8 + i * rh, c = E.costs(r.p); svg += '<text x="0" y="' + (y + 13) + '" font-size="11" fill="#1F2328" font-family="system-ui,sans-serif">' + esc(NM(r.p).split(' ')[0]) + '</text><rect x="110" y="' + (y + 3) + '" width="' + (X(c.total) - 110) + '" height="14" rx="3" fill="#252C49" opacity=".22"/><rect x="110" y="' + (y + 3) + '" width="' + (X(r.p.price) - 110) + '" height="14" rx="3" fill="#252C49"/><text x="' + (X(c.total) + 4) + '" y="' + (y + 14) + '" font-size="10" fill="#5F6368" font-family="ui-monospace,monospace">' + c.total + '</text>'; });
        svg += '<line x1="' + X(prof.budgetMax) + '" x2="' + X(prof.budgetMax) + '" y1="2" y2="' + (Hc - 18) + '" stroke="#B26A00" stroke-dasharray="3 3"/><text x="' + X(prof.budgetMax) + '" y="' + (Hc - 6) + '" text-anchor="middle" font-size="10" fill="#B26A00" font-family="system-ui,sans-serif">Budget ₹' + prof.budgetMax + ' L</text></svg>';
        var crits = prof.priorities.concat(isInv() ? ['demand', 'growth'] : ['budget']).filter(function (k, i, a) { return a.indexOf(k) === i && S[0].cr[k]; }).slice(0, 4);
        var cw = 230 / S.length, mH = crits.length * 34 + 30;
        var mtx = '<svg viewBox="0 0 340 ' + mH + '" class="chart" role="img" aria-label="Trade-off matrix: how each home scores on your priorities">';
        S.forEach(function (r, j) { mtx += '<text x="' + (110 + cw * j + cw / 2) + '" y="12" text-anchor="middle" font-size="10" fill="#5F6368" font-family="system-ui,sans-serif">' + esc(NM(r.p).split(' ')[0]) + '</text>'; });
        crits.forEach(function (k, i) {
          var y = 34 + i * 34, best = S.slice().sort(function (a, b) { return (b.cr[k].s || 0) - (a.cr[k].s || 0); })[0];
          mtx += '<text x="0" y="' + (y + 4) + '" font-size="11" fill="#1F2328" font-family="system-ui,sans-serif">' + DR.CRITERIA[k] + '</text><line x1="110" x2="340" y1="' + (y + 17) + '" y2="' + (y + 17) + '" stroke="#E4E4E4"/>';
          S.forEach(function (r, j) { var s = r.cr[k].s, cx = 110 + cw * j + cw / 2; mtx += s == null ? '<circle cx="' + cx + '" cy="' + y + '" r="8" fill="none" stroke="#6B6B6B" stroke-dasharray="2 2"/>' : '<circle cx="' + cx + '" cy="' + y + '" r="' + (3 + s * 8) + '" fill="#252C49" opacity="' + (r === best ? 1 : 0.35) + '"/>'; });
        });
        mtx += '</svg>';
        var leaders = crits.map(function (k) { var b = S.slice().sort(function (a, c) { return (c.cr[k].s || 0) - (a.cr[k].s || 0); })[0]; return '<b>' + esc(NM(b.p)) + '</b> leads on ' + DR.CRITERIA[k].toLowerCase(); });
        h += '<section class="ins sec" id="ins-cmp">' + secHead('scale', 'Comparative', Object.keys(st.shortlist).length >= 2 ? 'Your shortlist' : 'Your top recommendations (save homes to compare your own)') +
          '<p class="finding">' + leaders.slice(0, 3).join('; ') + '. No single home wins every priority.</p>' +
          '<div class="card" style="margin-top:.75rem"><div class="caps">Quoted price vs estimated all-in cost (₹ L)</div>' + svg + '<p class="xs muted">Dark bar: quoted price. Light bar: all-in estimate with taxes and assumed registration costs.</p></div>' +
          '<div class="card" style="margin-top:.75rem"><div class="caps">Trade-offs on your priorities</div>' + mtx + '<p class="xs muted">Larger dot means a better score. A dashed ring means unknown, which is not scored.</p></div>' +
          '<div style="margin-top:.75rem"><button class="link small" data-go="#compare">Open full comparison</button></div></section>';
      }
      /* 3. Location: investors get rental & demand instead of commute */
      if (isInv()) {
        var Y = res.pass.slice().sort(function (a, b) { return ((E.rent(b.p) || {}).yield || -1) - ((E.rent(a.p) || {}).yield || -1); }).slice(0, 6), yH = Y.length * 26 + 34, yx = function (v) { return 110 + v / 6 * 215; };
        var ych = '<svg viewBox="0 0 340 ' + yH + '" class="chart" role="img" aria-label="Estimated gross rental yield range per home">';
        Y.forEach(function (r, i) { var y = 14 + i * 26, x = E.rent(r.p); ych += '<text x="0" y="' + (y + 4) + '" font-size="11" fill="#1F2328" font-family="system-ui,sans-serif">' + esc(NM(r.p).split(' ')[0]) + '</text>' + (x ? '<line x1="' + yx(x.ylo) + '" x2="' + yx(x.yhi) + '" y1="' + y + '" y2="' + y + '" stroke="#252C49" stroke-width="6" stroke-linecap="round" opacity=".35"/><circle cx="' + yx(x.yield) + '" cy="' + y + '" r="5" fill="#252C49"/><text x="' + (yx(x.yhi) + 8) + '" y="' + (y + 4) + '" font-size="10" fill="#5F6368" font-family="ui-monospace,monospace">' + x.yield + '%</text>' : '<text x="110" y="' + (y + 4) + '" font-size="10" fill="#5F6368" font-family="system-ui,sans-serif">No rental evidence (unknown)</text>'); });
        [0, 2, 4, 6].forEach(function (m) { ych += '<text x="' + yx(m) + '" y="' + (yH - 8) + '" text-anchor="middle" font-size="9" fill="#5F6368" font-family="ui-monospace,monospace">' + m + '%</text>'; });
        ych += '</svg>';
        var topY = Y.filter(function (r) { return E.rent(r.p); })[0], ready = res.pass.filter(function (r) { return r.p.stage === 'Ready to move'; }).length;
        h += '<section class="ins sec" id="ins-loc">' + secHead('activity', 'Rental & demand', 'From simulated comparable listings · estimates, not returns') +
          (topY ? '<p class="finding"><b class="kf">' + esc(NM(topY.p)) + '</b> shows the highest estimated gross yield (~' + E.rent(topY.p).yield + '%), but ' + (topY.p.stage === 'Under construction' ? 'it earns nothing until possession in ' + esc(topY.p.possession) + '.' : 'check maintenance and vacancy before relying on it.') + '</p>' : '') +
          '<div class="card" style="margin-top:.75rem"><div class="caps">Estimated gross yield (range and midpoint)</div>' + ych + '<p class="xs muted">Asking rent × 12 ÷ quoted price. Before maintenance, vacancy and tax. Not guaranteed.</p></div>' +
          '<div class="stats" style="margin-top:.75rem">' + statBox(ready + ' of ' + res.pass.length, 'matches rentable now') + statBox((res.pass.length - ready) + ' of ' + res.pass.length, 'under construction, no rent yet') + '</div></section>';
      } else {
      var L = res.focus.slice(0, 5), cm = prof.commuteMax, ax = function (m) { return 110 + m / 75 * 225; }, lH = L.length * 26 + 34;
      var dots = '<svg viewBox="0 0 340 ' + lH + '" class="chart" role="img" aria-label="Peak commute minutes for each person, per home">';
      dots += '<rect x="' + ax(0) + '" y="0" width="' + (ax(cm) - ax(0)) + '" height="' + (lH - 26) + '" fill="#2E7D5B" opacity=".06"/><line x1="' + ax(cm) + '" x2="' + ax(cm) + '" y1="0" y2="' + (lH - 26) + '" stroke="#2E7D5B" stroke-dasharray="3 3"/>';
      L.forEach(function (r, i) { var y = 14 + i * 26, a = r.p.commute.office1, b = r.p.commute.office2; dots += '<text x="0" y="' + (y + 4) + '" font-size="11" fill="#1F2328" font-family="system-ui,sans-serif">' + esc(NM(r.p).split(' ')[0]) + '</text><line x1="' + ax(Math.min(a, b)) + '" x2="' + ax(Math.max(a, b)) + '" y1="' + y + '" y2="' + y + '" stroke="#252C49" stroke-opacity=".35" stroke-width="2"/><circle cx="' + ax(a) + '" cy="' + y + '" r="5" fill="#252C49"/><circle cx="' + ax(b) + '" cy="' + y + '" r="5" fill="#FAFAFA" stroke="#252C49" stroke-width="2"/>'; });
      [0, 15, 30, 45, 60, 75].forEach(function (m) { dots += '<text x="' + ax(m) + '" y="' + (lH - 8) + '" text-anchor="middle" font-size="9" fill="#5F6368" font-family="ui-monospace,monospace">' + m + '</text>'; });
      dots += '</svg>';
      var balanced = L.slice().sort(function (a, b) { return Math.max(a.p.commute.office1, a.p.commute.office2) - Math.max(b.p.commute.office1, b.p.commute.office2); })[0];
      var nearSchool = L.filter(function (r) { return r.p.schools.some(function (s) { return s.km <= 1; }); }).length;
      var near = prof.places.map(function (pl) { return pl.label.split(' · ')[0]; });
      h += '<section class="ins sec" id="ins-loc">' + secHead('pin', 'Location intelligence', 'Commute and neighbourhood, from estimated and sourced data') +
        '<p class="finding"><b class="kf">' + esc(NM(balanced.p)) + '</b> gives the most balanced commute: neither of you travels more than ' + Math.max(balanced.p.commute.office1, balanced.p.commute.office2) + ' min at peak.</p>' +
        '<div class="card" style="margin-top:.75rem"><div class="caps">Peak commute (minutes)</div>' + dots + '<div class="legend-row"><span><i style="background:#252C49"></i>' + esc(near[0]) + '</span><span><i style="background:#FAFAFA;border:2px solid #252C49;box-sizing:border-box"></i>' + esc(near[1]) + '</span><span><i style="background:#2E7D5B;opacity:.4;border-radius:2px"></i>Within your ' + cm + '-min limit</span></div></div>' +
        '<div class="stats" style="margin-top:.75rem">' + statBox(nearSchool + ' of ' + L.length, 'homes with a school within 1 km') + statBox(L.filter(function (r) { return r.p.transit.km <= 0.5; }).length + ' of ' + L.length, 'homes with transit within 500 m') + '</div>' +
        '<p class="xs muted" style="margin-top:.5rem">Commute times are estimates. School and transit distances are straight-line and sourced from simulated map data. Open any home\'s Map view for detail.</p></section>';
      }
    }

    /* 4. Future development: timeline */
    var devs = DR.DEVELOPMENTS.filter(function (d) { return Object.keys(d.near).some(function (id) { return pool.some(function (r) { return r.p.id === id; }); }); });
    if (isInv()) devs.sort(function (a, b) { return DR.STAGES.indexOf(devStage(b)) - DR.STAGES.indexOf(devStage(a)); });
    var advN = devs.filter(function (d) { return DR.STAGES.indexOf(devStage(d)) >= 3; }).length;
    var nearAdv = pool.filter(function (r) { return devs.some(function (d) { return d.near[r.p.id] != null && d.near[r.p.id] <= 3 && DR.STAGES.indexOf(devStage(d)) >= 2; }); }).length;
    var fut = '<section class="ins sec">' + secHead('train', 'Future development', 'Future Development Analyst · stages, not promises') +
      (isInv() ? '<p class="finding"><span class="kf">Pattern:</span> ' + nearAdv + ' of your ' + pool.length + ' matches are within 3 km of a project that is approved or further along, but only ' + advN + ' of ' + devs.length + ' tracked projects are funded or under construction. Weigh plans by stage, not by headline.</p>' +
        '<div class="card" style="margin-top:.75rem"><div class="caps">Stage of each tracked project</div>' + devStageChart(devs) + '<p class="xs muted">Bars show how far each project has progressed through the six stages (simulated notices).</p></div>' : '') +
      devs.map(function (d) {
      var cur = devStage(d), idx = DR.STAGES.indexOf(cur), hist = devHistory(d), changed = st.skip && d.next;
      var homes = Object.keys(d.near).filter(function (id) { return pool.some(function (r) { return r.p.id === id; }); });
      return '<div class="card' + (changed ? ' warm' : '') + '" id="ins-' + d.id + '" style="margin-top:.75rem"><div style="display:flex;justify-content:space-between;gap:.5rem"><b class="small">' + d.name + '</b><span class="xs ' + (changed ? 'kf' : 'muted') + '">' + (changed ? 'Changed ' + d.next.date : d.kind) + '</span></div>' +
        '<div class="stages">' + DR.STAGES.map(function (s, i) { return '<i class="' + (i < idx ? 'done' : i === idx ? 'now' : '') + '"></i>'; }).join('') + '</div><div class="stage-labels">' + DR.STAGES.map(function (s, i) { return '<span style="' + (i === idx ? 'color:var(--cta-text);font-weight:600' : '') + '">' + s + '</span>'; }).join('') + '</div>' +
        '<div class="tl">' + hist.map(function (x) { return '<span>' + x.stage + ' <b class="mono">' + x.date + '</b></span>'; }).join('') + '</div>' +
        '<p class="small" style="margin-top:.5rem"><span style="color:var(--s-verified)">' + ic('plus', 'sm') + '</span> ' + d.plus + '</p><p class="small muted" style="margin-top:.25rem">' + ic('alert', 'sm') + ' ' + d.minus + '</p>' +
        '<div class="chips" style="margin-top:.625rem">' + homes.map(function (id) { return '<button class="chip" style="font-size:.75rem;padding:3px 8px" data-go="#p-' + id + '-future">' + esc(NM(E.prop(id))) + ' · ' + d.near[id] + ' km</button>'; }).join('') + '</div>' +
        (isInv() ? '<div class="kv small" style="margin-top:.5rem"><span class="muted">Stated target</span><span>' + esc(d.target) + '</span></div><div class="kv small"><span class="muted">Watch for</span><span style="text-align:right">' + esc(d.watch) + '</span></div>' : '') +
        '<div class="xs muted" style="margin-top:.5rem">' + d.source + ' · accessed ' + d.accessed + '</div></div>';
    }).join('') + '</section>';
    if (isInv()) h = h.replace('%%FUTURE%%', fut); else h += fut;

    /* 5. AI recommendations: an actual sequence */
    if (prof) {
      var steps = [];
      res.investigate.forEach(function (r) { var f = r.findings.filter(function (x) { return x.severity === 'high'; })[0]; steps.push({ t: 'Ask ' + r.p.builder + ' about the ' + (f.claim ? f.claim.label.toLowerCase() : 'open issue') + ' before visiting <b>' + esc(NM(r.p)) + '</b>.', go: '#ins-' + f.id, l: 'See finding' }); });
      if (res.worth.length) steps.push({ t: 'Visit ' + res.worth.map(function (r) { return '<b>' + esc(NM(r.p)) + '</b>'; }).join(', ') + '. Their key facts are backed by evidence.', go: '#p-' + res.worth[0].p.id, l: 'Open first home' });
      if (Object.keys(st.shortlist).length < 2) steps.push({ t: 'Save 2–3 homes so the Advisor can compare them against your priorities.', go: '#home', l: 'Go to Home' });
      if (res.over.length) steps.push({ t: 'Decide whether you could stretch for <b>' + esc(NM(res.over[0].p)) + '</b> (' + esc(res.over[0].fails[0].text) + '). Otherwise drop it.', go: '#p-' + res.over[0].p.id, l: 'Review' });
      h += '<section class="ins sec">' + secHead('route', 'What to do next', 'Decision Advisor · in order') + '<ol class="steps-list">' + steps.map(function (s) { return '<li><span>' + s.t + '</span><button class="link small" data-a="go2" data-v="' + s.go + '">' + s.l + '</button></li>'; }).join('') + '</ol></section>';
    }

    /* 6. Market & investment: descriptive spread only */
    var pts = DR.PROPERTIES.filter(function (p) { return p.carpet; }).map(function (p) { return { p: p, v: Math.round(p.price * 1e5 / p.carpet) }; }).sort(function (a, b) { return a.v - b.v; });
    var lo = pts[0].v, hi = pts[pts.length - 1].v, med = pts[Math.floor(pts.length / 2)].v, px = function (v) { return 14 + (v - lo) / (hi - lo) * 312; };
    var focusIds = prof ? res.focus.map(function (r) { return r.p.id; }) : [];
    var strip = '<svg viewBox="0 0 340 64" class="chart" role="img" aria-label="Price per square foot of carpet across researched homes"><line x1="14" x2="326" y1="26" y2="26" stroke="#E4E4E4" stroke-width="2"/><line x1="' + px(med) + '" x2="' + px(med) + '" y1="12" y2="40" stroke="#5F6368" stroke-dasharray="2 2"/>' +
      pts.map(function (x) { var f = focusIds.indexOf(x.p.id) >= 0; return '<circle cx="' + px(x.v) + '" cy="26" r="' + (f ? 6 : 4.5) + '" fill="' + (f ? '#252C49' : '#FAFAFA') + '" stroke="#252C49" stroke-width="1.5"><title>' + esc(NM(x.p)) + ': ₹' + x.v.toLocaleString('en-IN') + '/sq ft</title></circle>'; }).join('') +
      '<text x="14" y="58" font-size="9.5" fill="#5F6368" font-family="ui-monospace,monospace">₹' + lo.toLocaleString('en-IN') + '</text><text x="' + px(med) + '" y="58" text-anchor="middle" font-size="9.5" fill="#5F6368" font-family="ui-monospace,monospace">median ₹' + med.toLocaleString('en-IN') + '</text><text x="326" y="58" text-anchor="end" font-size="9.5" fill="#5F6368" font-family="ui-monospace,monospace">₹' + hi.toLocaleString('en-IN') + '</text></svg>';
    h += '<section class="ins sec">' + secHead('activity', 'Market & investment', 'Descriptive only, from the ' + pts.length + ' researched homes with a known carpet area') +
      '<div class="card" style="margin-top:.75rem"><div class="caps">₹ per sq ft of carpet area</div>' + strip + '<p class="xs muted">' + (prof ? 'Filled dots are your recommended homes. ' : '') + 'This is the spread in our simulated dataset, not market data.</p></div>' +
      '<p class="small muted" style="margin-top:.75rem">' + ((prof && prof.intent === 'invest') ? 'Use price per sq ft with rent and delivery risk, not on its own. Liquidity and resale data aren\'t covered in this prototype. ' : 'You are buying a home to live in. Switch to an investment profile in onboarding to see rent and yield. ') + 'We will never show price-appreciation forecasts as fact.</p></section>';
    return { title: 'Insights', html: h };
  };

  R.property = function (id, tab) {
    var p = E.prop(id); if (!p) return R.home();
    ui.tab = tab || ui.tab || 'summary';
    var prof = st.profile, r = E.evaluate(p, prof), saved = !!st.shortlist[id];
    if (ui.viewFor !== id) { ui.view = 'details'; ui.viewFor = id; ui.poi = null; ui.mapf = 'all'; }
    var hdr = '<div class="hero-art">' + art(p, 180) + '</div><div style="padding-top:1rem"><div class="xs muted">' + esc(p.builder) + ' · ' + esc(p.locality) + '</div><h2 class="h" style="margin-top:.25rem">' + esc(NM(p)) + '</h2>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:.5rem"><span class="small">' + p.bhk + ' BHK ' + p.type.toLowerCase() + ' · <span class="mono">' + (p.carpet ? p.carpet.toLocaleString('en-IN') + ' sq ft' : 'area ?') + '</span></span><span class="price">' + lakh(p.price) + '</span></div>' +
      (isInv() ? '<div class="xs muted" style="text-align:right">' + (p.carpet ? '<span class="mono">₹' + Math.round(p.price * 1e5 / p.carpet).toLocaleString('en-IN') + '</span> per sq ft of carpet' : 'Price per sq ft unknown (carpet area not published)') + '</div>' : '') +
      (prof ? '<div style="display:flex;gap:1rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">' + fit(r.band) + evi(r.ev) + '</div><div class="card" style="margin-top:.75rem;display:flex;gap:.75rem;align-items:flex-start">' + act(r.action) + '<span class="small">' + esc(r.reason) + '</span></div>'
        : '<div style="margin-top:.75rem">' + evi(r.ev) + '</div><button class="card warm tap" style="margin-top:.75rem;width:100%;text-align:left" data-go="#ob-1"><b class="small">Does this fit you?</b><div class="xs muted">Add your needs to see fit, trade-offs and a recommended next step.</div></button>') + '</div>';
    var tabs = isInv() ? [['summary', 'Summary'], ['future', 'Future development'], ['evidence', 'Evidence'], ['location', 'Location']] : [['summary', 'Summary'], ['evidence', 'Evidence'], ['location', 'Location'], ['future', 'Future outlook']];
    var tb = '<div class="tabs" style="margin-top:1.25rem">' + tabs.map(function (t) { return '<button class="' + (ui.tab === t[0] ? 'on' : '') + '" data-a="tab" data-v="' + t[0] + '" data-id="' + id + '">' + t[1] + '</button>'; }).join('') + '</div>';
    var body = '';
    var cite = function (field) { var c = E.claim(p, field); return c ? '<span class="cite" data-a="claim" data-id="' + id + '" data-f="' + field + '">' + ic(DR.STATUS[c.status].icon, 'sm') + c.label.toLowerCase() + '</span>' : ''; };
    var invQs = isInv() ? (p.stage === 'Under construction' ? ['What is the latest construction progress by tower, and when was it certified?', 'Which payment milestones are left, and what is the delay compensation?'] : ['Is the unit tenanted now, and at what rent?', 'What are the monthly maintenance and annual property tax?']).concat(p.summary.questions.slice(0, 1)) : null;
    if (ui.tab === 'summary' && isInv()) {
      var rt = E.rent(p), g = E.growth(p, devStage), pr = p.inv && p.inv.progress, risks = E.investRisks(p, prof), oc = E.claim(p, 'oc');
      var missingI = p.claims.filter(function (c) { return c.status === 'unknown' || c.status === 'not_assessed'; });
      body = '<div class="card warm rs-card fade" style="margin-top:1rem"><div class="caps">Investment research summary</div>' +
        '<p style="margin-top:.5rem"><b>Income.</b> ' + (rt ? 'Comparable listings ask ₹' + Math.round(rt.lo / 1000) + 'k–' + Math.round(rt.hi / 1000) + 'k a month, which puts estimated gross yield at ~' + rt.ylo + '–' + rt.yhi + '%' + (p.stage === 'Under construction' ? ', starting only after possession.' : '.') : 'No comparable rentals were found, so income is unknown.') + ' ' + cite('price') + '</p>' +
        '<p style="margin-top:.5rem"><b>Location.</b> ' + (g ? esc(g.d.name) + ' is ' + g.km + ' km away and ' + g.st.toLowerCase() + '. That is a stage, not a promise.' : 'We found no reliable development information nearby.') + '</p>' +
        '<p style="margin-top:.5rem"><b>Delivery.</b> ' + (p.stage === 'Ready to move' ? 'Ready now. ' + (oc && oc.status === 'verified' ? 'An occupancy certificate is on file.' : 'The occupancy certificate could not be found, which can affect tenants and resale.') : (pr ? pr.pct + '% built per the ' + pr.asOf + ' registry report. ' : 'Construction progress is unknown. ') + 'Expected possession: ' + esc(p.possession) + '.') + ' ' + cite('possession') + '</p>' +
        '<p class="xs muted" style="margin-top:.75rem">Rents are simulated comparables. Yields are estimates, not guaranteed returns, and we don\'t forecast appreciation.</p></div>';
      body += '<div class="inv-stats">' +
        '<div class="stat"><b class="mono">' + (p.carpet ? '₹' + Math.round(p.price * 1e5 / p.carpet).toLocaleString('en-IN') : '?') + '</b><span>per sq ft of carpet</span>' + badge(p.carpet ? E.claim(p, 'carpet').status : 'unknown') + '</div>' +
        '<div class="stat"><b class="mono">' + (rt ? '₹' + Math.round(rt.lo / 1000) + '–' + Math.round(rt.hi / 1000) + 'k' : '?') + '</b><span>monthly rent' + (rt ? ' · ' + rt.n + ' comparables' : '') + '</span>' + badge(rt ? 'sourced' : 'unknown') + '</div>' +
        '<div class="stat"><b class="mono kf">' + (rt ? '~' + rt.yield + '%' : '?') + '</b><span>gross yield, before costs</span>' + badge(rt ? 'estimated' : 'unknown') + '</div>' +
        '<div class="stat"><b class="mono">' + (p.inv && p.inv.demand != null ? p.inv.demand : '?') + '</b><span>rental listings within 2 km</span>' + badge(p.inv && p.inv.demand != null ? 'sourced' : 'unknown') + '</div></div>';
      var dvs = DR.DEVELOPMENTS.filter(function (d) { return d.near[id] != null; }).sort(function (a, b) { return DR.STAGES.indexOf(devStage(b)) - DR.STAGES.indexOf(devStage(a)); });
      body += '<div class="sec"><div class="sec-h"><span class="caps">Future development nearby</span><button class="link small" data-a="tab" data-v="future" data-id="' + id + '">Full timeline</button></div>' +
        (dvs.length ? '<div class="card">' + dvs.slice(0, 3).map(function (d) { return devMini(d, id); }).join('<div style="height:1px;background:var(--border);margin:.875rem 0"></div>') + '</div><p class="xs muted" style="margin-top:.5rem">Stages from simulated civic notices. A stage is not a promise, and we don\'t turn plans into price forecasts.</p>'
          : '<div class="card small muted">' + ic('help', 'sm') + ' No reliable development information near this home. Its future depends on the existing neighbourhood.</div>') + '</div>';
      if (p.stage === 'Under construction') {
        body += '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Construction &amp; payments</div><div class="card">' +
          '<div style="display:flex;justify-content:space-between" class="small"><b>Construction progress</b>' + badge(pr ? 'sourced' : 'unknown') + '</div>' + (pr ? '<div class="progress"><i style="width:' + pr.pct + '%"></i></div><div class="xs muted">' + pr.pct + '% complete · registry quarterly report, ' + pr.asOf + ' (simulated)</div>' : '<p class="small muted" style="margin-top:.375rem">No progress report found. Ask the builder for the latest certified update.</p>') +
          '<div class="kv small" style="margin-top:.75rem"><span>Expected possession</span><span class="r"><span>' + esc(p.possession) + '</span>' + badge(E.claim(p, 'possession').status) + '</span></div>' +
          '<div class="kv small"><span>Payment plan</span><span class="r" style="max-width:62%;text-align:right"><span>' + esc(p.inv && p.inv.pay ? p.inv.pay : 'Not published') + '</span>' + badge(p.inv && p.inv.pay ? 'sourced' : 'unknown') + '</span></div>' +
          '<div class="kv small"><span>Builder &amp; registration</span><span class="r"><span>' + esc(p.builder) + '</span>' + badge(E.claim(p, 'rera').status) + '</span></div></div></div>';
      } else {
        body += '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Ready-to-move check</div><div class="card">' +
          '<div class="kv small"><span>Possession</span><span class="r"><span>Immediate</span>' + badge(E.claim(p, 'possession').status) + '</span></div>' +
          '<div class="kv small"><span>Occupancy certificate</span><span class="r"><span>' + esc(oc ? oc.value : 'Not checked') + '</span>' + badge(oc ? oc.status : 'not_assessed') + '</span></div>' +
          '<div class="kv small"><span>Building age</span><span class="r"><span>' + (p.inv && p.inv.built ? (2026 - p.inv.built) + ' yr (completed ' + p.inv.built + ')' : 'Unknown') + '</span>' + badge(p.inv && p.inv.built ? 'sourced' : 'unknown') + '</span></div>' +
          '<div class="kv small"><span>Unit condition</span><span class="r"><span>Not inspected</span>' + badge('not_assessed') + '</span></div>' +
          '<div class="kv small"><span>Builder &amp; registration</span><span class="r"><span>' + esc(p.builder) + '</span>' + badge(E.claim(p, 'rera').status) + '</span></div></div></div>';
      }
      body += '<div class="sec"><div class="caps" style="margin-bottom:.25rem">Investment risks</div>' + (risks.length ? risks.map(function (k) { return '<div class="risk"><span class="sv ' + k.sev + '"></span><div><b>' + esc(k.t) + '</b><div class="xs muted">' + esc(k.d) + '</div></div></div>'; }).join('') : '<p class="small muted">No major risks found in the available data.</p>') + '</div>';
      body += '<div class="sec"><button class="sec-h" style="width:100%" data-a="brk"><span class="caps" style="text-align:left">How this match was calculated</span>' + ic(ui.showBreak ? 'down' : 'right', 'sm') + '</button>' + (ui.showBreak ? '<div class="breakdown fade">' + Object.keys(r.cr).sort(function (a, b) { return r.w[b] - r.w[a]; }).map(function (k) { var c = r.cr[k]; return '<div class="bk"><span>' + DR.CRITERIA[k] + ' <span class="xs muted mono">×' + r.w[k].toFixed(2) + '</span></span><span class="xs" style="text-align:right">' + (c.s == null ? badge('unknown') : Math.round(c.s * 100) + '%') + '</span><div class="bar" style="grid-column:1/-1"><i style="transform:scaleX(' + (c.s || 0) + ')"></i></div><div class="d">' + esc(c.detail) + ' · ' + DR.STATUS[c.status].label.toLowerCase() + '</div></div>'; }).join('') + '<p class="xs muted">Weights come from your goal (' + DR.GOALS[prof.goal].toLowerCase() + '). Unknown criteria are left out, not scored as zero.</p></div>' : '') + '</div>';
      if (missingI.length) body += '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Missing or unchecked</div>' + missingI.map(function (c) { return '<div class="kv" data-a="claim" data-id="' + id + '" data-f="' + c.field + '" style="cursor:pointer"><span>' + c.label + '</span>' + badge(c.status) + '</div>'; }).join('') + '</div>';
      body += '<div class="sec"><div class="sec-h"><span class="caps">Questions to ask the builder</span><button class="link" data-a="copyQ" data-id="' + id + '">' + ic('copy', 'sm') + ' Copy</button></div><ol class="qlist">' + invQs.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol></div>';
    } else if (ui.tab === 'summary') {
      var missing = p.claims.filter(function (c) { return c.status === 'unknown' || c.status === 'not_assessed'; });
      body = '<div class="card warm rs-card fade" style="margin-top:1rem"><div class="caps">Research summary</div>' +
        (prof ? '<p style="margin-top:.5rem"><b>Why it may fit you.</b> ' + esc(p.summary.fit) + ' ' + cite('price') + '</p>' : '') +
        '<p style="margin-top:.5rem"><b>What\'s attractive.</b> ' + esc(p.summary.attractive) + ' ' + cite('rera') + '</p><p style="margin-top:.5rem"><b>Limitations.</b> ' + esc(p.summary.limits) + ' ' + p.claims.filter(function (c) { return c.status === 'conflicting'; }).map(function (c) { return cite(c.field); }).join(' ') + '</p>' +
        '<p class="xs muted" style="margin-top:.75rem">Written only from the claims cited. Tap a citation to see its source.</p></div>';
      if (prof) {
        body += '<div class="sec"><button class="sec-h" style="width:100%" data-a="brk"><span class="caps" style="text-align:left">How this fit was calculated</span>' + ic(ui.showBreak ? 'down' : 'right', 'sm') + '</button>' + (ui.showBreak ? '<div class="breakdown fade">' + Object.keys(r.cr).sort(function (a, b) { return r.w[b] - r.w[a]; }).map(function (k) { var c = r.cr[k]; return '<div class="bk"><span>' + DR.CRITERIA[k] + ' <span class="xs muted mono">×' + r.w[k].toFixed(2) + '</span></span><span class="xs" style="text-align:right">' + (c.s == null ? badge('unknown') : Math.round(c.s * 100) + '%') + '</span><div class="bar" style="grid-column:1/-1"><i style="transform:scaleX(' + (c.s || 0) + ')"></i></div><div class="d">' + esc(c.detail) + ' · ' + DR.STATUS[c.status].label.toLowerCase() + '</div></div>'; }).join('') + '<p class="xs muted">Unknown criteria are left out, not scored as zero. Weights come from your priority order. Hard limits are checked separately and never traded off.</p></div>' : '') + '</div>';
      }
      if (missing.length) body += '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Missing or unchecked</div>' + missing.map(function (c) { return '<div class="kv" data-a="claim" data-id="' + id + '" data-f="' + c.field + '" style="cursor:pointer"><span>' + c.label + '</span>' + badge(c.status) + '</div>'; }).join('') + '</div>';
      if (p.summary.questions.length) body += '<div class="sec"><div class="sec-h"><span class="caps">Questions to ask the builder</span><button class="link" data-a="copyQ" data-id="' + id + '">' + ic('copy', 'sm') + ' Copy</button></div><ol class="qlist">' + p.summary.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol></div>';
    } else if (ui.tab === 'evidence') {
      var ev = r.ev;
      body = '<div class="chips" style="margin-top:1rem">' + Object.keys(ev.counts).map(function (k) { return '<span class="chip">' + badge(k, false) + ev.counts[k] + ' ' + DR.STATUS[k].label.toLowerCase() + '</span>'; }).join('') + '</div>' +
        (ev.stale ? '<div class="card warm small" style="margin-top:.75rem">' + ic('clock', 'sm') + ' Some sources are over 90 days old. Prices may have changed.</div>' : '') +
        '<div class="sec" style="margin-top:1rem"><div class="caps">Claims</div>' + p.claims.map(function (c) {
          return '<div class="claim" data-a="claim" data-id="' + id + '" data-f="' + c.field + '"><span>' + c.label + (c.critical ? '' : ' <span class="xs muted">· non-critical</span>') + '</span>' + badge(c.status) + '<span class="v">' + esc(c.value) + '</span><span></span><span class="src">' + (c.sources.length ? c.sources.map(function (s) { return DR.SOURCE_TYPES[s.type].name; }).join(' · ') + ' · ' + c.sources[0].accessed : 'No source') + '</span></div>';
        }).join('') + '</div>';
      var cs = E.costs(p);
      body += '<div class="sec"><div class="caps" style="margin-bottom:.5rem">All-in cost estimate</div>' + cs.lines.map(function (l) { return '<div class="kv"><span>' + l.l + (l.note ? '<div class="xs muted">' + l.note + '</div>' : '') + '</span><span class="r"><span class="mono">' + (l.v == null ? '?' : lakh(l.v)) + '</span>' + badge(l.st) + '</span></div>'; }).join('') + '<div class="kv"><b>Estimated total</b><span class="r"><b class="mono">~' + lakh(cs.total) + (cs.hasUnknown ? ' + ?' : '') + '</b>' + badge('estimated') + '</span></div>' + (prof && cs.total > prof.budgetMax && p.price <= prof.budgetMax ? '<p class="small warn" style="margin-top:.5rem">' + ic('alert', 'sm') + ' The quoted price fits your budget, but the all-in estimate is ₹' + E.fmt(cs.total - prof.budgetMax) + ' L over it.</p>' : '') + '</div>';
      body += '<p class="xs muted" style="margin-top:1rem">All sources are simulated for this prototype. Legal title, encumbrance and approvals need a lawyer\'s or bank\'s legal check. This app does not provide one.</p>';
    } else if (ui.tab === 'location') {
      var pl = prof ? prof.places : DR.DEMO_PROFILE.places;
      body = '<button class="card tap" style="margin-top:1rem;width:100%;text-align:left;display:flex;gap:.75rem;align-items:center" data-a="view" data-v="map">' + ic('pin') + '<span style="flex:1"><b class="small">Explore on the map</b><span class="xs muted" style="display:block">Schools, hospitals, transit, roads and facilities around this home</span></span>' + ic('right', 'sm') + '</button>' +
        (isInv() ? '<div class="sec" style="margin-top:1.5rem"><div class="sec-h"><span class="caps">Rental demand</span>' + badge(p.inv && p.inv.demand != null ? 'sourced' : 'unknown') + '</div>' + (p.inv && p.inv.demand != null ? '<div class="kv"><span>Active rental listings within 2 km</span><span class="mono">' + p.inv.demand + '</span></div><div class="kv"><span>Comparable rentals used for rent</span><span class="mono">' + (E.rent(p) ? E.rent(p).n : 0) + '</span></div><p class="xs muted" style="margin-top:.375rem">From a simulated listing scan. More listings suggests an active rental market, but also more competition for tenants.</p>' : '<p class="small muted">No rental listing data for this area.</p>') + '</div>' :
        '<div class="sec" style="margin-top:1.5rem"><div class="sec-h"><span class="caps">Commute at peak hour</span>' + badge('estimated') + '</div>' + pl.map(function (x) { var m = p.commute[x.key], over = prof && m > prof.commuteMax; return '<div class="kv"><span>' + ic('route', 'sm') + ' ' + esc(x.label) + '</span><span class="mono ' + (over ? 'warn' : '') + '">' + m + ' min' + (over ? ' · over limit' : '') + '</span></div>'; }).join('') + '<p class="xs muted" style="margin-top:.375rem">Method: road distance × typical weekday 9 am speed (simulated). Real times vary.' + (prof ? '' : ' Shown for sample offices. Personalise to use yours.') + '</p></div>') +
        '<div class="sec"><div class="sec-h"><span class="caps">Schools</span>' + badge(p.schools.length ? 'sourced' : 'unknown') + '</div>' + (p.schools.length ? p.schools.map(function (s) { return '<div class="kv"><span>' + ic('school', 'sm') + ' ' + esc(s.n) + '</span><span class="mono">' + s.km + ' km</span></div>'; }).join('') : '<p class="small muted">No school data found. That doesn\'t mean there are none.</p>') + '<p class="xs muted">School quality is not assessed.</p></div>' +
        '<div class="sec"><div class="sec-h"><span class="caps">Hospitals</span>' + badge(p.hospitals.length ? 'sourced' : 'unknown') + '</div>' + (p.hospitals.length ? p.hospitals.map(function (s) { return '<div class="kv"><span>' + ic('hospital', 'sm') + ' ' + esc(s.n) + '</span><span class="mono">' + s.km + ' km</span></div>'; }).join('') : '<p class="small muted">No hospital data found.</p>') + '</div>' +
        '<div class="sec"><div class="sec-h"><span class="caps">Transit</span>' + badge('sourced') + '</div><div class="kv"><span>' + ic('train', 'sm') + ' ' + esc(p.transit.n) + '</span><span class="mono">' + p.transit.km + ' km</span></div></div>' +
        '<div class="sec"><div class="caps" style="margin-bottom:.5rem">Amenities</div><div class="chips">' + p.amenities.map(function (a) { return '<span class="chip">' + esc(a) + '</span>'; }).join('') + '</div><p class="xs muted" style="margin-top:.5rem">From builder materials (sourced).</p></div>';
    } else {
      var ds = DR.DEVELOPMENTS.filter(function (d) { return d.near[id] != null; }).sort(function (a, b) { return DR.STAGES.indexOf(devStage(b)) - DR.STAGES.indexOf(devStage(a)); });
      var gr = E.growth(p, devStage);
      body = (isInv() ? '<div class="inv-stats" style="margin-top:1rem">' +
          '<div class="stat"><b class="mono">' + ds.length + '</b><span>developments within 3 km</span>' + badge(ds.length ? 'sourced' : 'unknown') + '</div>' +
          '<div class="stat"><b class="mono kf" style="font-size:.9375rem">' + (ds.length ? devStage(ds[0]) : 'None') + '</b><span>most advanced stage nearby</span>' + badge(ds.length ? 'sourced' : 'unknown') + '</div>' +
          '<div class="stat"><b class="mono">' + (gr ? Math.round(gr.s * 100) + '%' : '?') + '</b><span>development potential score</span>' + badge(gr ? 'estimated' : 'unknown') + '</div>' +
          '<div class="stat"><b class="mono">' + ds.filter(function (d) { return ['Funded', 'Under construction', 'Operational'].indexOf(devStage(d)) >= 0; }).length + ' of ' + ds.length + '</b><span>funded or further along</span>' + badge(ds.length ? 'sourced' : 'unknown') + '</div></div>' +
          '<p class="finding" style="margin-top:1rem">The Future Development Analyst watches these projects and will notify you when a stage changes. Score method: stage weight × distance (within 1.5 km counts fully). It describes plans nearby. It is not a price forecast.</p>' : '') +
        '<p class="small muted" style="margin-top:1rem">Developments within 3 km, tracked by the Future Development Analyst. A stage is not a promise: projects stall, change or get cancelled. We never predict price appreciation.</p>' +
        (ds.length ? ds.map(function (d) {
          var cur = devStage(d), idx = DR.STAGES.indexOf(cur), hist = devHistory(d);
          return '<div class="card sec ' + (st.skip && d.next ? 'warm' : '') + '" style="margin-top:1rem"><div class="xs muted">' + d.kind + ' · ' + d.near[id] + ' km away</div><h3 class="h">' + d.name + '</h3>' +
            '<div class="stages">' + DR.STAGES.map(function (s, i) { return '<i class="' + (i < idx ? 'done' : i === idx ? 'now' : '') + '"></i>'; }).join('') + '</div><div class="stage-labels">' + DR.STAGES.map(function (s, i) { return '<span style="' + (i === idx ? 'color:var(--ink);font-weight:600' : '') + '">' + s + '</span>'; }).join('') + '</div>' +
            '<div class="small" style="margin-top:.75rem"><b>Current: ' + cur + '</b> <span class="muted">· ' + hist.map(function (h) { return h.stage + ' ' + h.date; }).join(' → ') + '</span></div>' +
            '<div class="kv" style="margin-top:.5rem"><span class="small"><span style="color:var(--s-verified)">' + ic('plus', 'sm') + '</span> <b>Possible upside.</b> ' + d.plus + '</span></div><div class="kv"><span class="small">' + ic('alert', 'sm') + ' <b>Possible downside.</b> ' + d.minus + '</span></div>' +
            '<div class="kv small"><span class="muted">Stated target</span><span>' + esc(d.target) + '</span></div><div class="kv small"><span class="muted">Next milestone to watch</span><span style="text-align:right">' + esc(d.watch) + '</span></div>' +
            '<div class="xs muted" style="margin-top:.5rem">' + d.source + ' · accessed ' + d.accessed + ' · ' + badge('sourced') + '</div></div>';
        }).join('') : '<div class="card empty sec"><div class="ic">' + ic('help') + '</div><h3 class="h">No reliable development information</h3><p class="small muted">We found no dated official source for projects near this home. We\'d rather show nothing than guess.</p></div>');
    }
    var cta = '<div class="sticky-cta"><button class="btn ' + (saved ? 'ghost' : 'primary') + '" style="flex:1" data-a="save" data-id="' + id + '">' + ic(saved ? 'check' : 'bookmark', 'sm') + (saved ? 'Saved' : 'Save to shortlist') + '</button><button class="btn ghost" style="flex:1" data-a="advisor" data-id="' + id + '">' + ic('chat', 'sm') + ' Ask about it</button></div>';
    var seg = '<div class="seg" role="tablist" aria-label="Property view"><button role="tab" class="' + (ui.view !== 'map' ? 'on' : '') + '" data-a="view" data-v="details">' + ic('fileText', 'sm') + 'Details</button><button role="tab" class="' + (ui.view === 'map' ? 'on' : '') + '" data-a="view" data-v="map">' + ic('pin', 'sm') + 'Map view</button></div>';
    var main = ui.view === 'map' ? mapView(p, prof) : tb + body;
    return { nav: false, title: NM(p), back: 'back', html: hdr + seg + main + similar(p, prof) + '<div style="height:3rem"></div>', after: cta };
  };

  /* ---------------- Schematic map (no map provider configured) ---------------- */
  var MAPCAT = { school: ['Schools', '#4A6A8A', 'school'], hospital: ['Hospitals', '#B3261E', 'hospital'], transit: ['Transit', '#2E7A7A', 'train'], facility: ['Facilities', '#7A6A55', 'pin'], dev: ['Developments', '#B26A00', 'building'] };
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 3600; return h / 10; }
  function mapPoints(p) {
    var pts = [];
    p.schools.forEach(function (s) { pts.push({ cat: 'school', n: s.n, km: s.km }); });
    p.hospitals.forEach(function (s) { pts.push({ cat: 'hospital', n: s.n, km: s.km }); });
    if (p.transit) pts.push({ cat: 'transit', n: p.transit.n, km: p.transit.km });
    (p.facilities || []).forEach(function (s) { pts.push({ cat: 'facility', n: s.n, km: s.km }); });
    DR.DEVELOPMENTS.forEach(function (d) { if (d.near[p.id] != null) pts.push({ cat: 'dev', n: d.name, km: d.near[p.id], stage: devStage(d) }); });
    return pts.map(function (x, i) { x.id = 'k' + i; return x; });
  }
  function mapView(p) {
    var pts = mapPoints(p), f = ui.mapf || 'all', vis = pts.filter(function (x) { return f === 'all' || x.cat === f; });
    var W = 390, H = 330, cx = 195, cy = 168, K = 44, out = '';
    var ra = hash(p.road) * Math.PI / 180, dx = Math.cos(ra) * 400, dy = Math.sin(ra) * 400;
    out += '<rect width="' + W + '" height="' + H + '" fill="#F3F0EA"/>';
    [[25, 'Lake'], [200, 'Park']].forEach(function (b, i) { var a = (hash(p.id + b[1]) + i * 140) * Math.PI / 180; out += '<ellipse cx="' + (cx + Math.cos(a) * 120) + '" cy="' + (cy + Math.sin(a) * 105) + '" rx="' + (34 + i * 8) + '" ry="22" fill="' + (i ? '#2E7D5B' : '#4A6A8A') + '" opacity=".1"/>'; });
    [ra + 1.2, ra + 2.3].forEach(function (a) { out += '<line x1="' + (cx - Math.cos(a) * 400) + '" y1="' + (cy - Math.sin(a) * 400) + '" x2="' + (cx + Math.cos(a) * 400) + '" y2="' + (cy + Math.sin(a) * 400) + '" stroke="#FAFAFA" stroke-width="5"/>'; });
    out += '<line x1="' + (cx - dx) + '" y1="' + (cy - dy) + '" x2="' + (cx + dx) + '" y2="' + (cy + dy) + '" stroke="#E4E4E4" stroke-width="14"/><line x1="' + (cx - dx) + '" y1="' + (cy - dy) + '" x2="' + (cx + dx) + '" y2="' + (cy + dy) + '" stroke="#FAFAFA" stroke-width="10"/>';
    var lx = cx + Math.cos(ra) * 120, ly = cy + Math.sin(ra) * 120, deg = (ra * 180 / Math.PI) % 180; if (deg > 90) deg -= 180; if (deg < -90) deg += 180;
    out += '<text x="' + lx + '" y="' + ly + '" dy="3.5" text-anchor="middle" font-size="9.5" fill="#5F6368" font-family="system-ui,sans-serif" transform="rotate(' + deg + ' ' + lx + ' ' + ly + ')">' + esc(p.road) + '</text>';
    [1, 2, 3].forEach(function (k) { out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + k * K + '" fill="none" stroke="#5F6368" stroke-opacity=".28" stroke-dasharray="3 4"/><text x="' + (cx + 4) + '" y="' + (cy - k * K - 4) + '" font-size="9" fill="#5F6368" font-family="ui-monospace,monospace">' + k + ' km</text>'; });
    vis.forEach(function (x) {
      var a = hash(x.n + p.id) * Math.PI / 180, rr = Math.min(x.km, 3.4) * K, px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr, c = MAPCAT[x.cat], sel = ui.poi === x.id;
      out += '<g class="poi" data-a="poi" data-v="' + x.id + '" tabindex="0" role="button" aria-label="' + esc(x.n + ', ' + x.km + ' km') + '">' + (x.cat === 'dev' ? '<rect x="' + (px - 7) + '" y="' + (py - 7) + '" width="14" height="14" rx="3" fill="' + c[1] + '" stroke="#FAFAFA" stroke-width="2" stroke-dasharray="' + (sel ? '0' : '3 2') + '"/>' : '<circle cx="' + px + '" cy="' + py + '" r="' + (sel ? 9 : 7) + '" fill="' + c[1] + '" stroke="#FAFAFA" stroke-width="2"/>') + '<circle cx="' + px + '" cy="' + py + '" r="16" fill="transparent"/></g>';
      if (sel) { var tw = Math.min(220, x.n.length * 5.6 + 60), tx = Math.max(6, Math.min(W - tw - 6, px - tw / 2)), ty = py - 38 < 4 ? py + 14 : py - 38; out += '<rect x="' + tx + '" y="' + ty + '" width="' + tw + '" height="24" rx="6" fill="#1F2328"/><text x="' + (tx + tw / 2) + '" y="' + (ty + 16) + '" text-anchor="middle" font-size="10.5" fill="#FAFAFA" font-family="system-ui,sans-serif">' + esc(x.n) + ' · ' + x.km + ' km</text>'; }
    });
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#252C49" stroke="#FAFAFA" stroke-width="3"/><path d="M' + (cx - 5) + ' ' + (cy + 1) + 'l5-5 5 5v5h-10z" fill="#FAFAFA"/>';
    out += '<rect x="' + (cx - 60) + '" y="' + (cy + 18) + '" width="120" height="18" rx="5" fill="#FAFAFA" opacity=".95"/><text x="' + cx + '" y="' + (cy + 30.5) + '" text-anchor="middle" font-size="10" font-weight="600" fill="#1F2328" font-family="system-ui,sans-serif">' + esc(NM(p)) + '</text>';
    out += '<rect x="8" y="8" width="128" height="18" rx="5" fill="#FAFAFA" opacity=".95"/><text x="72" y="20.5" text-anchor="middle" font-size="9.5" fill="#5F6368" font-family="system-ui,sans-serif">Schematic demo map</text>';
    var counts = {}; pts.forEach(function (x) { counts[x.cat] = (counts[x.cat] || 0) + 1; });
    var chips = '<div class="hscroll" style="margin-top:1rem"><button class="chip ' + (f === 'all' ? 'on' : '') + '" data-a="mapf" data-v="all">All · ' + pts.length + '</button>' + Object.keys(MAPCAT).filter(function (k) { return counts[k]; }).map(function (k) { return '<button class="chip ' + (f === k ? 'on' : '') + '" data-a="mapf" data-v="' + k + '">' + ic(MAPCAT[k][2], 'sm') + MAPCAT[k][0] + ' · ' + counts[k] + '</button>'; }).join('') + '</div>';
    var list = vis.slice().sort(function (a, b) { return a.km - b.km; }).map(function (x) { var c = MAPCAT[x.cat]; return '<div class="near ' + (ui.poi === x.id ? 'sel' : '') + '" data-a="poi" data-v="' + x.id + '"><span class="dot2" style="background:' + c[1] + (x.cat === 'dev' ? ';border-radius:3px' : '') + '"></span><span style="min-width:0"><span>' + esc(x.n) + '</span><span class="xs muted" style="display:block">' + ({ school: 'School', hospital: 'Hospital', transit: 'Transit', facility: 'Facility', dev: 'Development' })[x.cat] + (x.stage ? ' · ' + x.stage : '') + '</span></span><span class="d">' + x.km + ' km</span></div>'; }).join('');
    return chips + '<div class="map fade"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Schematic map of places near ' + esc(NM(p)) + '">' + out + '</svg></div>' +
      '<div class="sec" style="margin-top:1rem"><div class="sec-h"><span class="caps">Nearby, by distance</span>' + badge('sourced') + '</div>' + (list || '<p class="small muted">No places in this category in our data.</p>') +
      (!(p.facilities || []).length ? '<p class="xs muted" style="margin-top:.5rem">No neighbourhood facility data for this home. That doesn\'t mean there are none.</p>' : '') + '</div>' +
      '<div class="card warm small" style="margin-top:1rem"><b>About this map.</b> This is a schematic demo, not a live map. Distances come from the simulated dataset (straight-line), and the directions are illustrative only. The road name is real, but its position is not. A live map needs a maps provider (for example OpenStreetMap with Leaflet, or Google Maps Platform) and real geocoded coordinates for each property. Neither is configured in this prototype.</div>';
  }

  /* ---------------- Similar properties (compact, horizontal) ---------------- */
  function similar(p, prof) {
    var rs = DR.PROPERTIES.filter(function (q) { return q.id !== p.id; }).map(function (q) {
      var r = E.evaluate(q, prof), sc = 0, why = [];
      if (Math.abs(q.price - p.price) / p.price <= 0.12) { sc += 2; why.push('Similar price'); }
      if (q.bhk === p.bhk) { sc += 2; why.push('Same BHK'); }
      if (p.devs.some(function (d) { return q.devs.indexOf(d) >= 0; })) { sc += 1; why.push('Same area'); }
      if (Math.abs(q.commute.office1 - p.commute.office1) + Math.abs(q.commute.office2 - p.commute.office2) <= 20) { sc += 1.5; why.push('Similar commute'); }
      if (prof) { if (r.fails.length) sc -= 2.5; else { sc += 1; if (r.band === 'Strong' || r.band === 'Good') sc += 1; } }
      return { r: r, sc: sc, why: why };
    }).filter(function (x) { return x.sc >= 2.5; }).sort(function (a, b) { return b.sc - a.sc; }).slice(0, 6);
    if (!rs.length) return '';
    return '<div class="sec" style="margin-top:2.5rem"><div class="sec-h"><span class="caps">You might also consider</span><span class="xs muted">Scroll ' + ic('arrow', 'sm') + '</span></div><div class="similar">' + rs.map(function (x) {
      var q = x.r.p;
      return '<div class="card mini tap" data-go="#p-' + q.id + '" tabindex="0"><div class="art">' + art(q, 92, true) + '</div><div class="b"><span class="n">' + esc(NM(q)) + '</span><span class="price" style="font-size:.875rem">' + lakh(q.price) + '</span><span class="xs muted">' + q.bhk + ' BHK · ' + esc(q.locality.split(',')[0]) + '</span><span style="margin-top:.25rem">' + (prof ? (x.r.fails.length ? '<span class="xs muted">' + esc(x.r.fails[0].text) + '</span>' : fit(x.r.band)) : evi(x.r.ev)) + '</span><span class="why">' + x.why.slice(0, 2).join(' · ') + '</span></div></div>';
    }).join('') + '</div></div>';
  }

  /* ---------------- Profile & Settings ---------------- */
  var NPREFS = { findings: ['AI findings', 'New discrepancies and missing documents', 'compare'], infra: ['Area updates', 'Infrastructure and development stage changes', 'train'], reminders: ['Reminders', 'Compare prompts and planned visits', 'calendar'], activity: ['Your activity', 'Saved homes and status changes', 'bookmark'] };
  function nprefs() { return Object.assign({ findings: true, infra: true, reminders: true, activity: true }, st.nprefs || {}); }
  function li(icon, label, sub, attrs, right) { return '<button class="li" ' + attrs + '><span class="li-ic">' + ic(icon, 'sm') + '</span><span class="li-t"><span>' + label + '</span>' + (sub ? '<span class="xs muted">' + sub + '</span>' : '') + '</span>' + (right != null ? right : ic('right', 'sm')) + '</button>'; }
  function sw(on, a, v) { return '<span class="switch' + (on ? ' on' : '') + '" role="switch" aria-checked="' + on + '" data-a="' + a + '" data-v="' + v + '"><i></i></span>'; }
  R.profile = function (sub) {
    var a = acct(), prof = st.profile, theme = st.theme || 'light';
    var T = { prefs: 'Buying preferences', appearance: 'Appearance', notifications: 'Notification settings', privacy: 'Privacy & security', help: 'Help & support' };
    if (sub && T[sub]) {
      var h = '';
      if (sub === 'prefs') {
        if (!prof) return { title: T[sub], back: '#profile', html: '<div class="empty" style="padding-top:3rem"><div class="ic">' + ic('sliders') + '</div><h3 class="h">No preferences yet</h3><p class="small muted" style="margin:.5rem 0 1rem">Tell us your budget, BHK and priorities to get fit ratings and recommendations.</p><button class="btn primary sm" data-go="#ob-1">Set up preferences</button></div>' };
        if (prof.intent === 'invest') return { title: T[sub], back: '#profile', html: '<p class="small muted" style="padding-top:.25rem">Investment profile. Changes re-rank your homes straight away.</p><div class="lgroup">' +
          li('calculator', 'Budget', 'Up to ' + lakh(prof.budgetMax) + ' · hard limit', 'data-a="editProfile"') +
          li('activity', 'Goal', DR.GOALS[prof.goal], 'data-a="editProfile"') +
          li('building', 'Property status', DR.STATUS_PREF[prof.status] + ' · hard limit', 'data-a="editProfile"') +
          li('clock', 'Horizon', prof.horizon + ' years', 'data-a="editProfile"') +
          li('pin', 'Localities', prof.localities.length ? esc(prof.localities.join(', ')) : 'All localities', 'data-go="#ob-2"') + '</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Property type</div><div class="chips">' + ['Apartment', 'Villa'].map(function (t) { return '<button class="chip ' + (prof.types.indexOf(t) >= 0 ? 'on' : '') + '" data-a="ptype" data-v="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
          '<p class="xs muted" style="margin-top:1rem">Buying to live in instead? <button class="link" data-a="switchLive">Switch to a home-buyer profile</button></p>' };
        h = '<p class="small muted" style="padding-top:.25rem">Changes re-rank your homes straight away.</p><div class="lgroup">' +
          li('calculator', 'Budget', 'Up to ' + lakh(prof.budgetMax) + ' · hard limit', 'data-a="editProfile"') +
          li('home', 'BHK', prof.bhk.join(' or ') + ' BHK · hard limit', 'data-a="editProfile"') +
          li('clock', 'Commute limit', prof.commuteMax + ' min at peak' + (st.assumedOk ? '' : ' · assumed'), 'data-a="editProfile"') +
          li('scale', 'Priorities', prof.priorities.map(function (k) { return DR.CRITERIA[k]; }).join(' > '), 'data-go="#ob-3"') + '</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Property type</div><div class="chips">' + ['Apartment', 'Villa'].map(function (t) { return '<button class="chip ' + (prof.types.indexOf(t) >= 0 ? 'on' : '') + '" data-a="ptype" data-v="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Preferred locations</div><div class="lgroup">' + prof.places.map(function (pl) { return li('pin', esc(pl.label.split(' · ')[1]), esc(pl.label.split(' · ')[0]) + '\'s office', 'disabled', ''); }).join('') + '</div>' +
          '<p class="xs muted" style="margin-top:.5rem">Commute times are pre-computed for these places in this demo, so they can\'t be changed here yet. A live version would recalculate them with a maps provider.</p>';
      } else if (sub === 'appearance') {
        h = '<div class="lgroup" role="radiogroup" aria-label="Theme" style="margin-top:.5rem">' + [['light', 'Light', 'White background, the default'], ['dark', 'Dark', 'Easier on the eyes at night'], ['system', 'System default', 'Follow your device setting']].map(function (o) {
          return li(o[0] === 'dark' ? 'eye' : o[0] === 'light' ? 'home' : 'sliders', o[1], o[2], 'role="radio" aria-checked="' + (theme === o[0]) + '" data-a="theme" data-v="' + o[0] + '"', '<span class="radio' + (theme === o[0] ? ' on' : '') + '"></span>');
        }).join('') + '</div>';
      } else if (sub === 'notifications') {
        var np = nprefs();
        h = '<p class="small muted" style="padding-top:.25rem">Choose what appears in Notifications. Insights always keep the full research.</p><div class="lgroup">' + Object.keys(NPREFS).map(function (k) { return li(NPREFS[k][2], NPREFS[k][0], NPREFS[k][1], 'data-a="npref" data-v="' + k + '"', sw(np[k], 'npref', k)); }).join('') + '</div>' +
          '<div class="lgroup" style="margin-top:1rem">' + li('bell', 'Push and email alerts', 'Available when accounts launch', 'disabled', '<span class="xs muted">Soon</span>') + '</div>';
      } else if (sub === 'privacy') {
        h = '<div class="card warm small" style="margin-top:.5rem">' + ic('info', 'sm') + ' Everything you enter stays in this browser on this device. Nothing is sent to a server in this prototype.</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Your data</div><div class="lgroup">' +
          li('copy', 'Copy my data', 'Profile, shortlist and settings as JSON', 'data-a="copyData"') +
          li('chat', 'Clear Advisor chat', st.chat && st.chat.length ? st.chat.length + ' messages' : 'No messages', 'data-a="clearChat"') +
          li('reset', 'Delete all my data', 'Profile, shortlist, notes and settings', 'data-a="askDelete"') + '</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Account</div><div class="lgroup">' +
          li('user', 'Sign-in and password', 'Available when accounts launch', 'disabled', '<span class="xs muted">Soon</span>') +
          li('checkCircle', 'Two-step verification', 'Available when accounts launch', 'disabled', '<span class="xs muted">Soon</span>') + '</div>';
      } else {
        var faqs = [['What do the evidence labels mean?', 'Each fact carries one of seven labels: Verified, Sourced, Conflicting, Estimated, Assumption, Unknown or Not assessed. A whole home is never called "verified".'], ['Is this property data real?', 'No. All projects, builders, documents and developments in this prototype are fictional and simulated. Locality and road names are real.'], ['How is fit calculated?', 'Hard limits (budget, BHK, type) are checked first and never traded off. Then each criterion is scored and weighted by your priority order. Unknown criteria are left out, not scored as zero.'], ['Do you give legal or investment advice?', 'No. Title, encumbrance and approvals need a lawyer\'s or bank\'s legal check. We never forecast prices.']];
        h = '<div class="caps" style="margin:.5rem 0 .5rem">FAQs</div><div class="lgroup">' + faqs.map(function (f, i) { var open = ui.faq === i; return '<button class="li" data-a="faq" data-v="' + i + '" aria-expanded="' + open + '"><span class="li-ic">' + ic('help', 'sm') + '</span><span class="li-t"><span>' + f[0] + '</span>' + (open ? '<span class="small muted" style="margin-top:.25rem">' + f[1] + '</span>' : '') + '</span>' + ic(open ? 'down' : 'right', 'sm') + '</button>'; }).join('') + '</div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">Contact support</div><div class="lgroup"><div class="li" style="cursor:default"><span class="li-ic">' + ic('chat', 'sm') + '</span><span class="li-t"><span class="mono" style="user-select:all">support@example.com</span><span class="xs muted">Demo address · replies within 1 working day</span></span><button class="link small" data-a="copyEmail">Copy</button></div></div>' +
          '<div class="caps" style="margin:1.5rem 0 .5rem">App information</div><div class="lgroup"><div class="kv" style="padding:.75rem 1rem"><span>Version</span><span class="mono">Prototype · hackathon build</span></div><div class="kv" style="padding:.75rem 1rem"><span>Data</span><span>Simulated, Delhi NCR</span></div><div class="kv" style="padding:.75rem 1rem"><span>AI mode</span><span>Grounded templates</span></div></div>';
      }
      return { title: T[sub], back: '#profile', html: h };
    }
    var card = a ? '<div class="pcard-acct"><span class="avatar lg">' + initials(a.name) + '</span><div style="flex:1;min-width:0"><h3 class="h">' + esc(a.name) + '</h3><div class="small muted">' + esc(a.email) + '</div></div><button class="btn ghost sm" data-a="editAccount">' + ic('pencil', 'sm') + 'Edit</button></div>'
      : '<div class="pcard-acct"><span class="avatar lg guest">' + ic('user') + '</span><div style="flex:1;min-width:0"><h3 class="h">Guest</h3><div class="small muted">Browsing without a profile</div></div></div><button class="btn primary block" style="margin-top:.75rem" data-go="#ob-1">Set up your profile</button>';
    var h2 = card +
      '<div class="caps" style="margin:1.75rem 0 .5rem">Preferences</div><div class="lgroup">' +
      li('sliders', 'Buying preferences', prof ? lakh(prof.budgetMax) + ' · ' + prof.bhk.join('–') + ' BHK · ' + prof.types.join(', ') : 'Not set up yet', 'data-go="#profile-prefs"') +
      li('eye', 'Appearance', { light: 'Light', dark: 'Dark', system: 'System default' }[theme], 'data-go="#profile-appearance"') +
      li('bell', 'Notifications', Object.keys(nprefs()).filter(function (k) { return nprefs()[k]; }).length + ' of 4 types on', 'data-go="#profile-notifications"') + '</div>' +
      '<div class="caps" style="margin:1.5rem 0 .5rem">Account &amp; support</div><div class="lgroup">' +
      li('checkCircle', 'Privacy & security', 'Your data stays on this device', 'data-go="#profile-privacy"') +
      li('help', 'Help & support', 'FAQs, contact, app information', 'data-go="#profile-help"') + '</div>' +
      '<div class="caps" style="margin:1.5rem 0 .5rem">Prototype</div><div class="lgroup">' + li('forward', 'Demo controls', 'Time skip, no-match state, reset', 'data-a="demo"') + '</div>' +
      '<div class="lgroup" style="margin-top:1.5rem">' + (a ? li('logout', '<span style="color:var(--danger)">Log out</span>', 'Signs out and clears this device', 'data-a="askLogout"', '') : li('reset', 'Reset guest session', 'Clears what you browsed and saved', 'data-a="askDelete"', '')) + '</div>';
    return { title: 'Profile & settings', back: 'back', html: h2 };
  };

  function gate(title, sub) {
    return { title: 'Shortlist', html: '<div class="empty" style="padding-top:4rem"><div class="ic">' + ic('user') + '</div><h3 class="h">' + title + '</h3><p class="small muted" style="margin:.5rem 0 1rem">' + (sub || 'We need your budget, BHK and priorities to compare homes against your needs.') + ' No account needed.</p><button class="btn primary sm" data-go="#ob-1">Personalise (under a minute)</button></div>' };
  }

  /* ---------------- Judge annotation rail ---------------- */
  var NOTES = {
    welcome: ['Entry', 'One promise, an honest demo-data label, and a guest path. Onboarding is never forced.'],
    ob: ['Onboarding: natural language first', 'Voice or text is parsed into editable chips. Inferred values are shown dashed as assumptions. Follow-up questions appear only for missing hard limits (budget, BHK). Three short steps.'],
    building: ['Honest progress', 'The pipeline steps are the real order of operations: hard limits first, then evidence, then ranking. Skeleton shimmer, no spinners.'],
    home: ['Decision Home, not a listing feed', 'Recommendations come first. The funnel and a one-paragraph research insight show how 10 researched homes narrow to the few worth your time. The Property Investigator\'s findings sit inside each card as a short, plain-language note, with a link to the full investigation. "Needs your attention" holds only alerts that apply across homes, such as all-in costs and assumed settings. Swipe right to save, left to hide.'],
    guest: ['Guest mode', 'Guests can browse research and evidence, but see no fit ratings or "best match" claims until they share their needs.'],
    discover: ['Discover', 'Try "2-3 BHK under 80 lakh 30 min with schools". The query is shown back as chips so the user can check what the system understood. You can also speak your query.'],
    shortlist: ['Shortlist', 'Track each home\'s status (visit planned, investigating, walked away). Select 2–3 homes to compare.'],
    compare: ['Agent 2: Decision Advisor', 'Explains trade-offs in terms of your ranked priorities and recommends an order of action. Every answer is built from the evaluation data, not free-form generation. Rows that differ are highlighted.'],
    insights: ['Insights explain; notifications alert', 'Research intelligence: verification completeness per home, patterns across conflicts, a price vs all-in chart, a trade-off matrix on your own priorities, a commute plot against your limit, a development timeline, an ordered plan, and a descriptive price-per-sq-ft spread. Each detailed finding (both claims, the difference, why it matters, questions) lives only here. Charts use the app\'s own data and labels. Nothing is decorative.'],
    profile: ['Profile & settings', 'Opened from the avatar, so the four tabs stay as they are. Preferences edit the same hard limits and priorities the engine uses. Appearance switches light, dark or system. Notification settings filter the bell. Privacy explains that data stays on the device. Guests see a set-up prompt instead of account options.'],
    notifications: ['Notifications: what happened', 'Short, actionable items: new discrepancies, missing documents, infrastructure stage changes, reminders and your own activity. Each one links to its detailed insight or property instead of repeating the explanation.'],
    property: ['Deep evaluation', 'Every claim carries one of 7 statuses, with source, date, method and uncertainty. The whole property is never "verified". The fit breakdown shows weights and leaves unknown criteria out instead of scoring them as zero. Map view is a schematic demo, labelled as such: no live map provider is configured, so the app doesn\'t pretend to have one. "You might also consider" picks similar homes by price, BHK, area and commute.']
  };
  function rail(key) {
    var n = NOTES[key] || NOTES.home;
    return '<span class="caps">Home Buying Decision Room · prototype</span><h1 style="margin-top:.75rem">Find less.<br>Know more.<br>Decide better.</h1><p class="lede">A research and decision room for first-time buyers in Delhi NCR. All projects, builders, documents and developments are fictional and simulated. Locality names are real.</p>' +
      '<div class="note"><span class="caps">On this screen</span><h3>' + n[0] + '</h3><p class="muted" style="font-size:.9375rem">' + n[1] + '</p></div>' +
      '<div class="note"><span class="caps">Demo story</span><ul><li>1 · Onboard with voice or "Use sample"</li><li>2 · Home → <b>Area mismatch</b> at Neelam Heights (Agent 1)</li><li>3 · Save 3 homes → Compare → "Which should we visit first?" (Agent 2)</li><li>4 · Edit budget to ₹60 L → no-match with exact relaxations</li><li>5 · "3 weeks later" → metro stage change (Agent 3)</li></ul>' +
      '<div class="row"><button class="btn primary sm" data-a="loadDemo">Load demo couple</button><button class="btn ghost sm" data-a="loadInvestor">Load demo investor</button><button class="btn ghost sm" data-a="skip">' + ic('forward', 'sm') + ' 3 weeks later</button><button class="btn ghost sm" data-a="tight">Budget ₹60 L</button><button class="btn ghost sm" data-a="reset">' + ic('reset', 'sm') + ' Reset</button></div></div>' +
      '<div class="note"><span class="caps">Evidence legend</span><div class="legend">' + Object.keys(DR.STATUS).map(function (k) { return '<div>' + badge(k) + '</div>'; }).join('') + '</div></div>';
  }

  /* ---------------- Router & render ---------------- */
  var history = [];
  function render() {
    E.invest = isInv();
    var h = location.hash || (st.seenWelcome ? '#home' : '#welcome');
    var parts = h.replace('#', '').split('-'), key = parts[0] || 'home', v;
    if (key === 'welcome') v = R.welcome();
    else if (key === 'ob') v = R.ob(+parts[1] || 1);
    else if (key === 'building') v = R.building();
    else if (key === 'p') { v = R.property(parts[1], parts[2]); key = 'property'; }
    else if (key === 'profile') v = R.profile(parts[1]);
    else if (R[key]) v = R[key]();
    else { v = R.home(); key = 'home'; }
    if (key === 'home' && !st.profile) key = 'guest';
    var tab = { home: 'home', guest: 'home', discover: 'discover', shortlist: 'shortlist', compare: 'shortlist', insights: 'insights' }[key];
    var top = v.top != null ? v.top : v.title ? (v.back ? '<div class="top" style="padding-left:.5rem"><button class="iconbtn" data-a="back" data-to="' + (v.back === 'back' ? '' : v.back) + '" aria-label="Back">' + ic('left') + '</button><span class="title">' + esc(v.title) + '</span><span class="demo-tag">DEMO DATA</span></div>' : topBar(v.title)) : '';
    var n = unread();
    var nav = v.nav === false ? '' : '<nav class="nav">' + [['home', 'home', 'Home'], ['discover', 'search', 'Discover'], ['shortlist', 'bookmark', 'Shortlist'], ['insights', 'activity', 'Insights']].map(function (x) {
      return '<a href="#' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + ic(x[1]) + x[2] + (x[0] === 'shortlist' && Object.keys(st.shortlist).length ? '<span class="badge">' + Object.keys(st.shortlist).length + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
    var base = function (x) { return x && x.indexOf('#p-') === 0 ? x.split('-').slice(0, 2).join('-') : x; };
    var same = base(render.last) === base(h), prevScroll = same && $('#scroll') ? $('#scroll').scrollTop : 0; render.last = h;
    $('#phone').innerHTML = top + '<main class="scroll" id="scroll"><div class="' + (same ? '' : 'fade') + '">' + v.html + '</div></main>' + (v.after || '') + nav + '<div id="layer"></div>';
    if (same) $('#scroll').scrollTop = prevScroll;
    $('#rail').innerHTML = rail(key);
    if (key === 'compare') st.compared = true;
    if (ui.focusIns) {
      var fid = ui.focusIns; ui.focusIns = null;
      setTimeout(function () { var el = document.getElementById(fid), sc = $('#scroll'); if (!el || !sc) return; sc.scrollTop = el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 12; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }, 60);
    }
    save();
    bindSwipes();
  }
  window.addEventListener('hashchange', function () { history.push(location.hash); render(); var s = $('#scroll'); if (s) s.scrollTop = 0; });

  /* ---------------- Sheets & toasts ---------------- */
  function sheet(title, body, foot) {
    var L = $('#layer');
    L.innerHTML = '<div class="scrim" data-a="close"></div><div class="sheet" role="dialog" aria-label="' + esc(title) + '"><div class="grab"></div><div class="sh-h"><b style="flex:1">' + title + '</b><button class="iconbtn" data-a="close" aria-label="Close">' + ic('x') + '</button></div><div class="sh-b" id="shb">' + body + '</div>' + (foot || '') + '</div>';
    requestAnimationFrame(function () { requestAnimationFrame(function () { L.querySelector('.scrim').classList.add('in'); L.querySelector('.sheet').classList.add('in'); }); });
  }
  function closeSheet() { var L = $('#layer'); if (!L || !L.firstChild) return; L.querySelector('.scrim').classList.remove('in'); L.querySelector('.sheet').classList.remove('in'); setTimeout(function () { L.innerHTML = ''; }, 300); }
  var toastT;
  function toast(msg, label, fn) {
    var old = document.querySelector('.toast'); if (old) old.remove();
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = '<span>' + msg + '</span>' + (label ? '<button>' + label + '</button>' : '');
    $('#phone').appendChild(t); requestAnimationFrame(function () { t.classList.add('in'); });
    if (label) t.querySelector('button').onclick = function () { fn(); t.remove(); };
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('in'); setTimeout(function () { t.remove(); }, 300); }, 4200);
  }

  function claimSheet(id, field) {
    var p = E.prop(id), c = E.claim(p, field);
    var b = '<div style="display:flex;justify-content:space-between;align-items:center">' + badge(c.status) + '<span class="xs muted">' + esc(NM(p)) + '</span></div><div class="mono" style="font-size:1.25rem;margin-top:.5rem">' + esc(c.value) + '</div><p class="xs muted">' + DR.STATUS[c.status].desc + '</p>';
    if (c.status === 'conflicting') b += '<div class="vs">' + c.sources.map(function (s) { return '<div><div class="xs muted">' + DR.SOURCE_TYPES[s.type].name + '</div><b>' + esc(s.value) + '</b><div class="xs muted">Tier ' + DR.SOURCE_TYPES[s.type].tier + ' · ' + s.accessed + '</div></div>'; }).join('') + '</div>';
    if (c.note) b += '<div class="card warm small" style="margin-top:1rem"><b>Uncertainty.</b> ' + esc(c.note) + '</div>';
    b += '<div class="caps" style="margin:1.25rem 0 .5rem">Evidence trail</div>' + (c.sources.length ? c.sources.map(function (s) {
      var stx = DR.SOURCE_TYPES[s.type];
      return '<div class="card" style="padding:.875rem"><div style="display:flex;justify-content:space-between;gap:.5rem"><b class="small">' + stx.name + '</b><span class="xs muted">' + stx.kind + '</span></div><div class="mono" style="margin-top:.5rem;padding:.5rem;background:var(--surface-muted);border-radius:6px">"' + esc(s.extract) + '"</div><div class="xs muted" style="margin-top:.5rem">Ref: ' + esc(s.ref) + ' · accessed ' + s.accessed + (E.daysOld(s.accessed) > 90 ? ' · <span class="warn">' + E.daysOld(s.accessed) + ' days old</span>' : '') + '<br>Source: <span class="mono">simulated://' + p.id + '/' + s.type + '</span> · Extraction: manual seed (simulated)</div></div>';
    }).join('') : '<p class="small muted">No source found. ' + (c.status === 'not_assessed' ? 'This prototype does not check this item.' : 'We looked and could not find it.') + '</p>');
    b += '<p class="xs muted" style="margin-top:1rem">Verification method: ' + (c.status === 'verified' ? 'value matches a tier-1 or tier-2 source within tolerance (rule-based).' : c.status === 'conflicting' ? 'values differ beyond tolerance (area ±3%, price ±2%). No source is assumed correct.' : 'not verified.') + '</p>';
    sheet(c.label, b);
  }

  function advisorSheet(ctxId, forceIds) {
    if (!st.profile) { sheet('Ask the Decision Advisor', '<div class="empty"><div class="ic">' + ic('chat') + '</div><p class="small muted" style="margin-bottom:1rem">The Advisor compares homes against your needs. Add them first. No account needed.</p><button class="btn primary sm" data-go="#ob-1">Personalise</button></div>'); return; }
    var ids = Object.keys(st.shortlist); if (ctxId && ids.indexOf(ctxId) < 0) ids.unshift(ctxId);
    ids = forceIds || ids.slice(0, 3);
    var draw = function () {
      return '<p class="xs muted">Answers are built only from the research on ' + ids.map(function (i) { return NM(E.prop(i)); }).join(', ') + ' and your profile. No legal or investment advice.</p>' + st.chat.map(function (m) { return '<div class="msg ' + m.who + (m.who === 'ai' ? ' warm' : '') + '">' + m.html + '</div>'; }).join('') +
        '<div class="chips" style="margin-top:1rem">' + (isInv() ? ['What rent could these earn?', 'Which should we visit first?', 'What\'s the real all-in cost?', 'What are the trade-offs?'] : ['Which should we visit first?', 'What\'s the real all-in cost?', 'What are we compromising on?', 'How are the schools?']).map(function (q) { return '<button class="chip" data-a="ask" data-q="' + esc(q) + '">' + esc(q) + '</button>'; }).join('') + '</div>';
    };
    sheet('Decision Advisor', draw(), '<div class="composer"><button class="mic ' + (ui.listening ? 'listening' : '') + '" data-a="voice" data-t="aq" aria-label="Speak">' + ic('mic') + '</button><input class="input" id="aq" placeholder="Ask about these homes"><button class="btn primary" data-a="askInput" aria-label="Send">' + ic('send') + '</button></div>');
    advisorSheet.ids = ids; advisorSheet.draw = draw;
  }
  function ask(q) {
    var ids = advisorSheet.ids || st.cmp;
    st.chat.push({ who: 'me', html: esc(q) });
    var b = $('#shb');
    if (b) { b.innerHTML = advisorSheet.draw() + '<div class="skel" style="height:64px;margin-top:1rem"></div>'; b.scrollTop = 1e6; }
    setTimeout(function () {
      var a = E.advise(q, ids, st.profile);
      st.chat.push({ who: 'ai', html: a.html + '<div class="xs muted" style="margin-top:.5rem">Grounded in ' + ids.length + ' research records · ' + (a.cites.length || ids.length) + ' claims</div>' });
      save(); if (b) { b.innerHTML = advisorSheet.draw(); b.scrollTop = 1e6; }
    }, 650);
  }

  function profileSheet() {
    var p = st.profile;
    if (p.intent === 'invest') {
      var ch = function (key, opts) { return '<div class="chips">' + opts.map(function (o) { return '<button class="chip ' + (p[key] === o[0] ? 'on' : '') + '" data-a="pinv" data-v="' + key + ':' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>'; };
      sheet('Your investment criteria', '<div class="field" style="margin-top:0"><label class="lbl" for="pb">Maximum budget (₹ lakh), a hard limit</label><input id="pb" class="input mono" inputmode="numeric" value="' + p.budgetMax + '"></div>' +
        '<div class="field"><span class="lbl">Goal</span>' + ch('goal', [['rental', 'Rental income'], ['appreciation', 'Appreciation'], ['both', 'Both']]) + '</div>' +
        '<div class="field"><span class="lbl">Property status, a hard limit</span>' + ch('status', [['ready', 'Ready'], ['uc', 'Under construction'], ['both', 'Either']]) + '</div>' +
        '<div class="field"><span class="lbl">Horizon</span>' + ch('horizon', [[3, '3 yrs'], [5, '5 yrs'], [10, '10+ yrs']]) + '</div>' +
        '<button class="btn primary block" style="margin-top:1.5rem" data-a="saveInv">Update my results</button>');
      profileSheet.inv = { goal: p.goal, status: p.status, horizon: p.horizon };
      return;
    }
    sheet('Your requirements', '<div class="field" style="margin-top:0"><label class="lbl" for="pb">Maximum budget (₹ lakh), a hard limit</label><input id="pb" class="input mono" inputmode="numeric" value="' + p.budgetMax + '"></div>' +
      '<div class="field"><span class="lbl">BHK, a hard limit</span><div class="chips">' + [1, 2, 3, 4].map(function (b) { return '<button class="chip ' + (p.bhk.indexOf(b) >= 0 ? 'on' : '') + '" data-a="pbhk" data-v="' + b + '">' + b + ' BHK</button>'; }).join('') + '</div></div>' +
      '<div class="field"><label class="lbl" for="pc">Commute limit (minutes at peak)</label><input id="pc" class="input mono" inputmode="numeric" value="' + p.commuteMax + '"><p class="xs muted" style="margin-top:.25rem">' + ic('dashed', 'sm') + ' Assumed during onboarding. Change it if needed.</p></div>' +
      '<div class="field xs muted">Priorities: ' + p.priorities.map(function (k) { return DR.CRITERIA[k]; }).join(' > ') + ' · <button class="link" data-go="#ob-3">Re-rank</button></div>' +
      '<button class="btn primary block" style="margin-top:1.5rem" data-a="saveProfile">Update my results</button>');
    profileSheet.bhk = p.bhk.slice();
  }

  function applyProfile(next) {
    var before = E.run(st.profile), after = E.run(next);
    var bIds = before.focus.map(function (r) { return r.p.id; }), aIds = after.focus.map(function (r) { return r.p.id; });
    var added = aIds.filter(function (i) { return bIds.indexOf(i) < 0; }).length, removed = bIds.filter(function (i) { return aIds.indexOf(i) < 0; }).length;
    st.profile = next; save(); closeSheet(); location.hash = '#home'; render();
    toast('Results updated: ' + (added || removed ? (added ? added + ' added' : '') + (added && removed ? ', ' : '') + (removed ? removed + ' moved out of your focus list' : '') : 'no change to your focus list') + '. ' + after.pass.length + ' homes meet your limits.');
  }

  /* ---------------- Voice (Web Speech API) ---------------- */
  var rec;
  function voice(targetId, btn) {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast('Voice input isn\'t supported in this browser. Type instead, or use Chrome.'); return; }
    if (ui.listening && rec) { rec.stop(); return; }
    rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = true; rec.continuous = false;
    var el = document.getElementById(targetId), base = el.value ? el.value + ' ' : '';
    ui.listening = true; btn.classList.add('listening');
    rec.onresult = function (e) { var t = ''; for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; el.value = base + t; };
    rec.onerror = function (e) { toast(e.error === 'not-allowed' ? 'Microphone access was blocked. Type instead.' : 'Didn\'t catch that. Try again or type.'); };
    rec.onend = function () { ui.listening = false; btn.classList.remove('listening'); if (targetId === 'nl') { st.draft.text = el.value; doParse(); } else if (targetId === 'dq') { ui.q = el.value; render(); } else if (targetId === 'aq' && el.value.trim()) { ask(el.value.trim()); } };
    try { rec.start(); } catch (e) { ui.listening = false; btn.classList.remove('listening'); }
  }
  function doParse() {
    var d = st.draft, r = E.parse(d.text); d.parsed = r;
    if (r.prof.budgetMax) d.budgetMax = r.prof.budgetMax;
    if (r.prof.bhk) d.bhk = r.prof.bhk;
    if (r.prof.priorities) d.priorities = r.prof.priorities;
    save(); render();
  }

  /* ---------------- Swipe gestures ---------------- */
  var dragged = false;
  function bindSwipes() {
    document.querySelectorAll('[data-swipe]').forEach(function (w) {
      var card = w.querySelector('.pcard'), x0 = null, dx = 0, id = w.getAttribute('data-swipe');
      card.addEventListener('pointerdown', function (e) { x0 = e.clientX; dx = 0; dragged = false; card.style.transition = 'none'; });
      card.addEventListener('pointermove', function (e) { if (x0 == null) return; dx = e.clientX - x0; if (Math.abs(dx) > 6) { dragged = true; card.style.transform = 'translateX(' + dx + 'px)'; } });
      var end = function () {
        if (x0 == null) return; x0 = null; card.style.transition = 'transform .25s cubic-bezier(.2,.7,.2,1)';
        if (dx > 90) { card.style.transform = 'translateX(110%)'; setTimeout(function () { doSave(id, true); }, 220); }
        else if (dx < -90) { card.style.transform = 'translateX(-110%)'; setTimeout(function () { st.dismissed['card-' + id] = true; save(); render(); toast('Hidden from your focus list.', 'Undo', function () { delete st.dismissed['card-' + id]; save(); render(); }); }, 220); }
        else card.style.transform = '';
      };
      card.addEventListener('pointerup', end); card.addEventListener('pointerleave', end); card.addEventListener('pointercancel', end);
    });
  }
  function doSave(id, fromSwipe) {
    if (!st.profile) { toast('Add your needs to start a shortlist.', 'Personalise', function () { location.hash = '#ob-1'; }); render(); return; }
    if (st.shortlist[id]) { delete st.shortlist[id]; st.cmp = st.cmp.filter(function (x) { return x !== id; }); toast('Removed from shortlist.'); }
    else {
      st.shortlist[id] = 'considering'; st.order.push(id); if (st.cmp.length < 3) st.cmp.push(id);
      logActivity('You saved ' + NM(E.prop(id)) + ' to your shortlist', 'bookmark', '#shortlist');
      var r = E.evaluate(E.prop(id), st.profile), f = r.findings.filter(function (x) { return x.severity === 'high'; })[0];
      toast(f ? 'Saved. The Investigator flagged: ' + f.title.toLowerCase() + '.' : 'Saved to shortlist.', 'View', function () { location.hash = '#shortlist'; });
    }
    save(); render();
  }

  /* ---------------- Actions ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-a],[data-go]'); if (!t) return;
    if (dragged && t.closest('[data-swipe]')) { dragged = false; return; }
    var a = t.getAttribute('data-a'), v = t.getAttribute('data-v'), id = t.getAttribute('data-id');
    if (t.hasAttribute('data-go') && !a) { closeSheet(); location.hash = t.getAttribute('data-go'); return; }
    switch (a) {
      case 'guest': st.seenWelcome = true; st.profile = null; save(); location.hash = '#home'; break;
      case 'intent': st.draft.intent = v; save(); render(); break;
      case 'invLoc': var il = st.draft.inv.localities, ii = il.indexOf(v); st.draft.budgetMax = $('#bud').value; ii >= 0 ? il.splice(ii, 1) : il.push(v); render(); break;
      case 'invType': var it2 = st.draft.inv.types, ij = it2.indexOf(v); st.draft.budgetMax = $('#bud').value; if (ij >= 0) { if (it2.length > 1) it2.splice(ij, 1); else toast('Keep at least one property type.'); } else it2.push(v); render(); break;
      case 'invSet': var kv = v.split(':'), iv2 = st.draft.inv, val = kv[0] === 'horizon' ? +kv[1] : kv[1]; iv2[kv[0]] = iv2[kv[0]] === val ? null : val; render(); break;
      case 'finishInv':
        var di = st.draft, ivv = di.inv, goal = ivv.goal || 'both', assumed = [];
        if (!ivv.goal) assumed.push('Goal: rental and appreciation'); if (!ivv.status) assumed.push('Status: either'); if (!ivv.horizon) assumed.push('Horizon 5 years');
        st.profile = Object.assign({}, DR.DEMO_INVESTOR, { budgetMax: +di.budgetMax, localities: ivv.localities.slice(), types: ivv.types.slice(), goal: goal, status: ivv.status || 'both', horizon: ivv.horizon || 5,
          priorities: { rental: ['yield', 'demand', 'delivery'], appreciation: ['growth', 'delivery', 'yield'], both: ['yield', 'growth', 'delivery'] }[goal], assumed: assumed });
        delete st.profile.name; delete st.profile.email;
        st.seenWelcome = true; save(); location.hash = '#building'; break;
      case 'sample': st.draft.text = '2 or 3 BHK under 85 lakh. We work in Cyber City and Sohna Road, and our kid starts school in 2027, so a good school nearby and a short commute matter. Ideally a good vibe.'; doParse(); break;
      case 'parse': st.draft.text = $('#nl').value; doParse(); break;
      case 'bhk': v = +v; var b = st.draft.bhk, i = b.indexOf(v); i >= 0 ? b.splice(i, 1) : b.push(v); b.sort(); st.draft.text = $('#nl').value; st.draft.budgetMax = $('#bud').value; render(); break;
      case 'ob2': if (st.draft.intent === 'invest') { st.draft.budgetMax = $('#bud').value; if (!+st.draft.budgetMax) { toast('A budget is needed to check which homes qualify.'); render(); break; } save(); location.hash = '#ob-3'; break; }
        var d = st.draft; d.text = $('#nl').value; d.budgetMax = $('#bud').value; if (!+d.budgetMax || !d.bhk.length) { toast('Budget and BHK are needed to check which homes qualify.'); render(); break; } save(); location.hash = '#ob-3'; break;
      case 'prio': var pr = st.draft.priorities, j = pr.indexOf(v); if (j >= 0) pr.splice(j, 1); else if (pr.length < 3) pr.push(v); else toast('Up to 3. Tap one to remove it first.'); render(); break;
      case 'finish':
        var dd = st.draft;
        st.profile = Object.assign({}, DR.DEMO_PROFILE, { budgetMax: +dd.budgetMax, bhk: dd.bhk, priorities: dd.priorities, places: (dd.parsed && dd.parsed.prof.places && dd.parsed.prof.places.length === 2) ? dd.parsed.prof.places : DR.DEMO_PROFILE.places });
        st.seenWelcome = true; save(); location.hash = '#building'; break;
      case 'demo': sheet('Demo controls', '<p class="small muted">For walkthroughs. These simulate time passing and edge cases.</p><div style="display:grid;gap:.5rem;margin-top:1rem"><button class="btn primary block" data-a="loadDemo">Load demo couple (₹85 L, 2–3 BHK)</button><button class="btn ghost block" data-a="loadInvestor">Load demo investor (₹85 L, rental income)</button><button class="btn ghost block" data-a="skip">' + ic('forward', 'sm') + ' Jump 3 weeks ahead (Agent 3)</button><button class="btn ghost block" data-a="tight">Set budget to ₹60 L (no-match state)</button><button class="btn ghost block" data-a="guest">Continue as guest</button><button class="btn ghost block" data-a="reset">' + ic('reset', 'sm') + ' Reset demo</button></div>'); break;
      case 'switchLive': st.draft = { intent: 'live', text: '', parsed: null, budgetMax: st.profile.budgetMax, bhk: [], types: ['Apartment', 'Villa'], priorities: [] }; save(); location.hash = '#ob-2'; break;
      case 'loadInvestor': st.draft = null; st.profile = JSON.parse(JSON.stringify(DR.DEMO_INVESTOR)); st.account = null; st.seenWelcome = true; save(); closeSheet(); location.hash = '#home'; render(); toast('Demo investor loaded: Rohan, rental income.'); break;
      case 'pinv': var pk = v.split(':'), pv = pk[0] === 'horizon' ? +pk[1] : pk[1]; profileSheet.inv[pk[0]] = pv; t.parentNode.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === t); }); break;
      case 'saveInv': var ib = +$('#pb').value; if (!ib) { toast('A budget is required.'); break; } var g2 = profileSheet.inv.goal; applyProfile(Object.assign({}, st.profile, profileSheet.inv, { budgetMax: ib, priorities: { rental: ['yield', 'demand', 'delivery'], appreciation: ['growth', 'delivery', 'yield'], both: ['yield', 'growth', 'delivery'] }[g2] })); break;
      case 'loadDemo': st.account = null; st.draft = null; st.profile = JSON.parse(JSON.stringify(DR.DEMO_PROFILE)); st.seenWelcome = true; save(); closeSheet(); location.hash = '#home'; render(); toast('Demo profile loaded: Priya & Arjun.'); break;
      case 'skip': if (!st.profile) { st.profile = JSON.parse(JSON.stringify(DR.DEMO_PROFILE)); st.seenWelcome = true; } if (!st.skip) { st.skip = true; save(); closeSheet(); location.hash = '#home'; render(); toast('3 weeks later. The Future Development Analyst found 1 update near your homes.', 'View', function () { location.hash = '#insights'; }); } else { closeSheet(); toast('Already moved ahead.'); } break;
      case 'tight': if (!st.profile) st.profile = JSON.parse(JSON.stringify(DR.DEMO_PROFILE)); st.seenWelcome = true; closeSheet(); applyProfile(Object.assign({}, st.profile, { budgetMax: 60 })); break;
      case 'reset': try { localStorage.removeItem(KEY); } catch (x) {} st = fresh(); ui.tab = 'summary'; closeSheet(); applyTheme(); location.hash = '#welcome'; render(); break;
      case 'close': closeSheet(); break;
      case 'back': var to = t.getAttribute('data-to'); if (to) location.hash = to; else if (history.length > 1) window.history.back(); else location.hash = '#home'; break;
      case 'editProfile': profileSheet(); break;
      case 'pbhk': v = +v; var pb = profileSheet.bhk, k = pb.indexOf(v); k >= 0 ? pb.splice(k, 1) : pb.push(v); pb.sort(); t.classList.toggle('on'); break;
      case 'saveProfile': var nb = +$('#pb').value, nc = +$('#pc').value; if (!nb || !profileSheet.bhk.length) { toast('Budget and at least one BHK are required.'); break; } applyProfile(Object.assign({}, st.profile, { budgetMax: nb, bhk: profileSheet.bhk, commuteMax: nc || 45 })); break;
      case 'relax': var rx = E.relaxations(st.profile).options[+t.getAttribute('data-i')]; applyProfile(Object.assign({}, st.profile, rx.patch)); break;
      case 'askFocus': advisorSheet(null, E.run(st.profile).focus.map(function (r) { return r.p.id; })); ask(t.getAttribute('data-q')); break;
      case 'editAccount': var ac = acct(); sheet('Edit profile', '<div class="field" style="margin-top:0"><label class="lbl" for="an">Name</label><input id="an" class="input" value="' + esc(ac.name) + '"></div><div class="field"><label class="lbl" for="ae">Email</label><input id="ae" class="input" type="email" value="' + esc(ac.email) + '"><p class="xs muted" style="margin-top:.25rem">Stored on this device only. No email is sent in this prototype.</p></div><button class="btn primary block" style="margin-top:1.5rem" data-a="saveAccount">Save</button>'); break;
      case 'saveAccount': var an = $('#an').value.trim(), ae = $('#ae').value.trim(); if (!an) { toast('Enter a name.'); break; } if (ae && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ae)) { toast('That email doesn\'t look right. Check it and try again.'); break; } st.account = { name: an, email: ae }; save(); closeSheet(); render(); toast('Profile saved.'); break;
      case 'theme': st.theme = v; save(); applyTheme(); render(); break;
      case 'npref': var np2 = nprefs(); np2[v] = !np2[v]; st.nprefs = np2; save(); render(); break;
      case 'ptype': var ty = st.profile.types.slice(), ti = ty.indexOf(v); if (ti >= 0) { if (ty.length === 1) { toast('Keep at least one property type.'); break; } ty.splice(ti, 1); } else ty.push(v); st.profile = Object.assign({}, st.profile, { types: ty }); save(); render(); toast('Updated. ' + E.run(st.profile).pass.length + ' homes now meet your limits.'); break;
      case 'faq': ui.faq = ui.faq === +v ? null : +v; render(); break;
      case 'copyEmail': (navigator.clipboard ? navigator.clipboard.writeText('support@example.com') : Promise.reject()).then(function () { toast('Email address copied.'); }, function () { toast('Copy isn\'t available here. Select the address instead.'); }); break;
      case 'copyData': var dump = JSON.stringify({ account: acct(), profile: st.profile, shortlist: st.shortlist, theme: st.theme || 'light', notifications: nprefs() }, null, 2); (navigator.clipboard ? navigator.clipboard.writeText(dump) : Promise.reject()).then(function () { toast('Your data was copied as JSON.'); }, function () { sheet('Your data', '<pre class="mono" style="white-space:pre-wrap;user-select:all;font-size:.75rem">' + esc(dump) + '</pre>'); }); break;
      case 'clearChat': st.chat = []; save(); render(); toast('Advisor chat cleared.'); break;
      case 'askDelete': sheet('Delete all data?', '<p class="small">This removes your profile, shortlist, notes and settings from this device. It can\'t be undone.</p><div style="display:grid;gap:.5rem;margin-top:1.25rem"><button class="btn block" style="background:var(--danger);color:#FFFFFF" data-a="reset">Delete everything</button><button class="btn ghost block" data-a="close">Cancel</button></div>'); break;
      case 'askLogout': sheet('Log out?', '<p class="small">There are no server accounts in this prototype, so logging out clears your profile, shortlist and settings from this device.</p><div style="display:grid;gap:.5rem;margin-top:1.25rem"><button class="btn primary block" data-a="reset">Log out</button><button class="btn ghost block" data-a="close">Cancel</button></div>'); break;
      case 'confirmAssumed': st.assumedOk = true; save(); render(); toast('Thanks. Your assumed settings are now confirmed.'); break;
      case 'poi': ui.poi = ui.poi === v ? null : v; render(); break;
      case 'mapf': ui.mapf = v; ui.poi = null; render(); break;
      case 'view': ui.view = v; render(); break;
      case 'unhide': Object.keys(st.dismissed).forEach(function (x) { if (x.indexOf('card-') === 0) delete st.dismissed[x]; }); save(); render(); break;
      case 'openNotif':
        var nn = notifs().find(function (x) { return x.id === id; }); if (!nn) break; st.read[id] = true; save(); closeSheet();
        if (nn.insight) { ui.focusIns = nn.insight; if (location.hash === '#insights') render(); else location.hash = '#insights'; }
        else if (nn.go) location.hash = nn.go; break;
      case 'dismissN': st.read[id] = true; st.dismissed[id] = true; save(); render(); toast('Notification dismissed.', 'Undo', function () { delete st.dismissed[id]; save(); render(); }); break;
      case 'readAll': notifs().forEach(function (x) { st.read[x.id] = true; }); save(); render(); break;
      case 'openEvidence': var fld = t.getAttribute('data-f'); ui.tab = 'evidence'; location.hash = '#p-' + id + '-evidence'; if (fld) setTimeout(function () { claimSheet(id, fld); }, 260); break;
      case 'go2': if (v.indexOf('#ins-') === 0) { ui.focusIns = v.slice(1); render(); } else location.hash = v; break;
      case 'openInsight':
        var it = insights().concat([]).find(function (x) { return x.id === id; }); if (!it) break; st.read[id] = true; save();
        ui.tab = it.cat === 'infra' ? 'future' : 'evidence'; location.hash = '#p-' + it.pid + '-' + ui.tab;
        if (it.field) setTimeout(function () { claimSheet(it.pid, it.field); }, 260); break;
      case 'dismiss': st.dismissed[id] = true; save(); render(); toast('Dismissed.', 'Undo', function () { delete st.dismissed[id]; save(); render(); }); break;
      case 'ins': ui.ins = v; render(); break;
      case 'tab': ui.tab = v; window.history.replaceState(null, '', '#p-' + id + '-' + v); render(); break;
      case 'brk': ui.showBreak = !ui.showBreak; render(); break;
      case 'claim': claimSheet(id, t.getAttribute('data-f')); break;
      case 'copyQ': var qs = [].slice.call(document.querySelectorAll('.qlist li')).map(function (li) { return li.textContent; }).map(function (q, n) { return (n + 1) + '. ' + q; }).join('\n'); (navigator.clipboard ? navigator.clipboard.writeText(qs) : Promise.reject()).then(function () { toast('Questions copied. Paste them into WhatsApp or email to the builder.'); }, function () { toast('Copy isn\'t available here. Select the text instead.'); }); break;
      case 'save': doSave(id); break;
      case 'advisor': advisorSheet(id); break;
      case 'ask': ask(t.getAttribute('data-q')); break;
      case 'askInput': var q = $('#aq').value.trim(); if (q) { $('#aq').value = ''; ask(q); } break;
      case 'voice': voice(t.getAttribute('data-t'), t); break;
      case 'qf': if (!location.hash.match(/discover/)) { ui.qf = {}; ui.qf[v] = true; location.hash = '#discover'; } else { ui.qf[v] = !ui.qf[v]; render(); } break;
      case 'sort': ui.sort = v; render(); break;
      case 'clearq': ui.q = ''; ui.qf = {}; ui.fl = ''; ui.fb = ''; render(); break;
      case 'gsearch': ui.q = $('#gq').value; location.hash = '#discover'; break;
      case 'cmp': var ci = st.cmp.indexOf(v); if (ci >= 0) st.cmp.splice(ci, 1); else if (st.cmp.length < 3) st.cmp.push(v); else toast('Compare up to 3 homes.'); save(); render(); break;
      case 'slst': st.shortlist[id] = v; logActivity(NM(E.prop(id)) + ' marked as ' + SL[v].toLowerCase(), v === 'walked' ? 'logout' : 'check', '#shortlist'); save(); render(); if (v === 'walked') toast('Marked as walked away. That\'s a decision too.'); break;
    }
  });
  document.addEventListener('change', function (e) { var f = e.target.getAttribute && e.target.getAttribute('data-f'); if (f) { ui[f] = e.target.value; render(); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.id === 'dq') { ui.q = e.target.value; render(); }
    if (e.key === 'Enter' && e.target.id === 'gq') { ui.q = e.target.value; location.hash = '#discover'; }
    if (e.key === 'Enter' && e.target.id === 'aq') { var q = e.target.value.trim(); if (q) { e.target.value = ''; ask(q); } }
    if (e.key === 'Escape') closeSheet();
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('pcard')) e.target.click();
  });

  /* compare from Advisor chips on compare screen: use cmp ids */
  var _ask = ask;
  ask = function (q) { if (!$('#shb')) { advisorSheet(); advisorSheet.ids = st.cmp.length >= 2 ? st.cmp.slice() : advisorSheet.ids; } _ask(q); };

  /* Appearance: light (default), dark, or follow the device */
  function applyTheme() {
    var m = st.theme || 'light', mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.setAttribute('data-theme', m === 'dark' || (m === 'system' && mq && mq.matches) ? 'dark' : 'light');
  }
  if (window.matchMedia) { var mql = window.matchMedia('(prefers-color-scheme: dark)'); var onMq = function () { if ((st.theme || 'light') === 'system') applyTheme(); }; mql.addEventListener ? mql.addEventListener('change', onMq) : mql.addListener && mql.addListener(onMq); }
  applyTheme();
  render();
})();

/* Home Buying Decision Room: SIMULATED seed dataset.
   Every project, builder, document, registry record and development below is FICTIONAL.
   Locality names are real Delhi NCR areas, used only for geographic context.
   Demo "today" = 2026-11-24. */
window.DR = window.DR || {};

DR.TODAY = '2026-11-24';

DR.SOURCE_TYPES = {
  registry: { name: 'RERA-style registry record', kind: 'Regulator record (simulated)', tier: 1 },
  pricesheet: { name: 'Builder price sheet', kind: 'Builder document (simulated)', tier: 2 },
  site: { name: 'Builder website', kind: 'Builder (simulated)', tier: 2 },
  brochure: { name: 'Builder brochure (PDF)', kind: 'Marketing material (simulated)', tier: 3 },
  portal: { name: 'Listing portal page', kind: 'Portal listing (simulated)', tier: 3 },
  calc: { name: 'Platform calculation', kind: 'Estimate by this app', tier: 2 },
  civic: { name: 'Civic body notice', kind: 'Government notice (simulated)', tier: 1 },
  osm: { name: 'Map data (POI lookup)', kind: 'Map data (simulated)', tier: 2 }
};

/* claim helper: field, label, status, display value, sources[], note, critical */
function C(field, label, status, value, sources, note, critical) {
  return { field: field, label: label, status: status, value: value, sources: sources || [], note: note || '', critical: !!critical };
}
/* source helper: type, value, extract, ref, accessed */
function S(type, value, extract, ref, accessed) {
  return { type: type, value: value, extract: extract, ref: ref, accessed: accessed };
}

DR.PROPERTIES = [
  {
    id: 'p1', name: 'Aranya Courts', builder: 'Kesari Habitat', locality: 'Sector 65, Gurugram', bhk: 2, type: 'Apartment',
    price: 79, carpet: 1040, sba: 1420, stage: 'Under construction', possession: 'Mar 2027',
    commute: { office1: 22, office2: 34 }, schools: [{ n: 'Greenfield Public School', km: 1.2 }, { n: 'Little Oak Montessori', km: 0.6 }],
    hospitals: [{ n: 'Sunrise Multispeciality', km: 2.4 }], transit: { n: 'Bus stop, Golf Course Extension Rd', km: 0.3 },
    amenities: ['Clubhouse', 'Pool', 'Children\'s play area', 'EV charging'], amenityScore: 0.8,
    hue: 0, devs: ['d1'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'verified', '₹79.0 L', [
        S('pricesheet', '₹79.0 L', 'Unit 2B-704 · Base ₹74.5 L + car park ₹3.0 L + PLC ₹1.5 L = ₹79.0 L', 'price-sheet-oct26.pdf · p.1', '2026-11-10'),
        S('portal', '₹79 L', 'Price: ₹79 Lac onwards', 'listing #AC-2207', '2026-11-18')], 'Two independent sources agree within 1%.', true),
      C('carpet', 'Carpet area', 'verified', '1,040 sq ft', [
        S('registry', '1,040 sq ft', 'Type B (2BHK): carpet area 96.6 sq m', 'Form B annexure · p.3', '2026-11-12'),
        S('brochure', '1,040 sq ft', '2 BHK · 1,040 sq ft carpet', 'brochure · p.8', '2026-11-12')], 'Registry figure converted from sq m (96.6 sq m = 1,040 sq ft).', true),
      C('sba', 'Super built-up area', 'sourced', '1,420 sq ft', [S('brochure', '1,420 sq ft', 'SBA 1,420 sq ft', 'brochure · p.8', '2026-11-12')], 'Loading of 27% is typical for this project size.'),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2025/0412', [S('registry', 'PRM/HR/SIM/2025/0412', 'Status: Registered · Valid till 30 Jun 2027', 'registry search', '2026-11-12')], 'Registration matched on registry search (simulated).', true),
      C('possession', 'Possession date', 'verified', 'Mar 2027', [
        S('registry', 'Mar 2027', 'Proposed completion: 31-03-2027', 'Form B · p.1', '2026-11-12'),
        S('brochure', 'Mar 2027', 'Possession: March 2027', 'brochure · p.2', '2026-11-12')], 'Brochure and registry agree.', true),
      C('maint', 'Maintenance deposit', 'sourced', '₹3.5/sq ft per month', [S('pricesheet', '₹3.5/sq ft', 'Maintenance ₹3.5/sq ft/month, 12 months in advance', 'price sheet · p.2', '2026-11-10')]),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'This prototype does not check court records. Ask a lawyer to run a title and litigation search.')
    ],
    summary: {
      fit: 'Short commutes for both of you (22 and 34 min at peak) and two schools within 1.2 km. The price is ₹6 L under your limit.',
      attractive: 'The quoted price, carpet area, registration and possession date all match across two independent sources.',
      limits: 'Possession is 4 months away, so expect rent overlap. Super built-up area is from the brochure only.',
      questions: ['Is the ₹79.0 L price locked until registration, or linked to the construction stage?', 'What is the penalty clause if possession slips beyond Mar 2027?', 'Can we see the approved building plan and the latest construction progress report?']
    }
  },
  {
    id: 'p2', name: 'Neelam Heights', builder: 'Varnika Developers', locality: 'Sector 70, Gurugram', bhk: 3, type: 'Apartment',
    price: 82, carpet: 1080, sba: 1610, stage: 'Under construction', possession: 'Sep 2027',
    commute: { office1: 30, office2: 28 }, schools: [{ n: 'Lakeview International', km: 0.8 }],
    hospitals: [{ n: 'Sector 70 Community Hospital', km: 1.9 }], transit: { n: 'Bus depot, Southern Peripheral Rd', km: 0.9 },
    amenities: ['Clubhouse', 'Gym', 'Jogging track'], amenityScore: 0.6,
    hue: 1, devs: ['d1', 'd2'], listings: 3,
    claims: [
      C('price', 'Quoted price', 'verified', '₹82.0 L', [
        S('pricesheet', '₹82.0 L', '3BHK T2-1102 · All-inclusive of car park: ₹82.0 L', 'price-sheet.pdf · p.1', '2026-11-08'),
        S('portal', '₹82 L', '₹82 Lac', 'listing #NH-1180', '2026-11-19')], 'Two sources agree.', true),
      C('carpet', 'Carpet area', 'conflicting', '1,080 or 1,250 sq ft', [
        S('brochure', '1,250 sq ft', '3 BHK Premium · Carpet area 1,250 sq ft', 'brochure · p.11', '2026-11-08'),
        S('registry', '1,080 sq ft', 'Type C (3BHK): carpet area 100.3 sq m', 'Form B annexure · p.4', '2026-11-14')],
        'A 170 sq ft (14%) gap. The brochure may include balcony or utility area, which is not counted as carpet area under RERA. Until it is clarified, use the lower figure.', true),
      C('sba', 'Super built-up area', 'sourced', '1,610 sq ft', [S('brochure', '1,610 sq ft', 'SBA 1,610 sq ft', 'brochure · p.11', '2026-11-08')], 'With 1,080 sq ft carpet, loading is 33%. With 1,250 sq ft it is 22%.'),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2024/1187', [S('registry', 'PRM/HR/SIM/2024/1187', 'Status: Registered', 'registry search', '2026-11-14')], '', true),
      C('possession', 'Possession date', 'verified', 'Sep 2027', [
        S('registry', 'Sep 2027', 'Proposed completion: 30-09-2027', 'Form B · p.1', '2026-11-14'),
        S('site', 'Sep 2027', 'Handover from Q3 2027', 'project page', '2026-11-08')], '', true),
      C('maint', 'Maintenance deposit', 'unknown', 'Not published', [], 'Not in the brochure or price sheet. Ask the builder.'),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'Not checked by this prototype.')
    ],
    summary: {
      fit: 'It is the only 3 BHK in your budget with both commutes under 30 min, and a school is 0.8 km away.',
      attractive: 'The price and possession date are confirmed by two sources each, and the registration matched.',
      limits: 'The carpet area is disputed: 1,250 sq ft (brochure) vs 1,080 sq ft (registry). At 1,080 sq ft you pay ₹7,593 per sq ft of carpet, not ₹6,560. Maintenance charges are unknown.',
      questions: ['The brochure says 1,250 sq ft carpet; the registry filing says 100.3 sq m (1,080 sq ft). Which is correct, and what does the difference include?', 'Will the sale agreement state RERA carpet area in sq m?', 'What is the monthly maintenance rate and the advance deposit?']
    }
  },
  {
    id: 'p3', name: 'Tamarind Grove', builder: 'Orchid Spaces', locality: 'Sector 49, Gurugram', bhk: 2, type: 'Apartment',
    price: 84.5, carpet: 1010, sba: 1330, stage: 'Ready to move', possession: 'Ready',
    commute: { office1: 24, office2: 26 }, schools: [{ n: 'Brookside School', km: 1.6 }],
    hospitals: [{ n: 'Sector 49 General Hospital', km: 1.1 }], transit: { n: 'Bus stop, Sohna Rd', km: 0.4 },
    amenities: ['Gym', 'Rooftop garden', 'Power backup'], amenityScore: 0.5,
    hue: 2, devs: ['d1'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'conflicting', '₹78.0 L or ₹84.5 L', [
        S('portal', '₹78.0 L', '₹78 Lac · 2BHK ready to move', 'listing #TG-0931', '2026-11-16'),
        S('pricesheet', '₹84.5 L', 'Base ₹78.0 L + floor rise ₹2.5 L + covered parking ₹4.0 L = ₹84.5 L', 'price sheet · p.1', '2026-11-11')],
        'The portal shows the base price only. The builder price sheet adds floor rise and parking. Budget checks use the higher figure.', true),
      C('carpet', 'Carpet area', 'verified', '1,010 sq ft', [
        S('registry', '1,010 sq ft', 'Type A: 93.8 sq m', 'Form B annexure', '2026-11-11'),
        S('brochure', '1,010 sq ft', '1,010 sq ft carpet', 'brochure · p.5', '2026-11-11')], '', true),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2022/0655', [S('registry', 'PRM/HR/SIM/2022/0655', 'Status: Completed', 'registry search', '2026-11-11')], '', true),
      C('possession', 'Possession', 'verified', 'Ready to move', [S('registry', 'Completed', 'Project status: Completed · Mar 2025', 'registry search', '2026-11-11')], '', true),
      C('oc', 'Occupancy certificate', 'verified', 'Issued', [S('registry', 'OC uploaded', 'Occupancy certificate uploaded · 12-02-2025', 'registry documents', '2026-11-11')], 'An OC document was found on the registry. Its authenticity needs a lawyer\'s check.', true),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'Not checked by this prototype.')
    ],
    summary: {
      fit: 'Ready to move, with balanced commutes for both of you (24 and 26 min). A hospital is 1.1 km away.',
      attractive: 'There is no construction risk, and an occupancy certificate is on file.',
      limits: 'The real price is ₹84.5 L, not the ₹78 L on the portal, which leaves only ₹0.5 L of headroom. It is the smallest carpet area on your list.',
      questions: ['Is the ₹4.0 L covered parking mandatory?', 'Is the floor rise charge negotiable for a lower floor?', 'Can we see the OC and the electricity and water connection approvals?']
    }
  },
  {
    id: 'p4', name: 'Sahyadri Residency', builder: 'Malnad Builders', locality: 'Sector 36, Sohna', bhk: 3, type: 'Apartment',
    price: 72, carpet: 1150, sba: 1520, stage: 'Ready to move', possession: 'Ready',
    commute: { office1: 52, office2: 14 }, schools: [{ n: 'St. Ann\'s Convent', km: 1.4 }],
    hospitals: [{ n: 'Sohna Health Centre', km: 2.8 }], transit: { n: 'Bus stand, Sohna', km: 1.6 },
    amenities: ['Clubhouse', 'Pool', 'Indoor games', 'Power backup'], amenityScore: 0.75,
    hue: 3, devs: ['d3'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'verified', '₹72.0 L', [
        S('pricesheet', '₹72.0 L', '3BHK B-305 · ₹72.0 L incl. parking', 'price sheet', '2026-11-05'),
        S('portal', '₹72 L', '₹72 Lac · Ready to move', 'listing #SR-4410', '2026-11-17')], '', true),
      C('carpet', 'Carpet area', 'verified', '1,150 sq ft', [
        S('registry', '1,150 sq ft', 'Type 3B: 106.8 sq m', 'Form B annexure', '2026-11-05'),
        S('brochure', '1,150 sq ft', '1,150 sq ft carpet', 'brochure · p.6', '2026-11-05')], '', true),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2021/0277', [S('registry', 'PRM/HR/SIM/2021/0277', 'Status: Completed', 'registry search', '2026-11-05')], '', true),
      C('possession', 'Possession', 'sourced', 'Ready to move', [S('portal', 'Ready to move', 'Ready to move', 'listing #SR-4410', '2026-11-17')], 'Only the listing says "ready to move". The registry shows construction completed.', true),
      C('oc', 'Occupancy certificate', 'unknown', 'Not found', [], 'No OC document is on the registry, and none is mentioned by the builder. Without an OC, utility connections, home-loan disbursal and resale can be affected.', true),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'Not checked by this prototype.')
    ],
    summary: {
      fit: 'The largest home on your list (1,150 sq ft carpet) at ₹13 L under your budget. Arjun\'s commute is 14 min.',
      attractive: 'It is a ready 3 BHK with a pool and clubhouse, and its price and area are confirmed by two sources.',
      limits: 'Priya\'s commute is 52 min at peak, over your 45-min limit. The occupancy certificate could not be found.',
      questions: ['Has the occupancy certificate been issued? Please share a copy.', 'Are permanent electricity and water connections in place, or still temporary?', 'Which banks have approved home loans for this project?']
    }
  },
  {
    id: 'p5', name: 'Bluebell Enclave', builder: 'Southfield Homes', locality: 'Sector 150, Noida', bhk: 2, type: 'Apartment',
    price: 68, carpet: 980, sba: 1290, stage: 'Ready to move', possession: 'Ready',
    commute: { office1: 58, office2: 75 }, schools: [{ n: 'Techville Public School', km: 0.9 }],
    hospitals: [{ n: 'Sector 150 Care Hospital', km: 1.3 }], transit: { n: 'Bus stop, Noida Expressway', km: 0.5 },
    amenities: ['Gym', 'Play area'], amenityScore: 0.45,
    hue: 4, devs: ['d4'], listings: 1,
    claims: [
      C('price', 'Quoted price', 'verified', '₹68.0 L', [
        S('pricesheet', '₹68.0 L', '₹68.0 L incl. parking', 'price sheet', '2026-11-02'),
        S('portal', '₹68 L', '₹68 Lac', 'listing #BE-2201', '2026-11-15')], '', true),
      C('carpet', 'Carpet area', 'verified', '980 sq ft', [S('registry', '980 sq ft', '91.0 sq m', 'Form B annexure', '2026-11-02'), S('brochure', '980 sq ft', '980 sq ft', 'brochure', '2026-11-02')], '', true),
      C('rera', 'Registration number', 'verified', 'UPRERA/SIM/2021/0930', [S('registry', 'UPRERA/SIM/2021/0930', 'Completed', 'registry search', '2026-11-02')], '', true),
      C('possession', 'Possession', 'verified', 'Ready to move', [S('registry', 'Completed', 'Completed · 2024', 'registry search', '2026-11-02')], '', true),
      C('oc', 'Occupancy certificate', 'verified', 'Issued', [S('registry', 'OC uploaded', 'OC uploaded · 2024', 'registry documents', '2026-11-02')], '', true)
    ],
    summary: {
      fit: 'The cheapest well-documented option, with ₹17 L of headroom and a school 0.9 km away.',
      attractive: 'All its critical claims are confirmed and it has an OC.',
      limits: 'It fails your top priority: commutes are 58 and 75 min at peak, both over your 45-min limit.',
      questions: ['Is there a company shuttle or a planned transit link toward Cyber City?']
    }
  },
  {
    id: 'p6', name: 'Ivory Terraces', builder: 'Kesari Habitat', locality: 'DLF Phase 3, Gurugram', bhk: 3, type: 'Apartment',
    price: 89.2, carpet: 1190, sba: 1580, stage: 'Under construction', possession: 'Dec 2026',
    commute: { office1: 10, office2: 38 }, schools: [{ n: 'Lakeside Academy', km: 0.7 }],
    hospitals: [{ n: 'Phase 3 Multispeciality', km: 1.0 }], transit: { n: 'Bus stop, NH-48 service road', km: 0.2 },
    amenities: ['Clubhouse', 'Pool', 'Co-working lounge', 'EV charging'], amenityScore: 0.9,
    hue: 5, devs: ['d1'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'verified', '₹89.2 L', [S('pricesheet', '₹89.2 L', '₹89.2 L incl. parking', 'price sheet', '2026-11-09'), S('portal', '₹89 L', '₹89 Lac', 'listing #IT-7781', '2026-11-18')], '', true),
      C('carpet', 'Carpet area', 'verified', '1,190 sq ft', [S('registry', '1,190 sq ft', '110.6 sq m', 'Form B annexure', '2026-11-09')], '', true),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2024/0333', [S('registry', 'PRM/HR/SIM/2024/0333', 'Registered', 'registry search', '2026-11-09')], '', true),
      C('possession', 'Possession date', 'verified', 'Dec 2026', [S('registry', 'Dec 2026', 'Proposed completion: 31-12-2026', 'Form B', '2026-11-09')], '', true)
    ],
    summary: {
      fit: 'Excellent commutes (10 and 38 min) and the best amenities in the set.',
      attractive: 'Strong, consistent documentation, and possession is due next month.',
      limits: 'It is ₹4.2 L over your ₹85 L limit before registration costs.',
      questions: ['Is there an early-booking or end-of-quarter discount?']
    }
  },
  {
    id: 'p7', name: 'Kaveri Crest', builder: 'Riverbend Realty', locality: 'Sector 82, Gurugram', bhk: 3, type: 'Apartment',
    price: 76, carpet: 1120, sba: 1480, stage: 'Under construction', possession: 'Dec 2026 or Jun 2027',
    commute: { office1: 34, office2: 44 }, schools: [{ n: 'Pinewood Global School', km: 0.5 }, { n: 'Indus Valley School', km: 1.8 }],
    hospitals: [{ n: 'Sector 82 Medical Centre', km: 3.2 }], transit: { n: 'Bus stop, Sector 82 market', km: 0.6 },
    amenities: ['Clubhouse', 'Pool', 'Cricket net', 'Amphitheatre'], amenityScore: 0.85,
    hue: 6, devs: ['d2'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'verified', '₹76.0 L', [S('pricesheet', '₹76.0 L', '₹76.0 L incl. parking', 'price sheet', '2026-11-07'), S('portal', '₹76 L', '₹76 Lac', 'listing #KC-5521', '2026-11-16')], '', true),
      C('carpet', 'Carpet area', 'verified', '1,120 sq ft', [S('registry', '1,120 sq ft', '104.1 sq m', 'Form B annexure', '2026-11-13'), S('brochure', '1,120 sq ft', '1,120 sq ft', 'brochure · p.9', '2026-11-07')], '', true),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2023/0718', [S('registry', 'PRM/HR/SIM/2023/0718', 'Registered · extension applied', 'registry search', '2026-11-13')], '', true),
      C('possession', 'Possession date', 'conflicting', 'Dec 2026 or Jun 2027', [
        S('brochure', 'Dec 2026', 'Possession: December 2026', 'brochure · p.2', '2026-11-07'),
        S('registry', 'Jun 2027', 'Revised completion: 30-06-2027 (extension)', 'Form B (revised)', '2026-11-13')],
        'The registry shows a 6-month extension that the brochure does not mention. Plan for Jun 2027 or later.', true),
      C('maint', 'Maintenance deposit', 'sourced', '₹4/sq ft per month', [S('brochure', '₹4/sq ft', 'Maintenance ₹4/sq ft', 'brochure · p.14', '2026-11-07')]),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'Not checked by this prototype.')
    ],
    summary: {
      fit: 'It has two schools within 1.8 km, which is the best school access on your list, and it is ₹9 L under budget.',
      attractive: 'A large 3 BHK (1,120 sq ft carpet) with strong amenities.',
      limits: 'Possession has already slipped from Dec 2026 to Jun 2027 on the registry, and the brochure does not say so. Arjun\'s commute is 44 min, just under your 45-min limit.',
      questions: ['The registry shows completion revised to 30 Jun 2027. Why was it extended, and what is the delay compensation?', 'What is the current construction stage by tower?', 'Will the agreement carry the revised date?']
    }
  },
  {
    id: 'p8', name: 'Mango Meadows', builder: 'Unconfirmed', locality: 'Sector 88, Faridabad', bhk: 2, type: 'Villa',
    price: 61, carpet: null, sba: 1350, stage: 'Under construction', possession: 'Unknown',
    commute: { office1: 55, office2: 32 }, schools: [],
    hospitals: [], transit: { n: 'Bus stop, Gurugram-Faridabad Rd', km: 2.1 },
    amenities: ['Gated community'], amenityScore: null,
    hue: 7, devs: [], listings: 1,
    claims: [
      C('price', 'Quoted price', 'sourced', '₹61 L', [S('portal', '₹61 L', '₹61 Lac · 2BHK villa', 'listing #MM-0042', '2026-11-20')], 'Single listing only. No builder document found.', true),
      C('carpet', 'Carpet area', 'unknown', 'Not published', [], 'The listing shows only "1,350 sq ft" without saying whether that is carpet, built-up or plot area.', true),
      C('builder', 'Builder identity', 'unknown', 'Not stated', [], 'The listing is posted by an agent. The builder is not named.', true),
      C('rera', 'Registration number', 'unknown', 'Not found', [], 'No registration number on the listing, and no match found by project name (simulated search).', true),
      C('possession', 'Possession date', 'unknown', 'Not stated', [], '', true),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], '')
    ],
    summary: {
      fit: 'It has the lowest price on your list, and Arjun\'s commute is 32 min.',
      attractive: 'An independent villa format at ₹61 L.',
      limits: 'Too little evidence to judge: a single agent listing, with no builder, registration, carpet area or possession date. Priya\'s commute is 55 min.',
      questions: ['Who is the developer, and what is the project registration number?', 'Is 1,350 sq ft the carpet, built-up or plot area?', 'Is the land title clear, with an approved layout plan?']
    }
  },
  {
    id: 'p9', name: 'Silverline Residences', builder: 'Northstar Estates', locality: 'Sector 42, Gurugram', bhk: 2, type: 'Apartment',
    price: 84, carpet: 1060, sba: 1400, stage: 'Under construction', possession: 'Jun 2027',
    commute: { office1: 14, office2: 30 }, schools: [{ n: 'Cedar Heights School', km: 1.9 }],
    hospitals: [{ n: 'Golf Course Specialty Hospital', km: 1.5 }], transit: { n: 'Proposed metro station (simulated)', km: 0.9 },
    amenities: ['Clubhouse', 'Gym', 'Co-working lounge'], amenityScore: 0.7,
    hue: 8, devs: ['d1'], listings: 2,
    claims: [
      C('price', 'Quoted price', 'verified', '₹84.0 L', [S('pricesheet', '₹84.0 L', '₹84.0 L incl. parking', 'price sheet', '2026-11-06'), S('portal', '₹84 L', '₹84 Lac', 'listing #SR-1290', '2026-11-19')], '', true),
      C('carpet', 'Carpet area', 'verified', '1,060 sq ft', [S('registry', '1,060 sq ft', '98.5 sq m', 'Form B annexure', '2026-11-06'), S('brochure', '1,060 sq ft', '1,060 sq ft', 'brochure', '2026-11-06')], '', true),
      C('rera', 'Registration number', 'verified', 'PRM/HR/SIM/2025/0098', [S('registry', 'PRM/HR/SIM/2025/0098', 'Registered', 'registry search', '2026-11-06')], '', true),
      C('possession', 'Possession date', 'verified', 'Jun 2027', [S('registry', 'Jun 2027', 'Proposed completion: 30-06-2027', 'Form B', '2026-11-06'), S('site', 'Jun 2027', 'Possession June 2027', 'project page', '2026-11-06')], '', true),
      C('litigation', 'Litigation history', 'not_assessed', 'Not checked', [], 'Not checked by this prototype.')
    ],
    summary: {
      fit: 'The shortest commute for Priya (14 min), and Arjun\'s is 30 min. It is close to a proposed metro station.',
      attractive: 'All critical claims match across sources.',
      limits: 'At ₹84 L it uses almost your entire budget, and it is a 2 BHK. The nearest school is 1.9 km away. The metro is not yet under construction.',
      questions: ['Is there a payment plan linked to construction milestones?', 'Which tower faces the proposed metro alignment, and is noise mitigation planned?']
    }
  },
  {
    id: 'p10', name: 'Banyan Square', builder: 'Greenline Constructions', locality: 'Indirapuram, Ghaziabad', bhk: 1, type: 'Apartment',
    price: 58, carpet: 640, sba: 880, stage: 'Ready to move', possession: 'Ready',
    commute: { office1: 62, office2: 64 }, schools: [{ n: 'Northgate School', km: 1.1 }],
    hospitals: [{ n: 'Indirapuram City Hospital', km: 0.9 }], transit: { n: 'Bus stop, NH-9', km: 0.5 },
    amenities: ['Gym'], amenityScore: 0.3,
    hue: 9, devs: [], listings: 2, duplicate: true,
    claims: [
      C('price', 'Quoted price', 'sourced', '₹58 L', [S('portal', '₹58 L', '₹58 Lac', 'listing #BS-0112', '2026-07-20'), S('portal', '₹58 L', '₹58 Lac (same unit, second listing)', 'listing #BS-0187', '2026-07-21')], 'Two listings were merged as one unit (same tower, floor and area). The data is 127 days old.', true),
      C('carpet', 'Carpet area', 'sourced', '640 sq ft', [S('portal', '640 sq ft', '640 sq ft carpet', 'listing #BS-0112', '2026-07-20')], '', true),
      C('rera', 'Registration number', 'not_assessed', 'Not checked', [], '', true),
      C('possession', 'Possession', 'sourced', 'Ready to move', [S('portal', 'Ready', 'Ready to move', 'listing #BS-0112', '2026-07-20')], '', true)
    ],
    summary: { fit: 'It does not meet your requirements: 1 BHK, and both commutes are over 60 min.', attractive: 'Close to a hospital.', limits: 'Outdated data, and it is the wrong size for your family.', questions: [] }
  }
];

/* Location context for the schematic map (simulated). Road names are real roads near each locality.
   Facility names are generic and invented, and distances are simulated. */
(function () {
  var loc = {
    p1: { road: 'Golf Course Extension Road', fac: [{ n: 'Neighbourhood supermarket', km: 0.4 }, { n: 'Public park', km: 0.8 }, { n: 'Pharmacy', km: 0.3 }] },
    p2: { road: 'Southern Peripheral Road', fac: [{ n: 'Weekly market', km: 0.7 }, { n: 'Lake walking path', km: 1.1 }] },
    p3: { road: 'Sohna Road', fac: [{ n: 'Shopping mall', km: 1.2 }, { n: 'Pharmacy', km: 0.2 }, { n: 'Public park', km: 0.9 }] },
    p4: { road: 'Sohna-Gurugram Road', fac: [{ n: 'Neighbourhood supermarket', km: 0.6 }] },
    p5: { road: 'Noida-Greater Noida Expressway', fac: [{ n: 'Shopping complex', km: 0.8 }] },
    p6: { road: 'NH-48', fac: [{ n: 'Shopping mall', km: 1.0 }, { n: 'Lake walking path', km: 0.5 }] },
    p7: { road: 'Dwarka Expressway', fac: [{ n: 'Neighbourhood supermarket', km: 0.5 }, { n: 'Sports ground', km: 1.4 }] },
    p8: { road: 'Gurugram-Faridabad Road', fac: [] },
    p9: { road: 'Golf Course Road', fac: [{ n: 'Pharmacy', km: 0.3 }, { n: 'Shopping mall', km: 1.6 }, { n: 'Public park', km: 1.2 }] },
    p10: { road: 'NH-9', fac: [{ n: 'Shopping mall', km: 1.1 }] }
  };
  DR.PROPERTIES.forEach(function (p) { p.road = loc[p.id].road; p.facilities = loc[p.id].fac; });
})();

/* Investment data (SIMULATED demo data, clearly labelled in the UI).
   rent: monthly asking-rent range from N comparable rental listings within 2 km (simulated listing scan).
   demand: count of active rental listings within 2 km (simulated), used as a rough demand signal.
   progress: construction % from the latest registry quarterly progress report (simulated).
   pay: payment plan from the builder price sheet (simulated). built: completion year for ready homes. */
(function () {
  var inv = {
    p1: { rent: { lo: 24000, hi: 28000, n: 6 }, demand: 42, progress: { pct: 78, asOf: 'Sep 2026' }, pay: 'Construction-linked: 10% on booking, 80% across 8 build milestones, 10% on possession' },
    p2: { rent: { lo: 30000, hi: 34000, n: 5 }, demand: 31, progress: { pct: 45, asOf: 'Sep 2026' }, pay: 'Construction-linked: 10% on booking, 85% across 10 milestones, 5% on possession' },
    p3: { rent: { lo: 28000, hi: 32000, n: 9 }, demand: 64, built: 2025 },
    p4: { rent: { lo: 26000, hi: 30000, n: 4 }, demand: 22, built: 2024 },
    p5: { rent: { lo: 20000, hi: 23000, n: 7 }, demand: 38, built: 2024 },
    p6: { rent: { lo: 38000, hi: 42000, n: 8 }, demand: 70, progress: { pct: 92, asOf: 'Oct 2026' }, pay: 'Construction-linked: 20% on booking, 70% across 6 milestones, 10% on possession' },
    p7: { rent: { lo: 27000, hi: 31000, n: 5 }, demand: 29, progress: { pct: 55, asOf: 'Jun 2026' }, pay: 'Time-linked: 25% every 6 months from booking' },
    p8: { rent: null, demand: null, progress: null, pay: null },
    p9: { rent: { lo: 27000, hi: 30000, n: 6 }, demand: 55, progress: { pct: 60, asOf: 'Sep 2026' }, pay: 'Construction-linked: 10% on booking, 80% across 8 milestones, 10% on possession' },
    p10: { rent: { lo: 18000, hi: 20000, n: 3 }, demand: 18, built: 2019 }
  };
  /* Investor-facing project names (fictional). Same simulated data, shown under a separate name set in the investment journey. */
  var invNames = { p1: 'Meridian Heights', p2: 'Altura Residences', p3: 'Parkline Suites', p4: 'Ridgeview Homes', p5: 'Expressway Square',
    p6: 'Vantage Towers', p7: 'Crestline Avenue', p8: 'Orchard Villas', p9: 'Metro Edge Residences', p10: 'Studio Central' };
  DR.PROPERTIES.forEach(function (p) { p.inv = inv[p.id]; p.invName = invNames[p.id]; });
})();

DR.INVEST_CRITERIA = { yield: 'Rental yield', demand: 'Rental demand', growth: 'Development potential', delivery: 'Delivery certainty' };
DR.GOALS = { rental: 'Rental income', appreciation: 'Capital appreciation', both: 'Rental and appreciation' };
DR.STATUS_PREF = { ready: 'Ready to move', uc: 'Under construction', both: 'Ready or under construction' };
DR.DEMO_INVESTOR = { intent: 'invest', city: 'Delhi NCR', budgetMax: 85, bhk: [1, 2, 3, 4], types: ['Apartment'], places: [], localities: [], goal: 'rental', status: 'both', horizon: 5,
  commuteMax: 45, priorities: ['yield', 'demand', 'delivery'], assumed: ['Horizon 5 years'], name: 'Rohan Mehta', email: 'rohan@example.com' };

DR.DEVELOPMENTS = [
  { id: 'd1', name: 'Golf Course Extension metro link', kind: 'Metro', near: { p1: 2.1, p2: 3.0, p3: 1.4, p6: 1.2, p9: 0.9 },
    history: [{ stage: 'Proposed', date: 'Mar 2023' }, { stage: 'Announced', date: 'Jun 2024' }, { stage: 'Approved', date: 'Sep 2025' }],
    next: { stage: 'Under construction', date: '15 Dec 2026', note: 'Civil work orders issued for the east section (simulated notice).' },
    plus: 'Once operational, it would give a rail option to the Cyber City office corridor. The nearest proposed station is 0.9 km from Silverline Residences.',
    minus: 'Expect 2–3 years of construction disruption, lane closures and noise on the main road.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-15' },
  { id: 'd2', name: 'Southern Peripheral Road widening', kind: 'Road', near: { p2: 0.6, p7: 1.8 },
    history: [{ stage: 'Proposed', date: 'Jan 2024' }, { stage: 'Approved', date: 'Aug 2025' }, { stage: 'Funded', date: 'Feb 2026' }],
    plus: 'It could ease the SPR bottleneck on the route to Sohna Road.',
    minus: 'Possible frontage acquisition near the project gate, so check the setback.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-10' },
  { id: 'd3', name: 'Public hospital, Sohna', kind: 'Hospital', near: { p4: 1.2 },
    history: [{ stage: 'Announced', date: 'Jul 2026' }],
    plus: 'Better emergency care access nearby, if it is built.', minus: 'Announced only, with no funding or timeline confirmed.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-12' },
  { id: 'd4', name: 'Noida Expressway elevated corridor extension', kind: 'Road', near: { p5: 0.8 },
    history: [{ stage: 'Proposed', date: 'May 2025' }],
    plus: 'Could shorten trips toward Sector 18.', minus: 'Proposed only. Proposals like this often change or stall.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-04' }
];

/* Two more simulated developments that matter to investors (commercial demand, connectivity) */
DR.DEVELOPMENTS.push(
  { id: 'd5', name: 'Cyber City office cluster expansion', kind: 'Commercial', near: { p3: 2.6, p6: 1.4, p9: 2.2 },
    history: [{ stage: 'Announced', date: 'Feb 2025' }, { stage: 'Approved', date: 'Nov 2025' }, { stage: 'Under construction', date: 'Jul 2026' }],
    plus: 'More offices nearby usually means more people looking to rent within a short commute.',
    minus: 'Heavy construction traffic for 2–3 years. New supply nearby can also compete for tenants.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-14' },
  { id: 'd6', name: 'Dwarka Expressway–Sector 82 link road', kind: 'Road', near: { p7: 0.9, p4: 3.0 },
    history: [{ stage: 'Proposed', date: 'Apr 2024' }, { stage: 'Approved', date: 'Jun 2026' }],
    plus: 'Could cut travel time to the expressway and the airport side.',
    minus: 'Approved but not funded yet. Timelines for roads like this often slip.',
    source: 'Civic body notice (simulated)', accessed: '2026-11-09' }
);
/* What to watch next and the stated target (both from the simulated notices; targets are not promises) */
(function () {
  var extra = {
    d1: { watch: 'Civil work orders for the east section', target: 'Operational target 2030 (stated)' },
    d2: { watch: 'Start of land acquisition near the project gate', target: 'Completion target 2028 (stated)' },
    d3: { watch: 'Funding sanction in the state budget', target: 'No target date announced' },
    d4: { watch: 'Detailed project report approval', target: 'No target date announced' },
    d5: { watch: 'First tower occupancy certificate', target: 'Phase 1 target 2028 (stated)' },
    d6: { watch: 'Funding allocation and tender', target: 'No target date announced' }
  };
  DR.DEVELOPMENTS.forEach(function (d) { d.watch = extra[d.id].watch; d.target = extra[d.id].target; });
  DR.PROPERTIES.forEach(function (p) { DR.DEVELOPMENTS.forEach(function (d) { if (d.near[p.id] != null && p.devs.indexOf(d.id) < 0) p.devs.push(d.id); }); });
})();

DR.STAGES = ['Proposed', 'Announced', 'Approved', 'Funded', 'Under construction', 'Operational'];

DR.DEMO_PROFILE = {
  intent: 'live', city: 'Delhi NCR', budgetMax: 85, bhk: [2, 3], types: ['Apartment', 'Villa'],
  places: [{ key: 'office1', label: 'Priya · Cyber City' }, { key: 'office2', label: 'Arjun · Sohna Road' }],
  commuteMax: 45, priorities: ['commute', 'schools', 'possession'],
  assumed: ['Apartments and villas', 'Commute limit 45 min at peak']
};

DR.CRITERIA = {
  commute: 'Commute', schools: 'Schools nearby', possession: 'Possession certainty',
  budget: 'Budget headroom', amenities: 'Amenities', connectivity: 'Transit access'
};

DR.STATUS = {
  verified: { label: 'Verified', icon: 'checkCircle', desc: 'Matches a stated authoritative source by a stated method.' },
  sourced: { label: 'Sourced', icon: 'fileText', desc: 'Found in one source, not independently checked.' },
  conflicting: { label: 'Conflicting', icon: 'compare', desc: 'Two or more sources disagree.' },
  estimated: { label: 'Estimated', icon: 'calculator', desc: 'Calculated by this app with a disclosed method.' },
  assumption: { label: 'Assumption', icon: 'dashed', desc: 'A default or inferred value used in a calculation.' },
  unknown: { label: 'Unknown', icon: 'help', desc: 'We looked, but it isn\'t available.' },
  not_assessed: { label: 'Not assessed', icon: 'circleOff', desc: 'This app has not checked it.' }
};

import type {
  BlogArticle,
  CommunityStory,
  FacilityZone,
  FaqItem,
  GalleryItem,
  GymClass,
  MembershipPlan,
  RolePermissionMatrix,
  ScheduleSlot,
  SiteContent,
  TrainerProfile,
  TrainingProgram,
} from '../types/forge';

export const CLUB_IMAGES = {
  heroAthlete: '/src/assets/images/hero_strength_athlete_1795368693808.jpg',
  strengthZone: '/src/assets/images/gym_strength_zone_1795368694160.jpg',
  hiitTurf: '/src/assets/images/training_hiit_turf_1795368693997.jpg',
  recoverySanctuary: '/src/assets/images/recovery_sanctuary_1795368692816.jpg',
  coachMale: '/src/assets/images/coach_strength_male_1795368693439.jpg',
  coachFemale: '/src/assets/images/coach_performance_female_1795368693390.jpg',
} as const;

export const DEFAULT_SITE_CONTENT: SiteContent = {
  announcementOffer: 'Founding Performance Memberships Open — Complimentary 1-on-1 Assessment Included',
  openingHours: 'Mon–Sun · 05:00 – 22:30',
  locationShort: 'Indiranagar Flagship, Bengaluru',
  trialPromo: 'First Coaching Session Free',
  heroHeadline: 'BUILT BY DISCIPLINE. DEFINED BY STRENGTH.',
  heroSubheadline:
    'Train with purpose. Push beyond limits. Build a stronger version of yourself at Forge Athletics.',
  clubAddress: '742, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
  clubPhone: '+91 80 4120 8900',
  clubEmail: 'concierge@forgeathletics.in',
};

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog-1',
    slug: 'strength-training',
    index: '01',
    title: 'Strength Training',
    category: 'Strength',
    shortDescription:
      'Barbell-driven progressive overload built around squat, hinge, press, and pull mechanics under coach supervision.',
    fullDescription:
      'Our flagship Strength Training curriculum applies structured 12-week mesocycles calibrated to your movement profile. Every lifter works from competition-grade power racks with velocity tracking and technical bar-path feedback.',
    level: 'All Levels · Scaled Loads',
    duration: '60 Minutes',
    frequency: '3–4 Sessions / Week',
    leadCoachSlug: 'vikram-deshmukh',
    image: CLUB_IMAGES.heroAthlete,
    highlights: [
      'Periodized 12-week strength blocks with clear progression benchmarks',
      '1:6 coach-to-athlete ratio on the main lifting floor',
      'Calibrated Eleiko-spec plates and stiff power bars',
    ],
    sessionStructure: [
      { phase: '01. Neural Prep', duration: '10 min', focus: 'Joint priming, bracing drills, and ramp-up sets' },
      { phase: '02. Primary Compound', duration: '25 min', focus: 'Squat, bench, or deadlift working sets at RPE 7–9' },
      { phase: '03. Structural Accessories', duration: '20 min', focus: 'Unilateral stability, posterior chain, and upper-back volume' },
      { phase: '04. Down-Regulation', duration: '5 min', focus: 'Parasympathetic breathing and hip decompression' },
    ],
    equipment: ['Competition Power Racks', 'Calibrated Steel Plates', 'Safety Squat & Trap Bars'],
  },
  {
    id: 'prog-2',
    slug: 'weight-training',
    index: '02',
    title: 'Weight Training',
    category: 'Weight Training',
    shortDescription:
      'Targeted hypertrophy and muscular resilience using precision plate-loaded machines, cables, and heavy dumbbells.',
    fullDescription:
      'Designed for balanced muscular development, joint durability, and physique symmetry. Our Weight Training track combines controlled eccentric tempo with biomechanical machine alignment to drive lean tissue adaptation safely.',
    level: 'Beginner to Advanced',
    duration: '55 Minutes',
    frequency: '4–5 Sessions / Week',
    leadCoachSlug: 'kabir-malhotra',
    image: CLUB_IMAGES.strengthZone,
    highlights: [
      'Custom dumbbell run from 2 kg to 60 kg in 2 kg increments',
      'Tempo-controlled hypertrophy blocks tracked in your member portal',
      'Plate-loaded leverage machines engineered for clean resistance curves',
    ],
    sessionStructure: [
      { phase: '01. Activation', duration: '8 min', focus: 'Scapular and pelvic alignment prep' },
      { phase: '02. Mechanical Tension', duration: '24 min', focus: 'Heavy compound dumbbell and leverage lifts' },
      { phase: '03. Metabolic Volume', duration: '18 min', focus: 'Controlled isolation supersets and cable work' },
      { phase: '04. Cool Down', duration: '5 min', focus: 'Targeted myofascial release' },
    ],
    equipment: ['60 kg Urethane Dumbbells', 'Dual-Pulley Functional Towers', 'Plate-Loaded Prime Machines'],
  },
  {
    id: 'prog-3',
    slug: 'functional-fitness',
    index: '03',
    title: 'Functional Fitness',
    category: 'Functional',
    shortDescription:
      'Multi-planar athletic movement combining kettlebells, sleds, rotational power, and loaded carries for real-world capacity.',
    fullDescription:
      'Functional Fitness bridges gym strength and athletic carry-over. Sessions challenge core anti-rotation, single-leg deceleration, loaded carries, and explosive hip drive across our 40-meter indoor turf runway.',
    level: 'Intermediate',
    duration: '50 Minutes',
    frequency: '3 Sessions / Week',
    leadCoachSlug: 'rohan-kulkarni',
    image: CLUB_IMAGES.hiitTurf,
    highlights: [
      '40-meter high-density turf track for sled pushes and carries',
      'Rotational landmine and medicine-ball power development',
      'Balance of unilateral strength and joint stability',
    ],
    sessionStructure: [
      { phase: '01. Dynamic Mobility', duration: '10 min', focus: 'Thoracic rotation and ankle dorsiflexion' },
      { phase: '02. Power & Speed', duration: '12 min', focus: 'Med-ball throws and plyometric landings' },
      { phase: '03. Tri-Planar Circuit', duration: '23 min', focus: 'Sleds, kettlebells, Turkish get-ups, and farmer carries' },
      { phase: '04. Core Reset', duration: '5 min', focus: 'Dead-bug and rib-cage stacking drills' },
    ],
    equipment: ['Competition Kettlebells', 'Weighted Prowler Sleds', '40m Sprint Turf'],
  },
  {
    id: 'prog-4',
    slug: 'hiit',
    index: '04',
    title: 'HIIT',
    category: 'HIIT',
    shortDescription:
      'Precision high-intensity interval protocols engineered to expand anaerobic threshold and work-to-rest recovery.',
    fullDescription:
      'No chaotic random burpees. Forge HIIT uses structured work-to-rest intervals across Assault Bikes, SkiErgs, and kettlebell complexes to target peak VO2 capacity while protecting joint integrity.',
    level: 'Intermediate to Advanced',
    duration: '45 Minutes',
    frequency: '2–3 Sessions / Week',
    leadCoachSlug: 'tara-menon',
    image: CLUB_IMAGES.hiitTurf,
    highlights: [
      'Measured 1:1, 2:1, and 1:2 interval ratios tracked by heart-rate zones',
      'Zero high-impact joint overload—ergometers and turf focus',
      'Structured pacing targets displayed on studio timing boards',
    ],
    sessionStructure: [
      { phase: '01. Thermal Ramp', duration: '8 min', focus: 'Progressive heart-rate elevation' },
      { phase: '02. Peak Intervals', duration: '24 min', focus: '4-minute ergometer and sled blocks at 85–95% effort' },
      { phase: '03. Finisher Sprint', duration: '6 min', focus: 'Team relay conditioning sprint' },
      { phase: '04. Heart-Rate Recovery', duration: '7 min', focus: 'Guided nasal cadence recovery' },
    ],
    equipment: ['Concept2 SkiErgs & RowErgs', 'Rogue Echo Bikes', 'Battle Ropes'],
  },
  {
    id: 'prog-5',
    slug: 'cardio-conditioning',
    index: '05',
    title: 'Cardio Conditioning',
    category: 'Cardio',
    shortDescription:
      'Aerobic base building, threshold pacing, and cardiac output work on curved non-motorized treadmills and Concept2 ergs.',
    fullDescription:
      'True endurance underpins heavy lifting and daily energy. Cardio Conditioning develops aerobic efficiency through Zone 2 steady-state intervals and lactate-threshold progressions tailored for runners, lifters, and hybrid athletes.',
    level: 'All Levels',
    duration: '50 Minutes',
    frequency: '2–4 Sessions / Week',
    leadCoachSlug: 'tara-menon',
    image: CLUB_IMAGES.hiitTurf,
    highlights: [
      'Zone 2 aerobic base and Zone 4 threshold pacing education',
      'Woodway-grade curved treadmills for natural gait mechanics',
      'Ideal recovery companion to heavy barbell days',
    ],
    sessionStructure: [
      { phase: '01. Gait & Cadence Prep', duration: '8 min', focus: 'Calf resilience and breathing rhythm' },
      { phase: '02. Threshold Blocks', duration: '32 min', focus: 'Split-pace intervals across RowErg, BikeErg, and Curve' },
      { phase: '03. Steady Flush', duration: '10 min', focus: 'Low-intensity aerobic cool down' },
    ],
    equipment: ['Non-Motorized Curved Treadmills', 'Concept2 BikeErgs', 'RowErgs'],
  },
  {
    id: 'prog-6',
    slug: 'cross-training',
    index: '06',
    title: 'Cross Training',
    category: 'Cross Training',
    shortDescription:
      'Hybrid athletic conditioning blending Olympic barbell complexes, gymnastics rigs, and metabolic endurance.',
    fullDescription:
      'Built for hybrid athletes who demand strength under fatigue. Cross Training pairs technical barbell cycling and pull-up rig progressions with mixed-modal engine work in a tight, coach-led small group.',
    level: 'Intermediate to Advanced',
    duration: '60 Minutes',
    frequency: '3–5 Sessions / Week',
    leadCoachSlug: 'rohan-kulkarni',
    image: CLUB_IMAGES.strengthZone,
    highlights: [
      'Technical Olympic lifting progressions (clean, jerk, snatch drills)',
      'Rig skill work: strict pull-ups, rings, and core gymnastics',
      'Scaled movement standards for sustainable weekly consistency',
    ],
    sessionStructure: [
      { phase: '01. Skill & Barbell Prep', duration: '15 min', focus: 'PVC/empty bar positioning and rig priming' },
      { phase: '02. Strength Complex', duration: '20 min', focus: 'Olympic lift complexes every 2 minutes' },
      { phase: '03. Mixed-Modal Metcon', duration: '20 min', focus: 'Timed multi-station conditioning challenge' },
      { phase: '04. Shoulder & Hip Care', duration: '5 min', focus: 'Banded capsule stretching' },
    ],
    equipment: ['Custom Rig Pull-Up Stations', 'Bumper Plates', 'Gymnastic Rings & Plyo Boxes'],
  },
  {
    id: 'prog-7',
    slug: 'personal-training',
    index: '07',
    title: 'Personal Training',
    category: 'Personal Training',
    shortDescription:
      'Private 1-on-1 coaching in our dedicated assessment studio with individualized biomechanics, nutrition, and programming.',
    fullDescription:
      'Every Personal Training partnership begins with a 60-minute movement screen, force-balance evaluation, and lifestyle schedule audit. Your dedicated coach builds and adjusts every session inside your Forge Member Portal.',
    level: 'Tailored 1-on-1',
    duration: '60 Minutes',
    frequency: '2–5 Sessions / Week',
    leadCoachSlug: 'kabir-malhotra',
    image: CLUB_IMAGES.coachMale,
    highlights: [
      'Private Personal Training Studio floor away from main rush hours',
      'Bi-weekly body composition and strength benchmark reviews',
      'Integrated nutrition habits and travel workout modifications',
    ],
    sessionStructure: [
      { phase: '01. Readiness Check', duration: '5 min', focus: 'Sleep, soreness, and joint mobility check-in' },
      { phase: '02. Corrective Priming', duration: '10 min', focus: 'Individualized activation drills' },
      { phase: '03. Bespoke Block', duration: '40 min', focus: 'Tailored strength, physique, or sport-specific training' },
      { phase: '04. Recovery Plan', duration: '5 min', focus: 'Post-session fueling and next-day guidance' },
    ],
    equipment: ['Private Cable & Rack Bay', 'Force-Plate Jump Mat', 'Dedicated Recovery Tools'],
  },
  {
    id: 'prog-8',
    slug: 'mobility-recovery',
    index: '08',
    title: 'Mobility & Recovery',
    category: 'Mobility & Recovery',
    shortDescription:
      'End-range joint strength, breath-led yoga flow, infrared sauna contrast, and guided nervous-system restoration.',
    fullDescription:
      'Performance is only realized when the body recovers. Our Mobility & Recovery track pairs active end-range articular training (CARs and PAILs/RAILs) with restorative breathwork and thermal contrast protocols.',
    level: 'All Levels',
    duration: '50 Minutes',
    frequency: '2–3 Sessions / Week',
    leadCoachSlug: 'meera-krishnan',
    image: CLUB_IMAGES.recoverySanctuary,
    highlights: [
      'Active joint mobility designed specifically for heavy lifters and runners',
      'Full-spectrum cedar infrared sauna & cold plunge access post-class',
      'Small-group mat studio capped at 12 participants for posture adjustments',
    ],
    sessionStructure: [
      { phase: '01. Breath Cadence', duration: '8 min', focus: 'Diaphragmatic rib expansion and vagal tone' },
      { phase: '02. Joint Capsules', duration: '18 min', focus: 'Controlled articular rotations for hips, shoulders, and spine' },
      { phase: '03. Loaded Stretching', duration: '16 min', focus: 'Isometric end-range strength holds' },
      { phase: '04. Thermal Protocol', duration: '8 min', focus: 'Guided transition to contrast recovery suite' },
    ],
    equipment: ['Cedar Infrared Sauna', 'Cold Plunge Pools', 'Cork Blocks & Compression Boots'],
  },
];

export const FACILITY_ZONES: FacilityZone[] = [
  {
    id: 'fac-1',
    index: '01',
    name: 'Strength Zone',
    areaSqFt: '5,200 sq ft',
    capacity: '28 Athletes',
    summary: 'Competition lifting platforms and matte-black power racks spaced for focused execution.',
    description:
      'Twelve custom competition power racks anchored to oak-insert lifting platforms, outfitted with calibrated steel kilo plates, specialty bars, and overhead directional lighting.',
    equipmentList: ['12 Competition Power Racks', '8 Oak Olympic Platforms', 'Calibrated Steel & Bumper Plates'],
    image: CLUB_IMAGES.strengthZone,
  },
  {
    id: 'fac-2',
    index: '02',
    name: 'Free Weights',
    areaSqFt: '3,400 sq ft',
    capacity: '24 Athletes',
    summary: 'Precision urethane dumbbells up to 60 kg paired with heavy-duty adjustable benches.',
    description:
      'Dual mirrored dumbbell bays stocked from 2 kg to 60 kg, fixed barbell racks, preacher stations, and commercial cable crossover towers with zero wait bottlenecks.',
    equipmentList: ['2–60 kg Urethane Dumbbell Runs', 'Heavy Adjustable Benches', 'Dual-Stack Cable Towers'],
    image: CLUB_IMAGES.heroAthlete,
  },
  {
    id: 'fac-3',
    index: '03',
    name: 'Cardio Zone',
    areaSqFt: '2,200 sq ft',
    capacity: '22 Athletes',
    summary: 'Self-powered curved treadmills and Concept2 ergometers calibrated for real-time watt telemetry.',
    description:
      'Engineered for metabolic conditioning without sterile television clutter. Non-motorized sprint treads, SkiErgs, RowErgs, and Echo Bikes sit along floor-to-ceiling daylight glazing.',
    equipmentList: ['Non-Motorized Curved Treadmills', 'Concept2 RowErgs & SkiErgs', 'Rogue Echo Air Bikes'],
    image: CLUB_IMAGES.hiitTurf,
  },
  {
    id: 'fac-4',
    index: '04',
    name: 'Functional Training Area',
    areaSqFt: '3,600 sq ft',
    capacity: '20 Athletes',
    summary: '40-meter sprint turf, weighted prowler sleds, and custom modular rig architecture.',
    description:
      'Dedicated indoor turf runway for sled work, sandbag carries, kettlebell complexes, and multi-planar athletic agility drills.',
    equipmentList: ['40m Shock-Absorbing Turf', 'Prowler Sleds & Yokes', 'Competition Kettlebell Wall'],
    image: CLUB_IMAGES.hiitTurf,
  },
  {
    id: 'fac-5',
    index: '05',
    name: 'Personal Training Studio',
    areaSqFt: '1,600 sq ft',
    capacity: '6 Private Bays',
    summary: 'Enclosed 1-on-1 coaching suite for movement screens, assessments, and private sessions.',
    description:
      'A quiet, distraction-free architectural wing reserved exclusively for Personal Training clients and initial biomechanical onboarding.',
    equipmentList: ['Private Half-Racks', 'Functional Cable Stations', 'Movement Assessment Kits'],
    image: CLUB_IMAGES.coachMale,
  },
  {
    id: 'fac-6',
    index: '06',
    name: 'Locker Rooms',
    areaSqFt: '1,300 sq ft',
    capacity: '48 Lockers',
    summary: 'Architectural slate showers, digital lockers, botanical amenities, and chilled towel service.',
    description:
      'Transition seamlessly from morning training to executive meetings with private rainfall shower suites, Dyson styling stations, and ventilated steel lockers.',
    equipmentList: ['Private Slate Rainfall Showers', 'Keyless Smart Lockers', 'Chilled Eucalyptus Towels'],
    image: CLUB_IMAGES.recoverySanctuary,
  },
  {
    id: 'fac-7',
    index: '07',
    name: 'Recovery Area',
    areaSqFt: '1,200 sq ft',
    capacity: '14 Athletes',
    summary: 'Cedar infrared sauna, 6°C cold plunge pools, compression boots, and mobility mats.',
    description:
      'Designed as an acoustic sanctuary in dark slate and warm cedar. Dedicated to contrast therapy, lymphatic compression recovery, and guided breath down-regulation.',
    equipmentList: ['Full-Spectrum Cedar Sauna', 'Dual 6°C Cold Plunge Tubs', 'Pneumatic Compression Loungers'],
    image: CLUB_IMAGES.recoverySanctuary,
  },
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'tr-1',
    slug: 'vikram-deshmukh',
    name: 'Vikram Deshmukh',
    roleTitle: 'Head of Strength & Barbell Performance',
    category: 'Strength Coach',
    experience: '11 Years Coaching Experience',
    qualifications: [
      'Forge Master Strength Lead (Demo Profile)',
      'M.Sc. Exercise Biomechanics (Fictional Demo)',
      'Barbell Periodization Specialist',
    ],
    shortBio:
      'Specializes in foundational barbell mechanics, raw power development, and long-term structural resilience for committed lifters.',
    fullBio:
      'Vikram oversees strength programming architecture across Forge Athletics. Over eleven years of coaching competitive lifters and busy executives alike, he built a reputation for precise technical cues that add kilos to the bar while keeping joints healthy.',
    philosophy: 'Master the simplest positions under light load first; heavy weights are simply the audit.',
    specialties: ['Squat & Deadlift Mechanics', '12-Week Strength Cycles', 'Velocity-Based Training'],
    image: CLUB_IMAGES.coachMale,
    availability: 'Mon–Sat · 06:00 – 13:00',
  },
  {
    id: 'tr-2',
    slug: 'meera-krishnan',
    name: 'Meera Krishnan',
    roleTitle: 'Lead Mobility & Breathwork Specialist',
    category: 'Yoga Instructor',
    experience: '9 Years Coaching Experience',
    qualifications: [
      'Forge Mobility Curriculum Director (Demo Profile)',
      'Articular Joint Conditioning Mentor (Fictional Demo)',
      'Restorative Breathwork Facilitator',
    ],
    shortBio:
      'Combines athletic joint-capsule conditioning with disciplined yoga flow so strength athletes move freely without stiffness.',
    fullBio:
      'Meera bridges high-output barbell work and sustainable longevity. Her classes emphasize active end-range control, spinal segmentation, and post-session nervous system recovery inside the Forge Recovery Sanctuary.',
    philosophy: 'Flexibility without strength at end-range is borrowed range; earn every degree of motion.',
    specialties: ['Athletic Yoga Flow', 'Hip & Thoracic Mobility', 'Contrast Recovery Coaching'],
    image: CLUB_IMAGES.coachFemale,
    availability: 'Mon–Fri · 07:00 – 18:00',
  },
  {
    id: 'tr-3',
    slug: 'rohan-kulkarni',
    name: 'Rohan Kulkarni',
    roleTitle: 'Senior Functional & Cross Training Coach',
    category: 'Functional Fitness Coach',
    experience: '8 Years Coaching Experience',
    qualifications: [
      'Forge Hybrid Conditioning Lead (Demo Profile)',
      'Kettlebell & Sled Mechanics Coach (Fictional Demo)',
      'Olympic Lifting Foundations Mentor',
    ],
    shortBio:
      'Designs multi-planar turf conditioning and hybrid barbell sessions for athletes building strength that transfers to sport and life.',
    fullBio:
      'Rohan leads Forge Turf Conditioning and Cross Training sessions. Known for crisp pacing structure and relentless attention to bracing under fatigue, he helps members expand work capacity without sloppy form.',
    philosophy: 'Move clean when tired. Technical discipline under fatigue is what separates training from chaos.',
    specialties: ['Turf & Sled Conditioning', 'Olympic Lift Complexes', 'Hybrid Endurance'],
    image: CLUB_IMAGES.coachMale,
    availability: 'Tue–Sun · 06:00 – 20:00',
  },
  {
    id: 'tr-4',
    slug: 'ananya-nair',
    name: 'Ananya Nair',
    roleTitle: 'Performance Nutrition & Recovery Strategist',
    category: 'Nutrition Coach',
    experience: '7 Years Coaching Experience',
    qualifications: [
      'Forge Performance Nutrition Lead (Demo Profile)',
      'B.Sc. Clinical & Sports Nutrition (Fictional Demo)',
      'Metabolic Fueling & Hydration Coach',
    ],
    shortBio:
      'Translates training volume into practical protein, carbohydrate timing, and hydration habits tailored for Indian kitchens and work schedules.',
    fullBio:
      'Ananya rejects extreme crash diets in favor of sustainable fueling systems. She works alongside Forge strength coaches to align daily nutrition, sleep hygiene, and recovery routines with each member’s training phase.',
    philosophy: 'Fueling is part of the workout—consistent nourishment builds recovery you can measure on the bar.',
    specialties: ['Hypertrophy & Strength Fueling', 'Habit Architecture', 'Travel Nutrition Systems'],
    image: CLUB_IMAGES.coachFemale,
    availability: 'Mon–Sat · 09:00 – 19:00',
  },
  {
    id: 'tr-5',
    slug: 'kabir-malhotra',
    name: 'Kabir Malhotra',
    roleTitle: 'Principal Personal Trainer',
    category: 'Personal Trainer',
    experience: '10 Years Coaching Experience',
    qualifications: [
      'Forge 1-on-1 Coaching Principal (Demo Profile)',
      'Post-Rehab Return-to-Lifting Specialist (Fictional Demo)',
      'Hypertrophy Programming Architect',
    ],
    shortBio:
      'Guides founders, executives, and returning athletes through structured 1-on-1 physique and strength transformations.',
    fullBio:
      'Kabir operates primarily inside the private Personal Training Studio. His bespoke programs adapt around travel calendars, high-stress workweeks, and joint history while delivering measurable quarterly progress.',
    philosophy: 'Consistency beats intensity spikes every single quarter. Build a routine you can sustain for years.',
    specialties: ['Executive 1-on-1 Coaching', 'Hypertrophy & Posture', 'Joint-Friendly Programming'],
    image: CLUB_IMAGES.coachMale,
    availability: 'Mon–Sat · 06:00 – 21:00',
  },
  {
    id: 'tr-6',
    slug: 'tara-menon',
    name: 'Tara Menon',
    roleTitle: 'HIIT & Metabolic Conditioning Coach',
    category: 'Functional Fitness Coach',
    experience: '6 Years Coaching Experience',
    qualifications: [
      'Forge Erg & HIIT Specialist (Demo Profile)',
      'Endurance Pacing & Heart-Rate Coach (Fictional Demo)',
      'Speed & Turf Agility Lead',
    ],
    shortBio:
      'Drives structured energy-system classes on Concept2 ergs, curved treadmills, and sled tracks with precision interval coaching.',
    fullBio:
      'Tara brings track-and-field pacing precision to indoor metabolic conditioning. She teaches athletes how to manage heart-rate zones, recover between maximal bouts, and build an unshakeable aerobic engine.',
    philosophy: 'Respect the rest interval as much as the sprint—recovery speed is real fitness.',
    specialties: ['VO2 Interval Protocols', 'Zone 2 Base Building', 'Turf Sprint Mechanics'],
    image: CLUB_IMAGES.coachFemale,
    availability: 'Mon–Sun · 07:00 – 20:30',
  },
];

export const GYM_CLASSES: GymClass[] = [
  {
    id: 'cls-1',
    name: 'Forge Barbell Club',
    category: 'Strength',
    durationMinutes: 60,
    intensity: 'High',
    capacity: 12,
    description: 'Coached squat, press, and pull progression on calibrated platforms.',
    leadTrainerId: 'tr-1',
  },
  {
    id: 'cls-2',
    name: 'Engine 45 · HIIT',
    category: 'HIIT',
    durationMinutes: 45,
    intensity: 'High',
    capacity: 16,
    description: 'Timed ergometer, sled, and kettlebell intervals calibrated to heart-rate recovery.',
    leadTrainerId: 'tr-6',
  },
  {
    id: 'cls-3',
    name: 'Turf Athletics',
    category: 'Functional',
    durationMinutes: 50,
    intensity: 'High',
    capacity: 14,
    description: 'Multi-planar carries, rotational power, sled drives, and athletic deceleration.',
    leadTrainerId: 'tr-3',
  },
  {
    id: 'cls-4',
    name: 'Hypertrophy Lab',
    category: 'Weight Training',
    durationMinutes: 55,
    intensity: 'Moderate',
    capacity: 12,
    description: 'Controlled tempo dumbbell and cable hypertrophy for balanced strength.',
    leadTrainerId: 'tr-5',
  },
  {
    id: 'cls-5',
    name: 'Hybrid Cross',
    category: 'Cross Training',
    durationMinutes: 60,
    intensity: 'High',
    capacity: 14,
    description: 'Olympic barbell complexes paired with mixed-modal conditioning challenges.',
    leadTrainerId: 'tr-3',
  },
  {
    id: 'cls-6',
    name: 'Threshold Erg',
    category: 'Cardio',
    durationMinutes: 50,
    intensity: 'Moderate',
    capacity: 16,
    description: 'Aerobic pacing and lactate threshold splits on Concept2 RowErgs, SkiErgs, and BikeErgs.',
    leadTrainerId: 'tr-6',
  },
  {
    id: 'cls-7',
    name: 'Kinetic Mobility & Breath',
    category: 'Mobility & Recovery',
    durationMinutes: 50,
    intensity: 'Restorative',
    capacity: 12,
    description: 'Joint capsule strengthening, athletic yoga flow, and parasympathetic recovery.',
    leadTrainerId: 'tr-2',
  },
];

export const INITIAL_SCHEDULE: ScheduleSlot[] = [
  { id: 'sch-1', classId: 'cls-1', className: 'Forge Barbell Club', category: 'Strength', day: 'Monday', time: '06:30', timeBlock: 'Morning', duration: '60 min', trainerId: 'tr-1', trainerName: 'Vikram Deshmukh', totalSlots: 12, availableSlots: 4, studioZone: 'Strength Zone' },
  { id: 'sch-2', classId: 'cls-2', className: 'Engine 45 · HIIT', category: 'HIIT', day: 'Monday', time: '12:30', timeBlock: 'Midday', duration: '45 min', trainerId: 'tr-6', trainerName: 'Tara Menon', totalSlots: 16, availableSlots: 7, studioZone: 'Cardio Zone' },
  { id: 'sch-3', classId: 'cls-3', className: 'Turf Athletics', category: 'Functional', day: 'Monday', time: '18:30', timeBlock: 'Evening', duration: '50 min', trainerId: 'tr-3', trainerName: 'Rohan Kulkarni', totalSlots: 14, availableSlots: 3, studioZone: 'Functional Turf' },

  { id: 'sch-4', classId: 'cls-4', className: 'Hypertrophy Lab', category: 'Weight Training', day: 'Tuesday', time: '07:00', timeBlock: 'Morning', duration: '55 min', trainerId: 'tr-5', trainerName: 'Kabir Malhotra', totalSlots: 12, availableSlots: 5, studioZone: 'Free Weights' },
  { id: 'sch-5', classId: 'cls-7', className: 'Kinetic Mobility & Breath', category: 'Mobility & Recovery', day: 'Tuesday', time: '13:00', timeBlock: 'Midday', duration: '50 min', trainerId: 'tr-2', trainerName: 'Meera Krishnan', totalSlots: 12, availableSlots: 6, studioZone: 'Recovery Studio' },
  { id: 'sch-6', classId: 'cls-5', className: 'Hybrid Cross', category: 'Cross Training', day: 'Tuesday', time: '19:00', timeBlock: 'Evening', duration: '60 min', trainerId: 'tr-3', trainerName: 'Rohan Kulkarni', totalSlots: 14, availableSlots: 2, studioZone: 'Strength Zone' },

  { id: 'sch-7', classId: 'cls-6', className: 'Threshold Erg', category: 'Cardio', day: 'Wednesday', time: '06:30', timeBlock: 'Morning', duration: '50 min', trainerId: 'tr-6', trainerName: 'Tara Menon', totalSlots: 16, availableSlots: 8, studioZone: 'Cardio Zone' },
  { id: 'sch-8', classId: 'cls-1', className: 'Forge Barbell Club', category: 'Strength', day: 'Wednesday', time: '18:00', timeBlock: 'Evening', duration: '60 min', trainerId: 'tr-1', trainerName: 'Vikram Deshmukh', totalSlots: 12, availableSlots: 3, studioZone: 'Strength Zone' },
  { id: 'sch-9', classId: 'cls-7', className: 'Kinetic Mobility & Breath', category: 'Mobility & Recovery', day: 'Wednesday', time: '19:30', timeBlock: 'Evening', duration: '50 min', trainerId: 'tr-2', trainerName: 'Meera Krishnan', totalSlots: 12, availableSlots: 4, studioZone: 'Recovery Studio' },

  { id: 'sch-10', classId: 'cls-3', className: 'Turf Athletics', category: 'Functional', day: 'Thursday', time: '07:00', timeBlock: 'Morning', duration: '50 min', trainerId: 'tr-3', trainerName: 'Rohan Kulkarni', totalSlots: 14, availableSlots: 6, studioZone: 'Functional Turf' },
  { id: 'sch-11', classId: 'cls-2', className: 'Engine 45 · HIIT', category: 'HIIT', day: 'Thursday', time: '12:30', timeBlock: 'Midday', duration: '45 min', trainerId: 'tr-6', trainerName: 'Tara Menon', totalSlots: 16, availableSlots: 5, studioZone: 'Cardio Zone' },
  { id: 'sch-12', classId: 'cls-4', className: 'Hypertrophy Lab', category: 'Weight Training', day: 'Thursday', time: '18:30', timeBlock: 'Evening', duration: '55 min', trainerId: 'tr-5', trainerName: 'Kabir Malhotra', totalSlots: 12, availableSlots: 4, studioZone: 'Free Weights' },

  { id: 'sch-13', classId: 'cls-1', className: 'Forge Barbell Club', category: 'Strength', day: 'Friday', time: '06:30', timeBlock: 'Morning', duration: '60 min', trainerId: 'tr-1', trainerName: 'Vikram Deshmukh', totalSlots: 12, availableSlots: 5, studioZone: 'Strength Zone' },
  { id: 'sch-14', classId: 'cls-5', className: 'Hybrid Cross', category: 'Cross Training', day: 'Friday', time: '17:30', timeBlock: 'Evening', duration: '60 min', trainerId: 'tr-3', trainerName: 'Rohan Kulkarni', totalSlots: 14, availableSlots: 4, studioZone: 'Strength Zone' },
  { id: 'sch-15', classId: 'cls-7', className: 'Kinetic Mobility & Breath', category: 'Mobility & Recovery', day: 'Friday', time: '19:00', timeBlock: 'Evening', duration: '50 min', trainerId: 'tr-2', trainerName: 'Meera Krishnan', totalSlots: 12, availableSlots: 7, studioZone: 'Recovery Studio' },

  { id: 'sch-16', classId: 'cls-5', className: 'Hybrid Cross', category: 'Cross Training', day: 'Saturday', time: '08:00', timeBlock: 'Morning', duration: '60 min', trainerId: 'tr-3', trainerName: 'Rohan Kulkarni', totalSlots: 14, availableSlots: 2, studioZone: 'Functional Turf' },
  { id: 'sch-17', classId: 'cls-2', className: 'Engine 45 · HIIT', category: 'HIIT', day: 'Saturday', time: '10:00', timeBlock: 'Morning', duration: '45 min', trainerId: 'tr-6', trainerName: 'Tara Menon', totalSlots: 16, availableSlots: 6, studioZone: 'Cardio Zone' },
  { id: 'sch-18', classId: 'cls-4', className: 'Hypertrophy Lab', category: 'Weight Training', day: 'Saturday', time: '16:30', timeBlock: 'Evening', duration: '55 min', trainerId: 'tr-5', trainerName: 'Kabir Malhotra', totalSlots: 12, availableSlots: 5, studioZone: 'Free Weights' },

  { id: 'sch-19', classId: 'cls-6', className: 'Threshold Erg', category: 'Cardio', day: 'Sunday', time: '08:30', timeBlock: 'Morning', duration: '50 min', trainerId: 'tr-6', trainerName: 'Tara Menon', totalSlots: 16, availableSlots: 9, studioZone: 'Cardio Zone' },
  { id: 'sch-20', classId: 'cls-7', className: 'Kinetic Mobility & Breath', category: 'Mobility & Recovery', day: 'Sunday', time: '10:30', timeBlock: 'Morning', duration: '50 min', trainerId: 'tr-2', trainerName: 'Meera Krishnan', totalSlots: 12, availableSlots: 3, studioZone: 'Recovery Studio' },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-essential',
    tier: 'Essential',
    audience: 'For disciplined independent lifters',
    monthlyPriceInr: 3900,
    annualMonthlyPriceInr: 3315,
    description:
      'Full access to the Strength Zone, Free Weights bay, Cardio floor, and luxury locker facilities.',
    accessPrivileges: 'All-day floor access (05:00 – 22:30)',
    classAccess: '2 Group Classes / Month',
    personalTraining: 'Initial 60-min Movement Screen',
    recoveryAccess: 'Sauna & Stretching Deck',
    features: [
      'Full Strength, Free Weights & Cardio floor access',
      '2 monthly group training classes included',
      '60-minute onboarding movement assessment',
      'Digital workout log inside Member Portal',
      'Keyless lockers & eucalyptus towel service',
    ],
  },
  {
    id: 'plan-performance',
    tier: 'Performance',
    audience: 'For athletes training with coached structure',
    monthlyPriceInr: 6400,
    annualMonthlyPriceInr: 5440,
    featured: true,
    description:
      'Unlimited coach-led group classes across Barbell Club, HIIT, Turf Athletics, and Mobility plus recovery suite access.',
    accessPrivileges: 'Priority 05:00 – 22:30 Access + Guest Passes (2/mo)',
    classAccess: 'Unlimited Group Classes (All Disciplines)',
    personalTraining: '1 Monthly 1-on-1 Coaching Check-In',
    recoveryAccess: 'Unlimited Infrared Sauna & Cold Plunge',
    features: [
      'Unlimited access to all 7 group training disciplines',
      '1 monthly 1-on-1 programming & form check-in',
      'Full Recovery Area: Infrared Sauna & Cold Plunge',
      'Priority 14-day advance class booking window',
      'Quarterly strength & endurance benchmark testing',
    ],
  },
  {
    id: 'plan-elite',
    tier: 'Elite',
    audience: 'For executives & athletes demanding 1-on-1 mastery',
    monthlyPriceInr: 11500,
    annualMonthlyPriceInr: 9775,
    description:
      'Everything in Performance plus dedicated Personal Training sessions, bespoke nutrition strategy, and private studio access.',
    accessPrivileges: 'All-Zone VIP Access + Private Locker Option',
    classAccess: 'Unlimited Classes + Guaranteed Spot Hold',
    personalTraining: '4 Private 1-on-1 Sessions / Month',
    recoveryAccess: 'Unlimited Contrast Therapy + Compression Boots',
    features: [
      '4 Private 1-on-1 Personal Training sessions monthly',
      'Dedicated Nutrition & Recovery Coach consultation',
      'Full Recovery Suite including pneumatic compression',
      'Custom travel & hotel training program updates',
      '4 guest passes per month + laundry locker service',
    ],
  },
];

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    memberName: 'Arjun Subramanian',
    roleOrProfession: 'Product Architect · Member for 14 Months',
    tenure: '14 Months',
    programFocus: 'Forge Barbell Club + Mobility',
    metricHighlight: 'Deadlift 90 kg -> 165 kg · Pain-Free Desk Posture',
    quote:
      'Before Forge, I bounced between crowded gyms with zero direction. Fourteen months of structured barbell cycles and mobility work changed how I carry myself at work and on weekend treks.',
    image: CLUB_IMAGES.heroAthlete,
  },
  {
    id: 'story-2',
    memberName: 'Nandini Rao',
    roleOrProfession: 'Architectural Partner · Member for 11 Months',
    tenure: '11 Months',
    programFocus: 'Turf Athletics + Threshold Erg',
    metricHighlight: 'Half-Marathon 2:14 -> 1:52 · 4 Weekly Sessions',
    quote:
      'The coaches respect your time and track every progression. Combining twice-weekly strength sessions with Threshold Erg improved my running economy without a single knee flare-up.',
    image: CLUB_IMAGES.hiitTurf,
  },
  {
    id: 'story-3',
    memberName: 'Siddharth Verma',
    roleOrProfession: 'Founder & Triathlete · Member for 18 Months',
    tenure: '18 Months',
    programFocus: 'Elite 1-on-1 Coaching + Recovery Suite',
    metricHighlight: 'Consistent 06:00 Schedule · 94% Session Adherence',
    quote:
      'Having a dedicated coach adjust loads around travel weeks kept me training consistently for 18 straight months. The contrast recovery suite makes 6 AM sessions something I actually look forward to.',
    image: CLUB_IMAGES.recoverySanctuary,
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'progressive-overload-without-ego',
    title: 'Progressive Overload Without Ego: Structuring 12-Week Strength Cycles',
    category: 'Strength',
    author: 'Vikram Deshmukh',
    authorRole: 'Head of Strength',
    publishedDate: 'November 12, 2026',
    readTime: '5 min read',
    excerpt:
      'Why adding weight every single week stalls novice and intermediate lifters—and how wave loading builds lasting barbell strength.',
    image: CLUB_IMAGES.heroAthlete,
    sections: [
      {
        heading: 'Why Linear Progression Eventually Plateaus',
        body: 'During your first 8 to 12 weeks under a barbell, neural efficiency improves rapidly. Eventually, connective tissue and systemic fatigue catch up. Trying to force personal records every Monday leads to technical breakdown rather than adaptation.',
      },
      {
        heading: 'The Forge 3-Phase Wave Structure',
        body: 'At Forge Athletics, we organize 12-week strength blocks into Accumulation (moderate weight, crisp bar speed, 6–8 reps), Intensification (heavier triples and fives at RPE 8), and Peak Realization, followed by a strategic deload week.',
      },
      {
        heading: 'Measuring Quality Beyond Kilos on the Bar',
        body: 'Bar velocity, pause control, and consistent depth matter just as much as the final number. Logging RPE alongside load inside your training journal keeps progression objective.',
      },
    ],
    keyTakeaways: [
      'Track Rate of Perceived Exertion (RPE 7–9) instead of training to failure every set.',
      'Rotate rep ranges every 4 weeks to protect tendons and sustain momentum.',
      'Pair primary barbell days with 10 minutes of thoracic and hip prep.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'contrast-therapy-timing-for-lifters',
    title: 'Sauna & Cold Plunge Timing: When Contrast Therapy Helps—or Blunts—Adaptation',
    category: 'Recovery',
    author: 'Meera Krishnan',
    authorRole: 'Lead Mobility & Recovery Coach',
    publishedDate: 'November 04, 2026',
    readTime: '6 min read',
    excerpt:
      'Cold immersion immediately after hypertrophy training can dampen muscle signaling. Here is how to schedule thermal recovery wisely.',
    image: CLUB_IMAGES.recoverySanctuary,
    sections: [
      {
        heading: 'Understanding the Inflammation Signal',
        body: 'Heavy resistance training relies on an acute inflammatory cascade to trigger muscular repair. Plunging into 6°C water within 30 minutes of a hypertrophy block can blunt that adaptive signal.',
      },
      {
        heading: 'Optimal Placement in Your Training Week',
        body: 'Use cold immersion on dedicated conditioning days, rest days, or at least 4 hours separated from heavy lifting. Reserve post-lifting evenings for 15–20 minutes in the cedar infrared sauna to support circulation and sleep onset.',
      },
    ],
    keyTakeaways: [
      'Separate cold plunge sessions from hypertrophy workouts by at least 4 hours.',
      'Infrared sauna post-training supports relaxation without blunting strength signaling.',
      'Pair 2 minutes cold / 12 minutes heat on dedicated Sunday recovery blocks.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'protein-timing-for-morning-athletes',
    title: 'Fueling 06:00 Training Sessions: Practical Nutrition Without Complexity',
    category: 'Nutrition',
    author: 'Ananya Nair',
    authorRole: 'Performance Nutrition Coach',
    publishedDate: 'October 26, 2026',
    readTime: '4 min read',
    excerpt:
      'What to eat before dawn barbell sessions, how to hit daily protein targets with whole Indian meals, and smart electrolyte hydration.',
    image: CLUB_IMAGES.coachFemale,
    sections: [
      {
        heading: 'The Early-Morning Fueling Dilemma',
        body: 'Training at 06:00 does not require a heavy meal 90 minutes beforehand. A light 20–30g fast-digesting carbohydrate source—such as a banana or soaked dates with black coffee—primes glycogen without stomach discomfort.',
      },
      {
        heading: 'Post-Session Anchors',
        body: 'Anchor breakfast within 60 minutes of finishing your session with 30–40g of high-quality protein—eggs, paneer bhurji, Greek yogurt, or whey paired with complex grains—to stabilize energy through the workday.',
      },
    ],
    keyTakeaways: [
      'Prioritize hydration (500 ml water + pinch of sea salt) immediately upon waking.',
      'Aim for 1.6–2.0 g protein per kg of bodyweight distributed across 3–4 meals.',
      'Keep pre-dawn snacks light and carbohydrate-focused.',
    ],
  },
  {
    id: 'blog-4',
    slug: 'zone-two-engine-for-strength-athletes',
    title: 'Why Every Lifter Needs a Zone 2 Aerobic Engine',
    category: 'Conditioning',
    author: 'Tara Menon',
    authorRole: 'HIIT & Conditioning Coach',
    publishedDate: 'October 14, 2026',
    readTime: '5 min read',
    excerpt:
      'Better aerobic recovery between heavy squat sets means higher total volume and lower resting heart rate.',
    image: CLUB_IMAGES.hiitTurf,
    sections: [
      {
        heading: 'Recovery Between Sets Is Aerobic',
        body: 'While a heavy set of five squats is anaerobic, replenishing phosphocreatine during your 2-minute rest interval is powered by your aerobic system. Better aerobic fitness lets you sustain crisp output across every working set.',
      },
      {
        heading: 'The 2x35 Protocol',
        body: 'Adding two 35-minute Zone 2 sessions weekly on the BikeErg or curved treadmill (conversational pace, nasal breathing) builds capillary density without adding systemic fatigue.',
      },
    ],
    keyTakeaways: [
      'Keep Zone 2 heart rate around 65–75% of max—you should be able to speak in full sentences.',
      'Use non-eccentric ergometers like BikeErg to spare leg soreness before squat days.',
    ],
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Strength Hall',
    category: 'Architecture',
    caption: 'Twelve competition power racks under overhead architectural spotting.',
    image: CLUB_IMAGES.strengthZone,
  },
  {
    id: 'gal-2',
    title: 'Barbell Execution',
    category: 'Strength',
    caption: 'Morning Forge Barbell Club working sets at 85% 1RM.',
    image: CLUB_IMAGES.heroAthlete,
  },
  {
    id: 'gal-3',
    title: '40m Turf Sled Track',
    category: 'Conditioning',
    caption: 'Heavy prowler pushes and Concept2 SkiErg intervals during Engine 45.',
    image: CLUB_IMAGES.hiitTurf,
  },
  {
    id: 'gal-4',
    title: 'Cedar Recovery Sanctuary',
    category: 'Recovery',
    caption: 'Slate stone mobility deck beside our full-spectrum infrared cedar sauna.',
    image: CLUB_IMAGES.recoverySanctuary,
  },
  {
    id: 'gal-5',
    title: 'Head Coach Assessment',
    category: 'Strength',
    caption: 'Individualized 1-on-1 biomechanical movement screening.',
    image: CLUB_IMAGES.coachMale,
  },
  {
    id: 'gal-6',
    title: 'Mobility & Core Precision',
    category: 'Recovery',
    caption: 'Daylight studio floor built for controlled articular mobility.',
    image: CLUB_IMAGES.coachFemale,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Free Trial',
    question: 'What happens during the complimentary Free Trial session?',
    answer:
      'Your first visit includes a 15-minute tour of all seven club zones, a movement and goal conversation with one of our coaches, and either a guided 1-on-1 strength intro or access to a scheduled group class matched to your experience level.',
  },
  {
    id: 'faq-2',
    category: 'Free Trial',
    question: 'Do I need prior barbell or gym experience to join Forge Athletics?',
    answer:
      'Not at all. Every new member receives an onboarding movement assessment regardless of plan tier. Coaches scale loads, regressions, and class intensities so beginners build clean habits from day one.',
  },
  {
    id: 'faq-3',
    category: 'Membership',
    question: 'Are the INR prices shown on the website final or illustrative?',
    answer:
      'The membership tiers and INR pricing displayed in this commercial showcase are illustrative demo rates designed to demonstrate transparent club tier comparisons and annual billing toggles.',
  },
  {
    id: 'faq-4',
    category: 'Membership',
    question: 'Can I freeze my membership when traveling for work?',
    answer:
      'Yes. Performance and Elite members can pause memberships for up to 30 days per year in 7-day increments directly through Member Concierge or the Member Dashboard.',
  },
  {
    id: 'faq-5',
    category: 'Training',
    question: 'How far in advance can I reserve spots in group classes?',
    answer:
      'Essential members can book 7 days ahead (up to 2 classes/month), while Performance and Elite members enjoy a 14-day priority booking window with automated waitlist notifications.',
  },
  {
    id: 'faq-6',
    category: 'Training',
    question: 'What is the maximum class size?',
    answer:
      'Strength and Mobility classes are strictly capped at 12 athletes; Turf and Erg conditioning sessions are capped at 14–16 athletes so coaches can give every participant individual feedback.',
  },
  {
    id: 'faq-7',
    category: 'Facilities',
    question: 'Are towels, showers, and lockers included?',
    answer:
      'Yes. Keyless smart lockers, private slate rainfall showers, botanical wash amenities, and chilled eucalyptus towels are included across all membership tiers.',
  },
  {
    id: 'faq-8',
    category: 'Facilities',
    question: 'Is dedicated parking available at the Indiranagar flagship?',
    answer:
      'Yes. Complimentary basement valet parking for cars and two-wheelers is available for all members during club operating hours (05:00 – 22:30).',
  },
];

export const INITIAL_ROLES: RolePermissionMatrix[] = [
  {
    role: 'Super Admin',
    members: true,
    plansAndPayments: true,
    schedulesAndClasses: true,
    leadsAndEnquiries: true,
    siteContentAndGallery: true,
  },
  {
    role: 'Club Manager',
    members: true,
    plansAndPayments: true,
    schedulesAndClasses: true,
    leadsAndEnquiries: true,
    siteContentAndGallery: false,
  },
  {
    role: 'Head Coach',
    members: false,
    plansAndPayments: false,
    schedulesAndClasses: true,
    leadsAndEnquiries: false,
    siteContentAndGallery: true,
  },
];

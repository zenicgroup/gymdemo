import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';
import {
  DEFAULT_SITE_CONTENT,
  GYM_CLASSES,
  INITIAL_GALLERY,
  INITIAL_ROLES,
  INITIAL_SCHEDULE,
  MEMBERSHIP_PLANS,
  TRAINERS,
} from './src/data/clubData.ts';
import type {
  BookingRecord,
  EnquiryRecord,
  FitnessGoal,
  FreeTrialLead,
  GalleryItem,
  GymClass,
  MemberNotification,
  MemberRecord,
  MembershipPlan,
  PaymentRecord,
  RolePermissionMatrix,
  ScheduleSlot,
  SiteContent,
  TrainerProfile,
  UserRole,
  WorkoutDayPlan,
} from './src/types/forge.ts';

dotenv.config();

interface StoredCredential {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  salt: string;
  passwordHash: string;
}

interface ForgeDatabase {
  siteContent: SiteContent;
  plans: MembershipPlan[];
  trainers: TrainerProfile[];
  classes: GymClass[];
  schedules: ScheduleSlot[];
  gallery: GalleryItem[];
  members: MemberRecord[];
  credentials: StoredCredential[];
  adminCredential: StoredCredential | null;
  bookings: BookingRecord[];
  leads: FreeTrialLead[];
  enquiries: EnquiryRecord[];
  payments: PaymentRecord[];
  goals: FitnessGoal[];
  notifications: MemberNotification[];
  newsletter: { email: string; subscribedAt: string }[];
  roles: RolePermissionMatrix[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'forge_db.json');
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

const DEFAULT_WORKOUT_PLAN: WorkoutDayPlan[] = [
  {
    day: 'Monday · Lower Strength',
    focus: 'Back Squat & Posterior Chain',
    exercises: [
      { name: 'Back Squat (Tempo 3-1-X-0)', setsReps: '4 × 5', rpe: 'RPE 8' },
      { name: 'Romanian Deadlift', setsReps: '3 × 8', rpe: 'RPE 7.5' },
      { name: 'Bulgarian Split Squat', setsReps: '3 × 10 / leg', rpe: 'RPE 8' },
      { name: 'Hanging Knee Raise', setsReps: '3 × 12', rpe: 'RPE 7' },
    ],
  },
  {
    day: 'Wednesday · Upper Force',
    focus: 'Horizontal Press & Scapular Pull',
    exercises: [
      { name: 'Barbell Bench Press', setsReps: '4 × 6', rpe: 'RPE 8' },
      { name: 'Weighted Chest-Supported Row', setsReps: '4 × 8', rpe: 'RPE 8' },
      { name: 'Single-Arm Landmine Press', setsReps: '3 × 10 / arm', rpe: 'RPE 7.5' },
      { name: 'Face Pull & External Rotation', setsReps: '3 × 15', rpe: 'RPE 7' },
    ],
  },
  {
    day: 'Friday · Conditioning & Power',
    focus: 'Turf Sleds & Erg Intervals',
    exercises: [
      { name: 'Heavy Prowler Sled Push', setsReps: '6 × 25m', rpe: 'RPE 8.5' },
      { name: 'Kettlebell Goblet Carry', setsReps: '4 × 40m', rpe: 'RPE 8' },
      { name: 'Concept2 SkiErg Intervals', setsReps: '5 × 250m', rpe: 'RPE 8.5' },
    ],
  },
  {
    day: 'Saturday · Mobility & Zone 2',
    focus: 'Articular Control & Aerobic Base',
    exercises: [
      { name: 'BikeErg Steady Zone 2', setsReps: '35 min', rpe: 'RPE 6' },
      { name: '90/90 Hip Capsule Rotations', setsReps: '3 × 8 / side', rpe: 'Control' },
      { name: 'Cedar Sauna + Cold Plunge', setsReps: '15 min + 2 min', rpe: 'Recovery' },
    ],
  },
];

function createSeedDatabase(): ForgeDatabase {
  const now = new Date();
  const nextYear = new Date(now);
  nextYear.setFullYear(now.getFullYear() + 1);

  return {
    siteContent: { ...DEFAULT_SITE_CONTENT },
    plans: [...MEMBERSHIP_PLANS],
    trainers: [...TRAINERS],
    classes: [...GYM_CLASSES],
    schedules: [...INITIAL_SCHEDULE],
    gallery: [...INITIAL_GALLERY],
    members: [
      {
        id: 'mem-101',
        name: 'Arjun Subramanian',
        email: 'arjun.s@example.in',
        phone: '+91 98450 11223',
        role: 'member',
        planTier: 'Performance',
        billingCycle: 'Annual',
        status: 'Active',
        joinedAt: '2025-09-14',
        expiryDate: '2026-09-14',
        assignedTrainerId: 'tr-1',
        trainingFocus: 'Barbell Strength & Thoracic Mobility',
        emergencyContact: 'Priya Subramanian · +91 98450 11224',
      },
      {
        id: 'mem-102',
        name: 'Nandini Rao',
        email: 'nandini.rao@example.in',
        phone: '+91 98801 44556',
        role: 'member',
        planTier: 'Elite',
        billingCycle: 'Monthly',
        status: 'Active',
        joinedAt: '2025-12-02',
        expiryDate: '2026-12-02',
        assignedTrainerId: 'tr-3',
        trainingFocus: 'Hybrid Endurance & Turf Conditioning',
        emergencyContact: 'Karthik Rao · +91 98801 44557',
      },
      {
        id: 'mem-103',
        name: 'Siddharth Verma',
        email: 'siddharth.v@example.in',
        phone: '+91 99002 77889',
        role: 'member',
        planTier: 'Essential',
        billingCycle: 'Monthly',
        status: 'Active',
        joinedAt: '2026-02-18',
        expiryDate: '2027-02-18',
        assignedTrainerId: 'tr-5',
        trainingFocus: 'Hypertrophy & Posture Foundations',
        emergencyContact: 'Megha Verma · +91 99002 77880',
      },
    ],
    credentials: [],
    adminCredential: null,
    bookings: [
      {
        id: 'bk-1',
        userId: 'mem-101',
        userName: 'Arjun Subramanian',
        userEmail: 'arjun.s@example.in',
        scheduleId: 'sch-1',
        className: 'Forge Barbell Club',
        day: 'Monday',
        time: '06:30',
        trainerName: 'Vikram Deshmukh',
        studioZone: 'Strength Zone',
        status: 'Confirmed',
        bookedAt: now.toISOString(),
      },
      {
        id: 'bk-2',
        userId: 'mem-102',
        userName: 'Nandini Rao',
        userEmail: 'nandini.rao@example.in',
        scheduleId: 'sch-3',
        className: 'Turf Athletics',
        day: 'Monday',
        time: '18:30',
        trainerName: 'Rohan Kulkarni',
        studioZone: 'Functional Turf',
        status: 'Confirmed',
        bookedAt: now.toISOString(),
      },
    ],
    leads: [
      {
        id: 'lead-1',
        name: 'Devika Menon',
        phone: '+91 98451 66712',
        email: 'devika.m@example.in',
        preferredTraining: 'Strength Training',
        preferredDate: '2026-11-26',
        status: 'Scheduled',
        createdAt: now.toISOString(),
      },
      {
        id: 'lead-2',
        name: 'Pranav Joshi',
        phone: '+91 97400 88210',
        email: 'pranav.j@example.in',
        preferredTraining: 'Personal Training',
        preferredDate: '2026-11-28',
        status: 'New',
        createdAt: now.toISOString(),
      },
    ],
    enquiries: [
      {
        id: 'enq-1',
        type: 'Membership',
        name: 'Rhea Kapoor',
        email: 'rhea.k@example.in',
        phone: '+91 98204 55110',
        subject: 'Corporate Performance Tier Enquiry',
        planInterest: 'Performance',
        message: 'Looking for 4 founding Performance memberships for our design studio leadership team.',
        status: 'Open',
        createdAt: now.toISOString(),
      },
    ],
    payments: [
      {
        id: 'pay-101',
        memberId: 'mem-101',
        memberName: 'Arjun Subramanian',
        planTier: 'Performance',
        billingCycle: 'Annual',
        amountInr: 65280,
        status: 'Paid',
        paidDate: '2026-11-01',
      },
      {
        id: 'pay-102',
        memberId: 'mem-102',
        memberName: 'Nandini Rao',
        planTier: 'Elite',
        billingCycle: 'Monthly',
        amountInr: 11500,
        status: 'Paid',
        paidDate: '2026-11-05',
      },
      {
        id: 'pay-103',
        memberId: 'mem-103',
        memberName: 'Siddharth Verma',
        planTier: 'Essential',
        billingCycle: 'Monthly',
        amountInr: 3900,
        status: 'Pending',
        paidDate: '2026-11-20',
      },
    ],
    goals: [],
    notifications: [],
    newsletter: [],
    roles: [...INITIAL_ROLES],
  };
}

function loadDatabase(): ForgeDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf-8');
    return seed;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<ForgeDatabase>;
    const seed = createSeedDatabase();
    return {
      ...seed,
      ...parsed,
      siteContent: { ...seed.siteContent, ...(parsed.siteContent || {}) },
    };
  } catch {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2), 'utf-8');
    return seed;
  }
}

let db = loadDatabase();

function saveDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

function hashPassword(password: string, existingSalt?: string): { salt: string; hash: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expectedHash, 'hex');
  if (derived.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derived, expectedBuf);
}

interface SessionPayload {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  exp: number;
}

function signToken(payload: Omit<SessionPayload, 'exp'>): string {
  const fullPayload: SessionPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };
  const encoded = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

function verifyToken(token: string): SessionPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(encoded).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8')) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

interface AuthenticatedRequest extends Request {
  user?: SessionPayload;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }
  const token = header.slice('Bearer '.length).trim();
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
    return;
  }
  req.user = payload;
  next();
}

function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required.' });
      return;
    }
    next();
  });
}

function isNonEmptyString(val: unknown, maxLen = 400): val is string {
  return typeof val === 'string' && val.trim().length > 0 && val.trim().length <= maxLen;
}

function isValidEmail(val: unknown): val is string {
  return typeof val === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) && val.trim().length <= 160;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // --- Public Club Bootstrap ---
  app.get('/api/public/bootstrap', (_req, res) => {
    res.json({
      siteContent: db.siteContent,
      plans: db.plans,
      trainers: db.trainers,
      classes: db.classes,
      schedules: db.schedules,
      gallery: db.gallery,
    });
  });

  // --- Lead, Enquiry & Newsletter Submissions ---
  app.post('/api/leads/free-trial', (req, res) => {
    const { name, phone, email, preferredTraining, preferredDate } = req.body || {};
    if (!isNonEmptyString(name, 100) || !isNonEmptyString(phone, 30) || !isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid name, phone number, and email address.' });
      return;
    }
    if (!isNonEmptyString(preferredTraining, 100) || !isNonEmptyString(preferredDate, 40)) {
      res.status(400).json({ error: 'Please select your preferred training focus and visit date.' });
      return;
    }

    const newLead: FreeTrialLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      preferredTraining: preferredTraining.trim(),
      preferredDate: preferredDate.trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    db.leads.unshift(newLead);
    saveDatabase();
    res.status(201).json({ lead: newLead, message: 'Your complimentary trial session request has been registered.' });
  });

  app.post('/api/enquiries', (req, res) => {
    const { type, name, email, phone, subject, planInterest, message } = req.body || {};
    if (!isNonEmptyString(name, 100) || !isValidEmail(email) || !isNonEmptyString(message, 1500)) {
      res.status(400).json({ error: 'Please provide your name, a valid email, and a message.' });
      return;
    }

    const enquiry: EnquiryRecord = {
      id: `enq-${Date.now()}`,
      type: type === 'Membership' ? 'Membership' : 'Contact',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === 'string' ? phone.trim().slice(0, 30) : '',
      subject: isNonEmptyString(subject, 160) ? subject.trim() : 'General Club Enquiry',
      planInterest: typeof planInterest === 'string' ? planInterest.trim().slice(0, 60) : undefined,
      message: message.trim(),
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    db.enquiries.unshift(enquiry);
    saveDatabase();
    res.status(201).json({ enquiry, message: 'Enquiry received. Our concierge team will respond within 1 business day.' });
  });

  app.post('/api/newsletter', (req, res) => {
    const { email } = req.body || {};
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    const normalized = email.trim().toLowerCase();
    const exists = db.newsletter.some((n) => n.email === normalized);
    if (!exists) {
      db.newsletter.push({ email: normalized, subscribedAt: new Date().toISOString() });
      saveDatabase();
    }
    res.status(201).json({ message: 'Subscribed to Forge Athletics dispatches.' });
  });

  // --- Auth Endpoints ---
  app.get('/api/auth/admin-status', (_req, res) => {
    const envPasscode = (process.env.ADMIN_PASSCODE || '').trim();
    res.json({
      configured: Boolean(envPasscode || db.adminCredential),
      envConfigured: Boolean(envPasscode),
    });
  });

  app.post('/api/auth/admin-claim', (req, res) => {
    const envPasscode = (process.env.ADMIN_PASSCODE || '').trim();
    if (envPasscode || db.adminCredential) {
      res.status(409).json({ error: 'Admin access has already been configured.' });
      return;
    }
    const { email, name, password } = req.body || {};
    if (!isValidEmail(email) || !isNonEmptyString(name, 80) || !isNonEmptyString(password, 128) || password.length < 8) {
      res.status(400).json({ error: 'Provide a valid admin email, name, and password (minimum 8 characters).' });
      return;
    }
    const { salt, hash } = hashPassword(password);
    const adminCred: StoredCredential = {
      id: 'admin-root',
      email: email.trim().toLowerCase(),
      name: name.trim(),
      role: 'admin',
      salt,
      passwordHash: hash,
    };
    db.adminCredential = adminCred;
    saveDatabase();

    const token = signToken({
      uid: adminCred.id,
      email: adminCred.email,
      name: adminCred.name,
      role: 'admin',
    });
    res.status(201).json({
      token,
      user: { id: adminCred.id, email: adminCred.email, name: adminCred.name, role: 'admin' },
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, password, planTier, billingCycle } = req.body || {};
    if (!isNonEmptyString(name, 80) || !isValidEmail(email) || !isNonEmptyString(password, 128) || password.length < 6) {
      res.status(400).json({ error: 'Provide your full name, valid email, and a password of at least 6 characters.' });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (db.credentials.some((c) => c.email === normalizedEmail)) {
      res.status(409).json({ error: 'An account with this email already exists. Please sign in instead.' });
      return;
    }

    const tier: 'Essential' | 'Performance' | 'Elite' =
      planTier === 'Essential' || planTier === 'Elite' ? planTier : 'Performance';
    const cycle: 'Monthly' | 'Annual' = billingCycle === 'Annual' ? 'Annual' : 'Monthly';
    const userId = `mem-${Date.now()}`;
    const { salt, hash } = hashPassword(password);

    const cred: StoredCredential = {
      id: userId,
      email: normalizedEmail,
      name: name.trim(),
      role: 'member',
      salt,
      passwordHash: hash,
    };
    db.credentials.push(cred);

    const now = new Date();
    const expiry = new Date(now);
    expiry.setMonth(expiry.getMonth() + (cycle === 'Annual' ? 12 : 1));

    const newMember: MemberRecord = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      phone: isNonEmptyString(phone, 30) ? phone.trim() : '+91 98000 00000',
      role: 'member',
      planTier: tier,
      billingCycle: cycle,
      status: 'Active',
      joinedAt: now.toISOString().slice(0, 10),
      expiryDate: expiry.toISOString().slice(0, 10),
      assignedTrainerId: 'tr-1',
      trainingFocus: 'Strength & Metabolic Conditioning',
      emergencyContact: 'Update in Profile',
    };
    db.members.unshift(newMember);

    const matchedPlan = db.plans.find((p) => p.tier === tier) || db.plans[1];
    const amountInr =
      cycle === 'Annual' ? matchedPlan.annualMonthlyPriceInr * 12 : matchedPlan.monthlyPriceInr;

    db.payments.unshift({
      id: `pay-${Date.now()}`,
      memberId: userId,
      memberName: newMember.name,
      planTier: tier,
      billingCycle: cycle,
      amountInr,
      status: 'Paid',
      paidDate: now.toISOString().slice(0, 10),
    });

    db.goals.push(
      {
        id: `goal-${Date.now()}-1`,
        userId,
        title: 'Barbell Back Squat Target',
        currentValue: '75 kg',
        targetValue: '100 kg',
        progressPercent: 75,
        updatedAt: now.toISOString(),
      },
      {
        id: `goal-${Date.now()}-2`,
        userId,
        title: 'Monthly Coaching Attendance',
        currentValue: '9 sessions',
        targetValue: '16 sessions',
        progressPercent: 56,
        updatedAt: now.toISOString(),
      }
    );

    db.notifications.push({
      id: `notif-${Date.now()}`,
      userId,
      title: 'Welcome to Forge Athletics',
      message: `Your ${tier} (${cycle}) pass is active. Book your onboarding assessment or first class from the schedule.`,
      createdAt: now.toISOString(),
      read: false,
    });

    saveDatabase();

    const token = signToken({
      uid: userId,
      email: normalizedEmail,
      name: newMember.name,
      role: 'member',
    });
    res.status(201).json({
      token,
      user: { id: userId, email: normalizedEmail, name: newMember.name, role: 'member' },
    });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password, portal } = req.body || {};
    if (!isNonEmptyString(password, 128)) {
      res.status(400).json({ error: 'Password or passcode is required.' });
      return;
    }

    if (portal === 'admin') {
      const envPasscode = (process.env.ADMIN_PASSCODE || '').trim();
      if (envPasscode) {
        const passBuf = Buffer.from(password);
        const envBuf = Buffer.from(envPasscode);
        if (passBuf.length === envBuf.length && crypto.timingSafeEqual(passBuf, envBuf)) {
          const token = signToken({
            uid: 'admin-env',
            email: isValidEmail(email) ? email.trim().toLowerCase() : 'admin@forgeathletics.in',
            name: 'Club Director',
            role: 'admin',
          });
          res.json({
            token,
            user: {
              id: 'admin-env',
              email: isValidEmail(email) ? email.trim().toLowerCase() : 'admin@forgeathletics.in',
              name: 'Club Director',
              role: 'admin',
            },
          });
          return;
        }
        res.status(401).json({ error: 'Invalid admin passcode.' });
        return;
      }

      if (!db.adminCredential) {
        res.status(400).json({ error: 'Admin credentials have not been claimed yet.' });
        return;
      }
      if (!isValidEmail(email) || email.trim().toLowerCase() !== db.adminCredential.email) {
        res.status(401).json({ error: 'Invalid admin email or password.' });
        return;
      }
      if (!verifyPassword(password, db.adminCredential.salt, db.adminCredential.passwordHash)) {
        res.status(401).json({ error: 'Invalid admin email or password.' });
        return;
      }
      const token = signToken({
        uid: db.adminCredential.id,
        email: db.adminCredential.email,
        name: db.adminCredential.name,
        role: 'admin',
      });
      res.json({
        token,
        user: {
          id: db.adminCredential.id,
          email: db.adminCredential.email,
          name: db.adminCredential.name,
          role: 'admin',
        },
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const cred = db.credentials.find((c) => c.email === normalizedEmail);
    if (!cred || !verifyPassword(password, cred.salt, cred.passwordHash)) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = signToken({
      uid: cred.id,
      email: cred.email,
      name: cred.name,
      role: cred.role,
    });
    res.json({
      token,
      user: { id: cred.id, email: cred.email, name: cred.name, role: cred.role },
    });
  });

  app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
    res.json({ user: req.user });
  });

  // --- Member Protected Routes ---
  app.get('/api/member/dashboard', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const member = db.members.find((m) => m.id === uid);
    if (!member) {
      res.status(404).json({ error: 'Member profile not found.' });
      return;
    }
    const trainer = db.trainers.find((t) => t.id === member.assignedTrainerId) || db.trainers[0];
    const plan = db.plans.find((p) => p.tier === member.planTier) || db.plans[1];
    const bookings = db.bookings.filter((b) => b.userId === uid);
    const goals = db.goals.filter((g) => g.userId === uid);
    const notifications = db.notifications.filter((n) => n.userId === uid);
    const payments = db.payments.filter((p) => p.memberId === uid);

    res.json({
      member,
      plan,
      trainer,
      bookings,
      goals,
      notifications,
      payments,
      workoutPlan: DEFAULT_WORKOUT_PLAN,
    });
  });

  app.patch('/api/member/profile', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const member = db.members.find((m) => m.id === uid);
    if (!member) {
      res.status(404).json({ error: 'Member profile not found.' });
      return;
    }
    const { name, phone, trainingFocus, emergencyContact } = req.body || {};
    if (isNonEmptyString(name, 80)) member.name = name.trim();
    if (isNonEmptyString(phone, 30)) member.phone = phone.trim();
    if (isNonEmptyString(trainingFocus, 160)) member.trainingFocus = trainingFocus.trim();
    if (isNonEmptyString(emergencyContact, 160)) member.emergencyContact = emergencyContact.trim();
    saveDatabase();
    res.json({ member });
  });

  app.post('/api/member/bookings', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const member = db.members.find((m) => m.id === uid);
    if (!member) {
      res.status(404).json({ error: 'Member profile not found.' });
      return;
    }
    const { scheduleId } = req.body || {};
    const slot = db.schedules.find((s) => s.id === scheduleId);
    if (!slot) {
      res.status(404).json({ error: 'Selected schedule slot was not found.' });
      return;
    }
    const existingActive = db.bookings.find(
      (b) => b.userId === uid && b.scheduleId === scheduleId && b.status === 'Confirmed'
    );
    if (existingActive) {
      res.status(409).json({ error: 'You are already booked into this class.' });
      return;
    }
    if (slot.availableSlots <= 0) {
      res.status(409).json({ error: 'This class has reached maximum capacity.' });
      return;
    }

    slot.availableSlots -= 1;
    const booking: BookingRecord = {
      id: `bk-${Date.now()}`,
      userId: uid,
      userName: member.name,
      userEmail: member.email,
      scheduleId: slot.id,
      className: slot.className,
      day: slot.day,
      time: slot.time,
      trainerName: slot.trainerName,
      studioZone: slot.studioZone,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
    };
    db.bookings.unshift(booking);
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: uid,
      title: `Class Confirmed: ${slot.className}`,
      message: `Reserved for ${slot.day} at ${slot.time} with ${slot.trainerName} (${slot.studioZone}).`,
      createdAt: new Date().toISOString(),
      read: false,
    });
    saveDatabase();
    res.status(201).json({ booking, updatedSlot: slot });
  });

  app.delete('/api/member/bookings/:id', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const booking = db.bookings.find((b) => b.id === req.params.id && b.userId === uid);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found.' });
      return;
    }
    if (booking.status === 'Confirmed') {
      booking.status = 'Cancelled';
      const slot = db.schedules.find((s) => s.id === booking.scheduleId);
      if (slot && slot.availableSlots < slot.totalSlots) {
        slot.availableSlots += 1;
      }
      db.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: uid,
        title: `Booking Cancelled: ${booking.className}`,
        message: `Your ${booking.day} ${booking.time} reservation has been released.`,
        createdAt: new Date().toISOString(),
        read: false,
      });
      saveDatabase();
    }
    res.json({ booking });
  });

  app.post('/api/member/goals', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const { title, currentValue, targetValue, progressPercent } = req.body || {};
    if (!isNonEmptyString(title, 120) || !isNonEmptyString(currentValue, 60) || !isNonEmptyString(targetValue, 60)) {
      res.status(400).json({ error: 'Provide goal title, current value, and target value.' });
      return;
    }
    const pct = Math.max(0, Math.min(100, Number(progressPercent) || 0));
    const goal: FitnessGoal = {
      id: `goal-${Date.now()}`,
      userId: uid,
      title: title.trim(),
      currentValue: currentValue.trim(),
      targetValue: targetValue.trim(),
      progressPercent: pct,
      updatedAt: new Date().toISOString(),
    };
    db.goals.unshift(goal);
    saveDatabase();
    res.status(201).json({ goal });
  });

  app.patch('/api/member/goals/:id', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    const goal = db.goals.find((g) => g.id === req.params.id && g.userId === uid);
    if (!goal) {
      res.status(404).json({ error: 'Goal not found.' });
      return;
    }
    const { currentValue, progressPercent } = req.body || {};
    if (isNonEmptyString(currentValue, 60)) goal.currentValue = currentValue.trim();
    if (typeof progressPercent === 'number' && !Number.isNaN(progressPercent)) {
      goal.progressPercent = Math.max(0, Math.min(100, progressPercent));
    }
    goal.updatedAt = new Date().toISOString();
    saveDatabase();
    res.json({ goal });
  });

  app.patch('/api/member/notifications/read', requireAuth, (req: AuthenticatedRequest, res) => {
    const uid = req.user!.uid;
    for (const notif of db.notifications) {
      if (notif.userId === uid) notif.read = true;
    }
    saveDatabase();
    res.json({ ok: true });
  });

  // --- Admin Protected Routes ---
  app.get('/api/admin/overview', requireAdmin, (_req, res) => {
    res.json({
      members: db.members,
      plans: db.plans,
      payments: db.payments,
      trainers: db.trainers,
      classes: db.classes,
      schedules: db.schedules,
      bookings: db.bookings,
      leads: db.leads,
      enquiries: db.enquiries,
      siteContent: db.siteContent,
      gallery: db.gallery,
      newsletterCount: db.newsletter.length,
      roles: db.roles,
    });
  });

  app.patch('/api/admin/members/:id', requireAdmin, (req, res) => {
    const member = db.members.find((m) => m.id === req.params.id);
    if (!member) {
      res.status(404).json({ error: 'Member not found.' });
      return;
    }
    const { status, planTier, assignedTrainerId } = req.body || {};
    if (status === 'Active' || status === 'Paused' || status === 'Expired') member.status = status;
    if (planTier === 'Essential' || planTier === 'Performance' || planTier === 'Elite') member.planTier = planTier;
    if (isNonEmptyString(assignedTrainerId, 40)) member.assignedTrainerId = assignedTrainerId;
    saveDatabase();
    res.json({ member });
  });

  app.patch('/api/admin/plans/:id', requireAdmin, (req, res) => {
    const plan = db.plans.find((p) => p.id === req.params.id);
    if (!plan) {
      res.status(404).json({ error: 'Membership plan not found.' });
      return;
    }
    const { monthlyPriceInr, annualMonthlyPriceInr, description } = req.body || {};
    if (typeof monthlyPriceInr === 'number' && monthlyPriceInr > 0) plan.monthlyPriceInr = monthlyPriceInr;
    if (typeof annualMonthlyPriceInr === 'number' && annualMonthlyPriceInr > 0) {
      plan.annualMonthlyPriceInr = annualMonthlyPriceInr;
    }
    if (isNonEmptyString(description, 400)) plan.description = description.trim();
    saveDatabase();
    res.json({ plan });
  });

  app.patch('/api/admin/payments/:id', requireAdmin, (req, res) => {
    const payment = db.payments.find((p) => p.id === req.params.id);
    if (!payment) {
      res.status(404).json({ error: 'Payment record not found.' });
      return;
    }
    const { status } = req.body || {};
    if (status === 'Paid' || status === 'Pending' || status === 'Overdue') {
      payment.status = status;
    }
    saveDatabase();
    res.json({ payment });
  });

  app.post('/api/admin/trainers', requireAdmin, (req, res) => {
    const { name, roleTitle, category, experience, shortBio, availability } = req.body || {};
    if (!isNonEmptyString(name, 80) || !isNonEmptyString(roleTitle, 100) || !isNonEmptyString(shortBio, 400)) {
      res.status(400).json({ error: 'Provide trainer name, role title, and biography.' });
      return;
    }
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newTrainer: TrainerProfile = {
      id: `tr-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      roleTitle: roleTitle.trim(),
      category: category || 'Strength Coach',
      experience: isNonEmptyString(experience, 60) ? experience.trim() : '5 Years Coaching Experience',
      qualifications: ['Forge Certified Coach (Demo Profile)'],
      shortBio: shortBio.trim(),
      fullBio: shortBio.trim(),
      philosophy: 'Precision execution and sustainable progression.',
      specialties: [category || 'Strength Training'],
      image: '/src/assets/images/coach_strength_male_1795368693439.jpg',
      availability: isNonEmptyString(availability, 80) ? availability.trim() : 'Mon–Sat · 07:00 – 16:00',
    };
    db.trainers.push(newTrainer);
    saveDatabase();
    res.status(201).json({ trainer: newTrainer });
  });

  app.delete('/api/admin/trainers/:id', requireAdmin, (req, res) => {
    const idx = db.trainers.findIndex((t) => t.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Trainer not found.' });
      return;
    }
    db.trainers.splice(idx, 1);
    saveDatabase();
    res.json({ ok: true });
  });

  app.post('/api/admin/classes', requireAdmin, (req, res) => {
    const { name, category, durationMinutes, intensity, capacity, description } = req.body || {};
    if (!isNonEmptyString(name, 100) || !isNonEmptyString(description, 400)) {
      res.status(400).json({ error: 'Class name and description are required.' });
      return;
    }
    const cls: GymClass = {
      id: `cls-${Date.now()}`,
      name: name.trim(),
      category: category || 'Strength',
      durationMinutes: Number(durationMinutes) || 50,
      intensity: intensity === 'Moderate' || intensity === 'Restorative' ? intensity : 'High',
      capacity: Number(capacity) || 12,
      description: description.trim(),
      leadTrainerId: db.trainers[0]?.id || 'tr-1',
    };
    db.classes.push(cls);
    saveDatabase();
    res.status(201).json({ gymClass: cls });
  });

  app.post('/api/admin/schedules', requireAdmin, (req, res) => {
    const { className, category, day, time, duration, trainerName, totalSlots, studioZone } = req.body || {};
    if (!isNonEmptyString(className, 100) || !isNonEmptyString(day, 20) || !isNonEmptyString(time, 20)) {
      res.status(400).json({ error: 'Class name, day, and time are required.' });
      return;
    }
    const hour = parseInt(time.split(':')[0] || '8', 10);
    const timeBlock = hour < 12 ? 'Morning' : hour < 16 ? 'Midday' : 'Evening';
    const slotsCount = Math.max(4, Math.min(30, Number(totalSlots) || 12));
    const slot: ScheduleSlot = {
      id: `sch-${Date.now()}`,
      classId: `cls-${Date.now()}`,
      className: className.trim(),
      category: category || 'Strength',
      day: day as ScheduleSlot['day'],
      time: time.trim(),
      timeBlock,
      duration: isNonEmptyString(duration, 30) ? duration.trim() : '50 min',
      trainerId: 'tr-1',
      trainerName: isNonEmptyString(trainerName, 80) ? trainerName.trim() : 'Vikram Deshmukh',
      totalSlots: slotsCount,
      availableSlots: slotsCount,
      studioZone: isNonEmptyString(studioZone, 60) ? studioZone.trim() : 'Strength Zone',
    };
    db.schedules.push(slot);
    saveDatabase();
    res.status(201).json({ schedule: slot });
  });

  app.delete('/api/admin/schedules/:id', requireAdmin, (req, res) => {
    const idx = db.schedules.findIndex((s) => s.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Schedule slot not found.' });
      return;
    }
    db.schedules.splice(idx, 1);
    saveDatabase();
    res.json({ ok: true });
  });

  app.patch('/api/admin/bookings/:id', requireAdmin, (req, res) => {
    const booking = db.bookings.find((b) => b.id === req.params.id);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found.' });
      return;
    }
    const { status } = req.body || {};
    if (status === 'Confirmed' || status === 'Attended' || status === 'Cancelled') {
      booking.status = status;
    }
    saveDatabase();
    res.json({ booking });
  });

  app.patch('/api/admin/leads/:id', requireAdmin, (req, res) => {
    const lead = db.leads.find((l) => l.id === req.params.id);
    if (!lead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }
    const { status } = req.body || {};
    if (status === 'New' || status === 'Contacted' || status === 'Scheduled' || status === 'Converted') {
      lead.status = status;
    }
    saveDatabase();
    res.json({ lead });
  });

  app.patch('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
    const enquiry = db.enquiries.find((e) => e.id === req.params.id);
    if (!enquiry) {
      res.status(404).json({ error: 'Enquiry not found.' });
      return;
    }
    const { status } = req.body || {};
    if (status === 'Open' || status === 'In Review' || status === 'Resolved') {
      enquiry.status = status;
    }
    saveDatabase();
    res.json({ enquiry });
  });

  app.patch('/api/admin/content', requireAdmin, (req, res) => {
    const updates = req.body || {};
    const allowedKeys: (keyof SiteContent)[] = [
      'announcementOffer',
      'openingHours',
      'locationShort',
      'trialPromo',
      'heroHeadline',
      'heroSubheadline',
      'clubAddress',
      'clubPhone',
      'clubEmail',
    ];
    for (const key of allowedKeys) {
      if (isNonEmptyString(updates[key], 300)) {
        db.siteContent[key] = updates[key].trim();
      }
    }
    saveDatabase();
    res.json({ siteContent: db.siteContent });
  });

  app.post('/api/admin/gallery', requireAdmin, (req, res) => {
    const { title, category, caption, image } = req.body || {};
    if (!isNonEmptyString(title, 100) || !isNonEmptyString(caption, 240)) {
      res.status(400).json({ error: 'Title and caption are required.' });
      return;
    }
    const validLocalImage =
      typeof image === 'string' && image.startsWith('/src/assets/images/')
        ? image
        : '/src/assets/images/gym_strength_zone_1795368694160.jpg';
    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category: category || 'Strength',
      caption: caption.trim(),
      image: validLocalImage,
    };
    db.gallery.unshift(item);
    saveDatabase();
    res.status(201).json({ item });
  });

  app.delete('/api/admin/gallery/:id', requireAdmin, (req, res) => {
    const idx = db.gallery.findIndex((g) => g.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Gallery item not found.' });
      return;
    }
    db.gallery.splice(idx, 1);
    saveDatabase();
    res.json({ ok: true });
  });

  app.patch('/api/admin/roles', requireAdmin, (req, res) => {
    const { roles } = req.body || {};
    if (Array.isArray(roles) && roles.length > 0) {
      db.roles = roles;
      saveDatabase();
    }
    res.json({ roles: db.roles });
  });

  // --- Vite Dev Middleware or Static Production Serve ---
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FORGE ATHLETICS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

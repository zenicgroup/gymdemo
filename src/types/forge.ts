export type UserRole = 'member' | 'coach' | 'manager' | 'admin';

export type TrainerCategory =
  | 'Strength Coach'
  | 'Personal Trainer'
  | 'Functional Fitness Coach'
  | 'Yoga Instructor'
  | 'Nutrition Coach';

export type TrainingCategory =
  | 'Strength'
  | 'Weight Training'
  | 'Functional'
  | 'HIIT'
  | 'Cardio'
  | 'Cross Training'
  | 'Personal Training'
  | 'Mobility & Recovery';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type TimeBlock = 'Morning' | 'Midday' | 'Evening';

export interface TrainingProgram {
  id: string;
  slug: string;
  index: string;
  title: string;
  category: TrainingCategory;
  shortDescription: string;
  fullDescription: string;
  level: string;
  duration: string;
  frequency: string;
  leadCoachSlug: string;
  image: string;
  highlights: string[];
  sessionStructure: { phase: string; duration: string; focus: string }[];
  equipment: string[];
}

export interface FacilityZone {
  id: string;
  index: string;
  name: string;
  areaSqFt: string;
  capacity: string;
  summary: string;
  description: string;
  equipmentList: string[];
  image: string;
}

export interface TrainerProfile {
  id: string;
  slug: string;
  name: string;
  roleTitle: string;
  category: TrainerCategory;
  experience: string;
  qualifications: string[];
  shortBio: string;
  fullBio: string;
  philosophy: string;
  specialties: string[];
  image: string;
  availability: string;
}

export interface GymClass {
  id: string;
  name: string;
  category: TrainingCategory;
  durationMinutes: number;
  intensity: 'Moderate' | 'High' | 'Restorative';
  capacity: number;
  description: string;
  leadTrainerId: string;
}

export interface ScheduleSlot {
  id: string;
  classId: string;
  className: string;
  category: TrainingCategory;
  day: DayOfWeek;
  time: string;
  timeBlock: TimeBlock;
  duration: string;
  trainerId: string;
  trainerName: string;
  totalSlots: number;
  availableSlots: number;
  studioZone: string;
}

export interface MembershipPlan {
  id: string;
  tier: 'Essential' | 'Performance' | 'Elite';
  audience: string;
  monthlyPriceInr: number;
  annualMonthlyPriceInr: number;
  description: string;
  featured?: boolean;
  accessPrivileges: string;
  classAccess: string;
  personalTraining: string;
  recoveryAccess: string;
  features: string[];
}

export interface CommunityStory {
  id: string;
  memberName: string;
  roleOrProfession: string;
  tenure: string;
  programFocus: string;
  metricHighlight: string;
  quote: string;
  image: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Strength' | 'Nutrition' | 'Recovery' | 'Conditioning';
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  image: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Strength' | 'Conditioning' | 'Recovery' | 'Architecture';
  caption: string;
  image: string;
}

export interface FaqItem {
  id: string;
  category: 'Membership' | 'Free Trial' | 'Training' | 'Facilities';
  question: string;
  answer: string;
}

export interface SiteContent {
  announcementOffer: string;
  openingHours: string;
  locationShort: string;
  trialPromo: string;
  heroHeadline: string;
  heroSubheadline: string;
  clubAddress: string;
  clubPhone: string;
  clubEmail: string;
}

export interface BookingRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  scheduleId: string;
  className: string;
  day: DayOfWeek;
  time: string;
  trainerName: string;
  studioZone: string;
  status: 'Confirmed' | 'Attended' | 'Cancelled';
  bookedAt: string;
}

export interface FreeTrialLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredTraining: string;
  preferredDate: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Converted';
  createdAt: string;
}

export interface EnquiryRecord {
  id: string;
  type: 'Contact' | 'Membership';
  name: string;
  email: string;
  phone: string;
  subject: string;
  planInterest?: string;
  message: string;
  status: 'Open' | 'In Review' | 'Resolved';
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  planTier: string;
  billingCycle: 'Monthly' | 'Annual';
  amountInr: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate: string;
}

export interface WorkoutDayPlan {
  day: string;
  focus: string;
  exercises: { name: string; setsReps: string; rpe: string }[];
}

export interface FitnessGoal {
  id: string;
  userId: string;
  title: string;
  currentValue: string;
  targetValue: string;
  progressPercent: number;
  updatedAt: string;
}

export interface MemberNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  planTier: 'Essential' | 'Performance' | 'Elite';
  billingCycle: 'Monthly' | 'Annual';
  status: 'Active' | 'Paused' | 'Expired';
  joinedAt: string;
  expiryDate: string;
  assignedTrainerId: string;
  trainingFocus: string;
  emergencyContact: string;
}

export interface RolePermissionMatrix {
  role: 'Super Admin' | 'Club Manager' | 'Head Coach';
  members: boolean;
  plansAndPayments: boolean;
  schedulesAndClasses: boolean;
  leadsAndEnquiries: boolean;
  siteContentAndGallery: boolean;
}

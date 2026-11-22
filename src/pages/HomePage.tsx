import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  BLOG_ARTICLES,
  CLUB_IMAGES,
  COMMUNITY_STORIES,
  FACILITY_ZONES,
  TRAINING_PROGRAMS,
} from '../data/clubData';
import { useClub } from '../context/ClubContext';
import { ResilientImage } from '../components/ResilientImage';
import { ScheduleSection } from '../components/ScheduleSection';
import { MembershipPlansSection } from '../components/MembershipPlansSection';
import { FreeTrialForm } from '../components/FreeTrialForm';
import { LocationSection } from '../components/LocationSection';

const WHY_FORGE = [
  {
    index: '01',
    title: 'Professional Coaching',
    body: 'Every group session and lifting block is supervised by domain specialists capped at low athlete-to-coach ratios.',
  },
  {
    index: '02',
    title: 'Modern Equipment',
    body: 'Calibrated steel plates, oak Olympic platforms, Concept2 ergometers, and 40 meters of indoor conditioning turf.',
  },
  {
    index: '03',
    title: 'Personalised Training',
    body: 'Structured movement screens align barbell loads, conditioning zones, and mobility drills to your body and schedule.',
  },
  {
    index: '04',
    title: 'Flexible Membership',
    body: 'Transparent monthly or annual tiers with travel freeze privileges and seamless online schedule reservations.',
  },
  {
    index: '05',
    title: 'Supportive Community',
    body: 'Train beside engineers, founders, runners, and lifters who show up early, respect the floor, and spot each other.',
  },
  {
    index: '06',
    title: 'Performance Tracking',
    body: 'Monitor attendance, class bookings, workout blocks, and quarterly strength benchmarks inside your Member Portal.',
  },
];

export function HomePage() {
  const { siteContent, trainers } = useClub();
  const [activeFacilityIdx, setActiveFacilityIdx] = useState(0);
  const activeFacility = FACILITY_ZONES[activeFacilityIdx] || FACILITY_ZONES[0];

  return (
    <main>
      {/* C. Hero Section */}
      <section className="relative bg-[#171916] overflow-hidden">
        <div className="relative min-h-[580px] lg:min-h-[680px] flex items-center">
          <div className="absolute inset-0">
            <ResilientImage
              src={CLUB_IMAGES.heroAthlete}
              alt="Athlete setting up for a heavy barbell back squat inside Forge Athletics"
              className="w-full h-full object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171916] via-[#171916]/80 to-[#171916]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171916] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5F36A] mb-4">
                Build Strength. Become More.
              </p>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-[#F5F4EF] leading-[0.92]">
                {siteContent.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg text-[#F5F4EF]/85 mt-6 max-w-xl leading-relaxed">
                {siteContent.heroSubheadline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/free-trial"
                  className="px-7 py-4 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-widest hover:bg-[#D4F88A] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Start Your Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/training"
                  className="px-7 py-4 border border-[#F5F4EF]/30 bg-[#171916]/70 text-[#F5F4EF] text-xs font-bold uppercase tracking-widest hover:border-[#C5F36A] hover:text-[#C5F36A] transition-colors whitespace-nowrap"
                >
                  Explore Training
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4-Column Club Statistics Strip Below Hero */}
        <div className="border-t border-b border-[#272B24] bg-[#141613]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#272B24]">
            <div className="py-6 pr-6">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F4EF] tabular-nums">
                18,500 SQ FT
              </div>
              <div className="text-xs text-[#92958E] mt-1">Purpose-built training & recovery architecture</div>
            </div>
            <div className="py-6 px-0 sm:px-6">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#C5F36A] tabular-nums">
                42 WEEKLY CLASSES
              </div>
              <div className="text-xs text-[#92958E] mt-1">Small-group capped sessions Mon–Sun</div>
            </div>
            <div className="py-6 px-0 lg:px-6">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F4EF] tabular-nums">
                1:6 COACH RATIO
              </div>
              <div className="text-xs text-[#92958E] mt-1">Direct barbell & conditioning supervision</div>
            </div>
            <div className="py-6 pl-0 sm:pl-6">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F4EF] tabular-nums">
                05:00 – 22:30
              </div>
              <div className="text-xs text-[#92958E] mt-1">Daily access across all seven club zones</div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Introduction (Off-White Editorial Section) */}
      <section className="bg-[#F5F4EF] text-[#171916] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-3">
                  Club Philosophy
                </p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
                  MORE THAN A GYM. A STANDARD.
                </h2>
              </div>

              <div className="space-y-4 text-base text-[#363932] leading-relaxed max-w-xl">
                <p>
                  Forge Athletics was built for people who treat training as a lifelong craft rather than a
                  seasonal resolution. Every square foot—from acoustic oak lifting platforms to our quiet
                  infrared recovery wing—removes friction between you and focused work.
                </p>
                <p>
                  We replace chaotic equipment clutter with structured 12-week programming, transparent
                  coaching metrics, and an environment where consistency compounds week after week.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#D8D6CC]">
                <div>
                  <span className="font-display text-3xl font-bold tabular-nums">7 ZONES</span>
                  <span className="block text-xs text-[#5B5F57]">Strength, Turf & Recovery</span>
                </div>
                <div className="h-8 w-px bg-[#D8D6CC]" aria-hidden="true" />
                <div>
                  <span className="font-display text-3xl font-bold tabular-nums">6 SPECIALISTS</span>
                  <span className="block text-xs text-[#5B5F57]">Cross-disciplinary coaching</span>
                </div>
                <div className="ml-auto">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171916] hover:underline"
                  >
                    Our Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[340px] lg:min-h-[460px] overflow-hidden border border-[#DCDAD0]">
                <ResilientImage
                  src={CLUB_IMAGES.strengthZone}
                  alt="Forge Athletics main strength hall with Olympic lifting platforms"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Training Programs (All 8 Disciplines) */}
      <section className="bg-[#171916] text-[#F5F4EF] py-20 lg:py-28 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
                Training Architecture
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Eight Disciplines. Zero Guesswork.
              </h2>
            </div>
            <Link
              to="/training"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5F36A] hover:text-[#D4F88A] whitespace-nowrap"
            >
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_PROGRAMS.map((program) => (
              <article
                key={program.id}
                className="group bg-[#1F221D] border border-[#2C3029] flex flex-col justify-between overflow-hidden hover:border-[#C5F36A]/70 transition-colors"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#141613]">
                    <ResilientImage
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#92958E] mb-2">
                      <span className="font-mono text-[#C5F36A]">{program.index}.</span>
                      <span>
                        {program.level} · {program.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F4EF]">
                      {program.title}
                    </h3>
                    <p className="text-sm text-[#92958E] mt-2.5 leading-relaxed">
                      {program.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/training/${program.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5F36A] hover:underline"
                  >
                    Explore More <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* F. Facilities (Light Off-White Interactive Showcase — All 7 Zones) */}
      <section className="bg-[#F5F4EF] text-[#171916] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-2">
                Architectural Zones
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Seven Engineered Training Spaces
              </h2>
            </div>
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171916] hover:underline whitespace-nowrap"
            >
              Tour All Facilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Zone Selector List */}
            <div className="lg:col-span-5 divide-y divide-[#D8D6CC] border-t border-b border-[#D8D6CC]">
              {FACILITY_ZONES.map((zone, idx) => {
                const active = idx === activeFacilityIdx;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveFacilityIdx(idx)}
                    className={`w-full text-left py-4 px-4 transition-colors flex items-center justify-between gap-4 ${
                      active ? 'bg-[#171916] text-[#F5F4EF]' : 'hover:bg-[#EAE8E0] text-[#171916]'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs font-mono mr-3 ${
                          active ? 'text-[#C5F36A]' : 'text-[#6A6E65]'
                        }`}
                      >
                        {zone.index}
                      </span>
                      <span className="font-display text-2xl font-bold uppercase tracking-tight">
                        {zone.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        active ? 'text-[#C5F36A]' : 'text-[#6A6E65]'
                      }`}
                    >
                      {zone.areaSqFt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Zone Editorial Panel */}
            <div className="lg:col-span-7 bg-[#171916] text-[#F5F4EF] flex flex-col justify-between overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ResilientImage
                  src={activeFacility.image}
                  alt={activeFacility.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 lg:p-9 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#92958E]">
                  <span className="text-[#C5F36A] font-mono uppercase">
                    Zone {activeFacility.index} · {activeFacility.areaSqFt}
                  </span>
                  <span>Capacity: {activeFacility.capacity}</span>
                </div>
                <h3 className="font-display text-3xl lg:text-4xl font-bold uppercase">
                  {activeFacility.name}
                </h3>
                <p className="text-sm text-[#92958E] leading-relaxed">{activeFacility.description}</p>
                <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#F5F4EF]/85">
                  {activeFacility.equipmentList.map((eq, i) => (
                    <span key={i}>
                      <span className="text-[#C5F36A] mr-1.5">/</span>
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G. Weekly Class Schedule */}
      <section className="bg-[#171916] text-[#F5F4EF] py-20 lg:py-28 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
                Monday – Sunday
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Weekly Training Schedule
              </h2>
            </div>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5F36A] hover:text-[#D4F88A] whitespace-nowrap"
            >
              Full Weekly Calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ScheduleSection compact />
        </div>
      </section>

      {/* H. Expert Trainers (Off-White Section) */}
      <section className="bg-[#F5F4EF] text-[#171916] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-2">
                Specialist Coaching Team
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Guided By Experienced Coaches
              </h2>
              <p className="text-xs text-[#5B5F57] mt-2">
                *Fictional coach profiles & illustrative club credentials created for demonstration.
              </p>
            </div>
            <Link
              to="/trainers"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171916] hover:underline whitespace-nowrap"
            >
              Filter All Coaches <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {trainers.map((trainer) => (
              <article
                key={trainer.id}
                className="bg-white border border-[#DCDAD0] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#171916]">
                    <ResilientImage
                      src={trainer.image}
                      alt={`${trainer.name} — ${trainer.category}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#5B5F57] mb-1.5">
                      <span className="font-semibold text-[#171916]">{trainer.category}</span>
                      <span className="mx-2">·</span>
                      <span>{trainer.experience}</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-[#171916]">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-medium text-[#4E524A] mt-0.5">{trainer.roleTitle}</p>
                    <p className="text-sm text-[#363932] mt-3 leading-relaxed">{trainer.shortBio}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#EFECE4]">
                  <span className="text-xs text-[#5B5F57] truncate pr-4">
                    {trainer.qualifications[0]}
                  </span>
                  <Link
                    to={`/trainers/${trainer.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#171916] hover:underline whitespace-nowrap shrink-0"
                  >
                    View Profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* I. Membership Plans (Dark Section) */}
      <section className="bg-[#171916] text-[#F5F4EF] py-20 lg:py-28 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <MembershipPlansSection />
        </div>
      </section>

      {/* J. Transformation & Community (Off-White Section) */}
      <section className="bg-[#F5F4EF] text-[#171916] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-2">
              Member Stories
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
              Built Through Consistency
            </h2>
            <p className="text-sm text-[#4E524A] mt-3">
              Real training consistency stories from our fictional member community—focused on strength,
              endurance, and durable movement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {COMMUNITY_STORIES.map((story) => (
              <article key={story.id} className="bg-white border border-[#DCDAD0] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#171916]">
                    <ResilientImage
                      src={story.image}
                      alt={story.memberName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <div className="text-xs font-mono font-semibold text-[#171916] bg-[#C5F36A]/40 inline-block px-2.5 py-1 mb-4">
                      {story.metricHighlight}
                    </div>
                    <blockquote className="text-sm text-[#2A2D27] leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
                <div className="px-7 py-4 border-t border-[#EFECE4] text-xs">
                  <div className="font-bold text-[#171916]">{story.memberName}</div>
                  <div className="text-[#5B5F57] mt-0.5">
                    {story.roleOrProfession} · {story.programFocus}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* K. Why Forge Athletics (Dark Section) */}
      <section className="bg-[#171916] text-[#F5F4EF] py-20 lg:py-28 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
              The Forge Standard
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
              Why Athletes Choose Forge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#2C3029]">
            {WHY_FORGE.map((item) => (
              <div key={item.index} className="p-8 border-r border-b border-[#2C3029] bg-[#1A1D18]">
                <span className="font-mono text-sm text-[#C5F36A] block mb-4">{item.index}.</span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#92958E] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L. Nutrition & Recovery + Journal (Off-White Section) */}
      <section className="bg-[#F5F4EF] text-[#171916] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-2">
                Nutrition · Recovery · Education
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Fueling & Restoration Protocols
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171916] hover:underline whitespace-nowrap"
            >
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            <div className="lg:col-span-6 overflow-hidden border border-[#DCDAD0]">
              <ResilientImage
                src={CLUB_IMAGES.recoverySanctuary}
                alt="Forge Athletics cedar sauna and mobility recovery sanctuary"
                className="w-full h-full min-h-[300px] object-cover"
              />
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DCDAD0] p-6">
                <span className="text-xs font-mono text-[#5B5F57] block mb-2">01 · Nutrition</span>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Practical Fueling</h3>
                <p className="text-sm text-[#4A4D46] leading-relaxed">
                  Macro targets, pre-training carbohydrate pacing, and whole-food meal frameworks built around
                  your schedule.
                </p>
              </div>
              <div className="bg-white border border-[#DCDAD0] p-6">
                <span className="text-xs font-mono text-[#5B5F57] block mb-2">02 · Recovery</span>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Thermal Contrast</h3>
                <p className="text-sm text-[#4A4D46] leading-relaxed">
                  Structured cedar infrared sauna and 6°C cold plunge protocols timed around heavy lifting
                  days.
                </p>
              </div>
              <div className="bg-white border border-[#DCDAD0] p-6">
                <span className="text-xs font-mono text-[#5B5F57] block mb-2">03 · Education</span>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Movement Literacy</h3>
                <p className="text-sm text-[#4A4D46] leading-relaxed">
                  Learn bracing mechanics, RPE load regulation, and Zone 2 aerobic base principles from
                  coaches.
                </p>
              </div>
              <div className="bg-white border border-[#DCDAD0] p-6">
                <span className="text-xs font-mono text-[#5B5F57] block mb-2">04 · Tips</span>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Weekly Briefings</h3>
                <p className="text-sm text-[#4A4D46] leading-relaxed">
                  Actionable training notes published by our Strength, Mobility, and Nutrition specialists.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_ARTICLES.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white border border-[#DCDAD0] p-6 hover:border-[#171916] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#5B5F57] mb-2">
                    <span className="font-semibold text-[#171916]">{post.category}</span>
                    <span className="mx-2">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold uppercase tracking-tight group-hover:underline">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[#4A4D46] mt-2 line-clamp-2">{post.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-5">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* M. Free Trial CTA (Dark Section) */}
      <section className="bg-[#171916] text-[#F5F4EF] py-20 lg:py-28 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A]">
                Complimentary Onboarding
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
                YOUR FIRST SESSION STARTS HERE.
              </h2>
              <p className="text-base text-[#92958E] leading-relaxed">
                Experience the club floor firsthand. Your complimentary trial includes a private facility tour,
                movement check-in with a Forge coach, and a full training session tailored to your goals.
              </p>
              <ul className="space-y-2.5 text-sm text-[#F5F4EF]/85 pt-2">
                <li>· Zero obligation or high-pressure sales pitch</li>
                <li>· Access to Locker Rooms & Recovery Sanctuary</li>
                <li>· Tailored recommendation for group or 1-on-1 tracks</li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-[#1F221D] border border-[#2E332B] p-6 sm:p-8 lg:p-10">
              <FreeTrialForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* N. Location & Contact */}
      <section className="bg-[#171916] text-[#F5F4EF] py-16 lg:py-24 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <LocationSection />
        </div>
      </section>
    </main>
  );
}

import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data/clubData';
import { useClub } from '../context/ClubContext';
import { ResilientImage } from '../components/ResilientImage';
import { FreeTrialForm } from '../components/FreeTrialForm';

export function ProgramDetailsPage() {
  const { slug } = useParams();
  const { trainers, schedules, openBookingModal } = useClub();

  const program = TRAINING_PROGRAMS.find((p) => p.slug === slug) || TRAINING_PROGRAMS[0];
  const leadCoach = trainers.find((t) => t.slug === program.leadCoachSlug) || trainers[0];
  const relatedSlots = schedules.filter((s) => s.category === program.category).slice(0, 4);

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <section className="border-b border-[#272B24] py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <Link
            to="/training"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#92958E] hover:text-[#C5F36A] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Training Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono text-[#C5F36A]">
                Program {program.index} · {program.level} · {program.duration}
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.94]">
                {program.title}
              </h1>
              <p className="text-base text-[#92958E] leading-relaxed">{program.fullDescription}</p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#F5F4EF]/85">
                {program.equipment.map((eq, i) => (
                  <span key={i} className="bg-[#1F221D] border border-[#2C3029] px-3 py-1.5">
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 aspect-[16/10] overflow-hidden border border-[#2E332B]">
              <ResilientImage src={program.image} alt={program.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F4EF] text-[#171916] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A] mb-2">
                Session Architecture
              </p>
              <h2 className="font-display text-4xl font-bold uppercase">Inside A {program.duration} Block</h2>
            </div>

            <div className="divide-y divide-[#D8D6CC] border-t border-b border-[#D8D6CC]">
              {program.sessionStructure.map((step) => (
                <div key={step.phase} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase">{step.phase}</h3>
                    <p className="text-sm text-[#4A4D46] mt-1">{step.focus}</p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#171916] shrink-0">
                    {step.duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold uppercase">Key Outcomes & Standards</h3>
              <ul className="space-y-2.5">
                {program.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2A2D27]">
                    <Check className="w-4 h-4 mt-0.5 text-[#171916] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#DCDAD0] p-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A]">Lead Coach</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 overflow-hidden shrink-0 bg-[#171916]">
                  <ResilientImage
                    src={leadCoach.image}
                    alt={leadCoach.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold uppercase">{leadCoach.name}</h4>
                  <p className="text-xs text-[#4E524A]">{leadCoach.roleTitle}</p>
                </div>
              </div>
              <p className="text-sm text-[#363932]">{leadCoach.shortBio}</p>
              <Link
                to={`/trainers/${leadCoach.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
              >
                View Coach Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#171916] text-[#F5F4EF] p-7">
              <h3 className="font-display text-2xl font-bold uppercase mb-4">
                Book A {program.title} Trial
              </h3>
              <FreeTrialForm dark defaultTraining={program.title} />
            </div>
          </div>
        </div>
      </section>

      {relatedSlots.length > 0 && (
        <section className="py-16 border-t border-[#262A23]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold uppercase mb-6">Upcoming Weekly Sessions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedSlots.map((slot) => (
                <div key={slot.id} className="p-5 bg-[#1F221D] border border-[#2E332B] flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#C5F36A] font-mono">
                      {slot.day} · {slot.time}
                    </div>
                    <div className="font-display text-2xl font-bold uppercase mt-1">{slot.className}</div>
                    <div className="text-xs text-[#92958E] mt-1">
                      {slot.trainerName} · {slot.availableSlots} open
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(slot)}
                    className="w-full py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                  >
                    Book Spot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useClub } from '../context/ClubContext';

export function ClassesPage() {
  const { classes, trainers, schedules, openBookingModal } = useClub();

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Group Classes"
        title="Small-Group Sessions With Coach Precision"
        description="Every Forge class is capped at 12–16 athletes so coaches calibrate bar loads, pacing targets, and posture cues in real time."
        breadcrumb="Classes"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {classes.map((cls) => {
            const coach = trainers.find((t) => t.id === cls.leadTrainerId) || trainers[0];
            const nextSlot = schedules.find((s) => s.className === cls.name);

            return (
              <article
                key={cls.id}
                className="bg-[#1F221D] border border-[#2E332B] p-7 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#92958E] mb-3">
                    <span className="text-[#C5F36A] font-semibold uppercase tracking-wider">
                      {cls.category}
                    </span>
                    <span className="font-mono tabular-nums">
                      {cls.durationMinutes} min · Cap {cls.capacity}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight">{cls.name}</h2>
                  <p className="text-sm text-[#92958E] mt-3 leading-relaxed">{cls.description}</p>
                </div>

                <div className="pt-4 border-t border-[#2C3029] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#92958E]">
                    <span>Intensity: <strong className="text-[#F5F4EF]">{cls.intensity}</strong></span>
                    <span>Lead: <strong className="text-[#F5F4EF]">{coach?.name}</strong></span>
                  </div>
                  {nextSlot ? (
                    <button
                      type="button"
                      onClick={() => openBookingModal(nextSlot)}
                      className="w-full py-3 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors"
                    >
                      Book Next ({nextSlot.day} {nextSlot.time})
                    </button>
                  ) : (
                    <Link
                      to="/schedule"
                      className="block w-full py-3 text-center border border-[#2E332B] text-xs font-bold uppercase tracking-wider hover:border-[#C5F36A]"
                    >
                      Check Schedule
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-12 text-center">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#F5F4EF] text-[#171916] text-xs font-bold uppercase tracking-widest hover:bg-[#C5F36A] transition-colors"
          >
            View Full Monday–Sunday Schedule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

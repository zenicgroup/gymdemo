import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { useClub } from '../context/ClubContext';
import type { TrainerCategory } from '../types/forge';

const TRAINER_CATEGORIES: ('All' | TrainerCategory)[] = [
  'All',
  'Strength Coach',
  'Personal Trainer',
  'Functional Fitness Coach',
  'Yoga Instructor',
  'Nutrition Coach',
];

export function TrainersPage() {
  const { trainers } = useClub();
  const [category, setCategory] = useState<'All' | TrainerCategory>('All');

  const filtered = useMemo(
    () => (category === 'All' ? trainers : trainers.filter((t) => t.category === category)),
    [trainers, category]
  );

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Coaching Faculty"
        title="Specialists Dedicated To Measurable Progress"
        description="Filter our fictional demo coaching roster across strength, personal training, functional conditioning, yoga mobility, and sports nutrition."
        breadcrumb="Trainers"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-wrap gap-2">
            {TRAINER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  category === cat
                    ? 'bg-[#C5F36A] text-[#171916]'
                    : 'bg-[#1F221D] text-[#92958E] border border-[#2C3029] hover:text-[#F5F4EF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((trainer) => (
              <article
                key={trainer.id}
                className="bg-[#1F221D] border border-[#2E332B] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#141613]">
                    <ResilientImage
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-7">
                    <div className="text-xs text-[#92958E] mb-2">
                      <span className="text-[#C5F36A] font-semibold">{trainer.category}</span>
                      <span className="mx-2">·</span>
                      <span>{trainer.experience}</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase">{trainer.name}</h2>
                    <p className="text-xs text-[#92958E] mt-1">{trainer.roleTitle}</p>
                    <p className="text-sm text-[#F5F4EF]/85 mt-3 leading-relaxed">{trainer.shortBio}</p>
                    <div className="mt-4 pt-3 border-t border-[#2C3029] text-xs text-[#92958E] space-y-1">
                      {trainer.qualifications.map((q, i) => (
                        <div key={i}>· {q}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-7 pb-7">
                  <Link
                    to={`/trainers/${trainer.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5F36A] hover:underline"
                  >
                    View Profile <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

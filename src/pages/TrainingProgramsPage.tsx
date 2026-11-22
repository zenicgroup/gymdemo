import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data/clubData';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import type { TrainingCategory } from '../types/forge';

export function TrainingProgramsPage() {
  const [filter, setFilter] = useState<'All' | TrainingCategory>('All');

  const categories = useMemo(
    () => ['All', ...TRAINING_PROGRAMS.map((p) => p.category)] as ('All' | TrainingCategory)[],
    []
  );

  const visible = useMemo(
    () => (filter === 'All' ? TRAINING_PROGRAMS : TRAINING_PROGRAMS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Training Programs"
        title="Eight Disciplines Built For Complete Athletic Output"
        description="Filter our structured training tracks by discipline to inspect session format, intensity level, equipment, and lead specialists."
        breadcrumb="Training Programs"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#C5F36A] text-[#171916]'
                    : 'bg-[#1F221D] text-[#92958E] border border-[#2C3029] hover:text-[#F5F4EF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visible.map((prog) => (
              <article
                key={prog.id}
                className="bg-[#1F221D] border border-[#2E332B] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#141613]">
                    <ResilientImage src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <div className="text-xs text-[#92958E] mb-2">
                      <span className="font-mono text-[#C5F36A] mr-2">{prog.index}.</span>
                      <span>{prog.level}</span>
                      <span className="mx-2">·</span>
                      <span>{prog.duration}</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight">{prog.title}</h2>
                    <p className="text-sm text-[#92958E] mt-2.5 leading-relaxed">{prog.fullDescription}</p>
                    <ul className="mt-4 space-y-1.5 text-xs text-[#F5F4EF]/85">
                      {prog.highlights.map((h, i) => (
                        <li key={i}>· {h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-7 pb-7 pt-3 border-t border-[#2C3029] flex items-center justify-between">
                  <span className="text-xs text-[#92958E]">{prog.frequency}</span>
                  <Link
                    to={`/training/${prog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5F36A] hover:underline"
                  >
                    Explore Program <ArrowUpRight className="w-4 h-4" />
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

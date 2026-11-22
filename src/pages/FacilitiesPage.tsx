import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FACILITY_ZONES } from '../data/clubData';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';

export function FacilitiesPage() {
  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Club Architecture"
        title="18,500 Sq Ft Across Seven Specialist Zones"
        description="Every area inside Forge Athletics is acoustically and spatially isolated so barbell lifters, turf sprint teams, and recovery guests operate in flow."
        breadcrumb="Facilities"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          {FACILITY_ZONES.map((zone, idx) => (
            <article
              key={zone.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#1F221D] border border-[#2E332B]"
            >
              <div className={`lg:col-span-6 min-h-[300px] overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <ResilientImage src={zone.image} alt={zone.name} className="w-full h-full object-cover" />
              </div>

              <div className="lg:col-span-6 p-7 lg:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono text-[#C5F36A] mb-2">
                    Zone {zone.index} · {zone.areaSqFt} · {zone.capacity}
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                    {zone.name}
                  </h2>
                  <p className="text-base text-[#F5F4EF]/90 mt-3">{zone.summary}</p>
                  <p className="text-sm text-[#92958E] mt-3 leading-relaxed">{zone.description}</p>
                </div>

                <div className="pt-5 border-t border-[#2E332B] space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#92958E]">Hardware Highlights</div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#F5F4EF]">
                    {zone.equipmentList.map((eq, i) => (
                      <span key={i}>
                        <span className="text-[#C5F36A] mr-1.5">/</span>
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="p-8 lg:p-12 bg-[#C5F36A] text-[#171916] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase">Walk The Floor In Person</h2>
              <p className="text-sm text-[#171916]/80 mt-1">
                Book a complimentary 60-minute assessment and tour all seven training wings.
              </p>
            </div>
            <Link
              to="/free-trial"
              className="px-7 py-4 bg-[#171916] text-[#F5F4EF] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 whitespace-nowrap"
            >
              Book Tour & Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

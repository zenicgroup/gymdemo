import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CLUB_IMAGES } from '../data/clubData';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { useClub } from '../context/ClubContext';

export function AboutPage() {
  const { openJoinModal } = useClub();

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="About Forge Athletics"
        title="Built By Discipline. Engineered For Longevity."
        description="Forge Athletics is an international-standard strength, conditioning, and recovery club founded on simple physics: structured programming, elite hardware, and unhurried coaching."
        breadcrumb="About Us"
      />

      <section className="bg-[#F5F4EF] text-[#171916] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 overflow-hidden border border-[#DCDAD0]">
            <ResilientImage
              src={CLUB_IMAGES.strengthZone}
              alt="Forge Athletics main architectural strength hall"
              className="w-full h-full min-h-[340px] object-cover"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4E524A]">Our Ethos</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold uppercase tracking-tight">
              No Gimmicks. Only Measurable Work.
            </h2>
            <p className="text-base text-[#363932] leading-relaxed">
              Modern commercial gyms optimize for overcrowding and shiny distractions. Forge Athletics takes the
              opposite view: generous floor spacing, calibrated steel plates, quiet acoustic architecture,
              and capped group sizes so every member trains with clarity.
            </p>
            <p className="text-base text-[#363932] leading-relaxed">
              Whether you are preparing for your first clean barbell deadlift or building aerobic endurance
              around an executive travel schedule, our coaching team works from objective movement benchmarks.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/free-trial"
                className="px-6 py-3.5 bg-[#171916] text-[#F5F4EF] text-xs font-bold uppercase tracking-wider hover:bg-[#272A24] transition-colors inline-flex items-center gap-2"
              >
                Book Your Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => openJoinModal('Performance')}
                className="px-6 py-3.5 border border-[#171916] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#171916] hover:text-[#F5F4EF] transition-colors"
              >
                Explore Memberships
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171916] text-[#F5F4EF] py-16 lg:py-24 border-t border-[#262A23]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#1F221D] border border-[#2E332B]">
              <span className="font-mono text-sm text-[#C5F36A] block mb-3">01 · Environment</span>
              <h3 className="font-display text-3xl font-bold uppercase mb-3">Architectural Calm</h3>
              <p className="text-sm text-[#92958E] leading-relaxed">
                Matte charcoal steel, raw concrete, and warm cedar create a focused sanctuary free of visual
                noise or aggressive sales desks.
              </p>
            </div>
            <div className="p-8 bg-[#1F221D] border border-[#2E332B]">
              <span className="font-mono text-sm text-[#C5F36A] block mb-3">02 · Methodology</span>
              <h3 className="font-display text-3xl font-bold uppercase mb-3">12-Week Cycles</h3>
              <p className="text-sm text-[#92958E] leading-relaxed">
                Random workouts produce random results. All Forge programming follows progressive mesocycles
                combining strength, conditioning, and mobility.
              </p>
            </div>
            <div className="p-8 bg-[#1F221D] border border-[#2E332B]">
              <span className="font-mono text-sm text-[#C5F36A] block mb-3">03 · Recovery</span>
              <h3 className="font-display text-3xl font-bold uppercase mb-3">Built-In Restoration</h3>
              <p className="text-sm text-[#92958E] leading-relaxed">
                Infrared sauna, 6°C cold plunge pools, and guided joint mobility sit right beside the lifting
                hall—treating recovery as non-negotiable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

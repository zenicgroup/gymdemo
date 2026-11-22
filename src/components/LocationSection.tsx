import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export function LocationSection() {
  const { siteContent } = useClub();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Contact & Hours */}
      <div className="lg:col-span-5 bg-[#1F221D] border border-[#2E332B] p-7 lg:p-9 flex flex-col justify-between space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
            Flagship Location
          </p>
          <h3 className="font-display text-3xl lg:text-4xl font-bold uppercase text-[#F5F4EF]">
            Visit Forge Athletics
          </h3>
          <p className="text-sm text-[#92958E] mt-2 leading-relaxed">
            Located on Indiranagar 100 Feet Road with complimentary basement valet parking and 6 minutes from
            Indiranagar Metro Station.
          </p>
        </div>

        <div className="space-y-5 text-sm">
          <div className="flex items-start gap-3.5">
            <MapPin className="w-4 h-4 text-[#C5F36A] mt-1 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#92958E]">Address</span>
              <span className="text-[#F5F4EF]">{siteContent.clubAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Clock className="w-4 h-4 text-[#C5F36A] mt-1 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#92958E]">Opening Hours</span>
              <span className="text-[#F5F4EF]">{siteContent.openingHours}</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Phone className="w-4 h-4 text-[#C5F36A] mt-1 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#92958E]">Phone</span>
              <span className="text-[#F5F4EF] font-mono tabular-nums">{siteContent.clubPhone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Mail className="w-4 h-4 text-[#C5F36A] mt-1 shrink-0" />
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#92958E]">Concierge Email</span>
              <span className="text-[#F5F4EF]">{siteContent.clubEmail}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#2E332B] flex flex-wrap gap-5 text-xs font-semibold uppercase tracking-wider">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F4EF] hover:text-[#C5F36A] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F4EF] hover:text-[#C5F36A] transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F4EF] hover:text-[#C5F4EF] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Right: Architectural District & Directions Card */}
      <div className="lg:col-span-7 bg-[#111310] border border-[#2E332B] p-7 lg:p-10 flex flex-col justify-between relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2E332B 1px, transparent 1px), linear-gradient(to bottom, #2E332B 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#262A23] pb-5">
          <div>
            <span className="text-xs font-mono text-[#C5F36A] tabular-nums">12.9784° N, 77.6408° E</span>
            <h4 className="font-display text-2xl font-bold uppercase text-[#F5F4EF] mt-1">
              Indiranagar · 100 Feet Road Flagship
            </h4>
          </div>
          <a
            href="https://www.openstreetmap.org/?mlat=12.9784&mlon=77.6408#map=16/12.9784/77.6408"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors whitespace-nowrap shrink-0"
          >
            Open Map <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="relative z-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#171916]/90 border border-[#2E332B] p-5">
            <span className="text-xs text-[#92958E] block mb-1">Metro Access</span>
            <span className="font-display text-2xl font-bold uppercase text-[#F5F4EF]">600 Meters</span>
            <p className="text-xs text-[#92958E] mt-1">Indiranagar Purple Line Station</p>
          </div>
          <div className="bg-[#171916]/90 border border-[#2E332B] p-5">
            <span className="text-xs text-[#92958E] block mb-1">Member Parking</span>
            <span className="font-display text-2xl font-bold uppercase text-[#F5F4EF]">Basement Valet</span>
            <p className="text-xs text-[#92958E] mt-1">45 Covered Bays · EV Charging</p>
          </div>
          <div className="bg-[#171916]/90 border border-[#2E332B] p-5">
            <span className="text-xs text-[#92958E] block mb-1">Total Footprint</span>
            <span className="font-display text-2xl font-bold uppercase text-[#F5F4EF]">18,500 Sq Ft</span>
            <p className="text-xs text-[#92958E] mt-1">7 Purpose-Built Training Zones</p>
          </div>
        </div>

        <div className="relative z-10 border-t border-[#262A23] pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#92958E]">
          <span>Landmarks: Opposite 12th Main Junction · Adjacent to Toit</span>
          <span className="text-[#F5F4EF]">Walk-in tours welcome daily 07:00 – 20:00</span>
        </div>
      </div>
    </div>
  );
}

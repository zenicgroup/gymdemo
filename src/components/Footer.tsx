import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { siteContent } = useClub();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Subscription failed.');
      } else {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Network error.');
    }
  };

  return (
    <footer className="bg-[#111310] text-[#F5F4EF] border-t border-[#262A23]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#262A23]">
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" aria-label="Forge Athletics Home">
              <BrandMark />
            </Link>
            <p className="text-sm text-[#92958E] max-w-sm leading-relaxed">
              BUILD STRENGTH. BECOME MORE. An architectural strength, conditioning, and recovery club
              engineered for lifters and committed athletes.
            </p>
            <div className="text-xs text-[#92958E] space-y-1.5 pt-2">
              <p className="text-[#F5F4EF] font-medium">{siteContent.clubAddress}</p>
              <p>{siteContent.openingHours}</p>
              <p>
                {siteContent.clubPhone} · {siteContent.clubEmail}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#92958E]">Club</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#C5F36A] transition-colors">About Us</Link></li>
              <li><Link to="/training" className="hover:text-[#C5F36A] transition-colors">Training Programs</Link></li>
              <li><Link to="/classes" className="hover:text-[#C5F36A] transition-colors">Classes</Link></li>
              <li><Link to="/schedule" className="hover:text-[#C5F36A] transition-colors">Weekly Schedule</Link></li>
              <li><Link to="/trainers" className="hover:text-[#C5F36A] transition-colors">Expert Trainers</Link></li>
              <li><Link to="/facilities" className="hover:text-[#C5F36A] transition-colors">Facilities</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#92958E]">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/membership" className="hover:text-[#C5F36A] transition-colors">Membership Plans</Link></li>
              <li><Link to="/free-trial" className="hover:text-[#C5F36A] transition-colors">Free Trial Booking</Link></li>
              <li><Link to="/gallery" className="hover:text-[#C5F36A] transition-colors">Club Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-[#C5F36A] transition-colors">Fitness Blog</Link></li>
              <li><Link to="/faq" className="hover:text-[#C5F36A] transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#C5F36A] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#92958E]">
              Training Dispatches
            </h3>
            <p className="text-sm text-[#92958E]">
              Receive monthly strength cycles, recovery protocols, and seminar dates from Forge coaches.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                aria-label="Newsletter email address"
                className="flex-1 bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF] placeholder:text-[#92958E]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-xs text-[#C5F36A] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> {message}
              </p>
            )}
            {status === 'error' && <p className="text-xs text-red-400">{message}</p>}

            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs font-medium text-[#92958E]">
              <Link to="/member" className="text-[#F5F4EF] hover:text-[#C5F36A] inline-flex items-center gap-1">
                Member Portal <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/admin" className="text-[#F5F4EF] hover:text-[#C5F36A] inline-flex items-center gap-1">
                Admin Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#92958E]">
          <p>© {new Date().getFullYear()} FORGE ATHLETICS. Commercial Web Showcase Demonstration.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F4EF] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

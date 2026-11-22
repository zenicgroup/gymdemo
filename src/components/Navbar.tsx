import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { BrandMark } from './BrandMark';

const PRIMARY_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Training', to: '/training' },
  { label: 'Classes', to: '/classes' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Membership', to: '/membership' },
  { label: 'Contact', to: '/contact' },
];

const SECONDARY_MOBILE_NAV = [
  { label: 'Weekly Schedule', to: '/schedule' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Fitness Blog', to: '/blog' },
  { label: 'Free Trial Booking', to: '/free-trial' },
  { label: 'FAQ', to: '/faq' },
];

export function Navbar() {
  const { siteContent, openJoinModal, setSearchOpen, user } = useClub();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Non-sticky Announcement Bar: respects 15% mobile sticky viewport cap */}
      <div className="bg-[#111310] border-b border-[#262A23] text-xs text-[#92958E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-[#C5F36A] font-medium">{siteContent.announcementOffer}</span>
            <span aria-hidden="true" className="hidden sm:inline text-[#3B4036]">
              ·
            </span>
            <span className="hidden md:inline">{siteContent.openingHours}</span>
            <span aria-hidden="true" className="hidden md:inline text-[#3B4036]">
              ·
            </span>
            <span className="hidden lg:inline">{siteContent.locationShort}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/free-trial" className="text-[#F5F4EF] hover:text-[#C5F36A] transition-colors whitespace-nowrap">
              {siteContent.trialPromo}
            </Link>
            <span aria-hidden="true" className="text-[#3B4036]">
              ·
            </span>
            <Link to="/member" className="hover:text-[#F5F4EF] transition-colors whitespace-nowrap">
              {user ? `Portal (${user.name.split(' ')[0]})` : 'Member Portal'}
            </Link>
            <span aria-hidden="true" className="text-[#3B4036]">
              ·
            </span>
            <Link to="/admin" className="hover:text-[#F5F4EF] transition-colors whitespace-nowrap">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 h-16 bg-[#171916]/95 backdrop-blur-md border-b border-[#272B24]">
        <div className="max-w-[1440px] h-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
          <Link to="/" aria-label="Forge Athletics Home" className="shrink-0">
            <BrandMark />
          </Link>

          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#C5F36A] border-b border-[#C5F36A]'
                      : 'text-[#F5F4EF]/85 hover:text-[#F5F4EF]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search club programs and coaches"
              className="w-10 h-10 flex items-center justify-center text-[#92958E] hover:text-[#F5F4EF] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => openJoinModal('Performance')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors whitespace-nowrap shrink-0"
            >
              Join Now
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#F5F4EF] border border-[#2C3029]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#171916] text-[#F5F4EF] flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="h-16 px-5 flex items-center justify-between border-b border-[#272B24] shrink-0">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <BrandMark />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 flex items-center justify-center border border-[#2C3029]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-8 flex-1 space-y-8">
            <div className="space-y-3">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block font-display text-3xl font-bold uppercase tracking-wide py-1.5 ${
                      isActive ? 'text-[#C5F36A]' : 'text-[#F5F4EF]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="border-t border-[#272B24] pt-6 grid grid-cols-2 gap-3">
              {SECONDARY_MOBILE_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[#92958E] hover:text-[#F5F4EF] py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#272B24] pt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openJoinModal('Performance');
                }}
                className="w-full py-3.5 bg-[#C5F36A] text-[#171916] font-bold text-xs uppercase tracking-widest"
              >
                Join Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/member"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border border-[#2E332B] text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#C5F36A]" />
                  Member Portal
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border border-[#2E332B] text-center text-xs font-semibold uppercase tracking-wider"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

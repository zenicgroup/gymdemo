import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Check, Clock, MapPin, User, X } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export function ClassBookingModal() {
  const { bookingSlot, closeBookingModal, token, user, refreshPublicData, setSession } = useClub();

  const [mode, setMode] = useState<'member' | 'trial'>(token ? 'member' : 'trial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  React.useEffect(() => {
    if (bookingSlot) {
      setMode(token ? 'member' : 'trial');
      setError('');
      setConfirmed(false);
    }
  }, [bookingSlot, token]);

  if (!bookingSlot) return null;

  const handleBookAsMember = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/member/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scheduleId: bookingSlot.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not reserve class slot.');
      } else {
        await refreshPublicData();
        setConfirmed(true);
      }
    } catch {
      setError('Network error while reserving slot.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestOrQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'member' && !token) {
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            planTier: 'Performance',
            billingCycle: 'Monthly',
          }),
        });
        const regData = await regRes.json();
        if (!regRes.ok) {
          setError(regData.error || 'Registration failed.');
          setSubmitting(false);
          return;
        }
        setSession(regData.token, regData.user);

        const bookRes = await fetch('/api/member/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${regData.token}`,
          },
          body: JSON.stringify({ scheduleId: bookingSlot.id }),
        });
        if (!bookRes.ok) {
          const bErr = await bookRes.json();
          setError(bErr.error || 'Account created, but class booking failed.');
          setSubmitting(false);
          return;
        }
        await refreshPublicData();
        setConfirmed(true);
      } else {
        const res = await fetch('/api/leads/free-trial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            preferredTraining: `${bookingSlot.className} (${bookingSlot.day} ${bookingSlot.time})`,
            preferredDate: bookingSlot.day,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Could not reserve trial pass.');
        } else {
          setConfirmed(true);
        }
      }
    } catch {
      setError('Network error. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="class-booking-title"
    >
      <div className="w-full max-w-lg bg-[#1F221D] border border-[#2E332B] text-[#F5F4EF] p-6 md:p-8 relative">
        <button
          type="button"
          onClick={closeBookingModal}
          aria-label="Close booking dialog"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#92958E] hover:text-[#F5F4EF]"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs font-medium tracking-widest uppercase text-[#C5F36A] mb-1">
          Class Reservation
        </p>
        <h2 id="class-booking-title" className="font-display text-3xl font-bold uppercase tracking-tight">
          {bookingSlot.className}
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-4 p-4 bg-[#171916] border border-[#2E332B] text-xs text-[#92958E]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5F36A]" />
            <span className="text-[#F5F4EF]">{bookingSlot.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5F36A]" />
            <span className="text-[#F5F4EF] tabular-nums">
              {bookingSlot.time} · {bookingSlot.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#C5F36A]" />
            <span className="text-[#F5F4EF]">{bookingSlot.trainerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5F36A]" />
            <span className="text-[#F5F4EF]">{bookingSlot.studioZone}</span>
          </div>
        </div>

        {confirmed ? (
          <div className="py-7 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#C5F36A] text-[#171916] flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Spot Reserved</h3>
            <p className="text-sm text-[#92958E] mb-6">
              {token
                ? 'Your reservation is synced to your Member Dashboard.'
                : 'Our concierge has logged your complimentary trial pass for this session.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {token && (
                <Link
                  to="/member"
                  onClick={closeBookingModal}
                  className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                >
                  Open Member Portal
                </Link>
              )}
              <button
                type="button"
                onClick={closeBookingModal}
                className="px-5 py-2.5 border border-[#2E332B] text-xs font-semibold uppercase tracking-wider text-[#F5F4EF]"
              >
                Close
              </button>
            </div>
          </div>
        ) : token && user ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-[#92958E]">
              Booking as <strong className="text-[#F5F4EF]">{user.name}</strong> ({user.email}).{' '}
              <span className="tabular-nums text-[#C5F36A]">{bookingSlot.availableSlots}</span> spots
              remaining.
            </p>
            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleBookAsMember}
              disabled={submitting || bookingSlot.availableSlots <= 0}
              className="w-full py-3.5 bg-[#C5F36A] text-[#171916] font-bold text-xs uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Confirming Reservation...' : 'Confirm Class Spot'}
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMode('trial')}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors ${
                  mode === 'trial'
                    ? 'bg-[#C5F36A] text-[#171916]'
                    : 'bg-[#171916] text-[#92958E] hover:text-[#F5F4EF]'
                }`}
              >
                Book as Free Trial Guest
              </button>
              <button
                type="button"
                onClick={() => setMode('member')}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors ${
                  mode === 'member'
                    ? 'bg-[#C5F36A] text-[#171916]'
                    : 'bg-[#171916] text-[#92958E] hover:text-[#F5F4EF]'
                }`}
              >
                Quick Member Pass & Book
              </button>
            </div>

            <form onSubmit={handleGuestOrQuickSignup} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (+91 ...)"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
              />
              {mode === 'member' && (
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Portal Password (min 6 chars)"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              )}
              {error && (
                <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#C5F36A] text-[#171916] font-bold text-xs uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-50"
              >
                {submitting
                  ? 'Reserving...'
                  : mode === 'trial'
                  ? 'Reserve Free Trial Spot'
                  : 'Create Member Pass & Book'}
              </button>
              <p className="text-xs text-center text-[#92958E]">
                Already registered?{' '}
                <Link
                  to="/member"
                  onClick={closeBookingModal}
                  className="text-[#C5F36A] underline hover:text-[#D4F88A]"
                >
                  Sign in to Member Portal
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

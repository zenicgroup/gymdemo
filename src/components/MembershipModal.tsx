import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export function MembershipModal() {
  const { joinModalPlan, closeJoinModal, plans, setSession } = useClub();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'activate' | 'enquiry'>('activate');
  const [planTier, setPlanTier] = useState<string>(joinModalPlan || 'Performance');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Monthly');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    if (joinModalPlan) {
      setPlanTier(joinModalPlan);
      setError('');
      setSuccessMessage('');
    }
  }, [joinModalPlan]);

  if (!joinModalPlan) return null;

  const selectedPlan = plans.find((p) => p.tier === planTier) || plans[1];
  const activePrice =
    billingCycle === 'Annual' ? selectedPlan.annualMonthlyPriceInr : selectedPlan.monthlyPriceInr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'activate') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, password, planTier, billingCycle }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Could not create member pass.');
        } else {
          setSession(data.token, data.user);
          closeJoinModal();
          navigate('/member');
        }
      } else {
        const res = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'Membership',
            name,
            email,
            phone,
            subject: `${planTier} (${billingCycle}) Membership Enquiry`,
            planInterest: planTier,
            message: notes || `Interested in ${planTier} (${billingCycle}) membership onboarding.`,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to submit membership enquiry.');
        } else {
          setSuccessMessage(data.message);
        }
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
    >
      <div className="w-full max-w-xl bg-[#1F221D] border border-[#2E332B] text-[#F5F4EF] p-6 md:p-8 relative my-8">
        <button
          type="button"
          onClick={closeJoinModal}
          aria-label="Close membership dialog"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#92958E] hover:text-[#F5F4EF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs font-medium tracking-widest uppercase text-[#C5F36A] mb-2">
          Forge Membership
        </p>
        <h2 id="join-modal-title" className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
          Begin Your {planTier} Pass
        </h2>
        <p className="text-sm text-[#92958E] mt-1">
          Illustrative Demo Rate: ₹{activePrice.toLocaleString('en-IN')}/mo ({billingCycle})
        </p>

        <div className="flex gap-2 mt-6 border-b border-[#2E332B] pb-4">
          <button
            type="button"
            onClick={() => {
              setMode('activate');
              setError('');
              setSuccessMessage('');
            }}
            className={`px-4 py-2 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
              mode === 'activate'
                ? 'bg-[#C5F36A] text-[#171916]'
                : 'bg-[#171916] text-[#92958E] hover:text-[#F5F4EF]'
            }`}
          >
            Create Member Portal Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('enquiry');
              setError('');
              setSuccessMessage('');
            }}
            className={`px-4 py-2 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
              mode === 'enquiry'
                ? 'bg-[#C5F36A] text-[#171916]'
                : 'bg-[#171916] text-[#92958E] hover:text-[#F5F4EF]'
            }`}
          >
            Request Concierge Callback
          </button>
        </div>

        {successMessage ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#C5F36A] text-[#171916] flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Enquiry Registered</h3>
            <p className="text-sm text-[#92958E] mb-6">{successMessage}</p>
            <button
              type="button"
              onClick={closeJoinModal}
              className="px-6 py-3 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">Select Tier</label>
                <select
                  value={planTier}
                  onChange={(e) => setPlanTier(e.target.value)}
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.tier}>
                      {p.tier}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">Billing Cadence</label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value as 'Monthly' | 'Annual')}
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Annual">Annual (15% Savings)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 00000"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#92958E] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@domain.in"
                className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
              />
            </div>

            {mode === 'activate' ? (
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">
                  Create Member Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-[#92958E] mb-1.5">Goals or Questions</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us your preferred training hours or corporate pass needs..."
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
            )}

            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#C5F36A] text-[#171916] font-bold text-xs uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-60"
            >
              {submitting
                ? 'Processing...'
                : mode === 'activate'
                ? 'Activate Demo Pass & Open Member Portal'
                : 'Submit Membership Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

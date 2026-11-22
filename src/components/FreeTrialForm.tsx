import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data/clubData';

interface FreeTrialFormProps {
  dark?: boolean;
  defaultTraining?: string;
}

export function FreeTrialForm({ dark = true, defaultTraining = 'Strength Training' }: FreeTrialFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTraining, setPreferredTraining] = useState(defaultTraining);
  const [preferredDate, setPreferredDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, preferredTraining, preferredDate }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not schedule your free trial.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = dark
    ? 'w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF] placeholder:text-[#92958E]'
    : 'w-full bg-white border border-[#D4D2C9] px-4 py-3 text-sm text-[#171916] placeholder:text-[#6B6E67]';

  const labelClass = dark
    ? 'block text-xs font-medium text-[#92958E] mb-1.5'
    : 'block text-xs font-medium text-[#4A4D46] mb-1.5';

  if (submitted) {
    return (
      <div
        className={`p-8 border ${
          dark ? 'bg-[#1F221D] border-[#2E332B] text-[#F5F4EF]' : 'bg-white border-[#D4D2C9] text-[#171916]'
        }`}
      >
        <div className="w-11 h-11 bg-[#C5F36A] text-[#171916] flex items-center justify-center mb-4">
          <Check className="w-5 h-5" />
        </div>
        <h3 className="font-display text-3xl font-bold uppercase mb-2">Session Request Received</h3>
        <p className={`text-sm mb-6 ${dark ? 'text-[#92958E]' : 'text-[#4A4D46]'}`}>
          Thank you, {name}. Our coaching concierge will confirm your {preferredTraining} assessment for{' '}
          {preferredDate} via phone and email.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setPhone('');
            setEmail('');
            setPreferredDate('');
          }}
          className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trial-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="trial-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Karan Mehta"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="trial-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="trial-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98450 00000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="trial-email" className={labelClass}>
          Email Address
        </label>
        <input
          id="trial-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="karan@domain.in"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trial-training" className={labelClass}>
            Preferred Training
          </label>
          <select
            id="trial-training"
            value={preferredTraining}
            onChange={(e) => setPreferredTraining(e.target.value)}
            className={inputClass}
          >
            {TRAINING_PROGRAMS.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="trial-date" className={labelClass}>
            Preferred Visit Date
          </label>
          <input
            id="trial-date"
            type="date"
            required
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-[#C5F36A] text-[#171916] font-bold text-xs uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-60"
      >
        {submitting ? 'Submitting Request...' : 'Book My Free Trial'}
      </button>
    </form>
  );
}

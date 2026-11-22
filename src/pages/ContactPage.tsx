import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { LocationSection } from '../components/LocationSection';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Club Enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Contact', name, email, phone, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not send message.');
      } else {
        setSentMessage(data.message);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch {
      setError('Network error. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Contact Concierge"
        title="Speak With The Forge Team"
        description="Reach out for membership tours, corporate group passes, personal training pairings, or press enquiries."
        breadcrumb="Contact"
      />

      <section className="py-14 lg:py-20 space-y-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-4xl font-bold uppercase">Direct Club Concierge</h2>
              <p className="text-sm text-[#92958E] leading-relaxed">
                Our front-of-house hospitality and coaching desk responds to all enquiries within one business
                day. Walk-in tours are welcome daily between 07:00 and 20:00.
              </p>
              <div className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-2 text-sm">
                <div className="text-xs uppercase tracking-widest text-[#C5F36A]">Corporate & Team Passes</div>
                <p className="text-[#92958E]">
                  Interested in structured wellness stipends or private team sessions? Mention your team size
                  and preferred schedule in your message.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#1F221D] border border-[#2E332B] p-7 lg:p-10">
              {sentMessage ? (
                <div className="py-6 space-y-4">
                  <div className="w-11 h-11 bg-[#C5F36A] text-[#171916] flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase">Message Received</h3>
                  <p className="text-sm text-[#92958E]">{sentMessage}</p>
                  <button
                    type="button"
                    onClick={() => setSentMessage('')}
                    className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#92958E] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vikram Sethi"
                        className="w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#92958E] mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98450 00000"
                        className="w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#92958E] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vikram@domain.in"
                        className="w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#92958E] mb-1.5">Topic</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                      >
                        <option value="General Club Enquiry">General Club Enquiry</option>
                        <option value="Membership Plans">Membership Plans</option>
                        <option value="Personal Training">Personal Training</option>
                        <option value="Corporate Wellness">Corporate Wellness</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#92958E] mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our team assist you?"
                      className="w-full bg-[#171916] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 border-t border-[#262A23]">
          <LocationSection />
        </div>
      </section>
    </main>
  );
}

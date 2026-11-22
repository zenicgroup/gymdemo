import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ResilientImage } from '../components/ResilientImage';

export function TrainerProfilePage() {
  const { slug } = useParams();
  const { trainers, schedules, openBookingModal } = useClub();
  const trainer = trainers.find((t) => t.slug === slug) || trainers[0];
  const coachClasses = schedules.filter((s) => s.trainerName === trainer.name);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Contact',
        name,
        email,
        subject: `1-on-1 Coaching Enquiry: ${trainer.name}`,
        message,
      }),
    });
    if (res.ok) {
      setSent(true);
    }
  };

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <section className="py-12 lg:py-20 border-b border-[#272B24]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#92958E] hover:text-[#C5F36A] mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All Coaches
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 aspect-[3/4] overflow-hidden border border-[#2E332B] bg-[#1F221D]">
              <ResilientImage
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
                  {trainer.category} · {trainer.experience}
                </p>
                <h1 className="font-display text-5xl sm:text-6xl font-bold uppercase tracking-tight">
                  {trainer.name}
                </h1>
                <p className="text-base text-[#92958E] mt-1">{trainer.roleTitle}</p>
              </div>

              <blockquote className="p-6 bg-[#1F221D] border border-[#2E332B] text-base italic text-[#F5F4EF]/90">
                &ldquo;{trainer.philosophy}&rdquo;
              </blockquote>

              <p className="text-base text-[#92958E] leading-relaxed">{trainer.fullBio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-3">
                    Specialties
                  </h2>
                  <ul className="space-y-2 text-sm text-[#F5F4EF]">
                    {trainer.specialties.map((s, i) => (
                      <li key={i}>· {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-3">
                    Demo Credentials & Floor Hours
                  </h2>
                  <ul className="space-y-2 text-sm text-[#92958E]">
                    {trainer.qualifications.map((q, i) => (
                      <li key={i}>· {q}</li>
                    ))}
                    <li className="text-[#F5F4EF] pt-1">Availability: {trainer.availability}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F4EF] text-[#171916] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-4xl font-bold uppercase">Classes Led By {trainer.name}</h2>
            {coachClasses.length === 0 ? (
              <p className="text-sm text-[#4A4D46]">
                {trainer.name} conducts private 1-on-1 consultations and assessments by appointment.
              </p>
            ) : (
              <div className="space-y-3">
                {coachClasses.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-5 bg-white border border-[#DCDAD0] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-mono text-[#4E524A]">
                        {slot.day} · {slot.time} ({slot.duration})
                      </div>
                      <div className="font-display text-2xl font-bold uppercase">{slot.className}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookingModal(slot)}
                      className="px-4 py-2.5 bg-[#171916] text-[#F5F4EF] text-xs font-bold uppercase tracking-wider hover:bg-[#C5F36A] hover:text-[#171916] transition-colors shrink-0"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 bg-[#171916] text-[#F5F4EF] p-7 lg:p-9">
            <h2 className="font-display text-3xl font-bold uppercase mb-2">
              Request 1-On-1 Coaching With {trainer.name.split(' ')[0]}
            </h2>
            <p className="text-sm text-[#92958E] mb-6">
              Send your training goals and preferred schedule window to our concierge team.
            </p>
            {sent ? (
              <div className="p-6 bg-[#1F221D] border border-[#2E332B] flex items-center gap-3">
                <Check className="w-5 h-5 text-[#C5F36A]" />
                <span className="text-sm">Enquiry sent. Our team will confirm availability shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#1F221D] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-[#1F221D] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                />
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Goals, weekly schedule, or movement history..."
                  className="w-full bg-[#1F221D] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-widest"
                >
                  Send Coaching Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

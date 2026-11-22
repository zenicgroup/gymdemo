import { useState } from 'react';
import { Check } from 'lucide-react';
import { useClub } from '../context/ClubContext';

export function MembershipPlansSection({ showMatrix = true }: { showMatrix?: boolean }) {
  const { plans, openJoinModal } = useClub();
  const [billing, setBilling] = useState<'Monthly' | 'Annual'>('Monthly');

  return (
    <div className="space-y-12">
      {/* Header & Billing Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
            Membership Tiers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F5F4EF]">
            Structured Plans For Serious Progress
          </h2>
          <p className="text-xs text-[#92958E] mt-2">
            *All INR membership rates displayed below are illustrative demonstration figures.
          </p>
        </div>

        <div className="inline-flex items-center p-1 bg-[#1F221D] border border-[#2E332B] self-start">
          <button
            type="button"
            onClick={() => setBilling('Monthly')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              billing === 'Monthly' ? 'bg-[#C5F36A] text-[#171916]' : 'text-[#92958E] hover:text-[#F5F4EF]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('Annual')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              billing === 'Annual' ? 'bg-[#C5F36A] text-[#171916]' : 'text-[#92958E] hover:text-[#F5F4EF]'
            }`}
          >
            Annual · Save 15%
          </button>
        </div>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billing === 'Annual' ? plan.annualMonthlyPriceInr : plan.monthlyPriceInr;
          const isFeatured = Boolean(plan.featured);

          return (
            <div
              key={plan.id}
              className={`flex flex-col justify-between p-7 lg:p-8 border transition-colors ${
                isFeatured
                  ? 'bg-[#C5F36A] text-[#171916] border-[#C5F36A]'
                  : 'bg-[#1F221D] text-[#F5F4EF] border-[#2E332B]'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-current/15">
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{plan.tier}</h3>
                    <p className={`text-xs mt-1 ${isFeatured ? 'text-[#171916]/75' : 'text-[#92958E]'}`}>
                      {plan.audience}
                    </p>
                  </div>
                  {isFeatured && (
                    <span className="text-[11px] font-bold uppercase tracking-widest">Most Selected</span>
                  )}
                </div>

                <div className="py-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-bold tabular-nums">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs font-medium ${isFeatured ? 'text-[#171916]/75' : 'text-[#92958E]'}`}>
                      / month {billing === 'Annual' ? '· billed annually' : ''}
                    </span>
                  </div>
                  <p className={`text-sm mt-3 leading-relaxed ${isFeatured ? 'text-[#171916]/85' : 'text-[#92958E]'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 pb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isFeatured ? 'text-[#171916]' : 'text-[#C5F36A]'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openJoinModal(plan.tier)}
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isFeatured
                    ? 'bg-[#171916] text-[#F5F4EF] hover:bg-[#272A24]'
                    : 'bg-[#C5F36A] text-[#171916] hover:bg-[#D4F88A]'
                }`}
              >
                Join {plan.tier}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix */}
      {showMatrix && (
        <div className="border border-[#2C3029] bg-[#1A1D18] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#2C3029] text-xs font-semibold uppercase tracking-wider text-[#92958E]">
                <th className="py-4 px-5">Privilege</th>
                {plans.map((p) => (
                  <th key={p.id} className="py-4 px-5 text-[#F5F4EF]">
                    {p.tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272B24] text-sm">
              <tr>
                <td className="py-4 px-5 font-medium text-[#92958E]">Club Floor Access</td>
                {plans.map((p) => (
                  <td key={p.id} className="py-4 px-5 text-[#F5F4EF]">
                    {p.accessPrivileges}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-5 font-medium text-[#92958E]">Group Class Allowance</td>
                {plans.map((p) => (
                  <td key={p.id} className="py-4 px-5 text-[#F5F4EF]">
                    {p.classAccess}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-5 font-medium text-[#92958E]">Personal Coaching</td>
                {plans.map((p) => (
                  <td key={p.id} className="py-4 px-5 text-[#F5F4EF]">
                    {p.personalTraining}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-5 font-medium text-[#92958E]">Recovery Sanctuary</td>
                {plans.map((p) => (
                  <td key={p.id} className="py-4 px-5 text-[#F5F4EF]">
                    {p.recoveryAccess}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

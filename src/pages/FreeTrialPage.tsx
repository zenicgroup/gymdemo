import { PageHeader } from '../components/PageHeader';
import { FreeTrialForm } from '../components/FreeTrialForm';

export function FreeTrialPage() {
  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Complimentary Trial"
        title="Your First Session Starts Here."
        description="Reserve a complimentary club tour, movement check-in, and guided training session matched to your experience."
        breadcrumb="Free Trial Booking"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl font-bold uppercase">What To Expect On Visit One</h2>
            <div className="divide-y divide-[#272B24] border-t border-b border-[#272B24]">
              <div className="py-5">
                <span className="font-mono text-xs text-[#C5F36A]">01 · 15 Minutes</span>
                <h3 className="font-display text-2xl font-bold uppercase mt-1">Club Tour & Goal Audit</h3>
                <p className="text-sm text-[#92958E] mt-1">
                  Walk through all seven training wings and discuss your current routine, injury history, and
                  weekly schedule.
                </p>
              </div>
              <div className="py-5">
                <span className="font-mono text-xs text-[#C5F36A]">02 · 45 Minutes</span>
                <h3 className="font-display text-2xl font-bold uppercase mt-1">Coached Trial Session</h3>
                <p className="text-sm text-[#92958E] mt-1">
                  Step into your preferred training track—from barbell strength to turf HIIT or mobility flow.
                </p>
              </div>
              <div className="py-5">
                <span className="font-mono text-xs text-[#C5F36A]">03 · Post-Session</span>
                <h3 className="font-display text-2xl font-bold uppercase mt-1">Recovery & Next Steps</h3>
                <p className="text-sm text-[#92958E] mt-1">
                  Cool down in our Locker & Recovery Suite and receive a clear weekly training recommendation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#1F221D] border border-[#2E332B] p-7 lg:p-10">
            <FreeTrialForm dark />
          </div>
        </div>
      </section>
    </main>
  );
}

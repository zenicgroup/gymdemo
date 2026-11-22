import { PageHeader } from '../components/PageHeader';
import { MembershipPlansSection } from '../components/MembershipPlansSection';
import { FAQ_ITEMS } from '../data/clubData';

export function MembershipPage() {
  const membershipFaqs = FAQ_ITEMS.filter((f) => f.category === 'Membership');

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Membership Architecture"
        title="Transparent Access. Zero Hidden Contracts."
        description="Compare Essential, Performance, and Elite tiers with monthly or annual billing. All INR figures are illustrative demo pricing."
        breadcrumb="Membership Plans"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <MembershipPlansSection showMatrix />
        </div>
      </section>

      <section className="bg-[#F5F4EF] text-[#171916] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="font-display text-4xl font-bold uppercase mb-8">Membership Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {membershipFaqs.map((faq) => (
              <div key={faq.id} className="bg-white border border-[#DCDAD0] p-7">
                <h3 className="font-display text-2xl font-bold uppercase mb-2">{faq.question}</h3>
                <p className="text-sm text-[#4A4D46] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

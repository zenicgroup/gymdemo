import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clubData';
import { PageHeader } from '../components/PageHeader';

const FAQ_CATEGORIES = ['All', 'Free Trial', 'Membership', 'Training', 'Facilities'] as const;

export function FaqPage() {
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (q && !item.question.toLowerCase().includes(q) && !item.answer.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Frequently Asked Questions"
        title="Clear Answers Before You Step Onto The Floor"
        description="Everything you need to know about onboarding trials, memberships, class booking windows, and club amenities."
        breadcrumb="FAQ"
      />

      <section className="bg-[#F5F4EF] text-[#171916] py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    category === cat
                      ? 'bg-[#171916] text-[#C5F36A]'
                      : 'bg-white text-[#4A4D46] border border-[#DCDAD0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#6A6E65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-white border border-[#DCDAD0] pl-10 pr-4 py-2 text-sm text-[#171916]"
              />
            </div>
          </div>

          <div className="divide-y divide-[#D8D6CC] border-t border-b border-[#D8D6CC] bg-white">
            {visible.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#FAF9F6] transition-colors"
                  >
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#5B5F57] block mb-1">
                        {item.category}
                      </span>
                      <span className="font-display text-2xl font-bold uppercase">{item.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#363932] leading-relaxed">{item.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

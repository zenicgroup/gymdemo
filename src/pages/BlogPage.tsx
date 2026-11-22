import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/clubData';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';

const BLOG_CATEGORIES = ['All', 'Strength', 'Nutrition', 'Recovery', 'Conditioning'] as const;

export function BlogPage() {
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_ARTICLES.filter((post) => {
      if (category !== 'All' && post.category !== category) return false;
      if (q && !post.title.toLowerCase().includes(q) && !post.excerpt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Performance Journal"
        title="Strength, Nutrition & Recovery Field Notes"
        description="Evidence-led essays and practical programming briefs written by Forge Athletics coaches."
        breadcrumb="Fitness Blog"
      />

      <section className="bg-[#F5F4EF] text-[#171916] py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    category === cat
                      ? 'bg-[#171916] text-[#C5F36A]'
                      : 'bg-white text-[#4A4D46] border border-[#DCDAD0] hover:text-[#171916]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#6A6E65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-[#DCDAD0] pl-10 pr-4 py-2.5 text-sm text-[#171916]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <article key={post.id} className="bg-white border border-[#DCDAD0] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] overflow-hidden bg-[#171916]">
                    <ResilientImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <div className="text-xs text-[#5B5F57] mb-2">
                      <span className="font-semibold text-[#171916]">{post.category}</span>
                      <span className="mx-2">·</span>
                      <span>{post.publishedDate}</span>
                      <span className="mx-2">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight">{post.title}</h2>
                    <p className="text-sm text-[#4A4D46] mt-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
                <div className="px-7 pb-7 pt-3 border-t border-[#EFECE4] flex items-center justify-between">
                  <span className="text-xs text-[#5B5F57]">
                    By {post.author} · {post.authorRole}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171916] hover:underline"
                  >
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

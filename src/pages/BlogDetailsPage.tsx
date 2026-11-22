import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/clubData';
import { ResilientImage } from '../components/ResilientImage';

export function BlogDetailsPage() {
  const { slug } = useParams();
  const article = BLOG_ARTICLES.find((b) => b.slug === slug) || BLOG_ARTICLES[0];
  const others = BLOG_ARTICLES.filter((b) => b.id !== article.id).slice(0, 2);

  return (
    <main className="bg-[#F5F4EF] text-[#171916]">
      <section className="bg-[#171916] text-[#F5F4EF] py-14 lg:py-20 border-b border-[#272B24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#92958E] hover:text-[#C5F36A] mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <div className="text-xs text-[#92958E] mb-3">
            <span className="text-[#C5F36A] font-semibold uppercase tracking-wider">{article.category}</span>
            <span className="mx-2">·</span>
            <span>{article.publishedDate}</span>
            <span className="mx-2">·</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
            {article.title}
          </h1>
          <p className="text-sm text-[#92958E] mt-4">
            Written by <strong className="text-[#F5F4EF]">{article.author}</strong> · {article.authorRole}
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20 space-y-10">
        <div className="aspect-[16/9] overflow-hidden border border-[#DCDAD0]">
          <ResilientImage src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <p className="text-lg font-medium text-[#171916] leading-relaxed">{article.excerpt}</p>

        <div className="space-y-8">
          {article.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight">{sec.heading}</h2>
              <p className="text-base text-[#363932] leading-relaxed">{sec.body}</p>
            </section>
          ))}
        </div>

        <div className="bg-white border border-[#DCDAD0] p-7 space-y-3">
          <h3 className="font-display text-2xl font-bold uppercase">Coach Key Takeaways</h3>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#2A2D27]">
                <Check className="w-4 h-4 mt-0.5 text-[#171916] shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-[#D8D6CC]">
          <h3 className="font-display text-2xl font-bold uppercase mb-5">Continue Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white border border-[#DCDAD0] p-6 hover:border-[#171916] transition-colors"
              >
                <div className="text-xs text-[#5B5F57] mb-1.5">
                  {post.category} · {post.readTime}
                </div>
                <div className="font-display text-2xl font-bold uppercase">{post.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

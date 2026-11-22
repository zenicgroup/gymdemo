import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { BLOG_ARTICLES, FACILITY_ZONES, FAQ_ITEMS, TRAINING_PROGRAMS } from '../data/clubData';
import { useClub } from '../context/ClubContext';

interface SearchEntry {
  title: string;
  subtitle: string;
  section: string;
  to: string;
}

export function SearchModal() {
  const { searchOpen, setSearchOpen, trainers, classes } = useClub();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, setSearchOpen]);

  const index = useMemo<SearchEntry[]>(() => {
    return [
      ...TRAINING_PROGRAMS.map((p) => ({
        title: p.title,
        subtitle: `${p.level} · ${p.duration}`,
        section: 'Training Programs',
        to: `/training/${p.slug}`,
      })),
      ...classes.map((c) => ({
        title: c.name,
        subtitle: `${c.category} · ${c.durationMinutes} min`,
        section: 'Group Classes',
        to: '/classes',
      })),
      ...trainers.map((t) => ({
        title: t.name,
        subtitle: `${t.category} · ${t.experience}`,
        section: 'Coaching Team',
        to: `/trainers/${t.slug}`,
      })),
      ...FACILITY_ZONES.map((f) => ({
        title: f.name,
        subtitle: `${f.areaSqFt} · ${f.capacity}`,
        section: 'Club Facilities',
        to: '/facilities',
      })),
      ...BLOG_ARTICLES.map((b) => ({
        title: b.title,
        subtitle: `${b.category} · ${b.readTime}`,
        section: 'Journal',
        to: `/blog/${b.slug}`,
      })),
      ...FAQ_ITEMS.map((f) => ({
        title: f.question,
        subtitle: f.category,
        section: 'FAQ',
        to: '/faq',
      })),
    ];
  }, [trainers, classes]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    return index
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [index, query]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Search Forge Athletics"
    >
      <div className="w-full max-w-2xl bg-[#1F221D] border border-[#2E332B] text-[#F5F4EF] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2E332B]">
          <Search className="w-5 h-5 text-[#C5F36A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, trainers, classes, facilities, or articles..."
            className="w-full bg-transparent text-sm text-[#F5F4EF] placeholder:text-[#92958E] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="w-9 h-9 flex items-center justify-center text-[#92958E] hover:text-[#F5F4EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#2E332B]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#92958E]">
              No matching programs, coaches, or articles found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={`${item.to}-${idx}`}
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setQuery('');
                  navigate(item.to);
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#272A24] transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#F5F4EF] truncate">{item.title}</div>
                  <div className="text-xs text-[#92958E] mt-0.5 flex items-center gap-2">
                    <span className="text-[#C5F36A]">{item.section}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{item.subtitle}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#92958E] shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

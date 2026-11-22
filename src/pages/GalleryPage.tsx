import { useMemo, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { useClub } from '../context/ClubContext';
import type { GalleryItem } from '../types/forge';

const CATEGORIES = ['All', 'Architecture', 'Strength', 'Conditioning', 'Recovery'] as const;

export function GalleryPage() {
  const { gallery } = useClub();
  const [category, setCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => (category === 'All' ? gallery : gallery.filter((g) => g.category === category)),
    [gallery, category]
  );

  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Visual Archive"
        title="Inside Forge Athletics"
        description="Explore our strength floor, turf conditioning track, cedar recovery suite, and daily training atmosphere."
        breadcrumb="Gallery"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  category === cat
                    ? 'bg-[#C5F36A] text-[#171916]'
                    : 'bg-[#1F221D] text-[#92958E] border border-[#2C3029] hover:text-[#F5F4EF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
                className="group text-left bg-[#1F221D] border border-[#2E332B] overflow-hidden hover:border-[#C5F36A] transition-colors"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#141613]">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 w-9 h-9 bg-[#171916]/80 text-[#F5F4EF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#C5F36A] font-medium mb-1">{item.category}</div>
                  <h2 className="font-display text-2xl font-bold uppercase">{item.title}</h2>
                  <p className="text-xs text-[#92958E] mt-1">{item.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div className="max-w-4xl w-full bg-[#1F221D] border border-[#2E332B] overflow-hidden relative">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#171916]/85 text-[#F5F4EF] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] bg-[#141613]">
              <ResilientImage src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="text-xs text-[#C5F36A]">{activeItem.category}</div>
              <h3 className="font-display text-3xl font-bold uppercase mt-1">{activeItem.title}</h3>
              <p className="text-sm text-[#92958E] mt-1">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

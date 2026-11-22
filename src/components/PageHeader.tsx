import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  breadcrumb?: string;
}

export function PageHeader({ kicker, title, description, breadcrumb }: PageHeaderProps) {
  return (
    <section className="bg-[#171916] border-b border-[#272B24] py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {breadcrumb && (
          <div className="flex items-center gap-2 text-xs text-[#92958E] mb-6">
            <Link to="/" className="hover:text-[#F5F4EF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F5F4EF]">{breadcrumb}</span>
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-3">{kicker}</p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#F5F4EF] max-w-4xl leading-[0.95]">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-[#92958E] mt-5 max-w-2xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

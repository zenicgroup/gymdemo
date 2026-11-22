import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({ src, alt, className = '', priority = false }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#1F221D] text-[#92958E] border border-[#2C3029] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Dumbbell className="w-7 h-7 text-[#C5F36A] mb-2" />
        <span className="text-xs font-medium tracking-wide text-center text-[#F5F4EF]/80">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

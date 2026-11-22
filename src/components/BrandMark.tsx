export function BrandMark({ light = true }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="3" width="24" height="5" fill="#C5F36A" />
        <path d="M5 10H21L17.5 16H11V25H5V10Z" fill={light ? '#F5F4EF' : '#171916'} />
        <rect x="15" y="19" width="8" height="6" fill={light ? '#F5F4EF' : '#171916'} fillOpacity="0.45" />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-[0.06em] uppercase ${
          light ? 'text-[#F5F4EF]' : 'text-[#171916]'
        }`}
      >
        FORGE ATHLETICS
      </span>
    </span>
  );
}

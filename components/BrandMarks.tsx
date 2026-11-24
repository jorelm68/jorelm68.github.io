// The two apps' real logos, drawn inline so the page needs no extra requests.
// Parline: the staggered "P" of journal-entry rules, navy tile, maize bars.
// NONOZEMPIC: a calorie-progress ring around a leaf, on its green.

export function ParlineMark({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="rounded-xl">
      <rect width="48" height="48" fill="#1b3563" />
      <g fill="#efc23a">
        <rect x="11" y="8" width="20" height="5" rx="2.5" />
        <rect x="15" y="14.5" width="22" height="5" rx="2.5" />
        <rect x="11" y="21" width="16" height="5" rx="2.5" />
        <rect x="11" y="27.5" width="8" height="5" rx="2.5" />
        <rect x="11" y="34" width="8" height="5" rx="2.5" />
      </g>
    </svg>
  );
}

export function NonozempicMark({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} aria-hidden="true">
      <rect width="512" height="512" rx="116" fill="#2F7D4F" />
      <circle
        cx="256"
        cy="256"
        r="140"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="52"
        strokeLinecap="round"
        strokeDasharray="686 194"
        transform="rotate(-90 256 256)"
      />
      <g transform="rotate(32 256 256) translate(256 256) scale(1.2) translate(-256 -256)">
        <path d="M256 172C316 206 322 282 256 340C190 282 196 206 256 172Z" fill="#FFFFFF" />
        <path d="M256 202V322" stroke="#2F7D4F" strokeWidth="11" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ParlineWordmark() {
  return (
    <span className="font-serif text-[1.65rem] font-semibold leading-none tracking-tight text-[#1b3563]">Parline</span>
  );
}

export function NonozempicWordmark() {
  return (
    <span className="text-[1.05rem] font-extrabold leading-none tracking-[0.09em] text-[#14201a]">
      NONO<span className="text-[#2f7d4f]">ZEMPIC</span>
    </span>
  );
}

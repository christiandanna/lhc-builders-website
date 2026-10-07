/**
 * Every icon the site uses, inline. A whole icon library for five glyphs would
 * be dead weight.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowDown({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M8 2.5v11M4 9.5l4 4 4-4" />
    </svg>
  );
}

export function Plus({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M8 2.5v11M2.5 8h11" />
    </svg>
  );
}

export function Check({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} strokeWidth={2}>
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function Phone({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M5.4 2.5 3 3.4c-.6.2-1 .8-.9 1.4.4 3 1.6 5.2 3 6.7 1.4 1.4 3.7 2.6 6.7 3 .6.1 1.2-.3 1.4-.9l.9-2.4-3.1-1.6-1.3 1.4c-1-.5-1.8-1-2.4-1.6-.6-.6-1.1-1.4-1.6-2.4L7 5.6 5.4 2.5Z" />
    </svg>
  );
}

export function Mail({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="m2 4.5 6 4 6-4" />
    </svg>
  );
}

export function Pin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M8 14.5s5-4.3 5-8a5 5 0 0 0-10 0c0 3.7 5 8 5 8Z" />
      <circle cx="8" cy="6.4" r="1.8" />
    </svg>
  );
}

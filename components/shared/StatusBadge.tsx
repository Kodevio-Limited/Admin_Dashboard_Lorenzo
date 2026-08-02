'use client';

const variants: Record<string, string> = {
  green: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  red: 'bg-red-500/15 text-red-400',
  blue: 'bg-sky-500/15 text-sky-400',
  gray: 'bg-zinc-500/15 text-zinc-400',
};

export default function StatusBadge({
  label,
  variant = 'gray',
}: {
  label: string;
  variant?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] px-2.5 py-1 text-[12px] font-medium leading-[1.2] whitespace-nowrap ${
        variants[variant] ?? variants.gray
      }`}
    >
      {label}
    </span>
  );
}

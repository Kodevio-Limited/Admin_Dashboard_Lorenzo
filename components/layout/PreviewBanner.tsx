export default function PreviewBanner() {
  return (
    <div className="px-6 pt-4">
      <div className="rounded-[8px] border border-gold-mid/40 bg-gold-mid/10 px-4 py-2.5 flex items-center gap-2.5">
        <span
          className="inline-flex items-center rounded-[4px] px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase leading-[1.2] text-bg"
          style={{ background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)' }}
        >
          Demo data
        </span>
        <span className="text-[13px] font-normal text-dark-100 leading-[1.3]">
          Frontend preview — all clients, properties, reports, and field representatives shown are demonstration data. Live functionality arrives in the backend phase.
        </span>
      </div>
    </div>
  );
}

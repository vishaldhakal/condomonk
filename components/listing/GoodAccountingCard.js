import GoodAccountingNote from "../GoodAccountingNote";

// Good Accounting ad rendered as a regular grid card.
export default function GoodAccountingCard({ className = "flex" }) {
  return (
    <article
      className={`flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white text-black shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.18)] ${className}`}
    >
      <a
        href="https://goodaccounting.ca"
        target="_blank"
        rel="noopener sponsored"
        className="relative block min-h-[260px] flex-1 overflow-hidden bg-[#f8e7a0]"
      >
        <img
          src="/goodaccounting-new-ad.webp"
          alt="Good Accounting - Book a free 15 minute call with an accountant"
          width={1080}
          height={1500}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-black shadow-sm">
          Sponsored
        </span>
      </a>
      <div className="px-4 pb-4 [&>p]:mt-3">
        <GoodAccountingNote />
      </div>
    </article>
  );
}

import Link from "next/link";

const pillBase =
  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition";
const pillOn = "border-black bg-black text-white";
const pillOff = "border-[#ececec] bg-white text-black hover:border-black";

export const PRICE_FILTERS = [
  { value: "under-500k", label: "Under $500K" },
  { value: "under-600k", label: "Under $600K" },
  { value: "under-700k", label: "Under $700K" },
  { value: "under-800k", label: "Under $800K" },
  { value: "under-1-million", label: "Under $1M" },
  { value: "under-1.5-million", label: "Under $1.5M" },
];

/**
 * Pill filters (type + price) as plain links so every filter stays an
 * SEO-friendly page.
 * activeType: "all" | "condos" | "townhomes" | "detached"
 * activePrice: one of PRICE_FILTERS values, or null
 */
export default function ListingFilters({
  citySlug,
  cityName,
  activeType = "all",
  activePrice = null,
}) {
  const types = [
    { key: "all", label: "All", href: `/${citySlug}` },
    { key: "condos", label: "Condo", href: `/${citySlug}/condos` },
    { key: "townhomes", label: "Townhome", href: `/${citySlug}/townhomes` },
    { key: "detached", label: "Detached", href: `/${citySlug}/detached` },
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[#e7e9ee] pt-4">
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {types.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={`${pillBase} ${
              activeType === t.key && !activePrice ? pillOn : pillOff
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <span className="hidden h-5 w-px bg-[#e7e9ee] sm:block" />
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PRICE_FILTERS.map((p) => (
          <Link
            key={p.value}
            href={
              activePrice === p.value
                ? `/${citySlug}`
                : `/${citySlug}-homes-${p.value}`
            }
            className={`${pillBase} ${activePrice === p.value ? pillOn : pillOff}`}
          >
            {p.label}
          </Link>
        ))}
      </div>
      <span className="hidden h-5 w-px bg-[#e7e9ee] sm:block" />
      <Link
        href={`/assignment-sale/${citySlug}`}
        className={`${pillBase} ${pillOff}`}
      >
        {cityName} assignments
      </Link>
    </div>
  );
}

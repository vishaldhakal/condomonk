import Link from "next/link";
import { Newsreader } from "next/font/google";
import PreconExperts from "../PreconExperts";
import ListingFilters from "./ListingFilters";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/**
 * Compact, left-aligned intro used by every city listing page:
 * breadcrumb → serif title → description → experts → pill filters.
 * crumbs: [{ label, href? }] (Home is added automatically)
 */
export default function ListingHeader({
  crumbs = [],
  title,
  description,
  citySlug,
  cityName,
  activeType,
  activePrice,
}) {
  return (
    <section className="pt-7 pb-5">
      <nav
        aria-label="Breadcrumb"
        className="mb-3 flex items-center gap-1.5 text-[12px] text-black"
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {crumbs.map((c) => (
          <span key={c.label} className="flex items-center gap-1.5">
            <span>/</span>
            {c.href ? (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-black">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      <h1
        className={`${serif.className} text-[28px] font-bold leading-tight tracking-tight text-black sm:text-[38px] sm:leading-none`}
      >
        {title}
      </h1>

      {description && (
        <div className="mt-2.5 text-[14px] leading-relaxed text-black">
          {description}
        </div>
      )}

      <PreconExperts variant="compact" />

      <ListingFilters
        citySlug={citySlug}
        cityName={cityName}
        activeType={activeType}
        activePrice={activePrice}
      />
    </section>
  );
}

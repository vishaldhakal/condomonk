import Link from "next/link";
import MobileSidebarMenu from "./MobileSidebarMenu";

const nearbyCitiesOntario = {
  toronto: ["mississauga", "vaughan", "markham", "brampton", "richmond-hill"],
  mississauga: ["toronto", "brampton", "oakville", "vaughan", "burlington"],
  brampton: ["mississauga", "vaughan", "caledon", "toronto", "georgetown"],
  vaughan: ["toronto", "markham", "richmond-hill", "brampton", "king"],
  markham: ["richmond-hill", "vaughan", "pickering", "toronto", "whitchurch-stouffville"],
  "richmond-hill": ["vaughan", "markham", "aurora", "newmarket", "toronto"],
  oakville: ["burlington", "mississauga", "milton", "hamilton", "toronto"],
  burlington: ["oakville", "hamilton", "milton", "mississauga", "dundas"],
  hamilton: ["burlington", "dundas", "stoney-creek", "ancaster", "grimsby"],
  kitchener: ["waterloo", "cambridge", "guelph", "woolwich", "stratford"],
  waterloo: ["kitchener", "cambridge", "woolwich", "guelph", "wilmot"],
  london: ["st-thomas", "strathroy", "woodstock", "ingersoll", "komoka"],
  ottawa: ["kanata", "orleans", "nepean", "gloucester", "gatineau"],
};

const nearbyCitiesAlberta = {
  calgary: ["airdrie", "cochrane", "okotoks", "chestermere", "canmore"],
  edmonton: ["st-albert", "sherwood-park", "spruce-grove", "leduc", "fort-saskatchewan"],
};

const priceRanges = [
  { label: "Under $500K", value: "under-500k" },
  { label: "Under $600K", value: "under-600k" },
  { label: "Under $700K", value: "under-700k" },
  { label: "Under $800K", value: "under-800k" },
  { label: "Under $1M", value: "under-1-million" },
  { label: "Under $1.5M", value: "under-1.5-million" },
];

function capitalizeWords(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const sectionHeader =
  "text-sm font-semibold text-black mb-3 bg-[#f5f5f5] p-2 px-3 rounded-sm";
const linkStyle =
  "block text-sm text-gray-600 hover:text-gray-900 hover:underline py-0.5";

export default function RightSidebarLinks({
  cityName,
  citySlug,
  assignmentsCount,
}) {
  const isAlbertaCity = ["calgary", "edmonton"].includes(citySlug.toLowerCase());
  const nearbyCities = isAlbertaCity
    ? nearbyCitiesAlberta[citySlug.toLowerCase()] || []
    : nearbyCitiesOntario[citySlug.toLowerCase()] || [];

  const content = (
    <div className="space-y-1">
      {/* Alert Me */}
      <div className="bg-white rounded-lg p-4 pt-0">
        <p className="text-sm text-black mb-3">
          Be the first to hear about new properties
        </p>
        <Link
          href="#contact"
          className="w-fit bg-white border border-teal-400 text-teal-500 rounded-lg px-4 py-2.5 text-sm hover:bg-teal-50 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          Alert Me of New Properties
        </Link>
      </div>

      {/* Browse by Type */}
      <div className="bg-white rounded-lg p-4">
        <h2 className={sectionHeader}>
          {/* Pre Construction Homes in {cityName} by Type */}
          {cityName} Pre Construction Homes by Property Type
        </h2>
        <div className="space-y-1 ps-3">
          <h3 className="text-sm font-normal">
            <Link href={`/${citySlug}/condos`} className={linkStyle}>
              Pre Construction Condos in {cityName}
            </Link>
          </h3>
          <h3 className="text-sm font-normal">
            <Link href={`/${citySlug}/townhomes`} className={linkStyle}>
              Pre Construction Townhomes in {cityName}
            </Link>
          </h3>
          <h3 className="text-sm font-normal">
            <Link href={`/${citySlug}/detached`} className={linkStyle}>
              Pre Construction Detached Homes in {cityName}
            </Link>
          </h3>
        </div>
      </div>

      {/* Browse by Price */}
      <div className="bg-white rounded-lg p-4">
        <h2 className={sectionHeader}>
          {/* Pre Construction Homes in {cityName} by Price */}
          {cityName} New Homes by Budget — Find Your Price Range
        </h2>
        <div className="space-y-1 ps-3">
          {priceRanges.map((range) => (
            <h3 key={range.value} className="text-sm font-normal">
              <Link
                href={`/${citySlug}-homes-${range.value}`}
                className={linkStyle}
              >
                Pre Construction Homes {range.label} in {cityName}
              </Link>
            </h3>
          ))}
        </div>
      </div>

      {/* Invest in Off Plan */}
      <div className="bg-white rounded-lg p-4">
        <h2 className={sectionHeader}>Invest in Off Plan</h2>
        <div className="space-y-1 ps-3">
          <h3 className="text-sm font-normal">
            <Link href={`/${citySlug}`} className={linkStyle}>
              Off Plan Properties in {cityName}
            </Link>
          </h3>
          <h3 className="text-sm font-normal">
            <Link href={`/${citySlug}#upcoming`} className={linkStyle}>
              New Projects in {cityName}
            </Link>
          </h3>
        </div>
      </div>

      {/* Assignment Sales */}
      {assignmentsCount > 0 && (
        <div className="bg-white rounded-lg p-4">
          <h2 className={sectionHeader}>Assignment Sales</h2>
          <div className="ps-3">
            <h3 className="text-sm font-normal">
              <Link
                href={`/assignment-sale/${citySlug}`}
                className={linkStyle}
              >
                {assignmentsCount} Assignment Sale{assignmentsCount > 1 ? "s" : ""} in {cityName}
              </Link>
            </h3>
          </div>
        </div>
      )}

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <h2 className={sectionHeader}>Nearby Areas</h2>
          <div className="space-y-1 ps-3">
            {nearbyCities.slice(0, 4).map((city) => (
              <h3 key={city} className="text-sm font-normal">
                <Link href={`/${city}`} className={linkStyle}>
                  {capitalizeWords(city)}
                </Link>
              </h3>
            ))}
            <Link
              href="/cities"
              className="block text-sm text-teal-600 hover:underline mt-1"
            >
              View All Cities →
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: client-side sliding panel */}
      <MobileSidebarMenu>{content}</MobileSidebarMenu>

      {/* Desktop: static sidebar */}
      <div className="hidden lg:block">{content}</div>
    </>
  );
}

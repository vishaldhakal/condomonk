const PARTNERS_URL = "https://admin.homebaba.ca/api/partners/";

async function getActivePartners() {
  try {
    const res = await fetch(PARTNERS_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return [];

    const data = await res.json();
    const partners = Array.isArray(data) ? data : data?.partners;
    return Array.isArray(partners)
      ? partners.filter((partner) => partner?.is_active && partner?.name)
      : [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

const VerifiedBadge = () => (
  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" aria-label="Verified">
    <path
      fill="#1d9bf0"
      d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z"
    />
    <path fill="#fff" d="m9.6 16.6-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4z" />
  </svg>
);

function CompactExperts({ partners }) {
  return (
    <section aria-labelledby="precon-experts-title" className="mt-5">
      <h2
        id="precon-experts-title"
        className="mb-2.5 text-[13px] font-medium text-black"
      >
        Pre construction experts
      </h2>
      <ul className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {partners.map((partner) => (
          <li
            key={partner.email || partner.name}
            className="group flex shrink-0 items-center gap-3 py-1 pr-6 text-left text-black"
          >
            {partner.image ? (
              <img
                src={partner.image}
                alt={partner.name}
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-full bg-slate-100 object-cover object-top transition group-hover:scale-105"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-gray-600"
              >
                {getInitials(partner.name)}
              </span>
            )}
            <span className="leading-tight">
              <span className="flex items-center gap-1">
                <span className="max-w-[170px] truncate text-[14px] font-semibold">
                  {partner.name}
                </span>
                <VerifiedBadge />
              </span>
              <span className="mt-1 block whitespace-nowrap text-[11px] text-black">
                {partner.brokerage_name || "Pre construction expert"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function PreconExperts({ variant = "default" }) {
  const partners = await getActivePartners();
  if (partners.length === 0) return null;
  if (variant === "compact") return <CompactExperts partners={partners} />;

  return (
    <section aria-labelledby="precon-experts-title" className="mt-5 md:mt-6">
      <h2
        id="precon-experts-title"
        className="text-sm md:text-lg font-semibold text-gray-900"
      >
        Pre construction experts to assist you
      </h2>
      <ul className="mt-3 flex gap-3 md:gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {partners.map((partner) => (
          <li
            key={partner.email || partner.name}
            className="flex w-20 md:w-28 shrink-0 flex-col items-center text-center"
          >
            {partner.image ? (
              <img
                src={partner.image}
                alt={partner.name}
                width={96}
                height={96}
                loading="lazy"
                className="h-[72px] w-[72px] md:h-24 md:w-24 rounded-full border border-gray-200 bg-gray-100 object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-[72px] w-[72px] md:h-24 md:w-24 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600"
              >
                {getInitials(partner.name)}
              </span>
            )}
            <span className="mt-2 line-clamp-2 text-xs md:text-sm font-medium leading-tight text-gray-800">
              {partner.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

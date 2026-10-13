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

export default async function PreconExperts() {
  const partners = await getActivePartners();
  if (partners.length === 0) return null;

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

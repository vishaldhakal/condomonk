import Link from "next/link";

export default function OntarioPage() {
  // Property types with their corresponding URL paths and labels
  const propertyTypes = [
    { path: "detached-homes", label: "Detached Homes" },
    { path: "semi-detached-homes", label: "Semi-Detached Homes" },
    { path: "townhouses", label: "Townhouses" },
    { path: "condo-townhouses", label: "Condo Townhouses" },
    { path: "condos", label: "Condos" },
  ];

  // Price ranges
  const priceRanges = [
    { path: "under-500k", label: "Under $500k" },
    { path: "between-500k-750k", label: "Between $500k-$750k" },
    { path: "between-750k-1000k", label: "Between $750k-$1M" },
    { path: "over-1000k", label: "Over $1M" },
  ];

  // Cities in Ontario
  const cities = [
    "Toronto",
    "Ottawa",
    "Mississauga",
    "Brampton",
    "Hamilton",
    "London",
    "Markham",
    "Vaughan",
    "Kitchener",
    "Windsor",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Ontario Real Estate</h1>

      {/* Property Types Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by Property Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertyTypes.map((type) => (
            <Link
              key={type.path}
              href={`/resale/ontario/${type.path}-for-sale`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {type.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Price Ranges Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by Price</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priceRanges.map((range) => (
            <Link
              key={range.path}
              href={`/resale/ontario/homes-${range.path}-for-sale`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {range.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Cities Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by City</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/resale/ontario/${city.toLowerCase()}/homes-for-sale`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Combinations Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Searches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/resale/ontario/toronto/condos-under-500k-for-sale"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Toronto Condos Under $500k
          </Link>
          <Link
            href="/resale/ontario/ottawa/detached-homes-for-sale"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ottawa Detached Homes
          </Link>
          <Link
            href="/resale/ontario/mississauga/townhouses-for-sale"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Mississauga Townhouses
          </Link>
        </div>
      </section>

      {/* For Lease Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Rental Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/resale/ontario/homes-for-lease"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            All Rental Properties
          </Link>
          <Link
            href="/resale/ontario/condos-for-lease"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Condos for Rent
          </Link>
          <Link
            href="/resale/ontario/houses-for-lease"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Houses for Rent
          </Link>
        </div>
      </section>
    </div>
  );
}

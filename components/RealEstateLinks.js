import Link from "next/link";

export default function RealEstateLinks({ city = "Ontario" }) {
  // List of cities to display in the grid
  const cities = [
    "Ajax",
    "Barrie",
    "Belleville",
    "Brampton",
    "Brant",
    "Brantford",
    "Burlington",
    "Cambridge",
    "Etobicoke",
    "Guelph",
    "Hamilton",
    "Kingston",
    "Kitchener",
    "London",
    "Markham",
    "Milton",
  ];

  // Function to generate the correct URL based on city
  const getUrl = (path) => {
    if (city.toLowerCase() === "ontario") {
      return `/resale/ontario/${path}`;
    }
    return `/resale/ontario/${city.toLowerCase()}/${path}`;
  };

  return (
    <div className="my-10 border-t border-b py-6">
      <h2 className="text-xl md:text-4xl font-bold mb-4">
        {city} Real Estate | Homes for Sale
      </h2>
      <p className="mb-6 text-sm md:text-base">
        Explore detached, semi-detached, townhomes & condos for sale in {city}.
        Open houses available. Price Dropped Homes Available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Property Type Column */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {city} Homes by Property Type
          </h3>
          <ul className="space-y-1 px-0">
            <li>
              <Link
                href={getUrl("detached-homes-for-sale")}
                className="text-black hover:underline text-sm"
              >
                Detached homes for sale in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("semi-detached-homes-for-sale")}
                className="text-black hover:underline text-sm"
              >
                Semi-Detached homes for sale in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("townhomes-for-sale")}
                className="text-black hover:underline text-sm"
              >
                Townhomes for sale in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("condo-townhomes-for-sale")}
                className="text-black hover:underline text-sm"
              >
                Condo Townhomes for sale in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("condos-for-sale")}
                className="text-black hover:underline text-sm"
              >
                Condos for sale in {city}
              </Link>
            </li>
          </ul>
        </div>

        {/* Price Range Column */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {city} Homes by Price Range
          </h3>
          <ul className="space-y-1 px-0">
            <li>
              <Link
                href={getUrl("homes-for-sale-under-500k")}
                className="text-black hover:underline text-sm"
              >
                Homes Under $500k in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("homes-for-sale-between-500k-750k")}
                className="text-black hover:underline text-sm"
              >
                Homes Between $500k-$750k in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("homes-for-sale-between-750k-1m")}
                className="text-black hover:underline text-sm"
              >
                Homes Between $750k-$1M in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("homes-for-sale-between-1m-1.5m")}
                className="text-black hover:underline text-sm"
              >
                Homes Between $1M-$1.5M in {city}
              </Link>
            </li>
            <li>
              <Link
                href={getUrl("homes-for-sale-over-1.5m")}
                className="text-black hover:underline text-sm"
              >
                Homes Over $1.5M in {city}
              </Link>
            </li>
          </ul>
        </div>

        {/* Bedrooms & Bathrooms Column */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {city} Homes by Bedrooms & Bathrooms
          </h3>
          <div className="grid grid-cols-2 gap-x-2">
            <ul className="space-y-1 px-0">
              <li>
                <Link
                  href={getUrl("1-plus-bed-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  1+ Bed homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("2-plus-bed-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  2+ Beds homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("3-plus-bed-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  3+ Beds homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("4-plus-bed-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  4+ Beds homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("5-plus-bed-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  5+ Beds homes in {city}
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link
                  href={getUrl("1-plus-bath-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  1+ Bath homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("2-plus-bath-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  2+ Baths homes in {city}
                </Link>
              </li>
              <li>
                <Link
                  href={getUrl("3-plus-bath-homes-for-sale")}
                  className="text-black hover:underline text-sm"
                >
                  3+ Baths homes in {city}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Price Dropped and Open Houses Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-3">
          Price Dropped and Open Houses in {city}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2  max-w-2xl">
          <Link
            href={getUrl("open-houses")}
            className="text-black hover:underline text-sm"
          >
            Open houses in {city}
          </Link>
          <Link
            href={getUrl("price-reduced-homes")}
            className="text-black hover:underline text-sm"
          >
            Price dropped homes in {city}
          </Link>
        </div>
      </div>

      {/* Cities Grid Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">
          Explore Homes for Sale Nearby {city}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
          {cities.map((cityName) => (
            <div key={cityName} className="mb-2">
              <h4 className="font-bold mb-2 text-lg">
                Homes for Sale in {cityName}
              </h4>
              <p className="text-base text-black mb-1 font-semibold">
                By Property Types
              </p>
              <ul className="text-sm space-y-1 px-0">
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/detached-homes-for-sale`}
                    className="text-black hover:underline"
                  >
                    Detached homes for sale in {cityName}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/semi-detached-homes-for-sale`}
                    className="text-black hover:underline"
                  >
                    Semi-Detached homes for sale in {cityName}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/townhomes-for-sale`}
                    className="text-black hover:underline"
                  >
                    Townhomes for sale in {cityName}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/condo-townhomes-for-sale`}
                    className="text-black hover:underline"
                  >
                    Condo Townhomes for sale in {cityName}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/condos-for-sale`}
                    className="text-black hover:underline"
                  >
                    Condos for sale in {cityName}
                  </Link>
                </li>
              </ul>
              <p className="text-base text-black mt-2 mb-1 font-bold">
                Featured
              </p>
              <ul className="text-sm space-y-1 px-0">
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/open-houses`}
                    className="text-black hover:underline"
                  >
                    Open houses in {cityName}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/resale/ontario/${cityName
                      .toLowerCase()
                      .replace(/ /g, "-")}/price-reduced-homes`}
                    className="text-black hover:underline"
                  >
                    Price dropped homes in {cityName}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* View More Cities Link */}
        <div className="mt-4">
          <Link
            href="/resale/ontario"
            className="text-black font-medium flex items-center"
          >
            View More Cities →
          </Link>
        </div>
      </div>
    </div>
  );
}

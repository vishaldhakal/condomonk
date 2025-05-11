import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import Image from "next/legacy/image";
import CityDirectory from "@/components/CityDirectory";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import GoogleMap from "@/components/GoogleMap";
import PreconstructionFilter from "@/components/PreconstructionFilter";

// Data fetching functions
async function getData(city, priceFilter = null) {
  let url = `https://api.condomonk.ca/api/preconstructions-city/${city}`;

  if (priceFilter) {
    if (priceFilter === "under-500k") {
      url += "?price_starting_from=0&price_to=500000";
    } else if (priceFilter === "under-600k") {
      url += "?price_starting_from=0&price_to=600000";
    } else if (priceFilter === "under-700k") {
      url += "?price_starting_from=0&price_to=700000";
    } else if (priceFilter === "under-800k") {
      url += "?price_starting_from=0&price_to=800000";
    } else if (priceFilter === "under-1-million") {
      url += "?price_starting_from=0&price_to=1000000";
    } else if (priceFilter === "under-1.5-million") {
      url += "?price_starting_from=0&price_to=1500000";
    } else {
      const [min, max] = priceFilter.split("-").map((p) => parseInt(p) * 1000);
      url += `?price_starting_from=${min}&price_to=${max}`;
    }
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getFeaturedData(city) {
  const res = await fetch(
    `https://api.condomonk.ca/api/preconstructions-city/${city}?is_featured=true`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getAssignments(city) {
  let cityFormat = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  try {
    const res = await fetch(
      `https://api.toassign.com/public/assignments?status=Available&regions=${cityFormat}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return { data: [] };
    }
    return res.json();
  } catch (error) {
    console.error(`Error loading assignments for ${city}:`, error);
    return { data: [] };
  }
}

// Helper functions
const CapitalizeFirst = (city) => {
  return (
    city.split("-")[0].charAt(0).toUpperCase() + city.split("-")[0].slice(1)
  );
};

function getCleanCity(city) {
  return city.split("-homes-")[0];
}

function formatPriceFilter(filter) {
  if (!filter) return "";

  switch (filter) {
    case "under-500k":
      return "Under $500K";
    case "under-600k":
      return "Under $600K";
    case "under-700k":
      return "Under $700K";
    case "under-800k":
      return "Under $800K";
    case "under-1-million":
      return "Under $1M";
    case "under-1.5-million":
      return "Under $1.5M";
    default:
      return filter
        .replace("-", " to $")
        .replace("k", ",000")
        .replace("M", " million");
  }
}

function getSEOParagraph(cleanCity, priceFilter) {
  if (!priceFilter) return null;

  const cityName = CapitalizeFirst(cleanCity);
  const priceDesc = formatPriceFilter(priceFilter);

  return `Discover an extensive selection of pre construction homes in ${cityName} ${priceDesc}. Our curated list showcases the latest developments, offering a range of options from affordable condos to luxurious townhomes. Whether you're a first-time buyer or looking to invest, these new construction properties in ${cityName} provide excellent opportunities in various neighborhoods.`;
}

function getPriceFilter(city) {
  const priceFilters = [
    "under-500k",
    "under-600k",
    "under-700k",
    "under-800k",
    "under-1-million",
    "under-1.5-million",
  ];
  for (const filter of priceFilters) {
    if (city.endsWith(`-homes-${filter}`)) {
      return filter;
    }
  }
  return null;
}

// Metadata generation
export async function generateMetadata({ params }, parent) {
  const { city } = params;
  const cleanCity = getCleanCity(city);
  const data = await getData(cleanCity);

  const title = `120+ Pre construction Homes in ${CapitalizeFirst(cleanCity)}`;
  const description = `120+ Pre Construction Homes & New Developments in ${CapitalizeFirst(
    cleanCity
  )} | Check out plans, pricing, and availability`;

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${city}`,
    },
    metadataBase: new URL("https://condomonk.ca"),
    title,
    description,
  };
}

// Main page component
export default async function CityPage({ params }) {
  const { city } = params;
  const cleanCity = getCleanCity(city);
  const priceFilter = getPriceFilter(city);

  // Parallel data fetching
  const [data, featuredData, assignments] = await Promise.all([
    getData(cleanCity, priceFilter),
    getFeaturedData(cleanCity),
    getAssignments(cleanCity),
  ]);

  // Filter projects by status
  const filteredProjects = (status) => {
    return data.preconstructions.filter((item) => item.status === status);
  };

  // Prepare city directory data
  const cityDirectoryData = {
    city_data: {
      project_types: [
        ...new Set(data.preconstructions.map((p) => p.project_type)),
      ],
      status_summary: {},
    },
    all_projects: data.preconstructions.map((p) => ({
      id: p.id,
      project_name: p.project_name || "",
      slug: p.slug || "",
      developer_name: p.developer_name || "Unknown Developer",
      project_type: p.project_type || "",
      status: p.status || "",
    })),
  };

  return (
    <div className="pt-4 lg:pt-8 bg-white">
      <div className=" max-w-[1370px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-start">
            <h1 className="text-xl md:text-4xl font-bold ">
              {priceFilter
                ? `Pre construction Homes in ${CapitalizeFirst(
                    cleanCity
                  )} ${formatPriceFilter(priceFilter)}`
                : `120+ Pre Construction Homes in ${CapitalizeFirst(
                    cleanCity
                  )}`}
            </h1>
          </div>

          <h2 className="text-[8px] md:text-sm text-gray-500">
            120+ Pre construction Homes in {CapitalizeFirst(cleanCity)}, ON |
            Explore Floor Plans, Pricing & Availability. Condomonk has over 120
            pre construction homes in {CapitalizeFirst(cleanCity)}, ON.
            Condomonk is your trusted platform for new pre construction across
            Canada. Select from updated database of
            <Link
              href={`/${cleanCity}/condos`}
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 px-1"
            >
              condos,
            </Link>
            <Link
              href={`/${cleanCity}/townhomes`}
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
            >
              townhomes
            </Link>
            , and
            <Link
              href={`/${cleanCity}/detached`}
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 px-1"
            >
              detached pre construction homes
            </Link>
            from
            <Link
              href="/builders"
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 px-1"
            >
              high-rated builders
            </Link>
            , with pricing customized for both first-time buyers and seasoned
            investors. Our listings are updated daily, giving you the latest
            <Link
              href={`/${cleanCity}/upcoming`}
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 px-1"
            >
              upcoming pre construction projects.
            </Link>
            Easily filter by no of bedrooms (1 to 4+), project type, and
            construction status from budget-friendly condo to a pre construction
            homes,
            <Link
              href="#contact"
              className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 px-1"
            >
              contact us
            </Link>
            to connect you to the most exciting real estate opportunities in{" "}
            {CapitalizeFirst(cleanCity)}.
            <div className="text-gray-600 mt-2 mb-3">
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date().toLocaleDateString("en-CA", {
                timeZone: "America/Toronto",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </h2>
        </div>

        {/* Filter Section */}
        <div className="sticky top-0 bg-white z-10 md:py-4 py-2 mt-4">
          <PreconstructionFilter
            cityName={CapitalizeFirst(params.city)}
            citySlug={params.city.split("-homes-")[0]}
          />
        </div>

        {/* Combined Projects Grid */}
        <div
          id="selling"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:mt-8 mt-0"
        >
          {/* Featured Projects First */}
          {featuredData.preconstructions?.map((item, index) => (
            <div key={item.id}>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(PreconSchema(item)),
                }}
              />
              <div className="priority-content">
                <CondoCard
                  {...item}
                  no={index}
                  priority={(index < 4).toString()}
                />
              </div>
            </div>
          ))}

          {/* Non-Featured Selling Projects */}
          {filteredProjects("Selling")
            .filter(
              (item) =>
                !featuredData.preconstructions?.some(
                  (featured) => featured.id === item.id
                )
            )
            .map((item, index) => (
              <div key={item.id}>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(PreconSchema(item)),
                  }}
                />
                <CondoCard
                  {...item}
                  no={index + (featuredData.preconstructions?.length || 0)}
                  priority="false"
                />
              </div>
            ))}
        </div>

        {/* Upcoming Projects */}
        {filteredProjects("Upcoming").length > 0 && (
          <div id="upcoming">
            <h3 className="text-2xl md:text-3xl font-bold pt-32 mb-8">
              Launching Soon - New Pre Construction Homes in{" "}
              {CapitalizeFirst(cleanCity)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProjects("Upcoming").map((item, index) => (
                <div key={item.id}>
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sold Out Projects */}
        {filteredProjects("Sold out").length > 0 && (
          <div id="soldout">
            <h3 className="text-2xl font-bold mt-16 mb-8 italic text-red-600">
              Past Communities in {CapitalizeFirst(cleanCity)} - Sold out
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProjects("Sold out").map((item, index) => (
                <div key={item.id}>
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments Section */}
        {assignments.data?.length > 0 && (
          <div className="pt-32">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Assignment Sales in {CapitalizeFirst(cleanCity)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {assignments.data.map((assignment, index) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Google Map Section */}
        <div className="pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold">
                Check Out Pre Construction Homes in {CapitalizeFirst(cleanCity)}{" "}
                Area
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Explore new developments and ideal locations for your future
                home
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <GoogleMap
                location={`${CapitalizeFirst(cleanCity)}, Ontario, Canada`}
                width="100%"
                height={500}
                zoom={12}
              />
            </div>
          </div>
        </div>
        <div className="pt-5 mt-5"></div>
        <div className="flex justify-center items-center max-w-7xl mx-auto px-4 md:px-6 mt-10 mb-16">
          <div className="max-w-6xl mt-14">
            <h2 className="text-sm md:text-3xl text-left font-semibold leading-normal mb-4">
              Pre Construction Home in {CapitalizeFirst(params.city)} – Explore
              New Upcoming Projects, Prices Ranges & Floor Plans
            </h2>

            <p className="mb-2">
              Looking for the ideal pre construction home in{" "}
              {CapitalizeFirst(params.city)}? You have found the right place.
              The pre construction home market in {CapitalizeFirst(params.city)}{" "}
              is booming, with new projects going up in top neighbourhoods such
              as Seton, Belmont, and Downtown. Searching for a stylish condo or
              a big detached house, you can find more than{" "}
              {data.preconstructions.length}+ pre construction homes in{" "}
              {CapitalizeFirst(params.city)} available on Condomonk.
            </p>

            <p className="mb-2">
              A pre construction home in {CapitalizeFirst(params.city)} provides
              the option to personalize your ideal space at competitive pricing
              with contemporary features. 1-bedroom to 3+ bedroom houses, the
              choices are unparalleled. Top builders are providing pre
              construction houses in {CapitalizeFirst(params.city)} with
              versatile floor plans, efficient designs, and family-orientated
              layouts to fit any lifestyle.
            </p>

            <p className="mb-2">
              Investing in a {CapitalizeFirst(params.city)} pre construction
              home provides you with early availability of pricing, incentives,
              and the top units in emerging communities. Discover floor plans in
              precise detail, handover dates estimated, and builder portfolios —
              everything under one roof. Whether you're purchasing your first
              home or growing your portfolio, a {CapitalizeFirst(params.city)}{" "}
              pre construction home is a sound decision.
            </p>

            <p className="mb-2">
              Begin your search now — view the newest listings for a pre
              construction home in {CapitalizeFirst(params.city)}, compare
              projects, and speak with reliable local real estate professionals.
              Get first access to exclusive listings and find your dream pre
              construction home in {CapitalizeFirst(params.city)} at Condomonk.
            </p>
          </div>
        </div>

        <CityDirectory
          cityData={cityDirectoryData}
          cityName={CapitalizeFirst(cleanCity)}
          citySlug={cleanCity}
        />

        {/* Contact Form */}
        <div className="py-16" id="contact">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact bottom"
              width={300}
              height={250}
              className="mx-auto w-1/4 mb-8"
            />
            <h3 className="text-2xl font-bold mb-8">
              Looking to buy a preconstruction home in{" "}
              {CapitalizeFirst(cleanCity)}?
            </h3>
            <BottomContactForm proj_name="All" city="Home Page" />
          </div>
        </div>

        {/* Newsletter */}
        <Newsletter />

        {/* SEO Content */}
        {getSEOParagraph(cleanCity, priceFilter) && (
          <div className="mt-16 text-center">
            <p className="text-sm bg-gray-50 p-6 rounded-xl">
              {getSEOParagraph(cleanCity, priceFilter)}
            </p>
          </div>
        )}

        {/* City Details */}
        {data.city && (
          <div className="py-16">
            <div className="prose max-w-none px-3 mt-8">
              <div
                dangerouslySetInnerHTML={{ __html: data.city.details }}
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg rich-text"
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-8">
              Note:{" "}
              <Link href="https://condomonk.ca/" className="text-blue-600">
                Condomonk
              </Link>{" "}
              is Canada's leading database of new pre construction homes.
              Information may be outdated or inaccurate. Please contact a
              licensed real estate agent for updated information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Static params generation for static site generation
export async function generateStaticParams() {
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json()
  );

  const priceRanges = [
    "under-500k",
    "under-1m",
    "under-1.5m",
    "over-700k",
    "500k-600k",
    "600k-700k",
  ];

  return cities.flatMap((city) => [
    { city: city.slug },
    ...priceRanges.map((price) => ({ city: `${city.slug}-homes-${price}` })),
  ]);
}

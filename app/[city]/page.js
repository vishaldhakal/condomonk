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
import ExpandableDescription from "@/components/ExpandableDescription";
import CombinedPopupManager from "@/components/CombinedPopupManager";
import BlogCard from "@/components/BlogCard";
import { fetchBlogPostByCity } from "@/api/blogs";

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

  const title = !["calgary", "edmonton"].includes(city)
    ? `120+ Pre construction Homes in ${CapitalizeFirst(cleanCity)}`
    : `${CapitalizeFirst(
        cleanCity
      )} Pre Construction & New Homes For Sale | Condomonk`;
  const description = !["calgary", "edmonton"].includes(city)
    ? `120+ Pre Construction Homes & New Developments in ${CapitalizeFirst(
        cleanCity
      )} | Check out plans, pricing, and availability`
    : `Find new homes for sale in ${CapitalizeFirst(
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
  const [data, featuredData, assignments, cityBlogs] = await Promise.all([
    getData(cleanCity, priceFilter),
    getFeaturedData(cleanCity),
    getAssignments(cleanCity),
    fetchBlogPostByCity(cleanCity),
  ]);

  const latestCityBlogs = Array.isArray(cityBlogs)
    ? [...cityBlogs].sort(
        (a, b) =>
          new Date(b?.date_of_upload || b?.created_at || 0) -
          new Date(a?.date_of_upload || a?.created_at || 0)
      )
    : [];

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

  const generateTitle = () => {
    if (city == "calgary" || city == "edmonton") {
      return (
        <>
          Pre Construction & New Homes for sale in{" "}
          <span className="text-red-500">{CapitalizeFirst(city)}</span>, AB
        </>
      );
    }
    return priceFilter ? (
      <>
        Pre construction Homes in{" "}
        <span className="text-red-500">{CapitalizeFirst(cleanCity)}</span>{" "}
        {formatPriceFilter(priceFilter)}
      </>
    ) : (
      <>
        120+ Pre Construction Homes in{" "}
        <span className="text-red-500">{CapitalizeFirst(cleanCity)}</span>
      </>
    );
  };

  const generateSubtitle = () => {
    if (city == "calgary" || city == "edmonton") {
      return `100+ new homes in ${CapitalizeFirst(
        city
      )}, AB | Explore Floor Plans, Pricing & Availability. Condomonk has over 120 new  construction homes from trusted builders in ${CapitalizeFirst(
        city
      )}, AB. If you are looking to buy new  homes, Condomonk is your trusted platform to find 1000+  homes for sale in ${CapitalizeFirst(
        city
      )}. Whether you are looking to downsize to buy townhomes for sale in ${CapitalizeFirst(
        city
      )} or looking to buy condos in ${CapitalizeFirst(
        city
      )} for your family or browsing ${CapitalizeFirst(
        city
      )} detached homes for sale, our platform is updated daily with latest resale listings every hour. For new development homes, easily filter by number of bedrooms (1 to 4+), project type, and construction status from budget-friendly condo to a pre construction homes, contact us to connect you to the most exciting real estate opportunities in ${CapitalizeFirst(
        city
      )}.`;
    }
    return (
      <>
        120+ Pre construction Homes in {CapitalizeFirst(cleanCity)}, ON |
        Explore Floor Plans, Pricing & Availability. Condomonk has over 120 pre
        construction homes from trusted{" "}
        <Link
          href={`/builders`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          builders in {CapitalizeFirst(cleanCity)}, ON.
        </Link>{" "}
        If you are looking to buy resale homes, Condomonk is your trusted
        platform to find{" "}
        <Link
          href={`/resale/ontario/${cleanCity}/homes-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          1000+ homes for sale in {CapitalizeFirst(cleanCity)}.{" "}
        </Link>
        Whether you are looking to downsize to buy{" "}
        <Link
          href={`/resale/ontario/${cleanCity}/townhomes-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          townhomes for sale in {CapitalizeFirst(cleanCity)}
        </Link>{" "}
        or looking to buy{" "}
        <Link
          href={`/resale/ontario/${cleanCity}/condos-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          condos in {CapitalizeFirst(cleanCity)}
        </Link>{" "}
        for your family or browsing{" "}
        <Link
          href={`/resale/ontario/${cleanCity}/detached-homes-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          {CapitalizeFirst(cleanCity)} detached homes for sale
        </Link>
        , our platform is updated daily with latest resale listings every hour.
        For new development homes, easily filter by number of bedrooms (1 to
        4+), project type, and construction status from budget-friendly condo to
        a pre construction homes,{" "}
        <Link
          href="#contact"
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          contact us
        </Link>{" "}
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
      </>
    );
  };

  return (
    <div className="pt-4 lg:pt-8 bg-white">
      {/* Add the CityPopup component */}
      <CombinedPopupManager cityName={params.city} />

      <div className="max-w-[85.625rem] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col ">
          <div className="flex">
            <h1 className="text-xl md:text-4xl font-bold mb-0">
              {generateTitle()}
            </h1>
          </div>

          <h2 className="text-[8px] md:text-sm text-gray-500  mt-0 md:pt-4 pt-0">
            <ExpandableDescription>{generateSubtitle()}</ExpandableDescription>
          </h2>
        </div>

        {/* Filter Section */}

        <div className="sticky z-50 bg-white pt-2 pb-2 md:pt-3 md:pb-3  md:z-[999] -top-14 -mx-4 h-30 md:h-20 md:mt-0">
          <div className="flex justify-start px-4">
            <PreconstructionFilter
              cityName={CapitalizeFirst(params.city)}
              citySlug={params.city.split("-homes-")[0]}
            />
          </div>
        </div>
        <div>
          <p className="pt-2">
            Showing result{" "}
            <span className="font-semibold">25 of 100 new homes</span>
          </p>
        </div>
        {/* Combined Projects Grid */}
        <div
          id="selling"
          className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-x-3 md:mt-3 mt-0 mt-0 mx-2"
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

        {/* Latest News and Insight */}
        {latestCityBlogs?.length > 0 && (
          <div className="pt-32">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Latest News and Insight in {CapitalizeFirst(cleanCity)}
              </h3>
              <Link
                href={`/blogs/category/${cleanCity}`}
                className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800 text-sm md:text-base"
              >
                View all blogs in {CapitalizeFirst(cleanCity)} ➟
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {latestCityBlogs.slice(0, 5).map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Google Map Section */}
        <div className="pt-32">
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
            <div className="w-full overflow-x-auto">
              <div
                dangerouslySetInnerHTML={{ __html: data.city.details }}
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg [&_table]:!border [&_table]:!border-collapse [&_table]:!border-solid [&_table]:!border-black [&_th]:!border [&_th]:!border-solid [&_th]:!border-black [&_th]:!p-2 [&_td]:!border [&_td]:!border-solid [&_td]:!border-black [&_td]:!p-2 [&_tr]:!border [&_tr]:!border-solid [&_tr]:!border-black rich-text"
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-8">
              Disclaimer: The content on this page is curated from various
              reputable online sources, including blogs, news outlets, and real
              estate boards. While our content writer team at{" "}
              <Link className="text-blue-500" href="https://condomonk.ca/">
                {" "}
                Condomonk.ca
              </Link>{" "}
              strives to present valuable information, we do not guarantee its
              accuracy or completeness. Some information could be prone to error
              and some details may be outdated, and the content should not be
              considered professional advice. For the most accurate and
              personalized guidance, please consult a licensed real estate agent
              or broker.
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

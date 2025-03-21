import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import Image from "next/legacy/image";

async function getData(city, priceFilter = null) {
  let url = `https://api.condomonk.ca/api/preconstructions-city/${city}`;

  if (priceFilter) {
    if (priceFilter === "under-500k") {
      url += "?price_to=500000";
    } else if (priceFilter === "under-1-million") {
      url += "?price_to=1000000";
    } else if (priceFilter === "under-1.5-million") {
      url += "?price_to=1500000";
    } else if (priceFilter === "over-700k") {
      url += "?price_starting_from=700000";
    } else {
      const [min, max] = priceFilter.split("-").map((p) => parseInt(p) * 1000);
      url += `?price_starting_from=${min}&price_to=${max}`;
    }
  }

  const res = await fetch(url, {
    next: {
      revalidate: 3600, // Cache for 1 hour
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getFeaturedData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" +
      city +
      "?is_featured=true",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const CapitalizeFirst = (city) => {
  return (
    city.split("-")[0].charAt(0).toUpperCase() + city.split("-")[0].slice(1)
  );
};

export async function generateMetadata({ params }, parent) {
  const { city } = params;
  const cleanCity = getCleanCity(city);
  const data = await getData(cleanCity);

  let title, description;
  title = `${
    data.preconstructions.length
  }+ Pre construction Homes in  ${CapitalizeFirst(cleanCity)}`;
  description = `${
    data.preconstructions.length
  } Pre Construction homes in ${CapitalizeFirst(
    cleanCity
  )}. View floor plans, pricing, map & availability. Check the latest ${CapitalizeFirst(
    cleanCity
  )} pre construction home projects.`;

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${city}`,
    },
    title,
    description,
  };
}

function getPriceFilter(city) {
  const priceFilters = [
    "under-500k",
    "under-1-million",
    "under-1.5-million",
    "over-700k",
    "500k-600k",
    "600k-700k",
  ];
  for (const filter of priceFilters) {
    if (city.endsWith(`-homes-${filter}`)) {
      return filter;
    }
  }
  return null;
}

function getCleanCity(city) {
  return city.split("-homes-")[0];
}

export default async function Home({ params }) {
  const priceFilter = getPriceFilter(params.city);
  const cleanCity = getCleanCity(params.city);
  const data = await getData(cleanCity, priceFilter);
  const featured_data = await getFeaturedData(cleanCity);

  // Function to format the price filter for display
  const formatPriceFilter = (filter) => {
    if (filter.startsWith("under-")) {
      return filter
        .replace("under-500k", "under $500k")
        .replace("under-1-million", "under $1 million")
        .replace("under-1.5-million", "under $1.5 million")
        .replace("K", ",000")
        .replace("M", "million");
    }
    if (filter === "over-700K") {
      return "Over $700,000";
    }
    return filter
      .replace("-", " to $")
      .replace("K", ",000")
      .replace("M", " million");
  };

  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };

  function eventbanner() {
    if (params.city == "mississauga") {
      return (
        <div className="mb-md-4 mt-md-3">
          <Link href="/mississauga/exhale-condos" target="_blank">
            <img
              src="/exhale-condos.jpg"
              alt="Exhale Condos Mississauga is a new condo project currently selling in Mississauga."
              className="img-fluid pointer-c d-none d-md-block"
            />
            <img
              src="/exhale-mobile.jpg"
              alt="Exhale Condos Mississauga is a new condo project currently selling in Mississauga."
              className="img-fluid pointer-c d-block d-md-none"
            />
          </Link>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function getNo(no, no2) {
    if (no != 0) {
      return no2 + 1;
    } else {
      return no2;
    }
  }

  // Add this function to generate the SEO paragraph
  function getSEOParagraph(cleanCity, priceFilter) {
    if (!priceFilter) {
      return null; // No paragraph for general city pages
    }

    const cityName = CapitalizeFirst(cleanCity);
    const priceDesc = formatPriceFilter(priceFilter);

    return `Discover an extensive selection of pre construction homes in ${cityName}  ${priceDesc}. Our curated list showcases the latest developments, offering a range of options from affordable condos to luxurious townhomes. Whether you're a first-time buyer or looking to invest, these new construction properties in ${cityName} provide excellent opportunities in various neighborhoods. Explore modern designs, innovative amenities, and the chance to customize your future home. Start your journey to homeownership or expand your real estate portfolio with these exciting pre construction projects in ${cityName}.`;
  }

  return (
    <>
      <div className="pt-lg-5 pt-3">
        <div className="container">
          <div className="d-flex ">
            <div>
              <h1 className="main-title font-family2 pb-2 pb-md-0">
                {priceFilter ? (
                  `New Pre construction Homes in ${CapitalizeFirst(
                    cleanCity
                  )} ${formatPriceFilter(priceFilter)} (2025) `
                ) : (
                  <>
                    New Pre Construction Homes in {CapitalizeFirst(cleanCity)}{" "}
                    <span className=""> ( 2025 )</span>
                  </>
                )}
              </h1>
            </div>
            <div className="">
              <span className="absolute-design-border">
                <svg
                  width="146"
                  height="14"
                  viewBox="0 0 146 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4.5L144 2L2 12L144 9"
                    stroke="#FFC007"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <h2 className="font-normal sm-center pb-2 pt-1 pb-md-0 mb-0 fw-medium text-lg">
            {data.preconstructions.length} Pre construction or new homes, condos
            and townhomes for sale in {CapitalizeFirst(cleanCity)}
            {priceFilter ? ` ${formatPriceFilter(priceFilter)}` : ""} on
            condomonk.
          </h2>
          <div className="d-flex sm-center mb-lg-0 sticky-buttons pb-0 mb-0 z-2 sticky-top">
            <div className="position-relative w-100">
              <div className="d-flex flex-nowrap overflow-auto pb-2 hide-scrollbar">
                <div className="d-flex gap-2 flex-nowrap">
                  <h3>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m whitespace-nowrap"
                      href={`/${params.city.split("-homes-")[0]}/upcoming/`}
                    >
                      Upcoming Projects {CapitalizeFirst(params.city)}
                    </Link>
                  </h3>
                  <h3>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 me-2 whitespace-nowrap"
                      href={`/${params.city.split("-homes-")[0]}/townhomes/`}
                    >
                      New Townhomes {CapitalizeFirst(params.city)}
                    </Link>
                  </h3>

                  <h3>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m whitespace-nowrap"
                      href={`/${params.city.split("-homes-")[0]}/detached/`}
                    >
                      New Detached Homes {CapitalizeFirst(params.city)}
                    </Link>
                  </h3>
                  <h3>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 whitespace-nowrap"
                      href={`/${params.city.split("-homes-")[0]}/condos/`}
                    >
                      New Condos {CapitalizeFirst(params.city)}
                    </Link>
                  </h3>

                  <h4>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 rounded-pill border-warning whitespace-nowrap"
                      href={`/${
                        params.city.split("-homes-")[0]
                      }-homes-under-500k`}
                    >
                      Under $500k
                    </Link>
                  </h4>
                  <h4>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 rounded-pill border-warning whitespace-nowrap"
                      href={`/${
                        params.city.split("-homes-")[0]
                      }-homes-under-1-million`}
                    >
                      Under $1M
                    </Link>
                  </h4>
                  <h4>
                    <Link
                      className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 rounded-pill border-warning whitespace-nowrap"
                      href={`/${
                        params.city.split("-homes-")[0]
                      }-homes-under-1.5-million`}
                    >
                      Under $1.5M
                    </Link>
                  </h4>
                </div>
              </div>

              {/* Gradient fade effect on the right side to indicate more content */}
              <div
                className="d-md-none position-absolute top-0 end-0 h-100"
                style={{
                  width: "40px",
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>

          {eventbanner()}
          <div className="mt-md-5 mt-0"></div>
          <div className="row row-cols-1 row-cols-md-4  gy-4 gx-3 gx-lg-3 ">
            {featured_data.preconstructions &&
              featured_data.preconstructions.map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
            {data.preconstructions &&
              filteredprojects("Selling").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard
                    {...item}
                    no={getNo(featured_data.preconstructions.length, no)}
                  />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h3 className="fw-bold fs-2 mb-4 font-family2">
            {filteredprojects("Upcoming").length > 0 ? (
              `Launching Soon - New Construction Projects in ${CapitalizeFirst(
                data.city.name
              )}`
            ) : (
              <></>
            )}
          </h3>
          <div className="row row-cols-1 row-cols-md-4 gy-4 gx-3">
            {data.preconstructions &&
              filteredprojects("Planning Phase").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
            {data.preconstructions &&
              filteredprojects("Upcoming").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard
                    {...item}
                    no={no + filteredprojects("Planning Phase").length}
                  />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-2 mb-4 text-red">
            {filteredprojects("Sold out").length > 0 ? (
              <i>{`Past Communities in ${CapitalizeFirst(
                data.city.name
              )} - Sold out`}</i>
            ) : (
              <></>
            )}
          </h2>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 gy-4 gx-3 ">
            {data.preconstructions &&
              filteredprojects("Sold out").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="py-5 my-md-5 my-0" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <Image
                  src="/contact-bottom-2.png"
                  alt="Contact bottom"
                  width={300}
                  height={250}
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h3 className="fw-bolder fw-boldie text-center px-md-4 fs-3 ">
                Looking to buy a preconstruction home ?
              </h3>

              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <BottomContactForm
                    proj_name="All"
                    city="Home Page"
                  ></BottomContactForm>
                  <div className="d-flex">
                    <p className="small-text2 mb-3 text-center">
                      I agree to receive marketing and customer service calls
                      and text messages from Homebaba Technologies. Consent is
                      not a condition of purchase. Msg/data rates may apply. Msg
                      frequency varies. Reply STOP to unsubscribe. Privacy
                      Policy & Terms of Service.
                    </p>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <Newsletter />
          {getSEOParagraph(cleanCity, priceFilter) && (
            <div className="row justify-content-start mb-5">
              <div className="col-md-12">
                <p className="text-center fs-small p-4 rounded-xl">
                  {getSEOParagraph(cleanCity, priceFilter)}
                </p>
              </div>
            </div>
          )}
          <div className="pt-5 mt-5"></div>
          <div className="py-5">
            {data.city && (
              <div className="container" id="make-img-responsive">
                <div className="row row-cols-1 g-0">
                  <div
                    className="col-12 mt-mine px-3 max-w-100 iframe-container "
                    dangerouslySetInnerHTML={{
                      __html: data.city.details,
                    }}
                  ></div>
                  <div className="pt-5">
                    <p className="text-small text-secondary text-center">
                      Note:{" "}
                      <Link href="https://condomonk.ca/" target="_blank">
                        Condomonk
                      </Link>{" "}
                      is Canada's one of the largest database of new pre
                      construction homes. Our comprehensive database is
                      populated by our research and analysis of publicly
                      available data. Condomonk strives for accuracy and we make
                      every effort to verify the information. The information
                      provided on Condomonk.ca may be outdated or inaccurate.
                      Condomonk Inc. is not liable for the use or misuse of the
                      site's information.The information displayed on
                      condomonk.ca is for reference only. Please contact a
                      liscenced real estate agent or broker to seek advice or
                      receive updated and accurate information.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

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

  const params = cities.flatMap((city) => [
    { city: city.slug },
    ...priceRanges.map((price) => ({ city: `${city.slug}-homes-${price}` })),
  ]);

  return params;
}

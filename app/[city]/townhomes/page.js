import RightSidebarLinks from "@/components/RightSidebarLinks";
import BottomContactForm from "@/components/BottomContactForm";
import Newsletter from "@/components/Newsletter";
import { notFound } from "next/navigation";
import Link from "next/link";
import ListingHeader from "@/components/listing/ListingHeader";
import ListingGrid from "@/components/listing/ListingGrid";
import ExpandableDescription from "@/components/ExpandableDescription";

// Data fetching function
async function getData(city) {
  const res = await fetch(
    `https://api.condomonk.ca/api/preconstructions-city/${city}?project_type=Townhome&page_size=200`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getAssignments(city) {
  const cityFormat = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  try {
    const res = await fetch(
      `https://api.toassign.com/public/assignments?status=Available&regions=${cityFormat}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return { data: [] };
    return res.json();
  } catch (error) {
    console.error(`Error loading assignments for ${city}:`, error);
    return { data: [] };
  }
}

// Helper function to capitalize city name
const CapitalizeFirst = (city) => {
  return (
    city.split("-")[0].charAt(0).toUpperCase() + city.split("-")[0].slice(1)
  );
};

// townohme : pages.js
export async function generateMetadata({ params }, parent) {
  const { city } = await params;
  const data = await getData(city);
  const cityName = CapitalizeFirst(city);

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${city}/townhomes/`,
    },
    metadataBase: new URL("https://condomonk.ca"),
    // title: !["calgary", "edmonton"].includes(city)
    //   ? `${data.preconstructions.length}+ Pre Construction Townhomes in ${cityName} (2026)`
    //   : `${CapitalizeFirst(cityName)} Pre Construction & New Townhomes For Sale (2026) | Condomonk`,
    // description: !["calgary", "edmonton"].includes(city)
    //   ? `Explore ${data.preconstructions.length}+ pre construction townhomes in ${cityName}. Find affordable new construction townhomes with updated floor plans & pricing.`
    //   : `Find new Townhomes for sale in ${CapitalizeFirst(cityName)} | Check out plans, pricing, and availability`,

    title: !["calgary", "edmonton"].includes(city)
      ? `New Pre Construction Townhomes in ${cityName}, Ontario (2026) | Condomonk`
      : `${cityName} Pre Construction & New Townhomes For Sale (2026) | Condomonk`,
    description: !["calgary", "edmonton"].includes(city)
      ? `Browse ${data.preconstructions.length}+ pre construction townhomes in ${cityName}, Ontario for 2026. Explore new townhomes with pricing, floor plans & VIP access. Updated daily.`
      : `Find new Townhomes for sale in ${cityName} | Check out plans, pricing, and availability`,
  };
}

export default async function TownhomesPage({ params }) {
  const { city } = await params;
  const [data, assignments] = await Promise.all([
    getData(city),
    getAssignments(city),
  ]);
  const cityName = CapitalizeFirst(city);

  // Filter projects by status
  const sellingProjects = data.preconstructions.filter(
    (item) => item.status === "Selling",
  );
  const upcomingProjects = data.preconstructions.filter(
    (item) => item.status === "Upcoming",
  );

  // ── Schema.org structured data ──────────────────────────────────────────
  const buildProductSchema = (property) => {
    const url = `https://condomonk.ca/${city}/${property.slug}`;
    const image =
      property.images?.length > 0
        ? property.images[0].split(",")[0]
        : "https://condomonk.ca/noimage.webp";
    const developerName = property.developer?.name || "Developer";
    const price =
      property.price_starting_from > 0 ? property.price_starting_from : 0;

    return {
      "@type": "Product",
      "@id": url,
      name: property.project_name || `Pre Construction Townhome in ${cityName}`,
      description: `New pre-construction Townhome located at ${property.project_address || cityName}.`,
      image: [image],
      sku: property.slug || url,
      category: "Townhome",
      brand: { "@type": "Brand", name: developerName },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "25",
      },
      review: {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
        author: { "@type": "Person", name: "Condomonk User" },
      },
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "CAD",
        price,
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: developerName },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "CA",
          returnPolicyCategory: "https://schema.org/NoReturns",
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "0",
            currency: "CAD",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "CA",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: "0",
              maxValue: "1",
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: "1",
              maxValue: "5",
              unitCode: "DAY",
            },
          },
        },
      },
    };
  };

  const schemaProducts = data.preconstructions.map(buildProductSchema);

  const itemListSchema =
    schemaProducts.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: `https://condomonk.ca/${city}/townhomes`,
          itemListElement: schemaProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: product,
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://condomonk.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cityName,
        item: `https://condomonk.ca/${city}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Townhomes",
        item: `https://condomonk.ca/${city}/townhomes`,
      },
    ],
  };
  // ────────────────────────────────────────────────────────────────────────

  const generateTitle = () => {
    if (city == "calgary" || city == "edmonton") {
      return `Pre Construction & New Townhomes for sale in ${CapitalizeFirst(city)}, AB`;
    }
    return `Pre Construction Townhomes in ${CapitalizeFirst(city)}`;
  };

  const generateSubtitle = () => {
    const lastUpdated = new Date(Date.now() - 86400000).toLocaleDateString(
      "en-CA",
      {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    if (city == "calgary" || city == "edmonton") {
      return (
        <>
          Explore 100+ new construction townhomes in {cityName}, AB from trusted
          builders. Updated floor plans, pricing & availability for 2–4+ bedroom
          units.{" "}
          <span className="text-gray-500 text-[13px]">
            Last Updated: {lastUpdated}
          </span>
        </>
      );
    }
    return (
      <>
        Explore {data.preconstructions.length}+ pre construction townhomes in{" "}
        {cityName}, ON from trusted{" "}
        <Link
          href="/builders"
          className="text-slate-700 underline hover:text-slate-900"
        >
          builders in {cityName}
        </Link>
        . Updated floor plans, pricing & availability for 2–4+ bedroom units.{" "}
        <span className="text-gray-500 text-[13px]">
          Last Updated: {lastUpdated}
        </span>
      </>
    );
  };

  return (
    <div className="bg-white">
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-[85.625rem] mx-auto px-4">
        <ListingHeader
          crumbs={[{ label: cityName, href: `/${city}` }, { label: "Townhomes" }]}
          title={generateTitle()}
          description={
            <ExpandableDescription>{generateSubtitle()}</ExpandableDescription>
          }
          citySlug={city}
          cityName={cityName}
          activeType="townhomes"
        />

        <section className="pb-16">
          {sellingProjects.length > 0 || upcomingProjects.length > 0 ? (
            <>
              <p className="mb-4 text-[13px] text-black">
                Showing{" "}
                <span className="font-semibold">
                  {sellingProjects.length || upcomingProjects.length}
                </span>{" "}
                {sellingProjects.length > 0 ? "selling" : "upcoming"} projects
              </p>
              <ListingGrid
                projects={
                  sellingProjects.length > 0 ? sellingProjects : upcomingProjects
                }
                showAd
                withSchema={false}
                priorityCount={4}
              />
            </>
          ) : (
            <p className="py-16 text-[13px] text-black">
              No projects available at this time.
            </p>
          )}

          {/* Upcoming Projects Section - Only show if there are selling projects */}
          {sellingProjects.length > 0 && upcomingProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-black">
                Upcoming Pre Construction Townhomes in {cityName}
              </h2>
              <ListingGrid projects={upcomingProjects} withSchema={false} />
            </div>
          )}
        </section>

        {/* Quick links (previously the right sidebar) */}
        <section className="border-t border-[#e7e9ee] pt-8">
          <RightSidebarLinks
            cityName={cityName}
            citySlug={city}
            assignmentsCount={assignments.data?.length || 0}
            layout="grid"
          />
        </section>

        {/* Contact Form Section */}
        <div className="mt-24" id="contact">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/contact-bottom-2.png"
              alt="Contact"
              width={300}
              height={250}
              className="mx-auto w-1/4 mb-8"
            />
            <h3 className="text-2xl font-bold mb-8">
              Looking to buy a pre construction townhome in {cityName}?
            </h3>
            <BottomContactForm
              proj_name="Townhomes Page"
              city={data.city.name}
            />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <Newsletter />
        </div>

        {/* City Details */}
        {data.city?.townhomes_details && (
          <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-teal-700 hover:prose-a:text-teal-600 prose-img:rounded-lg [&_table]:!border [&_table]:!border-collapse [&_table]:!border-solid [&_table]:!border-black [&_th]:!border [&_th]:!border-solid [&_th]:!border-black [&_th]:!p-2 [&_td]:!border [&_td]:!border-solid [&_td]:!border-black [&_td]:!p-2 [&_tr]:!border [&_tr]:!border-solid [&_tr]:!border-black rich-text">
            <div
              dangerouslySetInnerHTML={{
                __html: data.city.townhomes_details,
              }}
              className="text-gray-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for static site generation
export async function generateStaticParams() {
  return [];
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json(),
  );

  return cities.map((city) => ({
    city: city.slug,
  }));
}

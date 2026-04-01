import CondoCard from "@/components/CondoCard";
import HorizontalCondoCard from "@/components/HorizontalCondoCard";
import RightSidebarLinks from "@/components/RightSidebarLinks";
import BottomContactForm from "@/components/BottomContactForm";
import Newsletter from "@/components/Newsletter";
import { notFound } from "next/navigation";
import Link from "next/link";
import PreconstructionFilter from "@/components/PreconstructionFilter";
import ExpandableDescription from "@/components/ExpandableDescription";

// Data fetching function
async function getData(city) {
  const res = await fetch(
    `https://api.condomonk.ca/api/preconstructions-city/${city}?project_type=Townhome&page_size=200`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
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
  const data = await getData(city);
  const cityName = CapitalizeFirst(city);

  // Filter projects by status
  const sellingProjects = data.preconstructions.filter(
    (item) => item.status === "Selling"
  );
  const upcomingProjects = data.preconstructions.filter(
    (item) => item.status === "Upcoming"
  );

  // ── Schema.org structured data ──────────────────────────────────────────
  const buildProductSchema = (property) => {
    const url = `https://condomonk.ca/${city}/${property.slug}`;
    const image =
      property.images?.length > 0
        ? property.images[0].split(",")[0]
        : "https://condomonk.ca/noimage.webp";
    const developerName = property.developer?.name || "Developer";
    const price = property.price_starting_from > 0 ? property.price_starting_from : 0;

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
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "CAD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: "0", maxValue: "1", unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: "1", maxValue: "5", unitCode: "DAY" },
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://condomonk.ca/" },
      { "@type": "ListItem", position: 2, name: cityName, item: `https://condomonk.ca/${city}` },
      { "@type": "ListItem", position: 3, name: "Townhomes", item: `https://condomonk.ca/${city}/townhomes` },
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
    const lastUpdated = new Date(Date.now() - 86400000).toLocaleDateString("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (city == "calgary" || city == "edmonton") {
      return (
        <>
          Explore 100+ new construction townhomes in {cityName}, AB from trusted builders. Updated floor plans, pricing & availability for 2–4+ bedroom units.{" "}
          <span className="text-gray-500 text-sm">Last Updated: {lastUpdated}</span>
        </>
      );
    }
    return (
      <>
        Explore {data.preconstructions.length}+ pre construction townhomes in {cityName}, ON from trusted{" "}
        <Link href="/builders" className="text-slate-700 underline hover:text-slate-900">
          builders in {cityName}
        </Link>
        . Updated floor plans, pricing & availability for 2–4+ bedroom units.{" "}
        <span className="text-gray-500 text-sm">Last Updated: {lastUpdated}</span>
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-800 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/${city}`} className="hover:text-gray-800 transition-colors">{cityName}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Townhomes</span>
        </nav>

        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900">
            {generateTitle()}
          </h1>

          <h2 className="text-xs md:text-base text-gray-600">
            <ExpandableDescription>{generateSubtitle()}</ExpandableDescription>
          </h2>

          {/* PreconstructionFilter Component */}
          <div className="mt-6">
            <PreconstructionFilter cityName={cityName} citySlug={city} />
          </div>
        </div>

        {/* Two Column Layout: Projects on Left, Sidebar on Right */}
        {(sellingProjects.length > 0 || upcomingProjects.length > 0) && (
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Left Column - Projects List - Scrollable */}
            <div className="flex-1 lg:w-2/3 overflow-y-auto">
              {sellingProjects.length > 0
                ? sellingProjects.map((item, index) => (
                    <HorizontalCondoCard key={item.id} {...item} no={index} />
                  ))
                : upcomingProjects.map((item, index) => (
                    <HorizontalCondoCard key={item.id} {...item} no={index} />
                  ))}
            </div>

            {/* Right Column - Sidebar Links - Sticky and Scrollable */}
            <div className="lg:w-1/3">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <RightSidebarLinks
                  cityName={cityName}
                  citySlug={city}
                  projectTypes={["Condo", "Townhome", "Detached"]}
                  assignmentsCount={0}
                />
              </div>
            </div>
          </div>
        )}

        {/* No Projects Message */}
        {sellingProjects.length === 0 && upcomingProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects available at this time.
          </div>
        )}

        {/* Upcoming Projects Section - Only show if there are selling projects */}
        {sellingProjects.length > 0 && upcomingProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Upcoming Pre Construction Townhomes in {cityName}
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 lg:w-2/3 overflow-y-auto">
                {upcomingProjects.map((item, index) => (
                  <HorizontalCondoCard key={item.id} {...item} no={index} />
                ))}
              </div>
              <div className="lg:w-1/3"></div>
            </div>
          </div>
        )}

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
export async function generateStaticParams() { return [];
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json()
  );

  return cities.map((city) => ({
    city: city.slug,
  }));
}

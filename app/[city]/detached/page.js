import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import Newsletter from "@/components/Newsletter";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PreconstructionFilter from "@/components/PreconstructionFilter";
import ExpandableDescription from "@/components/ExpandableDescription";

// Data fetching function
async function getData(city) {
  const res = await fetch(
    `https://api.condomonk.ca/api/preconstructions-city/${city}?project_type=Detached&page_size=200`,
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

// Metadata generation
export async function generateMetadata({ params }, parent) {
  const data = await getData(params.city);
  const cityName = CapitalizeFirst(params.city);

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${params.city}/detached/`,
    },
    metadataBase: new URL("https://condomonk.ca"),
    title: !["calgary", "edmonton"].includes(params.city)
      ? `${data.preconstructions.length}+ Pre Construction Detached Homes in ${cityName}`
      : `${CapitalizeFirst(cityName)} Pre Construction & New Detached homes For Sale | Condomonk`,
    description: !["calgary", "edmonton"].includes(params.city)
      ? `Explore ${data.preconstructions.length}+ pre construction detached homes in ${cityName}. Find affordable new construction detached homes with updated floor plans & pricing.`
      : `Find New Detached homes for sale in ${CapitalizeFirst(cityName)} | Check out plans, pricing, and availability`,
  };
}

export default async function DetachedPage({ params }) {
  const data = await getData(params.city);
  const cityName = CapitalizeFirst(params.city);

  const generateTitle = () => {
    if (params.city == "calgary" || params.city == "edmonton") {
      return `Pre Construction & New Detached Homes for sale in ${CapitalizeFirst(params.city)}, AB`;
    }
    return `Pre Construction Detached Homes in ${CapitalizeFirst(params.city)}`;
  };

  const generateSubtitle = () => {
    if (params.city == "calgary" || params.city == "edmonton") {
      return `100+ new detached homes in ${CapitalizeFirst(params.city)}, AB | Explore Floor Plans, Pricing & Availability. Condomonk has over 120 new construction detached homes from trusted builders in ${CapitalizeFirst(params.city)}, AB. If you are looking to buy new  homes, Condomonk is your trusted platform to find 1000+  homes for sale in ${CapitalizeFirst(params.city)}. Whether you are looking to downsize to buy townhomes for sale in ${CapitalizeFirst(params.city)} or looking to buy condos in ${CapitalizeFirst(params.city)} for your family or browsing ${CapitalizeFirst(params.city)} detached homes for sale, our platform is updated daily with latest resale listings every hour. For new development homes, easily filter by number of bedrooms (1 to 4+), project type, and construction status from budget-friendly condo to a pre construction homes, contact us to connect you to the most exciting real estate opportunities in ${CapitalizeFirst(params.city)}.`;
    }
    return (
      <>
        {data.preconstructions.length}+ Pre construction detached homes in{" "}
        {cityName}, ON | Explore Floor Plans, Pricing & Availability. Condomonk
        has over {data.preconstructions.length} pre construction detached homes
        from trusted{" "}
        <Link
          href={`/builders`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          builders in {cityName}, ON.
        </Link>{" "}
        If you are looking to buy resale detached homes, Condomonk is your
        trusted platform to find{" "}
        <Link
          href={`/resale/ontario/${params.city}/detached-homes-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          100+ detached homes for sale in {cityName}.{" "}
        </Link>
        Whether you are looking to downsize to affordable{" "}
        <Link
          href={`/resale/ontario/${params.city}/detached-homes-for-sale`}
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          {cityName} detached for sale,
        </Link>{" "}
        condomonk has updated MLS Listings updated daily. For new development
        homes, easily filter by number of bedrooms (1 to 4+), project type, and
        construction status from budget-friendly detached homes,{" "}
        <Link
          href="#contact"
          className="text-blue-600 hover-underline text-decoration-underline hover:text-blue-800"
        >
          contact us
        </Link>{" "}
        to connect you to the most exciting real estate opportunities in{" "}
        {cityName}.
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

  // Filter projects by status
  const sellingProjects = data.preconstructions.filter(
    (item) => item.status === "Selling"
  );
  const upcomingProjects = data.preconstructions.filter(
    (item) => item.status === "Upcoming"
  );

  return (
    <div className="bg-white">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-xl md:text-4xl font-bold">{generateTitle()}</h1>

          <h2 className="text-[8px] md:text-sm text-gray-500">
            <ExpandableDescription></ExpandableDescription>
          </h2>

          {/* PreconstructionFilter Component */}
          <div className="mt-6">
            <PreconstructionFilter cityName={cityName} citySlug={params.city} />
          </div>
        </div>

        {/* Selling Projects Grid */}
        <div className="mt-3">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sellingProjects.map((item, index) => (
              <CondoCard key={item.id} {...item} no={index} />
            ))}
          </div>
        </div>

        {/* Upcoming Projects Section */}
        {upcomingProjects.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8">
              Upcoming Pre Construction Detached Homes in {cityName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingProjects.map((item, index) => (
                <CondoCard key={item.id} {...item} no={index} />
              ))}
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div className="mt-24" id="contact">
          <div className="max-w-3xl mx-auto text-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact"
              width={300}
              height={250}
              className="mx-auto w-1/4 mb-8"
            />
            <h3 className="text-2xl font-bold mb-8">
              Looking to buy a pre construction detached home in {cityName}?
            </h3>
            <BottomContactForm
              proj_name="Detached Page"
              city={data.city.name}
            />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <Newsletter />
        </div>

        {/* City Details */}
        {data.city?.detached_details && (
          <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg [&_table]:!border [&_table]:!border-collapse [&_table]:!border-solid [&_table]:!border-black [&_th]:!border [&_th]:!border-solid [&_th]:!border-black [&_th]:!p-2 [&_td]:!border [&_td]:!border-solid [&_td]:!border-black [&_td]:!p-2 [&_tr]:!border [&_tr]:!border-solid [&_tr]:!border-black rich-text">
            <div
              dangerouslySetInnerHTML={{
                __html: data.city.detached_details,
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
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json()
  );

  return cities.map((city) => ({
    city: city.slug,
  }));
}

import CondoCard from "@/components/CondoCard";
import HorizontalCondoCard from "@/components/HorizontalCondoCard";
import RightSidebarLinks from "@/components/RightSidebarLinks";
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
    `https://api.condomonk.ca/api/preconstructions-city/${city}?project_type=Condo&page_size=200`,
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
      canonical: `https://condomonk.ca/${params.city}/condos/`,
    },
    metadataBase: new URL("https://condomonk.ca"),
    title: !["calgary", "edmonton"].includes(params.city)
      ? `${data.preconstructions.length}+ Pre Construction Condos in ${cityName}`
      : `${CapitalizeFirst(cityName)} Pre Construction & New Condos For Sale | Condomonk`,
    description: !["calgary", "edmonton"].includes(params.city)
      ? `Explore ${data.preconstructions.length}+ pre construction condos in ${cityName}. Find affordable 1-4 bedroom new construction condos with updated floor plans & pricing.`
      : `Find new condos for sale in ${CapitalizeFirst(cityName)} | Check out plans, pricing, and availability`,
  };
}

export default async function CondosPage({ params }) {
  const data = await getData(params.city);
  const cityName = CapitalizeFirst(params.city);

  // Filter projects by status
  const sellingProjects = data.preconstructions.filter(
    (item) => item.status === "Selling"
  );
  const upcomingProjects = data.preconstructions.filter(
    (item) => item.status === "Upcoming"
  );

  const generateTitle = () => {
    if (params.city == "calgary" || params.city == "edmonton") {
      return `Pre Construction & New Condos for sale in ${CapitalizeFirst(params.city)}, AB`;
    }
    return `Pre Construction Condos in ${CapitalizeFirst(params.city)}`;
  };

  const generateSubtitle = () => {
    if (params.city == "calgary" || params.city == "edmonton") {
      return `100+ new condos in ${CapitalizeFirst(params.city)}, AB | Explore Floor Plans, Pricing & Availability. Condomonk has over 120 new construction condos from trusted builders in ${CapitalizeFirst(params.city)}, AB. If you are looking to buy new  homes, Condomonk is your trusted platform to find 1000+  homes for sale in ${CapitalizeFirst(params.city)}. Whether you are looking to downsize to buy townhomes for sale in ${CapitalizeFirst(params.city)} or looking to buy condos in ${CapitalizeFirst(params.city)} for your family or browsing ${CapitalizeFirst(params.city)} detached homes for sale, our platform is updated daily with latest resale listings every hour. For new development homes, easily filter by number of bedrooms (1 to 4+), project type, and construction status from budget-friendly condo to a pre construction homes, contact us to connect you to the most exciting real estate opportunities in ${CapitalizeFirst(params.city)}.`;
    }
    return (
      <>
        {data.preconstructions.length}+ Pre construction condos in {cityName},
        ON | Explore Floor Plans, Pricing & Availability. Condomonk has over{" "}
        {data.preconstructions.length} pre construction condos from trusted{" "}
        <Link
          href={`/builders`}
          className="text-slate-700 underline hover:text-slate-900"
        >
          builders in {cityName}, ON.
        </Link>{" "}
        If you are looking to buy resale condos, Condomonk is your trusted
        platform to find{" "}
        <Link
          href={`/resale/ontario/${params.city}/condos-for-sale`}
          className="text-slate-700 underline hover:text-slate-900"
        >
          100+ condos for sale in {cityName}.{" "}
        </Link>
        Whether you are looking to downsize to affordable{" "}
        <Link
          href={`/resale/ontario/${params.city}/condos-for-sale`}
          className="text-slate-700 underline hover:text-slate-900"
        >
          {cityName} condos for sale,
        </Link>{" "}
        condomonk has updated MLS Listings updated daily. For new development
        homes, easily filter by number of bedrooms (1 to 4+), project type, and
        construction status from budget-friendly condos,{" "}
        <Link
          href="#contact"
          className="text-slate-700 underline hover:text-slate-900"
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

  return (
    <div className="bg-white">
      <div className="max-w-[85.625rem] mx-auto px-4 py-12">
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
            <PreconstructionFilter cityName={cityName} citySlug={params.city} />
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
                  citySlug={params.city}
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
              Upcoming Pre Construction Condos in {cityName}
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
            <Image
              src="/contact-bottom-2.png"
              alt="Contact"
              width={300}
              height={250}
              className="mx-auto w-1/4 mb-8"
            />
            <h3 className="text-2xl font-bold mb-8">
              Looking to buy a pre construction condo in {cityName}?
            </h3>
            <BottomContactForm proj_name="Condos Page" city={data.city.name} />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <Newsletter />
        </div>

        {/* City Details */}
        {data.city?.condos_details && (
          <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-teal-700 hover:prose-a:text-teal-600 prose-img:rounded-lg [&_table]:!border [&_table]:!border-collapse [&_table]:!border-solid [&_table]:!border-black [&_th]:!border [&_th]:!border-solid [&_th]:!border-black [&_th]:!p-2 [&_td]:!border [&_td]:!border-solid [&_td]:!border-black [&_td]:!p-2 [&_tr]:!border [&_tr]:!border-solid [&_tr]:!border-black rich-text">
            <div
              dangerouslySetInnerHTML={{
                __html: data.city.condos_details,
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

import DeveloperCard from "@/components/DeveloperCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import FixedContactButton from "@/components/FixedContactButton";
import Image from "next/image";

// Revalidate the page every hour
export const revalidate = 3600;

async function getData() {
  try {
    const res = await fetch(
      "https://api.condomonk.ca/api/developers?page_size=800",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    notFound();
  }
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  const data = await getData();
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/builders/`,
    },
    openGraph: {
      images: "/social/condomonk-builders.jpg",
    },
    title: `Discover condomonk's Premier Selection of Over ${data.count}+ Preconstruction Home Builders`,
    description: `From industry veteran builders to up-and-coming talent, condomonk's ${data.count}+ partnered builders offer years of experience along with creative vision and attentive service.`,
  };
}

export default async function Builders() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-gray-50">
      <FixedContactButton />

      {/* Hero Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Leading Home Builders in Canada
            </h1>
            <p className="text-sm text-gray-600">
              Explore the Builders behind your favourite condominium & freehold
              home projects. These developers are driven by a passion to
              transform ideas into tangible structures. Uncover the compelling
              narratives, innovative designs, and unmatched commitment to
              precision that position these developers as the driving influence
              behind the city's most desirable living spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Builders Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.results?.map((developer) => (
              <DeveloperCard key={developer.id} {...developer} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500">
            *Disclaimer: The information on this page about the builder or
            developer, including project status, pricing, floor plans, and other
            related details, is for general informational purposes only. It may
            have been sourced from the builder's website or publicly available
            data. While we strive to keep the information up to date and
            accurate, changes or discrepancies may occur. For the most accurate
            details, we recommend verifying directly with the builder. Condomonk
            is not responsible for any outdated or incorrect information.
            <br />
            <br />
            If you are a builder and wish to request updates or modifications to
            the information on this page, please contact us at
            info@condomonk.ca.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white" id="mycontact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact Condomonk"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Contact condomonk Team Today
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <BottomContactForm proj_name="All" city="Builders Page" />
          </div>
        </div>
      </section>
    </main>
  );
}

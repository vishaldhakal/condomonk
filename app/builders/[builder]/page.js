import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeveloperCardDetail from "@/components/DeveloperCardDetail";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";

async function getData(developer) {
  try {
    const res = await fetch(
      "https://api.condomonk.ca/api/preconstructions-developer/" + developer,
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      console.error("Received data:", text);
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    notFound();
  }
}

const CapitalizeFirst = (city) => {
  let repp = city.replace(/-/g, " ");
  return repp.charAt(0).toUpperCase() + repp.slice(1);
};

const retImage = (data) => {
  if (data.image) {
    return `https://api.condomonk.ca${data.image}`;
  } else {
    return "/social/condomonk-builders.jpg";
  }
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.builder);
  const all_data = await getData(params.builder);
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/builders/${params.builder}/`,
    },
    openGraph: {
      images: retImage(all_data.developer),
    },
    title:
      city + "- New home developer and builder | Communities & Developments",
    description:
      "Search our selection of pre construction homes for sale by " +
      city +
      ". " +
      city +
      "'s ever-changing portfolio of pre constructions brings you closer to your ideal homes",
  };
}

export default async function BuilderSingle({ params }) {
  const all_data = await getData(params.builder);
  const data = all_data.precons;
  const developer = all_data.developer;

  return (
    <main className="min-h-screen bg-gray-50">
      <FixedContactButton />

      {/* Developer Details Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="" aria-label="Breadcrumb">
            <div className="max-w-4xl mx-auto px-4 py-3">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li>
                  <Link
                    href="/builders"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Builders
                  </Link>
                </li>
                <li className="text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li>
                  <span
                    className="text-gray-900 font-medium"
                    aria-current="page"
                  >
                    {CapitalizeFirst(params.builder)}
                  </span>
                </li>
              </ol>
            </div>
          </nav>
          <DeveloperCardDetail {...developer} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {`Pre Construction Homes by ${CapitalizeFirst(params.builder)}`}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data &&
              data.map((item) => (
                <div key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 leading-relaxed">
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

      {/* Contact Form Section */}
      <section className="py-16 bg-white" id="mycontact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <img
              src="/contact-bottom-2.png"
              alt="Contact Condomonk"
              className="w-32 md:w-40 mx-auto mb-6"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Contact Condomonk Team Today
            </h2>
          </div>

          <div className="max-w-xl mx-auto">
            <BottomContactForm
              proj_name={params.builder}
              city="Builders Detail Page"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

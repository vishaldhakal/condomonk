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
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-4 position-relative font-family2">
        <div className="container-fluid">
          <div className="pb-4"></div>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-1 position-relative">
            <div className="col mt-4">
              <div className="d-flex justify-content-center">
                <DeveloperCardDetail {...developer} />
              </div>
              <div className="py-5 my-4"></div>
              <div className="row row-cols-1 row-cols-md-3 ">
                <div className="col-md-12 ">
                  <h1 className="main-title text-center pb-5">
                    {`New Construction Homes by ${CapitalizeFirst(
                      params.builder
                    )}`}
                  </h1>
                  <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 gy-4 gx-3">
                    {data &&
                      data.map((item) => (
                        <div className="col" key={item.id}>
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
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5"></div>
          <div>
            <p className="text-sm">
              *Disclaimer: The information on this page about the builder or
              developer, including project status, pricing, floor plans, and
              other related details, is for general informational purposes only.
              It may have been sourced from the builder’s website or publicly
              available data. While we strive to keep the information up to date
              and accurate, changes or discrepancies may occur. For the most
              accurate details, we recommend verifying directly with the
              builder. Condomonk is not responsible for any outdated or
              incorrect information.
              <br />
              If you are a builder and wish to request updates or modifications
              to the information on this page, please contact us at
              info@condomonk.ca.
            </p>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact condomonk Team Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name={params.builder}
                    city="Builders Detail Page"
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}

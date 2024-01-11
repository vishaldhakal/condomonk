import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import Link from "next/link";
import FixedContactButton from "@/components/FixedContactButton";

async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" + city,
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
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  const data = await getData(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${params.city}`,
    },
    title: data.preconstructions.length + " Preconstruction Condos in " + city,
    description: "Preconstruction Condos in " + city,
    description:
      "Search our selection of pre construction condos for sale in " +
      city +
      ". Our ever-changing portfolio of pre constructions brings you closer to your ideal condos in the growing city of " +
      city,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  
  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };
  return (
    <>
        <FixedContactButton></FixedContactButton>
      <div className="pt-5">
        <div className="container-fluid  px-md-5">
          <div className="d-flex flex-column">
            <h1 className="main-title">
              New Construction Condos in {CapitalizeFirst(params.city)} ( 2024 )
            </h1>
            <p className="text-mine">
              {data.preconstructions.length} New Preconstruction Condos for sale
              in {CapitalizeFirst(params.city)}, Ontario | Check out plans,
              pricing, availability for pre construction condos in{" "}
              {CapitalizeFirst(params.city)}
            </p>
          </div>
        
          <div className="d-flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="link-black badge py-2 mx-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 mx-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
          <div className="py-3"></div>
         
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-0 gx-3 gx-lg-2">
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
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4">
            {filteredprojects("Upcoming").length > 0 ? (
              `Launching Soon - New Construction Projects in ${CapitalizeFirst(
                data.city.name
              )}`
            ) : (
              <></>
            )}
          </h2>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
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
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4 text-red">
            {filteredprojects("Sold out").length > 0 ? (
              <i>{`Past Communities in ${CapitalizeFirst(
                data.city.name
              )} - Sold out`}</i>
            ) : (
              <></>
            )}
          </h2>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 gy-4 gx-3 gx-lg-2">
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
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
            Looking to buy a preconstruction home
                ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6" id="contact">
                  <BottomContactForm></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5">
            {data.city && (
              <div className="container" id="make-img-responsive">
                <div className="row row-cols-1 g-0">
                  <div
                    className="col-12 mt-mine px-3 max-w-100"
                    dangerouslySetInnerHTML={{
                      __html: data.city.details,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

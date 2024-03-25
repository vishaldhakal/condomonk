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
    title:
      "Top " +
      data.preconstructions.length +
      " New Pre construction homes, condos and townhomes in " +
      city,
    description: "Pre Construction homes in " + city,
    description:
      "Looking for a pre construction home in " +
      city +
      "?" +
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
      <div className="pt-lg-5 pt-3">
        <div className="container">
          <div className="d-flex flex-column">
            <h1 className="main-title font-family2">
              New Pre Construction Homes
              <div className="relative inline-flex sm-center mx-2">
                <span className="absolute inset-x-0 bottom-0 border-b-[18px] border-[#4ADE80]"></span>
                <h1 className="relative font-bold text-black ">  in {CapitalizeFirst(params.city)} </h1>
              </div>
              (
              2024 )
            </h1>
            <p className="text-mine">
              {data.preconstructions.length} New Pre construction homes, condos and townhomes for sale
              in {CapitalizeFirst(params.city)}. 
            </p>
          </div>

          <div className="d-flex mb-4 mt-2 overflow-hidden ">
            <div>
              <Link
                className="link-black badge py-2 my-1  bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/upcoming/`}
              >
                Upcoming Projects {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-md-2 mx-0"
                href={`/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 my-1  bg-white shadow-sm text-dark fs-small fw-m mx-md-2 mx-0"
                href={`/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
          <div className="py-lg-3 py-0"></div>

          <div className="row row-cols-1 row-cols-md-4  gy-4 gx-3 gx-lg-3 ">
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
          <h2 className="fw-bold fs-2 mb-4 font-family2">
            {filteredprojects("Upcoming").length > 0 ? (
              `Launching Soon - New Construction Projects in ${CapitalizeFirst(
                data.city.name
              )}`
            ) : (
              <></>
            )}
          </h2>
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
                  <CondoCard {...item} no={no} />
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
                Looking to buy a preconstruction home ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6" id="contact">
                  <BottomContactForm
                    proj_name="City Page"
                    city={data.city.name}
                  ></BottomContactForm>
                   <div className="d-flex">
                    <p class="small-text2 mb-3 text-center">
                    Condomonk.ca serves as an online database for pre-construction homes. Condomonk compiles a list of projects available publicly on the internet and does not engage in real estate transactions. Please note that the information provided on this page may be outdated or inaccurate. By submitting the above form, you consent to being contacted by real estate agents advertising on this page. Your information may be shared with our partners or advertisers to assist with your inquiries. You can unsubscribe at any time by emailing us.
                      </p>
         
                    </div>
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
                    className="col-12 mt-mine px-3 max-w-100 city-details"
                    dangerouslySetInnerHTML={{
                      __html: data.city.details,
                    }}
                  ></div>
                  <div className="pt-5">
                    <p className="text-small text-secondary">
                      Note:{" "}
                      <a href="https://condomonk.ca/" target="_blank">
                        Condomonk
                      </a>{" "}
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

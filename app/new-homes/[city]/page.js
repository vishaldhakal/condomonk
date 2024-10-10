import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import Link from "next/link";

async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" +
      city +
      "?status=Upcoming&page_size=200",
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
      canonical: `https://condomonk.ca/new-homes/${params.city}`,
    },
    title:
      "Top " +
      data.preconstructions.length +
      " New homes, condos and townhomes in " +
      city,
    description: "New homes in " + city,
    description:
      "Discover stunning new homes, condos & townhouses in " +
      city +
      ". Find your dream property in our latest developments. Tour new builds today!",
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);

  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };
  return (
    <>
      <div className="pt-lg-5 pt-3">
        <div className="container">
          <div className="d-flex ">
            <div className="">
              <h1 className="main-title2  font-family2 pb-2 pb-md-0">
                New homes in {CapitalizeFirst(params.city)} ( 2024 )
              </h1>
            </div>
            <div className="pt-3">
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
          <p className="font-normal sm-center pb-2 pb-md-0 mb-0 fw-medium text-lg ">
            {data.preconstructions.length} New homes, condos and townhomes for
            sale in {CapitalizeFirst(params.city)}.
          </p>
          <div className="d-flex sm-center  mb-lg-0 sticky-buttons pb-0 mb-0">
            <div className="d-flex flex-column flex-md-row mb-md-2 mb-0 mt-1 overflow-hidden">
              <div className="d-flex gap-2">
                <Link
                  className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m"
                  href={`/${params.city}/`}
                >
                  Pre Construction Homes {CapitalizeFirst(params.city)}
                </Link>
                <Link
                  className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 me-2"
                  href={`/${params.city}/townhomes/`}
                >
                  New Townhomes {CapitalizeFirst(params.city)}
                </Link>
              </div>
              <div className="d-flex gap-2">
                <Link
                  className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m"
                  href={`/${params.city}/detached/`}
                >
                  New Detached Homes {CapitalizeFirst(params.city)}
                </Link>
                <Link
                  className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0"
                  href={`/${params.city}/condos/`}
                >
                  New Condos {CapitalizeFirst(params.city)}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-md-5 mt-0"></div>
          <div className="row row-cols-1 row-cols-md-4  gy-4 gx-3 gx-lg-3 ">
            {data.preconstructions &&
              data.preconstructions.map((item, no) => (
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

          <div className="py-5 my-5" id="contact">
            <div className="container">
              {/* <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div> */}
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3"></h2>

              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6" id="contact">
                  <div className="d-flex gap-5 justify-content-center align-items-center pb-4">
                    <div className="text-center">
                      {data.partner[0] && (
                        <img
                          src={`https://api.condomonk.ca${data.partner[0].image}`}
                          alt="dce"
                          className="partner-img"
                        />
                      )}
                      {!data.partner[0] && (
                        <img
                          src="/contact-bottom-2.png"
                          alt="dce"
                          className="partner-img "
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h5 className="fw-bold  fs-5 ">
                        {data.partner[0] &&
                          data.partner[0].partner_type != "Brokerage" && (
                            <>{data.partner[0].name}</>
                          )}

                        {!data.partner[0] && "Receive a Call"}
                      </h5>

                      <span className="mt-5 fs-6 text-center">
                        {data.partner[0] && data.partner[0].brokerage_name}
                      </span>

                      <p
                        className="mb-0 bva2  mt-1 text-xs d-flex justify-content-center"
                        data-tip
                        data-for="registerTip"
                      >
                        Condomonk Verified Partner
                        <span>
                          <sup>
                            <img
                              src="/cc.png"
                              alt="verfied"
                              className="img-fluid small-i ms-1"
                            />
                          </sup>
                        </span>
                      </p>
                    </div>
                  </div>
                  <BottomContactForm
                    proj_name="City Page"
                    city={data.city.name}
                  ></BottomContactForm>
                  <div className="d-flex text-center">
                    <p className="small-text2 mb-3 text-center">
                      Condomonk.ca serves as an online database for
                      pre-construction homes. Condomonk compiles a list of
                      projects available publicly on the internet and does not
                      engage in real estate transactions. Please note that the
                      information provided on this page may be outdated or
                      inaccurate. By submitting the above form, you consent to
                      being contacted by real estate agents advertising on this
                      page. Your information may be shared with our partners or
                      advertisers to assist with your inquiries. You can
                      unsubscribe at any time by emailing us.
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
                    className="col-12 mt-mine px-3 max-w-100 iframe-container"
                    dangerouslySetInnerHTML={{
                      __html: data.city.details || "",
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

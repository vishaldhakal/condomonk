import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

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

  return (
    <>
      <div className="pt-5">
        <div className="container">
          <div className="d-flex flex-column">
            <h1 className="main-title">
              New Construction condos in {CapitalizeFirst(params.city)} ( 2023 )
            </h1>
            <p className="text-mine">
              {data.preconstructions.length} New Preconstruction Condos for sale
              in {CapitalizeFirst(params.city)}, Ontario | Check out plans,
              pricing, availability for pre construction condos in{" "}
              {CapitalizeFirst(params.city)}
            </p>
          </div>
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 gy-4">
            {data.preconstructions &&
              data.preconstructions.map((item) => (
                <div className="col" key={item.id}>
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
                Are you looking to buy a preconstruction home for the first time
                ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Don't know where to start ? Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
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

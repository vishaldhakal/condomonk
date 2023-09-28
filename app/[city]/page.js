import CondoCard from "@/components/CondoCard";

async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" + city,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  return {
    ...parent,
    title: "Preconstruction Condos in " + city,
    description: "Preconstruction Condos in " + city,
    openGraph: {
      ...parent.openGraph,
      title: "Preconstruction Condos in " + city,
      description: "Preconstruction Condos in " + city,
    },
    twitter: {
      ...parent.twitter,
      title: "Preconstruction Condos in " + city,
      description: "Preconstruction Condos in " + city,
    },
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

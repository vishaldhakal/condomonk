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

export default async function Home({ params }) {
  const data = await getData(params.city);

  const CapitalizeFirst = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  return (
    <>
      <div className="pt-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="main-title">
              Preconstrution Condos in {CapitalizeFirst(params.city)}
            </h2>
          </div>
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4">
            {data.map((item) => (
              <div className="col" key={item.id}>
                <CondoCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import CondoCardHome from "@/components/CondoCardHome";

async function getData() {
  const res = await fetch("https://api.condomonk.ca/api/preconstructions", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home(props) {
  const data = await getData();
  return (
    <>
      <div className="pt-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="main-title">Pre construction condos in Canada</h2>
            <p className="text-mine">Sell all</p>
          </div>
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 gy-4">
            {data.results.map((item) => (
              <div className="col" key={item.id}>
                <CondoCardHome {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

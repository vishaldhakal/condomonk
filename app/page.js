import CondoCard from "@/components/CondoCard";

async function getData() {
  const res = await fetch("https://api.condomonk.ca/api/preconstructions");

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
            <h2 className="main-title">PLATINUM ACCESS</h2>
            <p className="text-mine">Sell all Platinum Access</p>
          </div>
          <div className="row row-cols-2 row-cols-md-4 gy-4">
            {data.results.map((item) => (
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

async function getData() {
  const res = await fetch("https://api.condomonk.ca/api/preconstructions/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home(props) {
  const data = await getData();
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

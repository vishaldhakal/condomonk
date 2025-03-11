import CondoCard from "@/components/CondoCard";
import { notFound } from "next/navigation";

async function getData(city, price) {
  let url = `https://api.condomonk.ca/api/preconstructions-city/${city}`;

  if (price === "under-500k") {
    url += "?price_to=500000";
  } else if (price === "under-1-million") {
    url += "?price_to=1000000";
  } else if (price === "under-1.5-million") {
    url += "?price_to=1500000";
  } else if (price === "over-700k") {
    url += "?price_starting_from=700000";
  } else {
    const [min, max] = price.split("-").map((p) => parseInt(p) * 1000);
    url += `?price_starting_from=${min}&price_to=${max}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  const { city, price } = params;
  const formattedCity = CapitalizeFirst(city);
  const formattedPrice = price.replace("-", " to ").replace("k", ",000");

  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/${city}/filter/${price}`,
    },
    title: `New Pre-construction Homes in ${formattedCity} - ${formattedPrice}`,
    description: `Discover new construction homes, condos & townhouses in ${formattedCity} priced ${formattedPrice}. Find your dream property in our latest developments.`,
  };
}

export default async function PricePage({ params }) {
  const { city, price } = params;
  const data = await getData(city, price);
  const formattedCity = CapitalizeFirst(city);
  const formattedPrice = price.replace("-", " ").replace("k", ",000");

  return (
    <div className="container">
      <h1 className="main-title font-family2 pb-2 pb-md-0">
        New Pre construction Homes in {formattedCity} - {formattedPrice}
      </h1>
      <h2 className="font-normal sm-center pb-2 pt-1 pb-md-0 mb-0 fw-medium text-lg">
        {data.preconstructions.length} Pre construction or new homes, condos and
        townhomes for sale in {formattedCity} priced {formattedPrice} on
        condomonk.
      </h2>

      <div className="row row-cols-1 row-cols-md-4 gy-4 gx-3">
        {data.preconstructions.map((item) => (
          <div className="col" key={item.id}>
            <CondoCard {...item} />
          </div>
        ))}
      </div>

      {/* Add BottomContactForm and other components as needed */}
    </div>
  );
}

export async function generateStaticParams() {
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json()
  );

  const priceRanges = [
    "under-500k",
    "under-1-million",
    "under-1.5-million",
    "over-700k",
    "500k-600k",
    "600k-700k",
  ];

  return cities.flatMap((city) =>
    priceRanges.map((price) => ({
      city: city.slug,
      price: price,
    }))
  );
}

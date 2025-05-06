import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import RealEstateLinks from "@/components/RealEstateLinks";

async function getCities() {
  const res = await fetch("https://api.condomonk.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function NotFound() {
  let cities = await getCities();

  return (
    <>
      <div className="py-20"></div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <img src="/404.png" alt="condomonk" className="w-32 h-32" />
          <h4 className="text-center font-bold mb-0">
            <span className="text-red-600 text-6xl">Oops!</span> <br />
            <span className="text-4xl">
              Looks like this page is off the map.
            </span>
          </h4>

          <div className="pb-1 pt-20 px-3 w-full max-w-4xl mx-auto">
            {/* Search Component */}
            <HomeSearch />
          </div>
        </div>
      </div>
      <div className="py-20 max-w-7xl mx-auto">
        <RealEstateLinks />
      </div>
    </>
  );
}

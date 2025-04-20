import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import FeaturedCard from "@/components/FeaturedCard";

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
async function getFeaturedData() {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions/?is_featured=True",
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/top-10-gta-projects/`,
    },
    openGraph: {
      images: "/social/precon.webp",
    },
    title: `Top 10 GTA Projects - Condomonk`,
    description: `Discover the top 10 GTA pre-construction projects with Condomonk. Explore premier developments across the Greater Toronto Area, featuring luxury condos, modern amenities, and prime locations.`,
  };
}

export default async function Home({ params }) {
  const featured = await getFeaturedData();
  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-lg-5 pt-3">
        <div className="container">
          <div className="text-center pt-5">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <h1 className="featured-main-title font-family2 pb-2 pb-md-0 ">
                  Top 10 GTA Featured Projects
                </h1>
              </div>
            </div>
            <p className="font-normal sm-center pb-2 pb-md-0 mb-0 fw-medium text-lg">
              Explore Top 10 featured pre construction homes, condos and
              townhomes in GTA.
            </p>
          </div>

          <div className="pt-md-3 pt-0">
            <div className="row row-cols-1 row-cols-md-2 my-md-2 my-3 gy-3 g-4">
              {featured.results &&
                featured.results.slice(0, 20).map((item) => (
                  <div className="col" key={item.id}>
                    <script
                      key={item.slug}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(PreconSchema(item)),
                      }}
                    />
                    <FeaturedCard {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

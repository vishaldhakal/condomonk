import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";

import Link from "next/link";


async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" +
      city +
      "?project_type=Detached&page_size=200",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getCities() {
  const res = await fetch("https://api.condomonk.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

const retImage = (data) => {
  if (data.length > 0) {
    if (data[0].image.length > 0 && data[0].image[0].image) {
      return `https://api.condomonk.ca${data[0].image[0].image}`;
    }
  } else {
    return "/social/gta.webp";
  }
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  const data = await getData(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/pre-construction-homes/${params.city}/detached/`,
    },
    title:
      data.preconstructions.length +
      " Preconstruction Detached Homes in " +
      city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} upcoming pre construction Detached Homes. Check out ${data.preconstructions.length}+ new construction detached homes on condomonk. Floor plans & pricing updated for upcoming new construction detached homes in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  // const blogPosts = await fetchBlogPostByCity(params?.city);
  let cities = await getCities();

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-5 position-relative">
        <div className="container-fluid px-md-5">
          <div className="pb-0">
            <h1 className="main-title text-center text-md-start fs-mine mb-0">
              {`New Construction Detached Homes in ${CapitalizeFirst(
                params.city
              )} ( Selling Now )`}
            </h1>
            <p className="text-dark text-center text-md-start mb-2">
              {`${
                data.preconstructions.length
              } Pre construction Detached Homes in ${CapitalizeFirst(
                params.city
              )} (Updated ${
                new Date().getMonth() +
                1 +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
              })`}
            </p>
          </div>
          <div className="d-flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/`}
              >
                All Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
        </div>

       

        <div className="py-3"></div>
        <div className="container-fluid px-md-5">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
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
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
           Looking to buy a preconstruction home 
                ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
               Contact Condomonk now!
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

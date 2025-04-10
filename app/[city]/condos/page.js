import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import Newsletter from "@/components/Newsletter";

import Link from "next/link";

async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" +
      city +
      "?project_type=Condo&page_size=200",
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
      canonical: `https://condomonk.ca/${params.city}/condos/`,
    },
    title: data.preconstructions.length + " Preconstruction Condos in " + city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} upcoming pre construction Condos. Check out ${data.preconstructions.length}+ new construction condos on Dolphy. Floor plans & pricing updated for upcoming new construction condos in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  // const blogPosts = await fetchBlogPostByCity(params?.city);
  let cities = await getCities();

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-lg-5 pt-3 position-relative">
        <div className="container">
          <div className="">
            <h1 className="main-title  font-family2 mb-2">
              {`Pre Construction Condos in  ${CapitalizeFirst(params.city)} `}{" "}
              <div className="relative inline-flex sm-center me-2 text-wrap">
                <span className="absolute inset-x-0 bottom-0 b"></span>
                <span className="relative font-bold text-black whitespace-normal">
                  (Selling Now)
                </span>
              </div>
            </h1>
            <h2 className="font-normal sm-center pb-2 pt-1 pb-md-0 mb-0 fw-medium md:text-lg text-xs">
              {data.preconstructions.length}+ Pre construction condos in{" "}
              {CapitalizeFirst(params.city)}. Affordable 1-4 bedroom new
              construction condos in highly desirable communities. Discover{" "}
              {CapitalizeFirst(params.city)} new developments by reputable home
              builders, check pricing, floor plans, and get the early updates on
              new construction condo projects.
            </h2>
          </div>
          <div className="d-flex sm-center pb-2 pb-md-0 sticky-buttons z-0">
            <div className="d-flex flex-column flex-md-row mb-md-4 mb-0 mt-1 overflow-hidden">
              <div className="d-flex gap-2">
                <h3>
                  <Link
                    className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m border-2 border-transparent hover:border-b-[#FFC007]"
                    href={`/${params.city}/`}
                  >
                    All Projects in {CapitalizeFirst(params.city)}
                  </Link>
                </h3>
                <h3>
                  <Link
                    className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m mx-0 me-2 border-2 border-transparent hover:border-b-[#FFC007]"
                    href={`/${params.city}/upcoming/`}
                  >
                    Upcoming Projects in {CapitalizeFirst(params.city)}
                  </Link>
                </h3>
              </div>
              <div className="d-flex gap-2">
                <h3>
                  <Link
                    className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m border-2 border-transparent hover:border-b-[#FFC007]"
                    href={`/${params.city}/townhomes/`}
                  >
                    New Townhomes {CapitalizeFirst(params.city)}
                  </Link>
                </h3>
                <h3>
                  <Link
                    className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m border-2 border-transparent hover:border-b-[#FFC007]"
                    href={`/${params.city}/detached/`}
                  >
                    New Detached Homes {CapitalizeFirst(params.city)}
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4  gy-4 gx-3">
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
          <Newsletter />
          <div className="py-5 my-5" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h3 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
                Looking to buy a preconstruction home ?
              </h3>

              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="City Page"
                    city={data.city.name}
                  ></BottomContactForm>
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
                      __html: data.city.condos_details,
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

export async function generateStaticParams() {
  const cities = await fetch("https://api.condomonk.ca/api/all-city").then(
    (res) => res.json()
  );

  return cities.map((city) => ({
    city: city.slug,
  }));
}

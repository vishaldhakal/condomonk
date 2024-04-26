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
      "?status=Upcoming&page_size=200",
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
      canonical: `https://condomonk.ca/${params.city}/upcoming/`,
    },
    title:
      data.preconstructions.length +
      " Upcoming Preconstruction Homes in " +
      city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} upcoming pre construction TownHomes, Detached & Condos. Check out ${data.preconstructions.length}+ upcoming new construction homes on condomonk. Floor plans & pricing updated for upcoming new construction homes in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  // const blogPosts = await fetchBlogPostByCity(params?.city);
  let cities = await getCities();

  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-lg-5 pt-3 position-relative">
        <div className="container ">
          <div className="">
            <h1 className="main-title  font-family2 mb-2">
              {` Pre Construction Homes in ${CapitalizeFirst(params.city)} `}{" "}
              <div className="relative inline-flex sm-center me-2 text-wrap">
                <span className="absolute inset-x-0 bottom-0 border-b-[15px] border-[#4ADE80]"></span>
                <span className="relative font-bold text-black whitespace-normal">
                  (Upcoming)
                </span>
              </div>
            </h1>
            <p className=" font-normal  mb-2 sm-center">
              {`${
                data.preconstructions.length
              } Upcoming Pre construction Detached,
              Townhomes and Condos in ${CapitalizeFirst(params.city)} `}
            </p>
          </div>
          <div className="d-flex flex-column flex-md-row mb-md-4 mb-0 mt-1 overflow-hidden">
            <div className="d-flex gap-2">
              <Link
                className="link-black badge py-2 my-1  bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}`}
              >
                All Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m  mx-0 me-2"
                href={`/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div className="d-flex gap-2">
              <Link
                className="link-black badge py-2 my-1 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 my-1  bg-white shadow-sm text-dark fs-small fw-m"
                href={`/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="bg-white pt-3 pb-3 p-sticky-top">
          <div className="container d-flex gap-2 flex-column align-items-center flex-md-row justify-content-md-start align-items-md-center fw-normal">
            <div className="d-flex">
              <h4 className="fs-6 fw-bold text-mine">
                Hey condomonk! I am looking for
              </h4>
              <h4 className="fs-6 fw-bold d-flex align-items-center mx-1 border-bottom2">
                All
                <img
                  src="/dropdown.svg"
                  alt="dropdown icon"
                  className="img-fluid dropdown-icon ms-1"
                />
              </h4>
            </div>
            <div className="d-flex">
              <h4 className="fs-6 fw-bold d-flex align-items-center mx-1 border-bottom2">
                Home Types
                <img
                  src="/dropdown.svg"
                  alt="dropdown icon"
                  className="img-fluid dropdown-icon ms-1"
                />
              </h4>
              <h4 className="fs-6 fw-bold text-mine">under</h4>
              <h4 className="fs-6 fw-bold d-flex align-items-center mx-1 border-bottom2">
                All price range
                <img
                  src="/dropdown.svg"
                  alt="dropdown icon"
                  className="img-fluid dropdown-icon ms-1"
                />
              </h4>
            </div>
            <div className="d-flex">
              <h4 className="fs-6 fw-bold text-mine">completed by</h4>
              <h4 className="fs-6 fw-bold d-flex align-items-center mx-1 border-bottom2">
                All
                <img
                  src="/dropdown.svg"
                  alt="dropdown icon"
                  className="img-fluid dropdown-icon ms-1"
                />
              </h4>
            </div>
          </div>
        </div> */}

        <div className="container">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4  gy-4 gx-3 gx-lg-2">
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
                Looking to buy a preconstruction home ?
              </h2>

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

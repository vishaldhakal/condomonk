import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

import FixedContactButton from "@/components/FixedContactButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

async function getData(city) {
  const res = await fetch("https://api.condomonk.ca/api/all-precons", {
    next: { revalidate: 10 },
  });

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

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://condomonk.ca/pre-construction-homes/`,
    },
    openGraph: {
      images: "/social/precon.webp",
    },
    title: `Be First to Move Into Canada's Most Exciting New Construction Neighborhoods`,
    description: `Lock in pricing and incentives on model homes available for a limited time. Act now before inventory fills up in Canada's most in-demand locales. With prices still accessible compared to resales, find your perfect fit.`,
  };
}

export default async function Home({ params }) {
  let all_data = await getData();
  let cities = await getCities();

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-4 position-relative">
        <div className="row row-cols-1 row-cols-md-1 align-items-center mx-0">
          <div className="col">
            <div className="py-md-4"></div>
            <h1 className=" text-center fs-1 fw-bold fs-gta pt-5 my-4 font-family2">
              List of Pre Construction Projects in Canada
            </h1>
            <h2 className="text-success mt-4 text-center">
              Register Today For VIP First Access
            </h2>
            <p className="text-success mb-4 text-center">
              Get excluisive first access to floor plans and the best pricing
            </p>
            <div className="pb-5 d-flex justify-content-center">
              <button className="btn btn-lg rounded-pill btn-dark">
                Register Now
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          {cities &&
            cities.map((city) => (
              <div key={city.slug} className="mb-5">
                {/* City Name */}
                <h2 className="fs-2 fw-bold font-family2 mb-3">{city.name}</h2>

                {/* Property Types */}
                <div className="mb-4">
                  <Link
                    href={`/${city.slug}`}
                    className="d-block mb-2 text-gray-600 hover:text-black"
                  >
                    Pre Construction Homes in {city.name}
                  </Link>
                  <Link
                    href={`/${city.slug}/townhomes`}
                    className="d-block mb-2 text-gray-600 hover:text-black"
                  >
                    Pre Construction Townhomes in {city.name}
                  </Link>
                  <Link
                    href={`/${city.slug}/condos`}
                    className="d-block mb-2 text-gray-600 hover:text-black"
                  >
                    Pre Construction Condos in {city.name}
                  </Link>
                  <Link
                    href={`/${city.slug}/detached`}
                    className="d-block mb-2 text-gray-600 hover:text-black"
                  >
                    Pre Construction Detached Homes in {city.name}
                  </Link>
                </div>

                {/* Projects in this city */}
                <div className="mb-5">
                  <h3 className="fs-4 fw-bold font-family2 mb-3">
                    List of Pre Construction Projects in {city.name}
                  </h3>
                  {all_data
                    .filter((item) => item.slug === city.slug)
                    .map((item) => (
                      <div key={item.slug} className="mb-4">
                        <div className="row row-cols-2 row-cols-md-4 gx-3 gy-2">
                          {item.preconstructions &&
                            item.preconstructions.map((precon) => (
                              <div className="col" key={precon.slug}>
                                <Link
                                  href={`/${item.slug}/${precon.slug}`}
                                  className="text-gray-600 hover:text-black text-decoration-none"
                                >
                                  {precon.project_name}
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

          {/* Contact Form Section */}
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Condomonk Team Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="All"
                    city="Preconstruction Homes Page"
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

import FixedContactButton from "@/components/FixedContactButton";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

async function getData() {
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

export default async function Home() {
  let all_data = await getData();
  let cities = await getCities();

  // Helper function to filter projects by type
  const filterByType = (citySlug, type) => {
    const cityData = all_data.find((data) => data.slug === citySlug);
    if (!cityData || !cityData.preconstructions) return [];
    return cityData.preconstructions.filter(
      (project) => project.project_type === type
    );
  };

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
            cities.map((city) => {
              // Get projects for each type
              const condoProjects = filterByType(city.slug, "Condo");
              const townhomeProjects = filterByType(city.slug, "Townhome");
              const detachedProjects = filterByType(city.slug, "Detached");

              // Only show city if it has any projects
              if (
                condoProjects.length === 0 &&
                townhomeProjects.length === 0 &&
                detachedProjects.length === 0
              ) {
                return null;
              }

              return (
                <div key={city.slug} className="mb-5">
                  {/* City Main Heading - Now Linked */}
                  <Link href={`/${city.slug}`} className="text-decoration-none">
                    <h3 className="fs-2 font-bold font-family2 mb-4 text-gray-800 hover:text-blue-700">
                      Pre Construction Homes in {city.name}
                    </h3>
                  </Link>

                  {/* Condos Section */}
                  {condoProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/condos`}
                        className="text-decoration-none"
                      >
                        <h4 className="fs-5 mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Condos in {city.name}
                        </h4>
                      </Link>
                      <div className="row">
                        {condoProjects.map((project) => (
                          <div
                            key={project.id}
                            className="col-12 col-md-4 mb-3"
                          >
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="text-decoration-none"
                            >
                              <div className="d-flex align-items-center">
                                <div>
                                  <p className="mb-0 pb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
                                    {project.project_name}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Townhomes Section */}
                  {townhomeProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/townhomes`}
                        className="text-decoration-none"
                      >
                        <h4 className="fs-5 mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Townhomes in {city.name}
                        </h4>
                      </Link>
                      <div className="row">
                        {townhomeProjects.map((project) => (
                          <div
                            key={project.id}
                            className="col-12 col-md-4 mb-3"
                          >
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="text-decoration-none"
                            >
                              <div className="d-flex align-items-center">
                                <div>
                                  <p className="mb-0 pb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
                                    {project.project_name}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detached Homes Section */}
                  {detachedProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/detached`}
                        className="text-decoration-none"
                      >
                        <h4 className="fs-5 mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Detached Homes in {city.name}
                        </h4>
                      </Link>
                      <div className="row">
                        {detachedProjects.map((project) => (
                          <div
                            key={project.id}
                            className="col-12 col-md-4 mb-3"
                          >
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="text-decoration-none"
                            >
                              <div className="d-flex align-items-center">
                                <div>
                                  <p className="mb-0 pb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
                                    {project.project_name}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

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

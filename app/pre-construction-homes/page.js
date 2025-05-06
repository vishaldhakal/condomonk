import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";

import FixedContactButton from "@/components/FixedContactButton";
import Link from "next/link";

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
      <FixedContactButton />
      <div className="pt-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-1 items-center mx-0">
          <div>
            <div className="py-0 md:py-4"></div>
            <h1 className="text-center text-4xl font-bold pt-5 my-4 font-family2">
              List of Pre Construction Projects in Canada
            </h1>
            <h2 className="text-green-700 mt-4 text-center">
              Register Today For VIP First Access
            </h2>
            <p className="text-green-700 mb-4 text-center">
              Get excluisive first access to floor plans and the best pricing
            </p>
            <div className="pb-5 flex justify-center">
              <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800">
                Register Now
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
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
                <div key={city.slug} className="mb-20">
                  <Link href={`/${city.slug}`} className="no-underline">
                    <h3 className="text-2xl font-bold  mb-4 text-gray-800 hover:text-blue-700">
                      Pre Construction Homes in {city.name}
                    </h3>
                  </Link>

                  {condoProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/condos`}
                        className="no-underline"
                      >
                        <h4 className="text-lg mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Condos in {city.name}
                        </h4>
                      </Link>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {condoProjects.map((project) => (
                          <div key={project.id} className="mb-1">
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="no-underline"
                            >
                              <div className="flex items-center">
                                <div>
                                  <p className="mb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
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

                  {townhomeProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/townhomes`}
                        className="no-underline"
                      >
                        <h4 className="text-lg mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Townhomes in {city.name}
                        </h4>
                      </Link>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {townhomeProjects.map((project) => (
                          <div key={project.id} className="mb-1">
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="no-underline"
                            >
                              <div className="flex items-center">
                                <div>
                                  <p className="mb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
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

                  {detachedProjects.length > 0 && (
                    <div className="mb-4">
                      <Link
                        href={`/${city.slug}/detached`}
                        className="no-underline"
                      >
                        <h4 className="text-lg mb-3 font-semibold text-gray-800 hover:text-blue-700">
                          Pre Construction Detached Homes in {city.name}
                        </h4>
                      </Link>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {detachedProjects.map((project) => (
                          <div key={project.id} className="mb-1">
                            <Link
                              href={`/${city.slug}/${project.slug}`}
                              className="no-underline"
                            >
                              <div className="flex items-center">
                                <div>
                                  <p className="mb-0 leading-none text-gray-600 hover:text-blue-700 hover:underline">
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

          <div className="py-20 my-20" id="mycontact">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="w-1/4 md:w-1/2 mb-3"
                />
              </div>
              <h2 className="font-semibold text-center px-4 text-lg">
                Contact Condomonk Team Today
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 mt-3">
                <div className="md:col-span-1"></div>
                <div className="md:col-span-1">
                  <BottomContactForm
                    proj_name="All"
                    city="Preconstruction Homes Page"
                  />
                </div>
                <div className="md:col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";

export default function CityDirectory({
  cityData,
  cityName,
  citySlug,
  devData,
}) {
  if (!cityData || !devData?.results) return null;

  // Filter developers that have projects in this city
  const cityDevelopers = devData.results
    .filter((dev) => {
      return cityData.all_projects.some(
        (project) => project.developer_name === dev.name
      );
    })
    .map((dev) => ({
      id: dev.id,
      name: dev.name || "",
      slug: dev.slug || "",
      project_count: cityData.all_projects.filter(
        (p) => p.developer_name === dev.name
      ).length,
      image: dev.image || "",
      details: dev.details || "",
    }));

  console.log("City Developers:", cityDevelopers); // Debug log

  const { project_types, status_summary } = cityData.city_data;
  const { all_projects } = cityData;

  // Property type links
  const projectTypes = [
    {
      value: "Upcoming",
      label: `Upcoming Pre Construction Detached Homes in ${cityName}`,
      path: `/upcoming`,
    },
    {
      value: "Detached",
      label: `Pre Construction Detached Homes in ${cityName}`,
      path: `/detached`,
    },
    {
      value: "Townhome",
      label: `Pre Construction Townhomes in ${cityName}`,
      path: `/townhomes`,
    },
    {
      value: "Condo",
      label: `Pre Construction Condos in ${cityName}`,
      path: `/condos`,
    },
  ];

  // Price range links
  const priceRanges = [
    {
      value: "under-500k",
      label: `Pre Construction Homes Under $500K in ${cityName}`,
    },
    {
      value: "500k-600k",
      label: `Pre Construction Homes from $500K to $600K in ${cityName}`,
    },
    {
      value: "600k-700k",
      label: `Pre Construction Homes from $600K to $700K in ${cityName}`,
    },
    {
      value: "under-1-million",
      label: `Pre Construction Homes Under 1M in ${cityName}`,
    },
    {
      value: "under-1.5-million",
      label: `Pre Construction Homes Under 1.5M  in ${cityName}`,
    },
  ];

  return (
    <div className="max-w-9xl mx-auto px-2 md:px-0 py-16">
      {/* Browse by Property Type */}
      <div className="pb-12">
        <h4 className="text-2xl font-semibold text-gray-900 mb-8">
          Browse by Property Type
        </h4>
        <div className="flex flex-wrap gap-3">
          {projectTypes.map((type) => (
            <Link
              key={type.value}
              href={`/${citySlug}${type.path}`}
              className="text-sm text-blue-700 hover:text-blue-800   py-1 px-3"
            >
              {type.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Price Range */}
      <div className="mb-12">
        <h4 className="text-2xl font-semibold text-gray-900 mb-4">
          Browse by Price Range
        </h4>
        <div className="flex flex-wrap gap-3">
          {priceRanges.map((range) => (
            <Link
              key={range.value}
              href={`/${citySlug}/price/${range.value}`}
              className="text-sm text-blue-700 hover:text-blue-800 decoration-blue-700  py-1 px-3"
            >
              {range.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Developers Section */}
      {cityDevelopers.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Pre Construction Homes by Developers in {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cityDevelopers.map((developer) => (
              <Link
                key={developer.id}
                href={`/builders/${developer.slug}`}
                className="group flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {developer.image && (
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700 underline group-hover:text-blue-800">
                    {developer.name}
                  </h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs text-gray-500">
                      {developer.project_count}{" "}
                      {developer.project_count === 1 ? "Project" : "Projects"}{" "}
                      in {cityName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="mt-16">
        <h4 className="text-2xl font-semibold text-gray-900 mb-6">
          All Pre Construction Projects in {cityName}
        </h4>
        {cityData.all_projects && cityData.all_projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium text-black uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="hidden md:table-cell px-3 py-2 text-left text-sm font-medium text-black uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cityData.all_projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Link
                        href={`/pre-construction-homes/${project.slug}`}
                        className="px-2 py-0.5 text-sm font-medium bg-gray-50 text-gray-900 rounded-lg"
                      >
                        {project.project_name}
                      </Link>
                    </td>
                    <td className="hidden md:table-cell px-3 py-2 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-sm font-medium bg-gray-50 text-gray-900 rounded-lg">
                        {project.project_type}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-sm font-medium ">
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found for this city.</p>
          </div>
        )}
      </div>
    </div>
  );
}

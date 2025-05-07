import Link from "next/link";

export default function CityDirectory({ cityData, cityName, citySlug }) {
  if (!cityData) return null;

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
    <div className="max-w-6xl mx-auto px-2 md:px-0 py-16">
      {/* Browse by Property Type */}
      {/* <div className="pb-12">
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
      </div> */}

      {/* Browse by Price Range */}
      {/* <div className="mb-12">
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
      </div> */}

      {/* Projects Table */}
      <div className="mt-12">
        <h4 className="text-md font-semibold text-gray-900 mb-6">
          All Pre Construction Projects in {cityName} | Last Updated{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h4>
        {cityData.all_projects && cityData.all_projects.length > 0 ? (
          <div className="overflow-x-auto border p-4 border-gray-300 rounded-md">
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

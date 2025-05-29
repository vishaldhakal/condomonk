const CityTable = ({ cities, handleEdit, handleDelete }) => {
  return (
    <div className="container mx-auto px-4">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-800">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              S.N
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              City Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cities &&
            cities.map((city, index) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{city.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="inline-flex items-center px-3 py-1 border border-gray-800 text-sm font-medium rounded-md text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={(e) => handleEdit(e, city.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2"></span>
                  <button
                    className="inline-flex items-center px-3 py-1 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    onClick={(e) => handleDelete(e, city.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;

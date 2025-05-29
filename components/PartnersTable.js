const PartnersTable = ({ partners, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Email
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
          {partners &&
            partners.map((partner, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-gray-800 text-xs font-medium rounded-md text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    onClick={(e) => handleEdit(e, partner.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2"></span>
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-red-600 text-xs font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                    onClick={(e) => handleDelete(e, partner.id)}
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

export default PartnersTable;

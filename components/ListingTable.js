import Link from "next/link";

const ListingTable = ({ preconstructions, handleDelete, filters }) => {
  const filteredPreconstructions = preconstructions.filter(
    (preconstruction) => {
      if (filters.status === "All") {
        return true;
      } else {
        return preconstruction.status === filters.status;
      }
    }
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-6 py-3 text-left whitespace-nowrap">S.N</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Project Name
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">City</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Project Status
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">
              Project Type
            </th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPreconstructions.map((preconstruction, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4">
                {index + 1}
              </th>
              <td className="px-6 py-4">{preconstruction.project_name}</td>
              <td className="px-6 py-4">{preconstruction.city.name}</td>
              <td className="px-6 py-4">{preconstruction.status}</td>
              <td className="px-6 py-4">{preconstruction.project_type}</td>
              <td className="px-6 py-4">
                <Link
                  href={"/admin/upload/" + preconstruction.id}
                  className="px-3 py-1 text-sm border border-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Edit
                </Link>
                <span className="mx-2"></span>
                <button
                  className="px-3 py-1 text-sm border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                  onClick={(e) => handleDelete(e, preconstruction.id)}
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

export default ListingTable;

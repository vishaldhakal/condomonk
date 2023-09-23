import Link from "next/link";

const ListingTable = ({ preconstructions, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">Project Name</th>
            <th scope="col">City</th>
            <th scope="col">Project Status</th>
            <th scope="col">Project Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {preconstructions &&
            preconstructions.map((preconstruction, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{preconstruction.project_name}</td>
                <td>{preconstruction.city.name}</td>
                <td>{preconstruction.status}</td>
                <td>{preconstruction.project_type}</td>
                <td>
                  <Link
                    href={"/admin/upload/" + preconstruction.id}
                    className="btn btn-sm btn-outline-dark"
                  >
                    Edit
                  </Link>
                  <span className="mx-2"></span>
                  <button
                    className="btn btn-sm btn-outline-danger"
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

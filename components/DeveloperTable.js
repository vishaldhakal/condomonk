const DeveloperTable = ({ developers, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">Developer Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Website Link</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {developers &&
            developers.map((developer, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{developer.name}</td>
                <td>{developer.phone}</td>
                <td>{developer.website_link}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={(e) => handleEdit(e, developer.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2"></span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => handleDelete(e, developer.id)}
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

export default DeveloperTable;

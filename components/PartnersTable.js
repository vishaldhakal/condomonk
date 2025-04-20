const PartnersTable = ({ partners, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {partners &&
            partners.map((news, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{news.name}</td>
                <td>{news.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={(e) => handleEdit(e, news.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2"></span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => handleDelete(e, news.id)}
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

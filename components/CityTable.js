const CityTable = ({ cities, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">City Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cities &&
            cities.map((city, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{city.name}</td>
                <td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={(e) => handleEdit(e, city.id)}
                    >
                      Edit
                    </button>
                    <span className="mx-2"></span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => handleDelete(e, city.id)}
                    >
                      Delete
                    </button>
                  </td>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;

const NewsTable = ({ news, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">News Title</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Link</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {news &&
            news.map((news, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{news.news_title}</td>
                <td>{news.last_updated.slice(0, 10)}</td>
                <td>{news.news_link}</td>
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

export default NewsTable;

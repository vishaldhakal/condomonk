const EventTable = ({ events, handleEdit, handleDelete }) => {
  return (
    <div className="container">
      <table className="table table-striped table-responsive">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col">S.N</th>
            <th scope="col">Event Title</th>
            <th scope="col">Event Date</th>
            <th scope="col">Link</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{event.event_title}</td>
                <td>{event.event_date.slice(0, 10)}</td>
                <td>{event.event_link}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={(e) => handleEdit(e, event.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2"></span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => handleDelete(e, event.id)}
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

export default EventTable;

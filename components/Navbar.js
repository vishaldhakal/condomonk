const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light py-3">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Condomonk
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#" aria-current="page">
                Condos For Sale
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <button
            className="btn btn-danger my-2 my-sm-0 rounded-pill"
            type="submit"
          >
            Platinum Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

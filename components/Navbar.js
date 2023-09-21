const Navbar = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block">Portal Admin</span>
        </a>
      </div>
      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">Vishal Dhakal</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

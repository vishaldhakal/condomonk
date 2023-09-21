import Link from "next/link";

const AdminNavbar = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/admin/" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block">Dashboard</span>
        </Link>
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
          <li className="nav-item dropdown pe-3">Admin</li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavbar;

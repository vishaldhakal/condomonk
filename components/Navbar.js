"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-lg py-4">
      <div className="container-fluid">
        <Link href="/" className="logo d-flex align-items-center">
          <span>Condomonk</span>
        </Link>
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
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active fw-bold"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Condos For Sale
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <div className="container">
                  <div className="row">
                    {cities &&
                      cities.map((city) => (
                        <div className="col-md-4" key={city.id}>
                          <Link
                            className="dropdown-item"
                            href={`/${city.slug}`}
                          >
                            {city.name}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
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
            className="btn btn-danger my-2 my-sm-0 rounded-pill ms-md-3"
            type="submit"
          >
            Call Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

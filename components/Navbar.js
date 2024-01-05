"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";


const Navbar = ({ cities, dropdown_cities }) => {
  const [cityname, setCityname] = useState("");

  // if (pathname.startsWith("/admin")) {
  //   return <></>;
  // }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-lg py-4">
      <div className="container-fluid justify-content-start">
       <Link href="/" className="logo ">
          <span>Condomonk</span>
        </Link>
        <div className="input-group input-group-search mx-1 me-md-0">
          <SearchBar changeCity={setCityname} cities={cities} />
          <Link
            href={"/" + cityname.toLowerCase()}
            className="d-none d-md-inline"
          >
            <button
              className="input-group-text btn bg-light2 bg-lh d-block"
              type="button"
              aria-label="Search Button"
            >
              <svg
                aria-hidden="true"
                className="svg"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
              >
                <path
                  d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
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
                  <div className="row row-cols-md-3 row-cols-2">
                    {cities &&
                      cities.map((city) => (
                        <div className="col" key={city.id}>
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
          > <a className="nav-link" href="#contact">
            Call Now
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

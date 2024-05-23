"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectSearch from "./ProjectSearch";

const Navbar = ({ cities, dropdown_cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", changeBackground);
    }
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setButtonClicked(!buttonClicked);
  };

  return (
    <div
      className={navbar ? "navbar-transparent active" : "navbar-transparent"}
    >
      <nav className="navbar navbar-expand-lg py-lg-3">
        <div className="container justify-content-start">
          <div className="d-flex">
            <Link
              href="/"
              className="logo d-flex justify-content-center align-items-center pe-1 font-family2"
            >
              <span>Condomonk</span>
            </Link>
            <div
              className="input-group input-group-search
             me-md-0"
            >
              <ProjectSearch />
            </div>
            <button
              className={`navbar-toggler ${buttonClicked ? "bg-white" : ""}`}
              type="button"
              onClick={toggleCollapse}
              aria-controls="collapsibleNavId"
              aria-expanded={isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={`collapse navbar-collapse ${isCollapsed ? "show" : ""} ${
              isCollapsed ? "bg-white" : ""
            }`}
            id="collapsibleNavId"
          >
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown mx-1">
                <a
                  className="nav-link dropdown-toggle active fw-medium shadow-sm rounded-2"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cities
                </a>
                <div
                  className="dropdown-menu mt-1"
                  aria-labelledby="dropdownId"
                >
                  <div className="container">
                    <div className="row row-cols-md-3 row-cols-3">
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
              <li className="nav-item mx-1">
                <a className="nav-link" href="/pre-construction-homes">
                  Pre Construction Homes
                </a>
              </li>
              <li className="nav-item rounded-2 shadow-sm mx-1">
                <a className="nav-link" href="#">
                  Top 10 <span className="fw-medium">GTA</span> Projects
                </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link" href="">
                  Blogs
                </a>
              </li>
            </ul>
            <button
              className="btn bg-warning btn-warning my-2 my-sm-0 rounded ms-md-4 py-2 px-3"
              type="submit"
            >
              <a className="nav-link text-black" href="#contact">
                Contact Now
              </a>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

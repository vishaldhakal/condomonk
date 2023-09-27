"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const pathname = usePathname();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.condomonk.ca/api/city/")
      .then((res) => {
        setCities(res.data.results);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light py-3">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          Condomonk
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
          <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
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
                {cities.map((city) => (
                  <Link className="dropdown-item" href={`/${city.slug}`}>
                    {city.name}
                  </Link>
                ))}
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
            className="btn btn-danger my-2 my-sm-0 rounded-pill"
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

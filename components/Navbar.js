"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import SearchSuggest from "./SerachSuggest";

const Navbar = ({ cities, dropdown_cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);

  // if (pathname.startsWith("/admin")) {
  //   return <></>;
  // }


  const changebackground = () => {
    if(window.scrollY >= 80){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
  };

  useEffect(() =>{
    if(window){
      window.addEventListener('scroll', changebackground);
    }
  },[])

  return (
    <div
      className={navbar ? "navbar-transparent active" : "navbar-transparent"}
    >
      <nav className=" navbar navbar-expand-lg  py-3">
        <div className=" container justify-content-start">
          <div className="d-flex">
            <Link
              href="/"
              className="logo d-flex justify-content-center align-items-center pe-1 "
            >
              <span>Condomonk</span>
            </Link>
            <div className="input-group input-group-search mx-1 me-md-0">
              <SearchSuggest cities={cities} />
             
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
          </div>
          <div className=" collapse  navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active fw-medium shadow-sm"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cities
                </a>
                <div
                  className="dropdown-menu mt-1 "
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

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blogs
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <button
              className="btn bg-dark btn-dark my-2 my-sm-0 rounded ms-md-4 py-2 px-3"
              type="submit"
            >
              {" "}
              <a className="nav-link btn-dark text-white" href="#contact">
                Call Now
              </a>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

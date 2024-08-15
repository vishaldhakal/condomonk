import Link from "next/link";
import SearchBar from "@/components/SearchBar";

async function getCities() {
  const res = await fetch("https://api.condomonk.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function NotFound() {
  let cities = await getCities();

  return (
    <>
      <div className="py-5"></div>
      <div className="container-fluid">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img src="/404.png" alt="condomonk" className="img-fluid icon-img" />
          <h4 className="text-center fs-md-2 fw-bold mb-0">
            Oops! Looks like this page is off the map.
          </h4>
          <p className="text-center fs-small fs-md-5 mt-2 fw-bold mt-md-0 mb-4">
            Find your way home.
          </p>
          <div className="pb-1 ww">
            <SearchBar cities={cities} />
          </div>
        </div>
        <div className="py-1 py-md-3 d-flex justify-content-center">
          <Link
            href={"/calgary/"}
            className="fw-bold fs-top city-title position-relative mb-4 p-0"
          >
            Calgary
          </Link>
          <p className="fw-bold fs-line mx-2 mt-1 mb-0">
            <img
              src="/mapleleaf.svg"
              alt="maple leaf divider"
              className="img-fluid maple-leaf"
            />
          </p>
          <Link
            href={"/greater-toronto-area/"}
            className="fw-bold fs-top city-title position-relative mb-0 p-0 m-0"
          >
            Toronto
          </Link>
        </div>
        <div className="row p-3 pt-2 dopp">
          <div className="col-12 pb-5">
            <div
              className="alert alert-success bg-lightyellow alert-dismissible fade show mt-2 mb-0 rounded-3 d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row justify-content-start align-items-start gap-3"
              role="alert"
            >
              <div>
                <div className="my-2 my-sm-0 d-flex text-dark align-items-center gap-2">
                  <img
                    src="/COA-agent-pic.jpg"
                    alt="agent pic"
                    className="img-fluid img-call-height-dropdown"
                  />
                  <div className="d-flex flex-column justify-content-start align-items-start">
                    <p className="mb-0 fw-bold">
                      Looking for New Construction Homes in Calgary ?
                    </p>
                    <p className="fs-small mb-0">
                      Call us at
                      <Link href={"telto:(587) 887-2572"} className="me-2 ms-1">
                        (587) 887-2572
                      </Link>
                      to speak with our friendly new homes advisor.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                className="btn btn-white link-black"
                href={"/pre-construction-homes/"}
              >
                Explore all projects
                <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>
          </div>
          {/* <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Link
              className="link-black"
              href={"/pre-construction-homes/toronto/"}
            >
              <h5 className="mb-2 fw-mine fs-4">Toronto</h5>
            </Link>
            <ul className="list-unstyled">
              <li>
                <a className="dropdown-item" href="#">
                  Alfie Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Temple Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Temple Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Maison Wellesley Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  400 Front Street Condos
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Link
              className="link-black"
              href={"/pre-construction-homes/calgary/"}
            >
              <h5 className="mb-2 fw-mine fs-4">Calgary</h5>
            </Link>
            <ul className="list-unstyled">
              <li>
                <a className="dropdown-item" href="#">
                  Myne Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Cornerview Towns
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Novella 2 Townhomes
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Highgate Condos
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Link
              className="link-black"
              href={"/pre-construction-homes/brampton/"}
            >
              <h5 className="mb-2 fw-mine fs-4">Brampton</h5>
            </Link>
            <ul className="list-unstyled">
              <li>
                <a className="dropdown-item" href="#">
                  Honeystone House
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Bramalea Square Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Bodhi Towns
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Arbor West Homes
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Boutin Tower
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Link
              className="link-black"
              href={"/pre-construction-homes/mississauga/"}
            >
              <h5 className="mb-2 fw-mine fs-4">Mississauga</h5>
            </Link>
            <ul className="list-unstyled">
              <li>
                <a className="dropdown-item" href="#">
                  Whitehorn Wood Towns
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  M6 Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  The Southland Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  MW Condos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Canopy Towers 2
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <div className="py-5"></div>
    </>
  );
}

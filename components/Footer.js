"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/Linkdmin")) {
    return <></>;
  }
  return (
    <div className="pt-5">
      <footer className="footer mt-5  shadow-lg">
        <div className="">
          <div className="text-center pt-5 bg-yellow-500 px-3">
            <p className="fs-2 fw-bold font-family2">
              Get Exclusive Preconstruction Updates.
            </p>
            <p className="textt">
              Be the First to Know! Subscribe to Our Newsletter and Receive
              Timely Updates on Exclusive Preconstruction projects from
              reputable builders across Canada – Condomonk.ca curates the latest
              updates on any new construction townhomes, condos & detached homes
              launching across canada.
            </p>

            <form action="">
              <div className="d-flex textt py-5 ">
                <input
                  type="text"
                  name="email"
                  className="fields mx-2"
                  placeholder="email"
                />
                <Link
                  href=""
                  className="btn btn-dark d-flex fw-bold align-items-center"
                >
                  Sign Up{" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <div className=" container pt-5 mt-md-5 mt-0">
            <div className="container footer-links">
              <h3 className="text-center fw-bold pb-2 fs-2 font-family2">
                {" "}
                New homes in Canada
              </h3>
              <div className=" text-center footer-listcontainer pt-2">
                <ul className="row row-cols-md-4 row-cols-1 list-unstyled d-flex align-items-center justify-content-center">
                  {cities &&
                    cities.map((city) => (
                      <li key={city.id} className="col mb-4">
                        <Link href={`/new-homes/${city.slug}`}>
                          <span>New homes in {city.name}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className=" container pt-5 mt-md-5 mt-0">
            <div className="container footer-links">
              <h3 className="text-center fw-bold pb-2 fs-2 font-family2">
                {" "}
                Pre construction townhomes in Canada
              </h3>
              <div className=" text-center footer-listcontainer pt-2">
                <ul className="row row-cols-md-3 row-cols-1 list-unstyled d-flex align-items-center justify-content-center">
                  {cities &&
                    cities.map((city) => (
                      <li key={city.id} className="col mb-4">
                        <Link href={`/${city.slug}/townhomes`}>
                          <span>Pre construction townhomes in {city.name}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5 pt-5 ">
          <div className="footer-listcontainer  d-flex justify-content-around  align-items-center">
            <div className="row row-cols-md-3 row-cols-1 d-flex justify-content-around  align-items-center pt-5 ">
              <div className="col-md-6 texttt text-center">
                <Link href="/" className="flogo font-family2">
                  <span>Condomonk</span>
                </Link>
                <p></p>
                <p className="pe-md-5 px-0 ">
                  Note: Condomonk is Canada's one of the largest database of new
                  pre construction homes. Our comprehensive database is
                  populated by our research and analysis of publicly available
                  data. Condomonk strives for accuracy and we make every effort
                  to verify the information. The information provided on
                  Condomonk.ca may be outdated or inaccurate. Condomonk Inc. is
                  not liable for the use or misuse of the site's information.The
                  information displayed on condomonk.ca is for reference only.
                  Please contact a liscenced real estate agent or broker to seek
                  advice or receive updated and accurate information.
                </p>
              </div>

              <div className="col-md-3 mt-4 pt-5 pt-lg-0 mt-lg-0 footer-contact">
                <h4>Contact Us</h4>
                <p>4 Robert speck parkway,</p>
                <p>Mississauga, ONTARIO</p>

                <p className="mt-2">
                  <strong>Phone:</strong> <span>647 527 4970</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>info@condomonk.ca</span>
                </p>
              </div>
              <div className="col-md-3">
                <div className="social-links d-flex mt-4  ">
                  <Link href="#" className="me-2">
                    <i className="bi bi-twitter"></i>
                  </Link>
                  <Link href="#" className="me-2">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link href="#" className="me-2">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link href="#" className="me-2">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container copyright text-start text-center py-5">
          <p className="mb-0">
            ©2024 <span>Copyright</span>{" "}
            <strong className="px-1">Condomonk</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <p className="mt-0">
            Condomonk is a digital asset of Homebaba Technologies Inc.{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

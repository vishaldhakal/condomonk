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

        {/* footer description */}
        <div className="container my-5 ">
          <div className="row d-flex justify-center items-center max-w-7xl mx-auto">
            <div className="col-12 mb-4 ">
              <p className="small text-muted max-w-2xl text-center mx-auto ">
                Condomonk refers potential buyers to real estate agents that are
                licensed in the province where the respective property is
                located. DOLPHIN REALTY INC. is licensed as a real estate
                brokerage in Ontario. Dolphin Realty is a boutique real estate
                firm that empowers clients and agents to achieve success in real
                estate. With state-of-the-art technology, professionalism, and
                strong culture, Dolphin Realty aims to become your most trusted
                real estate partner. Founded in January 1, 2022, Dolphin has
                completed over 500 million in transaction volume by 2023.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <div className="flex justify-center pb-3">
                <img
                  src="/trebb.png"
                  alt="Toronto Regional Real Estate Board"
                  className="h-6 text-center"
                />
              </div>
              <p className="small text-muted text-center">
                The listing data is provided under copyright by the Toronto
                Regional Real Estate Board (TRREB). The information provided
                herein must only be used by consumers that have a bona fide
                interest in the purchase, sale or lease of real estate and may
                not be used for any commercial purpose or any other purpose. The
                data is deemed reliable but is not guaranteed accurate by the
                Toronto Regional Real Estate Board nor Homebaba INC. The
                information provided on this page, including the Affordability,
                Afford Score™, and Affordability Coach, are provided for
                informational purposes only and should not be used or construed
                as financial or investment advice by any individual. No
                representations or warranties, express or implied, are made by
                Homebaba INC or its affiliates as to the accuracy or
                completeness of the information on this page. Last Updated: Tue,
                11 Feb 2025 15:08:48 GMT UTC
              </p>
            </div>
            <div className="col-md-6">
              <div className="flex justify-center">
                <img
                  src="/crea.png"
                  alt="MLS Logo"
                  className="h-6 text-center"
                />
              </div>
              <p className="small text-muted mt-3">
                The REALTOR® trademark is controlled by The Canadian Real Estate
                Association (CREA) and identifies real estate professionals who
                are members of CREA. The trademarks MLS®, Multiple Listing
                Service® and the associated logos identify professional services
                rendered by REALTOR® members of CREA to effect the purchase,
                sale and lease of real estate as part of a cooperative selling
                system. The listing data displayed is deemed reliable but is not
                guaranteed accurate by CREA®. Data last updated on Tue, 11 Feb
                2025 15:08:48 GMT UTC
              </p>
            </div>
          </div>
        </div>

        <div className="container copyright text-start text-center py-5">
          <p className="mb-0">
            ©2025 <span>Copyright</span>{" "}
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

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <footer className="footer mt-5 shadow-lg">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span>Condomonk</span>
            </Link>
            <p></p>
            <p>
              Condomonk, your premier destination for pre-construction condos in
              Canada. Discover your dream home before it's even built. Explore
              our curated listings and find the perfect pre-construction condo
              for your future.
            </p>
            <div className="social-links d-flex mt-4">
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

          <div className="col-12 col-lg-4 col-6 footer-links">
            <h4>New Construction Condos in Canada</h4>
            <ul>
              {cities &&
                cities.map((city) => (
                  <li key={city.id}>
                    <Link href={`/${city.slug}`}>
                      <span>New construction condos in {city.name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-start text-md-start">
            <h4>Contact Us</h4>
            <p>4 Robert speck parkway,</p>
            <p>, Mississauga, ONTARIO</p>
            <p>Canada</p>
            <p className="mt-4">
              <strong>Phone:</strong> <span>647 527 4970</span>
            </p>
            <p>
              <strong>Email:</strong> <span>info@condomonk.ca</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-start text-md-center mt-4">
        <p>
          ©2023 <span>Copyright</span>{" "}
          <strong className="px-1">Condomonk</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

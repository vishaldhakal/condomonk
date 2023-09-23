"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <footer className="footer mt-5">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span>Condomonk</span>
            </a>
            <p></p>
            <p>
              Condomonk, your premier destination for pre-construction condos in
              Canada. Discover your dream home before it's even built. Explore
              our curated listings and find the perfect pre-construction condo
              for your future.
            </p>
            <div className="social-links d-flex mt-4">
              <a href="" className="me-2">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="" className="me-2">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="" className="me-2">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="" className="me-2">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Locations</h4>
            <ul>
              <li>
                <a href="#">Ajax</a>
              </li>
              <li>
                <a href="#">Brampton</a>
              </li>
              <li>
                <a href="#">Calgary</a>
              </li>
              <li>
                <a href="#">Mississauga</a>
              </li>
              <li>
                <a href="#">Milton</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p>United States</p>
            <p className="mt-4">
              <strong>Phone:</strong> <span>+1 5589 55488 55</span>
            </p>
            <p>
              <strong>Email:</strong> <span>info@condomonk.ca</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1">Condomonk</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

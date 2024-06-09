import Link from "next/link";
import Image from "next/legacy/image";
import CondoCard from "@/components/CondoCard";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import MainSearch from "@/components/MainSearch";
import "./icons.css";
import FeaturedCard from "@/components/FeaturedCard";

async function getData(city) {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions-city/" +
      city +
      "?page_size=10",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getCities() {
  const res = await fetch("https://api.condomonk.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getFeaturedData() {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions/?is_featured=True",
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Home(props) {
  const data = await getData("calgary");
  const mississauga_data = await getData("mississauga");
  const edmonton_data = await getData("edmonton");
  const cambridge_data = await getData("cambridge");
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();
  const featured = await getFeaturedData();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      {/* 
      <section id="hero">
        <div className="container">
          <div className=" hero-container">
            <div>
              <h1 className="main-titlee pb-0  mb-0 mt-2 mt-md-0 ">
                <span className="d-block ">Canada's</span> leading{" "}
                <span className="text-warning">pre construction </span>homes
                Platform
              </h1>
              <p className="titlee text-center mt-0 pt-1 text-white">
                Get first updates on New Construction Homes Projects across
                Canada
              </p>
            </div>

            <div className="pb-1 pt-3 d-flex justify-content-center align-items-center">
            </div>
          </div>
        </div>
      </section> */}
      <section className=" py-3 py-lg-5 container">
        <div className=" mt-lg-5 mt-0">
          <div className="grid items-center  grid-cols-1 gap-12 lg:grid-cols-2 ">
            <div className="order-md-1 order-2 ">
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl font-family2 sm-center">
                Canada's leading
                <div className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-0 h-[30px] bg-yellow-400"></span>
                  <span className="relative text-3xl font-bold text-black sm:text-6xl lg:text-7xl">
                    pre construction
                  </span>
                </div>
                <span className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                  homes Platform
                </span>
              </h1>

              <p className="mt-3 text-base text-black sm:text-xl sm-center font-light me-md-5 me-0">
                Get first updates on New Construction Homes Projects across
                Canada.
              </p>

              <div className=" mt-12 lg:mt-20 ">
                <img
                  src="/search top image.png"
                  className="search-top-image mx-3 img-fluid"
                  alt="Search top image"
                />
              </div>
              <div className=" ">
                <MainSearch cities={cities} />
              </div>
            </div>

            <div className="order-1 order-md-2">
              <img
                className="w-full hero-img"
                src="/hero-photo.avif"
                alt="Hero image"
                layout="responsive"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container my-4">
        <div className="row pt-5 mt-md-5 align-items-center justify-content-between">
          <div className="col-md-6">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/image1.jpeg"
                    className="d-block w-100"
                    alt="Image 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/image2.jpeg"
                    className="d-block w-100"
                    alt="Image 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/image3.jpeg"
                    className="d-block w-100"
                    alt="Image 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="font-family2 fw-bold sm-center mt-4 mt-md-0 text-4xl">
              Looking For A Pre Construction Home?
            </h1>
            <div className="buttons my-3 sm-center">
              <Link href="#contact">
                <button className="button btn btn-dark  mr-2">
                  Request Information
                </button>
                <button className="button btn btn-warning">Contact Now</button>
              </Link>
            </div>
            <p className="pt-2">
              Welcome to Condomonk, Canada's premier platform for
              pre-construction homes. Stay ahead with the latest updates on new
              construction home projects across Canada. Discover exclusive
              insights and secure your dream home before it's built.
            </p>
            <div className="recently-bought pt-md-4 pt-2">
              <h2 className="fw-normal font-family2 text-3xl sm-center text-decoration-underline">
                New Projects
              </h2>
              <div className="row g-3">
                <div className="col-4 ">
                  <img
                    src="/image1.jpeg"
                    className="img-fluid img-small"
                    alt="Image 1"
                  />
                </div>
                <div className="col-4 ">
                  <img
                    src="/image2.jpeg"
                    className="img-fluid img-small"
                    alt="Image 2"
                  />
                </div>
                <div className="col-4 ">
                  <img
                    src="/image3.jpeg"
                    className="img-fluid img-small"
                    alt="Image 3"
                  />
                </div>
                <div className="col-4 ">
                  <img
                    src="/image4.jpeg"
                    className="img-fluid img-small"
                    alt="Image 4"
                  />
                </div>
                <div className="col-4 ">
                  <img
                    src="/image5.jpeg"
                    className="img-fluid img-small"
                    alt="Image 5"
                  />
                </div>
                <div className="col-4 ">
                  <img
                    src="/image6.jpeg"
                    className="img-fluid img-small"
                    alt="Image 6"
                  />
                </div>
              </div>
            </div>
            <div className="sm-center mt-2 mt-md-0">
              <Link href="#projects">
                <div className=" mt-3 btn btn-outline-dark sm-center  ">
                  {" "}
                  <span className="sm-center btn-outline-dark ">
                    Explore More Projects{" "}
                    <i class="bi bi-arrow-up-right-circle sm-center "></i>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 " id="top10gta">
        <div className="container pt-5 ">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="fw-mine fs-big ">
              <span className="link-black font-family2">Featured Project</span>
            </h2>
            <p className="fs-5  text-center">
              Explore Top 10 Pre Construction Project for sale in GTA
            </p>
          </div>

          <div className="">
            <div className="row row-cols-1 row-cols-md-2 my-md-2 my-3 gy-3 g-4">
              {featured.results &&
                featured.results.slice(0, 8).map((item) => (
                  <div className="col" key={item.id}>
                    <script
                      key={item.slug}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(PreconSchema(item)),
                      }}
                    />
                    <FeaturedCard {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 ">
        <div className="container pt-5 " id="projects">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link href={"/calgary"} className="link-black font-family2">
                Calgary
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ pre construction homes for sale in Calgary
            </p>
            <Link href={"/calgary"} className="mt-1 text-mine text-primary">
              More communities in Calgary{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gx-3">
            {data.preconstructions &&
              data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          <div className="py-5 my-2"></div>
          <h2 className="fw-mine text-center mb-5 accent-line fs-1 font-family2">
            Explore New Pre Construction Homes In Ontario & Alberta
          </h2>
          <div className="container">
            <div className="row row-cols-md-5 row-cols-2">
              <div className="col">
                <Link className="d-block properti_city" href={"/toronto"}>
                  <div className="thumb">
                    <img
                      src="/cities/toronto.jpg"
                      alt="toronto"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Toronto</h4>
                      <p>Explore pre constructions projects in Toronto</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/brampton"}>
                  <div className="thumb">
                    <img
                      src="/cities/brampton.jpg"
                      alt="brampton"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Brampton</h4>
                      <p>Explore pre constructions projects in Brampton</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/etobicoke"}>
                  <div className="thumb">
                    <img
                      src="/cities/etobicoke.jpg"
                      alt="etobicoke"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Etobicoke</h4>
                      <p>Explore pre constructions projects in Etobicoke</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/calgary"}>
                  <div className="thumb">
                    <img
                      src="/cities/calgary.jpeg"
                      alt="calgary"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Calgary</h4>
                      <p>Explore pre constructions projects in Calgary</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/mississauga"}>
                  <div className="thumb">
                    <img
                      src="/cities/mississauga.jpg"
                      alt="mississauga"
                      className="img-fluid lazy"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Mississauga</h4>
                      <p>Explore pre constructions projects in Mississauga</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big">
              <Link href={"/mississauga"} className="link-black font-family2">
                Mississauga
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ pre construction homes for sale in Mississauga
            </p>
            <Link href={"/mississauga"} className="mt-1 text-mine text-primary">
              More developments in Mississauga{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gy-3 gx-3">
            {mississauga_data.preconstructions &&
              mississauga_data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>

          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link href={"/edmonton"} className="link-black font-family2">
                Edmonton
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ pre construction homes for sale in Edmonton
            </p>
            <Link href={"/edmonton"} className="mt-1 text-mine text-primary">
              More developments in Edmonton{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gy-3 gx-3">
            {edmonton_data.preconstructions &&
              edmonton_data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>

          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big ">
              <Link href={"/cambridge"} className="link-black font-family2">
                Cambridge
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ pre construction homes for sale in cambridge
            </p>
            <Link href={"/cambridge"} className="mt-1 text-mine text-primary">
              More developments in cambridge{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 gy-md-5 gy-3 gx-3">
            {cambridge_data.preconstructions &&
              cambridge_data.preconstructions.slice(0, 8).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          {/* <div className="py-5 mt-md-5 mt-0">
            <div className="text-center py-5 my-5 overlay-container">
              <img
                src="/heroBanner.png"
                className="img-fluid d-md-block d-none"
                alt=""
              />
              <img
                src="/heroBanner-sm.png"
                className="img-fluid d-md-none d-block"
                alt=""
              />
            </div>
          </div> */}

          <div className="pt-md-5 pt-0 mt-md-5 mt-0"></div>
          <div className="py-5 my-md-5 my-0" id="contact">
            <div className="container">
              <div className="row justify-content-center">
                <Image
                  src="/contact-bottom-2.png"
                  alt="Contact bottom"
                  width={300}
                  height={250}
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3 ">
                Looking to buy a preconstruction home ?
              </h2>

              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <BottomContactForm
                    proj_name="All"
                    city="Home Page"
                  ></BottomContactForm>
                  <div className="d-flex">
                    <p className="small-text2 mb-3 text-center">
                      Condomonk.ca serves as an online database for
                      pre-construction homes. Condomonk compiles a list of
                      projects available publicly on the internet and does not
                      engage in real estate transactions. Please note that the
                      information provided on this page may be outdated or
                      inaccurate. By submitting the above form, you consent to
                      being contacted by real estate agents advertising on this
                      page. Your information may be shared with our partners or
                      advertisers to assist with your inquiries. You can
                      unsubscribe at any time by emailing us.
                    </p>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}

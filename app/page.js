import CondoCardHome from "@/components/CondoCardHome";
import Link from "next/link";
import CondoCard from "@/components/CondoCard";
import SearchBar from "@/components/SearchBar";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";

import MainSearch from "@/components/MainSearch";
import Navbar2 from "@/components/Navbar2";
import "./icons.css";

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

export default async function Home(props) {
  const data = await getData("calgary");
  const mississauga_data = await getData("mississauga");
  const edmonton_data = await getData("edmonton");
  const cambridge_data = await getData("cambridge");
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();

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
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl sm-center font-family2">
                Canada's leading
                <div className="relative inline-flex sm-center">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-blue-500"></span>
                  <span className="relative text-3xl font-bold text-black sm:text-6xl lg:text-7xl ">
                    pre construction
                  </span>
                </div>
                <span className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                  {" "}
                  homes Platform
                </span>
              </h1>

              <p className="mt-3 text-base text-black sm:text-xl sm-center font-light me-md-5 me-0">
                Get first updates on New Construction Homes Projects across
                Canada.
              </p>

              <div className=" mt-12 lg:mt-20">
                <img
                  src="./search top image.png"
                  className="search-top-image mx-3"
                ></img>
              </div>
              <div className=" ">
                <MainSearch cities={cities} />
              </div>
            </div>

            <div className="order-1 order-md-2">
              <img className="w-full hero-img" src="/hero-photo.avif" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-5 ">
        <div className="container pt-5 ">
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
                      className="img-fluid"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Toronto</h4>
                      <p>Explore pre constructions projcts in Toronto</p>
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
                      className="img-fluid"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Brampton</h4>
                      <p>Explore pre constructions projcts in Brampton</p>
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
                      className="img-fluid"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Etobicoke</h4>
                      <p>Explore pre constructions projcts in Etobicoke</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link className="d-block properti_city" href={"/calgary"}>
                  <div className="thumb">
                    <img
                      src="/cities/calgary.jpeg"
                      alt="brampton"
                      className="img-fluid"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Calgary</h4>
                      <p>Explore pre constructions projcts in Calgary</p>
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
                      className="img-fluid"
                    />
                  </div>
                  <div className="overlay">
                    <div className="details">
                      <h4>Mississauga</h4>
                      <p>Explore pre constructions projcts in Mississauga</p>
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
              <Link href={"/calgary"} className="link-black font-family2">
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
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
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
                    <p class="small-text2 mb-3 text-center">
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

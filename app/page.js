import CondoCardHome from "@/components/CondoCardHome";
import Link from "next/link";
import CondoCard from "@/components/CondoCard";
import SearchBar from "@/components/SearchBar";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import FixedContactButton from "@/components/FixedContactButton";
import MainSearch from "@/components/MainSearch";

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
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      <FixedContactButton></FixedContactButton>
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
              {/* <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control smaller-input"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label
                  htmlFor="floatingInput"
                  className="d-flex align-items-center "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  <span className="mx-2 "></span>
                  Type a city
                </label>
              </div> */}
              <div className="pb-1 ww">
                <MainSearch cities={cities} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-5">
        <div className="container-fluid px-md-5 pt-5">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link href={"/calgary"} className="link-black">
                Calgary
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ current & past new homes communities from Truman homes
              in Calgary
            </p>
            <Link href={"/calgary"} className="mt-1 text-mine text-primary">
              More communities in Calgary{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {data.preconstructions &&
              data.preconstructions.slice(0, 10).map((item) => (
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
          <h2 className="fw-mine text-center mb-5 accent-line fs-1">
            Explore New Construction Condos in These Cities
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4 col-xl-4">
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
                      <p>Explore Toronto's finest New construction condos</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-lg-8 col-xl-8">
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
                      <p>Brampton's finest New construction condos</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-lg-8 col-xl-8">
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
                      <p>Etobicoke's finest New construction condos</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-md-4 col-xl-4">
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
                      <p>Mississauga's finest New construction condos</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-5 my-2"></div>
          <div className="d-flex align-items-center justify-content-center ">
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link href={"/calgary"} className="link-black">
                Mississauga
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 30+ currently selling & upcoming pre-construction
              communities in Mississauga
            </p>
            <Link href={"/mississauga"} className="mt-1 text-mine text-primary">
              More developments in Mississauga{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {mississauga_data.preconstructions &&
              mississauga_data.preconstructions.slice(0, 10).map((item) => (
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

          <div className="py-5 mt-md-5 mt-0">
            <div className="text-center py-5 my-5 overlay-container">
              <img src="/heroBanner.png" className="img-fluid d-md-block d-none" alt="" />
              <img src="/heroBanner-sm.png" className="img-fluid d-md-none d-block" alt="" />

              <div class="overlay-content row row-cols-2 g-5">
                <div className="col fs-5 fw-bold"> 
                <p className="mb-0">info@condomonk.ca</p>
                <p>647-527-4970</p>
                </div>
                <div className="col">
                <a href="#contact" class="btn btn-outline-dark btn-lg fs-4 fw-bold">Contact Now</a>
              </div>
                </div>
            </div>
          </div>

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
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
                Are you looking to buy a preconstruction home ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <BottomContactForm></BottomContactForm>
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

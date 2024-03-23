import CondoCardHome from "@/components/CondoCardHome";
import Link from "next/link";
import CondoCard from "@/components/CondoCard";
import SearchBar from "@/components/SearchBar";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import FixedContactButton from "@/components/FixedContactButton";
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
      
      <section className="py-lg-10 py-3 py-lg-5 sm:py-16 lg:py-24 container">
      <div className=" ">
        <div className="grid items-center  grid-cols-1 gap-12 lg:grid-cols-2 ">
          <div className="order-md-1 order-2 ">
            <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl sm-center font-family2">
            Canada's leading  
              <div className="relative inline-flex sm-center">
                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                <h1 className="relative text-3xl font-bold text-black sm:text-6xl lg:text-7xl ">pre construction</h1>
               
              </div>

              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"> homes Platform</h1>
            </h1>

            <p className="mt-3 text-base text-black sm:text-xl sm-center">Get first updates on New Construction Homes Projects across Canada.</p>

      <div className=" mt-12 lg:mt-20">
      <div className="d-flex align-items-center text-center gap-5 sm-center">
    <div className=" ms-3">
      <div className="icon-container d-flex flex-column align-items-center ">
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/link-company-child.png" alt="link-company-child" className="text-center"/>
        <p>Condo</p>
      </div>
    </div>
    <div class=" ">
      <div class="icon-container d-flex flex-column align-items-center">
      <img width="30" height="30" src="https://img.icons8.com/external-line-lima-studio/64/external-building-winter-town-line-lima-studio.png" alt="external-building-winter-town-line-lima-studio"/>
        <p>Townhouse</p>
      </div>
    </div>
    <div class=" ">
      <div class="icon-container d-flex flex-column align-items-center">
      <img width="30" height="30" src="https://img.icons8.com/carbon-copy/100/country-house.png" alt="country-house"/>
        <p>Detached</p>
      </div>
    </div>
  </div>
      </div>
            <div className=" ">
            <MainSearch cities={cities}/>
            </div>

          </div>

          <div className="order-1 order-md-2">
            <img className="w-full" src="/hero-img.png" alt="" />
          </div>
        </div>
      </div>
    </section>

      <div className="pt-5 ">
        <div className="container pt-5 " >
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link href={"/calgary"} className="link-black font-family2">
                Calgary
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-lg-5 mb-2">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ current & past new homes communities from Truman homes
              in Calgary
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
            Explore New Construction Condos in These Cities
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
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link href={"/calgary"} className="link-black font-family2">
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

          <div className="py-5 mt-md-5 mt-0">
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
              <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3 ">
                Looking to buy a preconstruction home ?
              </h2>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Condomonk now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <BottomContactForm
                    proj_name="All"
                    city="Home Page"
                  ></BottomContactForm>
                   <div className="d-flex">
                    <p class="small-text2 mb-3 text-center">Dolphy is an online pre-construction homes database. Dolphy curates the list of projects that are publicly available on internet Be advised the information provided on this page could be outdated or inaccurate. By submitting above form you consent the real estate agents from Dolphin Realty Inc. to connect with you. We may share your info to our brokerage partners and agents to help you with your questions. You can unsubscribe at any time by emailing us.</p>
         
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

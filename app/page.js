import CondoCardHome from "@/components/CondoCardHome";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BottomContactForm from "@/components/BottomContactForm";

async function getData() {
  const res = await fetch(
    "https://api.condomonk.ca/api/preconstructions?page_size=10",
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
  const data = await getData();
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
   <section id="hero">
        <div className="container">
            <div className=" hero-container" >
                <div >
                <h1 className="main-titlee pb-0  mb-0 mt-2 mt-md-0" >Find your dream home here
                </h1>
                <p className="fs-3 text-center mt-0 pt-1 text-white" >Get access to new pre constructions and plans now!</p>
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
              <SearchBar cities={cities} />
            </div>
            </div>
            </div>
        </div>
    </section>

      <div className="pt-5">
        <div className="container-fluid px-md-5">
          <div className="d-flex flex-column justify-content-start align-items-start">
            <h1 className="main-title">
              New Construction condos in Canada (2023)
            </h1>
            <p className="text-mine">
              1000+ New Preconstruction Condos for sale in Canada | Check out
              plans, pricing, availability for pre construction condos in Canada
            </p>
          </div>
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-5 gy-3">
            {data.results.map((item) => (
              <div className="col" key={item.id}>
                <CondoCardHome {...item} />
              </div>
            ))}
          </div>
          <div className="py-5 my-2"></div>
          <h2 className="fw-mine text-center mb-5 accent-line">
            Explore New Construction Condos in These Cities
          </h2>
          <div className="container">
          <div className="row">
            <div className="col-4 col-md-4 col-xl-4">
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
            <div className="col-4 col-lg-8 col-xl-8">
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
            <div className="col-4 col-lg-8 col-xl-8">
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
            <div className="col-4 col-md-4 col-xl-4">
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
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
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

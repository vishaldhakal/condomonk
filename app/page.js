import Link from "next/link";
import Image from "next/legacy/image";
import CondoCard from "@/components/CondoCard";
import PreconSchema from "@/components/PreconSchema";
import BottomContactForm from "@/components/BottomContactForm";
import MainSearch from "@/components/MainSearch";
import "./icons.css";
import FeaturedCard from "@/components/FeaturedCard";
import Newsletter from "@/components/Newsletter";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";
import ProjectSearch from "@/components/ProjectSearch";

const fetchPropertyData = async (city) => {
  try {
    const response = await fetch(
      `https://query.ampre.ca/odata/Property?$filter=ContractStatus eq 'Available' and StandardStatus eq 'Active' and TransactionType eq 'For Sale' and contains(City, '${city}')...`,
      {
        // Add any necessary headers or options
      }
    );
    return await response.json();
  } catch (error) {
    // Handle error appropriately
    console.error("Error fetching property data:", error);
  }
};

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

async function getResaleProperties(city) {
  const { properties } = await getProperties({
    city: city,
    transactionType: "For Sale",
    pageSize: 4,
    page: 1,
  });

  return {
    properties: properties || [],
  };
}

export default async function Home(props) {
  const data = await getData("calgary");
  const mississauga_data = await getData("mississauga");
  const edmonton_data = await getData("edmonton");
  const cambridge_data = await getData("cambridge");
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();
  const featured = await getFeaturedData();

  const toronto_resale = await getResaleProperties("Toronto");
  const barrie_resale = await getResaleProperties("Barrie");
  const milton_resale = await getResaleProperties("Milton");

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-200 md:min-h-screen min-h-[75vh] flex md:pt-40  pt-32 justify-center z-0">
          <div className="absolute bottom-0 left-0 right-0 z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full"
            >
              <path
                fill="#ffffff"
                fill-opacity="1"
                d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,186.7C672,181,768,203,864,213.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="container mx-auto  text-center relative">
            <div className="max-w-3xl mx-auto">
              <div className="">
                <span className="inline-block bg-yellow-400 text-white p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-black pt-4">
                Home For Everyone!
              </h1>

              <p className="text-[16px] md:text-3xl text-black mb-8">
                Leading Real Estate Homes Platform in Canada.
              </p>

              <div className="shadow-xl rounded-xl mx-2">
                <ProjectSearch isHomepage={true} />
              </div>
              <div className="pt-3 d-flex gap-3 text-sm mx-2">
                <p>Popular:</p>
                <Link href="/resale/ontario/toronto/homes-for-sale">
                  <p className="text-blue-500 hover:underline">Toronto</p>
                </Link>
                <Link href="/resale/ontario/brampton/homes-for-sale">
                  <p className="text-blue-500 hover:underline ml-2">Brampton</p>
                </Link>
                <Link href="/resale/ontario/milton/homes-for-sale">
                  <p className="text-blue-500 hover:underline ml-2">Milton</p>
                </Link>
                <Link href="/resale/ontario/vaughan/homes-for-sale">
                  <p className="text-blue-500 hover:underline ml-2">Vaughan</p>
                </Link>
                <div className="d-none d-md-flex gap-3">
                  <Link href="/resale/ontario/markham/homes-for-sale">
                    <p className="text-blue-500 hover:underline ml-2">
                      Markham
                    </p>
                  </Link>
                  <Link href="/resale/ontario/etobicoke/homes-for-sale">
                    <p className="text-blue-500 hover:underline ml-2">
                      Etobicoke
                    </p>
                  </Link>
                  <Link href="/resale/ontario/hamilton/homes-for-sale">
                    <p className="text-blue-500 hover:underline ml-2">
                      Hamilton
                    </p>
                  </Link>
                  <Link href="/resale/ontario/ottawa/homes-for-sale">
                    <p className="text-blue-500 hover:underline ml-2">Ottawa</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* carrousel */}
      <div className="container my-4 ">
        <div className="row md:pt-20 pt-10 align-items-center justify-content-between ">
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
                    <i className="bi bi-arrow-up-right-circle sm-center "></i>
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
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
                    className="d-block w-100 carousel-img-responsive"
                    alt="Image 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/image2.jpeg"
                    className="d-block w-100 carousel-img-responsive"
                    alt="Image 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/image3.jpeg"
                    className="d-block w-100 carousel-img-responsive"
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
        </div>
      </div>

      <div className="pt-5 " id="top10gta">
        <div className="container pt-5 ">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="fw-mine fs-big ">
              <span className="link-black font-family2 mb-2">
                Featured Project
              </span>
            </h2>
            <p className="fs-5  text-center mb-2">
              Explore Top 10 Pre Construction Project for sale in GTA
            </p>
            <div className="text-center mb-2 ">
              <Link href="/top-10-gta-projects" className="text-primary ">
                View all top 10 GTA Projects{" "}
              </Link>
            </div>
          </div>

          <div className="">
            <div className="row row-cols-2 row-cols-md-2 my-md-2 my-3 gy-3 g-2">
              {featured.results &&
                featured.results.slice(0, 4).map((item) => (
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

      <div className="py-5 my-2"></div>
      <Link href={"/resale/ontario"}>
        <h2 className="fw-mine text-center mb-5 accent-line fs-1 font-family2 text-black">
          Explore Resale Homes For Sale in Ontario
        </h2>
      </Link>
      <div className="container">
        <div className="row row-cols-md-5 row-cols-2">
          <div className="col">
            <Link
              className="d-block properti_city"
              href={"/resale/ontario/toronto"}
            >
              <div className="thumb">
                <img
                  src="/cities/toronto.jpg"
                  alt="toronto"
                  className="img-fluid lazy "
                />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>Toronto</h4>
                  <p>Explore Resale Properties in Toronto</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link
              className="d-block properti_city"
              href={"/resale/ontario/brampton"}
            >
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
                  <p>Explore Resale Properties in Brampton</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link
              className="d-block properti_city"
              href={"/resale/ontario/milton"}
            >
              <div className="thumb">
                <img
                  src="/cities/etobicoke.jpg"
                  alt="etobicoke"
                  className="img-fluid lazy"
                />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>Milton</h4>
                  <p>Explore Resale Properties in Milton</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link
              className="d-block properti_city"
              href={"/resale/ontario/barrie"}
            >
              <div className="thumb">
                <img
                  src="/cities/calgary.jpeg"
                  alt="calgary"
                  className="img-fluid lazy"
                />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>Barrie</h4>
                  <p>Explore Resale Properties in Barrie</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link
              className="d-block properti_city"
              href={"/resale/ontario/mississauga"}
            >
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
                  <p>Explore Resale Properties in Mississauga</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 my-2"></div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-mine text-center mb-2 fs-1 font-family2 fw-mine fs-bi">
              Homes For Sale in Toronto
            </h2>
            <h3 className=" text-center mb-2 fs-6">
              Toronto homes for sale | Affordable 1 - 4 bedroom homes in Toronto
              from $1 to $5M
            </h3>
            <div className="text-center mb-4">
              <Link
                href="/resale/ontario/toronto/homes-for-sale"
                className="text-primary"
              >
                View more homes for sale in Toronto{" "}
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-md-4 g-2 mb-5">
              {toronto_resale.properties?.slice(0, 4).map((property) => (
                <div className="col" key={property.ListingKey}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-2 "></div>
        <div className="row">
          <div className="col-12">
            <h2 className="fw-mine text-center mb-2 fs-1 font-family2 fw-mine fs-bi">
              Homes For Sale in Barrie
            </h2>
            <h3 className=" text-center mb-2 fs-6">
              Barrie homes for sale | Affordable 1 - 4 bedroom homes in Barrie
              from $1 to $5M
            </h3>
            <div className="text-center mb-4">
              <Link
                href="/resale/ontario/barrie/homes-for-sale"
                className="text-primary"
              >
                View more homes for sale in Barrie{" "}
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-md-4 g-2 mb-5">
              {barrie_resale.properties?.slice(0, 4).map((property) => (
                <div className="col" key={property.ListingKey}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-2 "></div>
        <div className="row">
          <div className="col-12">
            <h2 className="fw-mine text-center mb-2 fs-1 font-family2 fw-mine fs-bi">
              Homes For Sale in Milton
            </h2>
            <h3 className=" text-center mb-2 fs-6">
              Milton homes for sale | Affordable 1 - 4 bedroom homes in Milton
              from $1 to $5M
            </h3>
            <div className="text-center mb-4">
              <Link
                href="/resale/ontario/milton/homes-for-sale"
                className="text-primary"
              >
                View more homes for sale in Milton{" "}
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-md-4 g-2">
              {milton_resale.properties?.slice(0, 4).map((property) => (
                <div className="col" key={property.ListingKey}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-3 mb-5">
          <Link href="resale/ontario/homes-for-sale" className="btn btn-dark">
            View All Ontario Homes For Sale
          </Link>
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
          <div className="row row-cols-2 row-cols-md-4 gy-md-5 gx-3">
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
          <div className="row row-cols-2 row-cols-md-4 gy-md-5 gy-3 gx-3">
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
          <div className="row row-cols-2 row-cols-md-4 gy-md-5 gy-3 gx-3">
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
          <div className="row row-cols-2 row-cols-md-4 gy-md-5 gy-3 gx-3">
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
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <Newsletter />
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
                      I agree to receive marketing and customer service calls
                      and text messages from Homebaba Technologies. Consent is
                      not a condition of purchase. Msg/data rates may apply. Msg
                      frequency varies. Reply STOP to unsubscribe. Privacy
                      Policy & Terms of Service.
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

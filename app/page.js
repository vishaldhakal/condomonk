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
import BlogCard from "@/components/blogCard";
import { fetchAllBlogPosts } from "@/api/blogs";

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

async function getBlogs() {
  return await fetchAllBlogPosts();
}

export default async function Home(props) {
  const data = await getData("calgary");
  const mississauga_data = await getData("mississauga");
  const edmonton_data = await getData("edmonton");
  const cambridge_data = await getData("cambridge");
  let cities = await getCities();
  // let dropdown_cities = await getCitiesandProjects();
  const featured = await getFeaturedData();
  const blogs = await getBlogs();

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
      <div className="relative bg-yellow-50 overflow-hidden py-16 md:py-24 lg:py-32 md:min-h-[90vh] min-h-[80vh] ">
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
        <div className="relative inset-0 z-0">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-yellow-100 opacity-70"></div>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-50 opacity-60"></div>

          <div className="absolute top-1/3 -left-6 w-24 h-24 rounded-full bg-yellow-200 opacity-60"></div>

          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-100 opacity-40 rotate-12"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-yellow-300 opacity-20 rotate-45"></div>

          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container mx-auto  text-center relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-black md:pt-4 pt-48">
              Home For <span className="text-orange-500">Everyone</span>
            </h1>

            <p className="text-[16px] md:text-3xl text-black md:mb-10 mb-4 font-medium">
              Leading Real Estate Homes Platform in Canada.
            </p>

            <div className=" bg-white transition delay-150 duration-300 ease-in-out  rounded-xl shadow-lg">
              <ProjectSearch isHomepage={true} />
            </div>
            <div className="pt-3 d-flex gap-3 text-sm mx-2">
              <p className="text-black font-bold">Popular:</p>
              <Link href="/resale/ontario/toronto/homes-for-sale">
                <p className="text-black  hover:underline">Toronto</p>
              </Link>
              <Link href="/resale/ontario/brampton/homes-for-sale">
                <p className="text-black  hover:underline ml-2">Brampton</p>
              </Link>
              <Link href="/resale/ontario/milton/homes-for-sale">
                <p className="text-black  hover:underline ml-2">Milton</p>
              </Link>
              <Link href="/resale/ontario/vaughan/homes-for-sale">
                <p className="text-black  hover:underline ml-2">Vaughan</p>
              </Link>
              <div className="d-none d-md-flex gap-3">
                <Link href="/resale/ontario/markham/homes-for-sale">
                  <p className="text-black  hover:underline ml-2">Markham</p>
                </Link>
                <Link href="/resale/ontario/etobicoke/homes-for-sale">
                  <p className="text-black  hover:underline ml-2">Etobicoke</p>
                </Link>
                <Link href="/resale/ontario/hamilton/homes-for-sale">
                  <p className="text-black  hover:underline ml-2">Hamilton</p>
                </Link>
                <Link href="/resale/ontario/ottawa/homes-for-sale">
                  <p className="text-black  hover:underline ml-2">Ottawa</p>
                </Link>
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
                <button className="button btn">
                  <span className="text-white bg-orange-500 px-3 py-2.5 rounded-lg">
                    Contact Now
                  </span>
                </button>
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

      {/* <div className="pt-5 " id="top10gta">
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
      </div> */}

      <div className="py-5 my-2"></div>
      <Link href={"/resale/ontario"}>
        <h2 className="fw-mine text-center mb-5 accent-line fs-1 font-family2 text-black">
          Explore Resale Homes For Sale in Ontario
        </h2>
      </Link>
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/resale/ontario/toronto/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/toronto.jpg"
              alt="Toronto"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
              <h3 className="text-white text-xl font-semibold mb-0">Toronto</h3>
              <p className="text-gray-300 text-sm">11k+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/mississauga/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/mississauga.jpg"
              alt="Mississauga"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">
                Mississauga
              </h3>
              <p className="text-gray-300 text-sm">2k+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/brampton/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/brampton.jpg"
              alt="Brampton"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">
                Brampton
              </h3>
              <p className="text-gray-300 text-sm">2k+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/oakville/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/oakville.jpg"
              alt="Oakville"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">
                Oakville
              </h3>
              <p className="text-gray-300 text-sm">1k+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/barrie/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/barrie.jpg"
              alt="Barrie"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">Barrie</h3>
              <p className="text-gray-300 text-sm">800+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/ajax/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/ajax.jpg"
              alt="Ajax"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">Ajax</h3>
              <p className="text-gray-300 text-sm">275+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/ottawa/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/ottawa.jpg"
              alt="Ottawa"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">Ottawa</h3>
              <p className="text-gray-300 text-sm">280+ Properties</p>
            </div>
          </Link>

          <Link
            href="/resale/ontario/hamilton/homes-for-sale"
            className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
          >
            <img
              src="/city-images/hamilton.jpg"
              alt="Hamilton"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3">
              <h3 className="text-white text-xl font-semibold mb-0">
                Hamilton
              </h3>
              <p className="text-gray-300 text-sm">2k+ Properties</p>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/resale/ontario/homes-for-sale"
            className="inline-flex items-center justify-center px-6 py-3 border bg-orange-500 text-white rounded-full font-medium "
          >
            View All Ontario Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row pt-5">
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
            <div className="row row-cols-2 row-cols-md-5 g-2 mb-5">
              {toronto_resale.properties?.slice(0, 5).map((property) => (
                <div className="col" key={property.ListingKey}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="container " id="projects">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big mb-0 ">
              <Link
                href={"/calgary"}
                className="fw-mine text-center mb-0 fs-1 font-family2 fw-mine fs-bi text-black"
              >
                Pre Construction Homes in Calgary
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

          <div className="py-5 my-4"></div>
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine text-center mb-0 fs-1 font-family2 fw-mine fs-bi">
              <Link href="/blogs" className="text-black">
                Latest Real Estate News & Insights
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-4">
            <p className="fs-5 mb-0 text-center">
              Stay updated with the latest news and trends in Canadian real
              estate
            </p>
            <Link href="/blogs" className="mt-1 text-mine text-primary">
              View all articles <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4 mb-5">
            {blogs &&
              blogs.slice(0, 4).map((blog) => (
                <div className="col" key={blog.id}>
                  <BlogCard blog={blog} />
                </div>
              ))}
          </div>

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
                <div className="col-md-7 mx-auto">
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

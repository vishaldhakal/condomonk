import Image from "next/image";
import Link from "next/link";
import HomeCarousel from "@/components/HomeCarousel";
import BottomContactForm from "@/components/BottomContactForm";
import HomeSearch from "@/components/HomeSearch";
import BlogCard from "@/components/BlogCard";
import { fetchAllBlogPosts } from "@/api/blogs";
import BestExperience from "@/components/BestExperience";
import Newsletter from "@/components/Newsletter";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import { getBarrieCondos } from "@/lib/properties";
import { getMississaugaRentals } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import BuyDubai from "@/components/BuyDubai";

const getCityLinks = () => [
  { name: "Brampton" },
  { name: "Mississauga" },
  { name: "Innisfil" },
  { name: "Orillia" },
  { name: "Newmarket" },
  { name: "Toronto" },
  { name: "Hamilton" },
  { name: "Oakville" },
  { name: "Burlington" },
  { name: "Milton" },
  { name: "Ajax" },
  { name: "Oshawa" },
];

async function getBlogs() {
  return await fetchAllBlogPosts();
}
export default async function Home() {
  const blogs = await getBlogs();
  const barrieCondos = await getBarrieCondos(8);
  const mississaugaRentals = await getMississaugaRentals(8);

  return (
    <>
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-20 pb-16 text-center lg:pt-32">
              {/* Main Heading with Gradient */}
              <h1 className="mx-auto max-w-4xl font-display  text-4xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                <span className="relative whitespace-nowrap">
                  <span className="relative  text-black font-bold">
                    Home for everyone
                  </span>
                </span>{" "}
              </h1>

              {/* Subtitle with Gradient Border */}
              <div className="mt-3 max-w-2xl mx-auto">
                <p className="md:text-xl text-base text-slate-600 leading-relaxed">
                  Leading Real Estate Homes Platform in Canada.
                </p>
              </div>

              {/* Search Component Container */}
              <div className="mt-10 max-w-2xl mx-auto">
                <HomeSearch />
              </div>

              {/* Popular Cities Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  "Toronto",
                  "Milton",
                  "Mississauga",
                  "Etobicoke",
                  "Brampton",
                  "Markham",
                  "Vaughan",
                  "Barrie",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/resale/ontario/${city.toLowerCase()}/homes-for-sale`}
                    className="inline-flex items-center px-2 py-1.5 rounded-full text-sm 
                bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 
                hover:text-gray-900 hover:border-gray-300 transition-colors duration-200 
                shadow-sm hover:shadow"
                  >
                    {city}
                  </Link>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="mt-16 mb-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre Construction Homes across Canada Section */}
      <div className="bg-white">
        {" "}
        <BestExperience />
      </div>

      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="md:text-4xl text-3xl font-bold text-center ">
            Pre Construction Homes across Canada
          </h2>
          <p className="text-center text-base mb-12">
            Over 1,000 Pre Construction Homes Available Nationwide on the
            Condomonk Platform
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/toronto" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/toronto.jpg"
                  alt="Toronto"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Toronto</h3>
                  <p className="text-sm">200+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/ottawa" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/ottawa.jpg"
                  alt="Ottawa"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Ottawa</h3>
                  <p className="text-sm">120+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/mississauga" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/mississauga.jpg"
                  alt="Mississauga"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Mississauga</h3>
                  <p className="text-sm">100+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/calgary" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/calgary.jpg"
                  alt="Calgary"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Calgary</h3>
                  <p className="text-sm">50+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/barrie" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/barrie.jpg"
                  alt="Barrie"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Barrie</h3>
                  <p className="text-sm">40+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/brampton" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/brampton.jpg"
                  alt="Brampton"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Brampton</h3>
                  <p className="text-sm">80+ Projects</p>
                </div>
              </div>
            </Link>

            {/* New city cards - Row 2 */}
            <Link href="/pickering" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/pickering.jpg"
                  alt="Pickering"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Pickering</h3>
                  <p className="text-sm">30+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/hamilton" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/hamilton.jpg"
                  alt="Hamilton"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Hamilton</h3>
                  <p className="text-sm">70+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/milton" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/milton.jpeg"
                  alt="Milton"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Milton</h3>
                  <p className="text-sm">40+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/oakville" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/oakville.jpg"
                  alt="Oakville"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Oakville</h3>
                  <p className="text-sm">60+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/waterloo" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/waterloo.jpeg"
                  alt="Waterloo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Waterloo</h3>
                  <p className="text-sm">50+ Projects</p>
                </div>
              </div>
            </Link>

            <Link href="/cambridge" className="group">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                <img
                  src="/city-images/cambridge.jpeg"
                  alt="Cambridge"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Cambridge</h3>
                  <p className="text-sm">30+ Projects</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pre-construction-homes"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              View All Projects
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
      </div>

      <div className="bg-white">
        <HomebabaAdvantage />
      </div>

      {/* Price Dropped Homes Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
            {/* Left Section */}
            <div className="flex flex-col justify-center space-y-6 max-w-lg">
              {/* Logo */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-down w-6 h-6"
                >
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                  <polyline points="16 17 22 17 22 11"></polyline>
                </svg>

                <span className=" ml-2 font-medium text-gray-800 transform transition-all duration-300 group-hover:">
                  Price Dropped Homes
                </span>
              </div>

              {/* Headline with animated gradient */}
              <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                Premium homes, now at better prices
              </h2>

              <p className="text-gray-800 text-lg">
                Discover properties that have recently dropped in price.
              </p>

              {/* Location Pills */}
              <div className="flex flex-wrap gap-4">
                {[
                  { city: "Toronto", count: "156" },
                  { city: "Milton", count: "67" },
                  { city: "Oakville", count: "93" },
                  { city: "Brampton", count: "124" },
                  { city: "Mississauga", count: "89" },
                ].map((location, index) => (
                  <Link
                    key={location.city}
                    href={`/resale/ontario/${location.city.toLowerCase()}/price-reduced-homes-for-sale`}
                    className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-green-400 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <svg
                      className="w-4 h-4 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="ml-2 font-medium">{location.city}</span>
                    <span className="ml-2  text-xs font-medium px-2 py-0.5 rounded-full">
                      {location.count}
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href="/resale/ontario/price-reduced-homes-for-sale"
                  className="inline-flex items-center bg-green-500  text-white px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span>View price dropped homes across ontario</span>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Section - House Image with Price Tags */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/pexels-bg.jpeg"
                  alt="Modern house with price drops"
                  className="w-full h-[450px] object-cover transition-all duration-700 hover:scale-105"
                />

                {/* Price Drop Tags */}
                <div className="absolute top-16 right-16 animate-bounce-slow">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span>-$50,000</span>
                  </div>
                </div>

                <div className="absolute top-36 left-20 animate-bounce-slow animation-delay-300">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span>-$35,000</span>
                  </div>
                </div>

                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce-slow animation-delay-600">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span>-$42,000</span>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-green-400 group-hover:text-white transition-colors duration-300">
                        529
                      </div>
                      <div className="text-sm text-gray-300">Price Drops</div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-green-400 group-hover:text-white transition-colors duration-300">
                        15%
                      </div>
                      <div className="text-sm text-gray-300">
                        Avg. Reduction
                      </div>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-green-400 group-hover:text-white transition-colors duration-300">
                        24h
                      </div>
                      <div className="text-sm text-gray-300">Last Updated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" py-10 bg-white"></div>
      <Link href={"/resale/ontario"}>
        <h2 className="font-bold text-center mb-5 text-3xl text-black hover:underline">
          Explore Resale Homes For Sale in Ontario
        </h2>
      </Link>
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-4 md:gap-y-8 gap-y-4 gap-x-3">
          <div className="flex flex-col">
            <Link
              href="/resale/ontario/toronto/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/toronto.jpg"
                alt="Toronto"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Toronto
                </h3>
                <p className="text-gray-300 text-sm">11k+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/toronto/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Toronto
              </Link>
              <Link
                href="/resale/ontario/toronto/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Toronto
              </Link>
              <Link
                href="/resale/ontario/toronto/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Toronto
              </Link>
              <Link
                href="/resale/ontario/toronto/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Toronto
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/mississauga/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/mississauga.jpg"
                alt="Mississauga"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Mississauga
                </h3>
                <p className="text-gray-300 text-sm">2k+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/mississauga/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Mississauga
              </Link>
              <Link
                href="/resale/ontario/mississauga/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Mississauga
              </Link>
              <Link
                href="/resale/ontario/mississauga/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Mississauga
              </Link>
              <Link
                href="/resale/ontario/mississauga/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Mississauga
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/brampton/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/brampton.jpg"
                alt="Brampton"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Brampton
                </h3>
                <p className="text-gray-300 text-sm">2k+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/brampton/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Brampton
              </Link>
              <Link
                href="/resale/ontario/brampton/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Brampton
              </Link>
              <Link
                href="/resale/ontario/brampton/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Brampton
              </Link>
              <Link
                href="/resale/ontario/brampton/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Brampton
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/oakville/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/oakville.jpg"
                alt="Oakville"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Oakville
                </h3>
                <p className="text-gray-300 text-sm">1k+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/oakville/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Oakville
              </Link>
              <Link
                href="/resale/ontario/oakville/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Oakville
              </Link>
              <Link
                href="/resale/ontario/oakville/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Oakville
              </Link>
              <Link
                href="/resale/ontario/oakville/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Oakville
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/barrie/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/barrie.jpg"
                alt="Barrie"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Barrie
                </h3>
                <p className="text-gray-300 text-sm">800+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/barrie/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Barrie
              </Link>
              <Link
                href="/resale/ontario/barrie/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Barrie
              </Link>
              <Link
                href="/resale/ontario/barrie/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Barrie
              </Link>
              <Link
                href="/resale/ontario/barrie/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Barrie
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/ajax/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/ajax.jpg"
                alt="Ajax"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">Ajax</h3>
                <p className="text-gray-300 text-sm">275+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/ajax/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Ajax
              </Link>
              <Link
                href="/resale/ontario/ajax/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Ajax
              </Link>
              <Link
                href="/resale/ontario/ajax/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Ajax
              </Link>
              <Link
                href="/resale/ontario/ajax/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Ajax
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/ottawa/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/ottawa.jpg"
                alt="Ottawa"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Ottawa
                </h3>
                <p className="text-gray-300 text-sm">280+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/ottawa/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Ottawa
              </Link>
              <Link
                href="/resale/ontario/ottawa/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Ottawa
              </Link>
              <Link
                href="/resale/ontario/ottawa/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Ottawa
              </Link>
              <Link
                href="/resale/ontario/ottawa/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Ottawa
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href="/resale/ontario/hamilton/homes-for-sale"
              className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] block"
            >
              <img
                src="/city-images/hamilton.jpg"
                alt="Hamilton"
                className="w-full md:h-64 h-48 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                <h3 className="text-white text-xl font-semibold mb-0">
                  Hamilton
                </h3>
                <p className="text-gray-300 text-sm">2k+ Properties</p>
              </div>
            </Link>
            <div className="mt-2 space-y-1 md:text-sm text-xs">
              <Link
                href="/resale/ontario/hamilton/semi-detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Semi Detached Homes in Hamilton
              </Link>
              <Link
                href="/resale/ontario/hamilton/detached-homes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Detached Homes in Hamilton
              </Link>
              <Link
                href="/resale/ontario/hamilton/townhomes-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Townhomes in Hamilton
              </Link>
              <Link
                href="/resale/ontario/hamilton/condos-for-sale"
                className="block text-gray-500 hover:text-black"
              >
                Condos in Hamilton
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/resale/ontario/homes-for-sale"
            className="inline-flex items-center justify-center px-6 py-3 border bg-green-500 text-white rounded-full font-medium "
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href={"resale/ontario/barrie/condos-for-sale"}>
          <h2 className="font-bold text-center  text-3xl text-black hover:underline">
            Latest Condos For Sale in Barrie
          </h2>
        </Link>
        <p className="text-md text-gray-600 max-w-md mb-7  leading-normal text-center mx-auto">
          Explore 195+ condos for sale in barrie, Ontario.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {barrieCondos.map((property) => (
            <PropertyCard key={property.ListingKey} property={property} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="resale/ontario/barrie/condos-for-sale"
            className="inline-flex items-center justify-center px-3 py-2 border bg-green-500 text-white rounded-full font-medium "
          >
            View All Condos in Barrie
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
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h3 className="text-3xl font-bold text-center mb-8">
          Explore Condos For Sale in Other Cities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-4xl">
          {getCityLinks().map((city) => (
            <Link
              key={`sale-${city.name}`}
              href={`/resale/ontario/${city.name.toLowerCase()}/condos-for-sale`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-all duration-300 group hover:border-gray-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50">
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 group-hover:text-black">
                  Condos in {city.name}
                </span>
              </div>
              <svg
                className="w-4 h-4 ml-auto text-gray-400 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className=" justify-between items-center mb-6">
          <Link href={"/resale/ontario/mississauga/condos-for-lease"}>
            <h2 className="font-bold text-center  text-3xl text-black hover:underline">
              Latest Rental Condos in Mississauga
            </h2>
          </Link>
          <p className="text-md text-gray-600 max-w-md mb-7  leading-normal text-center mx-auto">
            Explore 845+ condos for lease in mississauga, Ontario.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {mississaugaRentals.map((property) => (
            <PropertyCard key={property.ListingKey} property={property} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/resale/ontario/mississauga/condos-for-lease"
            className="inline-flex items-center justify-center px-3 py-2 border bg-green-500 text-white rounded-full font-medium "
          >
            View All Rental Condos in Mississauga →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h3 className="text-3xl font-bold text-center mb-8">
          Explore Rental Condos in Other Cities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-4xl">
          {getCityLinks().map((city) => (
            <Link
              key={`rental-${city.name}`}
              href={`/resale/ontario/${city.name.toLowerCase()}/condos-for-lease`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-all duration-300 group hover:border-gray-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-50">
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 group-hover:text-black">
                  Rentals in {city.name}
                </span>
              </div>
              <svg
                className="w-4 h-4 ml-auto text-gray-400 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <BuyDubai />

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 ">
            Top pre construction builders
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <Link href="/builders/mattamy-homes" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src="/builders/mattamyhomes.jpg"
                  alt="Mattamy Homes"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Mattamy Homes
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆".repeat(1)}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">27</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/builders/empire-communities" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src="/builders/empire.png"
                  alt="Empire Communities"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Empire Communities
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆".repeat(1)}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">21</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/builders/minto-communities" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src="/builders/minto-communities.webp"
                  alt="Minto Communities"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Minto Communities
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆".repeat(1)}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">19</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/builders/brookfield-residential" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src="/builders/brookfield-residential-logo.png"
                  alt="Brookfield Residential"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Brookfield Residential
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆".repeat(1)}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">15</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/builders/truman" className="group">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src="/builders/truman.png"
                  alt="Truman"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Truman
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆".repeat(1)}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">23</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-5 text-center">
          <Link
            href="/builders"
            className="inline-block bg-green-500  text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
          >
            View All Builders
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <Link href="/blogs" className="inline-block group">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300">
              Latest Real Estate News & Insights
            </h2>
          </Link>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the latest news and trends in canadian real estate
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center mt-2  hover:text-blue-700 font-medium transition-colors duration-300"
          >
            View all articles
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs &&
            blogs.slice(0, 8).map((blog) => (
              <div className="col" key={blog.id}>
                <BlogCard blog={blog} />
              </div>
            ))}
        </div>
      </section>

      <div className="py-5 md:my-20 my-0" id="contact">
        <div className="container mx-auto px-5">
          <div className="flex justify-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact bottom"
              width={250}
              height={20}
              className=" mb-3 object-contain"
            />
          </div>
          <h2 className="font-bold text-center md:px-4 text-2xl px-4">
            Looking to buy a preconstruction home?
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4">
            <div className="md:col-span-2"></div>
            <div className="max-w-3xl mx-auto w-full">
              <BottomContactForm
                proj_name="All"
                city="Home Page"
              ></BottomContactForm>
            </div>
            <div className="md:col-span-2"></div>
          </div>
        </div>
      </div>
      <div className="pt-5 mt-5"></div>
      <Newsletter />
    </>
  );
}

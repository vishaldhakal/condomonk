// page.js 

import Link from "next/link";
import BottomContactForm from "@/components/BottomContactForm";
import HomeSearch from "@/components/HomeSearch";
import BlogCard from "@/components/BlogCard";
import { fetchAllBlogPosts } from "@/api/blogs";
import BestExperience from "@/components/BestExperience";
import Newsletter from "@/components/Newsletter";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import BuyDubai from "@/components/BuyDubai";
import Hero from "@/components/Hero";

async function getBlogs() {
  return await fetchAllBlogPosts();
}
export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
      <Hero/>
     
      {/* Pre Construction Homes across Canada Section */}
      <div className="bg-white">
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
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
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
                <span className="ml-2 font-medium text-gray-800 transform transition-all duration-300 group-hover:">
                  Price Dropped Homes
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                Premium homes, now at better prices
              </h2>

              <p className="text-gray-800 text-lg">
                Discover properties that have recently dropped in price.
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { city: "Toronto", count: "156" },
                  { city: "Milton", count: "67" },
                  { city: "Oakville", count: "93" },
                  { city: "Brampton", count: "124" },
                  { city: "Mississauga", count: "89" },
                ].map((location) => (
                  <Link
                    key={location.city}
                    href="#"
                    className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-green-400 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <svg
                      className="w-4 h-4"
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
                    <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full">
                      {location.count}
                    </span>
                  </Link>
                ))}
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

                <div className="absolute top-16 right-16 animate-bounce-slow">
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
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
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
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
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600">
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

      <div className="py-10 bg-white"></div>

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
            className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
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
            className="inline-flex items-center mt-2 hover:text-blue-700 font-medium transition-colors duration-300"
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
            <img
              src="/contact-bottom-2.png"
              alt="Contact bottom"
              width={250}
              height={20}
              className="mb-3 object-contain"
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
//components  Hero.js
"use client";
import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";

const Hero = () => {


  return (
    <section className="relative isolate z-40 w-full  pb-12 pt-16 sm:pb-20 sm:pt-24 min-h-[500px] flex items-center">
     
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-bg-1.jpg"
          alt="Halton Region Real Estate"
          className="h-full w-full object-cover object-center brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

     
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
       <div className="max-w-4xl text-left">
{/* container */}


          <div className="space-y-2">
            <h1 
              className="font-sans text-[clamp(2.5rem,8vw,4rem)] font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0px 0px 20px rgba(0,0,0,0.3)' }}
            >
              Home for everyone
            </h1>
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 leading-relaxed"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
            >
              Leading Real Estate Homes Platform in Canada.
            </h2>
          </div>



          <div className="mt-10 flex w-full flex-col items-start gap-4">
            {/* SEARCH BAR */}
            <div className="relative w-full max-w-xl">
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
                    href={`/${city.toLowerCase()}`}
                //     className="inline-flex items-center px-2 py-1.5 rounded-full text-sm 
                // bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 
                // hover:text-gray-900 hover:border-gray-300 transition-colors duration-200 
                // shadow-sm hover:shadow"
                className="inline-flex items-center 
  px-1.5 py-1 text-xs 
  sm:px-2 sm:py-1.5 sm:text-sm 
  rounded-full bg-white border border-gray-200 text-gray-600 
  hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 
  transition-colors duration-200 shadow-sm hover:shadow"
                  >
                    {city}
                  </Link>
                ))}
              </div>


              {/* Scroll Indicator */}
              {/* <div className="mt-16 mb-4 animate-bounce">
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
              </div> */}

          </div>





{/* container */}
        </div>

        
      </div>

       {/* Curved bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none -mb-px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-20"
          >
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
    </section>
  );
};

export default Hero;

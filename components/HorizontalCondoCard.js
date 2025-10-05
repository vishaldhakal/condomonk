"use client";
import Link from "next/link";
import Nformatter from "./Nformatter";
import { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SideContactForm from "./SideContactForm";

export default function HorizontalCondoCard(props) {
  function checkPricing(prii) {
    if (parseInt(prii) == 0) {
      return <div className="text-sm text-gray-500">Pricing not available</div>;
    } else {
      return (
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-500">From</span>
          <span className="text-lg font-medium text-teal-600">
            ${Nformatter(prii, 2)}
          </span>
        </div>
      );
    }
  }

  const city = props.city.name.toLowerCase();

  // Generate a random number between 800 and 3500 for views
  const randomViews = useMemo(() => {
    return Math.floor(Math.random() * (3500 - 800 + 1)) + 800;
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden mb-4 transform-gpu hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image Section */}
        <div className="relative w-full md:w-80 h-64 md:h-64 flex-shrink-0">
          <Link href={`/${city}/${props.slug}`}>
            <img
              loading="lazy"
              src={
                props.image.image
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              className="w-full h-64 md:h-64 object-cover object-center"
              style={{
                background:
                  "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
              }}
              alt={`${props.project_name} located at ${props.project_address}`}
            />
          </Link>

          {/* Top Badges Container */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {/* Status Badge */}
            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs text-gray-700 border border-gray-100">
              {props.status}
            </span>

            {/* Featured Badge */}
            {props.is_featured && (
              <span className="bg-teal-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                Featured
              </span>
            )}
          </div>

          {/* Bottom Views Badge */}
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5c-3.314 0-6.057-2.614-7.342-4.5C1.943 6.614 4.686 4 8 4s6.057 2.614 7.342 4.5C14.057 9.386 11.314 12 8 12zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              {randomViews.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="flex-1 p-3 ps-5">
          <div className="flex flex-col justify-between">
            {/* Top Content */}
            <div>
              <Link
                href={`/${city}/${props.slug}`}
                className="no-underline hover:text-teal-600 transition-colors"
              >
                <h2 className="text-lg md:text-xl text-gray-900 mb-1 leading-tight">
                  {props.project_name}
                </h2>
              </Link>

              {/* Project Details */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-gray-600">
                  <span className="text-sm truncate max-w-[80%]">
                    {props.project_address}
                  </span>
                </div>

                <div className="flex items-start text-gray-600">
                  <Link
                    href={`/builders/${props.developer.slug}`}
                    className="text-sm hover:text-teal-600 hover:underline"
                  >
                    Developed by {props.developer.name}
                  </Link>
                </div>

                <div className="flex items-center text-gray-600">
                  <span className="text-sm">Type: </span>
                  <span className="text-sm ms-1">{props.project_type}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">Occupancy: </span>
                  <span className="text-sm ms-1">{props.occupancy}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                {checkPricing(props.price_starting_from)}
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="w-fit bg-[#e5eff0] text-[#006169] border border-[#e5eff0] py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#d1e8eb] transition-colors flex items-center gap-2"
                    style={{
                      fill: "#006169",
                      backgroundColor: "#e5eff0",
                      borderColor: "#e5eff0",
                      color: "#006169",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="#006169"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    Request Price List
                  </button>
                </DialogTrigger>
                <DialogContent className="p-6 w-[90%] md:w-[32rem] max-h-fit z-[99999]">
                  <div className="block">
                    <div className="flex flex-col items-center mb-6">
                      <h2 className="text-xl md:text-2xl text-gray-800 mb-2 text-center">
                        {props.project_name}
                      </h2>
                      <p className="text-gray-600 text-center text-sm">
                        Send Me Pricing Details
                      </p>
                    </div>
                    <SideContactForm
                      proj_name={props.project_name}
                      defaultmessage={`Please send me additional information about ${props.project_name}. Thank you !`}
                      city={city}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

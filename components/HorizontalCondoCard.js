"use client";
import Link from "next/link";
import Nformatter from "./Nformatter";
import { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SideContactForm from "./SideContactForm";

export default function HorizontalCondoCard(props) {
  function checkPricing(prii) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return (
        <div>
          <span className="text-xs md:text-inherit">From low</span>{" "}
          <span className="font-bold text-cmhc-green text-xl ml-1">
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image Section */}
        <div className="relative w-full md:w-72 h-64 md:h-auto flex-shrink-0">
          <Link href={`/${city}/${props.slug}`}>
            <img
              loading="lazy"
              src={
                props.image.image
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              className="w-full h-full object-cover"
              style={{
                background:
                  "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
              }}
              alt={`${props.project_name} located at ${props.project_address}`}
            />
          </Link>

          {/* Bottom Badges Container */}
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            {/* Status Badge */}
            <span className="bg-white px-3 py-1 rounded text-xs font-medium">
              {props.status}
            </span>

            {/* Views Badge */}
            <span className="flex items-center bg-white text-black text-[10px] font-semibold px-2 py-1 rounded gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5c-3.314 0-6.057-2.614-7.342-4.5C1.943 6.614 4.686 4 8 4s6.057 2.614 7.342 4.5C14.057 9.386 11.314 12 8 12zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              {randomViews.toLocaleString()}
            </span>
          </div>

          {/* Featured Badge */}
          {props.is_featured && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 22 22"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              Featured
            </span>
          )}
        </div>

        {/* Middle: Content Section */}
        <div className="flex-1 p-4 md:p-6">
          <Link
            href={`/${city}/${props.slug}`}
            className="no-underline hover:text-[#00b5d6] transition-colors"
          >
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3">
              {props.project_name}
            </h2>
          </Link>

          <dl className="mt-0 mb-4">
            <dd>
              <ul className="space-y-1 p-0 m-0">
                <li className="flex items-start text-gray-600">
                  <span className="flex-1 text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {props.project_address}
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Link
                    href={`/builders/${props.developer.slug}`}
                    className="text-xs md:text-sm hover:underline whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    Developed by {props.developer.name}
                  </Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="flex-1 text-xs md:text-sm">
                    Type: {props.project_type}
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="flex-1 text-xs md:text-sm">
                    Occupancy: {props.occupancy}
                  </span>
                </li>
              </ul>
            </dd>
          </dl>

          <h4 className="text-[0.9rem] font-normal text-black my-3">
            {checkPricing(props.price_starting_from)}
          </h4>

          {/* CTA Button */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="py-2 text-xs md:text-lg text-center flex flex-row items-center justify-center gap-0.5 font-bold text-white bg-[#fa5757] shadow-lg shadow-emerald-100 border-0 px-2 rounded-md w-full md:w-auto transition-all duration-200">
                Request Price List
              </button>
            </DialogTrigger>
            <DialogContent className="p-3 w-[80%] md:w-[30rem] max-h-fit z-[99999]">
              <div className="block">
                <div className="flex flex-col items-center mb-4 md:mb-5">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 text-center">
                    {props.project_name}
                  </h2>
                  <p className="text-gray-600 text-center text-sm md:text-base">
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
  );
}

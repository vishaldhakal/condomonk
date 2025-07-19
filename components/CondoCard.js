"use client";
import Link from "next/link";
import Nformatter from "./Nformatter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomModal from "./Modal";

export default function CondoCard(props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const checkPricing = (price) => {
    return parseInt(price) > 0
      ? `Starting From $${parseInt(price).toLocaleString()}`
      : `Not Available`;
  };

  const daysCount = (x) => {
    const date_1 = new Date(x);
    const date_2 = new Date();
    const difference = date_1.getTime() - date_2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays === 0 ? "Today" : `${Math.abs(TotalDays)} day ago`;
  };

  const handleSendInfoClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100 hover:border-emerald-200 overflow-hidden my-4 md:my-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="block relative"
          target="_blank"
        >
          {/* Featured Badge */}
          {props.is_featured && (
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-2xl text-xs font-bold shadow-lg flex items-center gap-1 sm:gap-2 backdrop-blur-sm bg-opacity-95">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Featured</span>
              </div>
            </div>
          )}

          {/* Card Number */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-black/80 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-sm sm:text-base md:text-lg shadow-lg">
              {props.no + 1 || "1"}
            </div>
          </div>

          {/* Main Image */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img
              src={
                props.image.image
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              alt={`${props.project_name} - ${props.project_type} in ${props.city.name}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading={props.priority ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500 group-hover:from-black/60" />
          </div>

          {/* Status Badges */}
          <div className="absolute bottom-3 left-1 md:left-3 flex gap-1.5 sm:gap-2 z-10">
            <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold shadow-lg border border-white/20">
              {props.status}
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs sm:text-sm font-semibold shadow-lg">
              {props.project_type}
            </span>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-3 sm:p-4 md:p-4">
        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="flex flex-col flex-grow mb-2 sm:mb-3"
          target="_blank"
        >
          {/* Project Name */}
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
            {props.project_name}
          </h3>

          {/* Address & Occupancy */}
          <div className="space-y-1 sm:space-y-2 flex-grow">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                {props.project_address}
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">
                Occupancy: {props.occupancy}
              </p>
            </div>
          </div>
        </Link>
        {/* Pricing */}
        <div className="mb-2 sm:mb-3">
          <p className="text-sm md:text-lg lg:text-xl font-black text-emerald-600 mb-0.5 sm:mb-1">
            {checkPricing(props.price_starting_from).replace("Starting", "")}
          </p>
        </div>
        {/* CTA Section */}
        <div className="space-y-2 sm:space-y-3">
          <CustomModal
            linkText={
              <button
                type="button"
                className={`relative w-full px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all duration-300 group/button transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/button:rotate-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="hidden sm:inline">Get Price List</span>
                  <span className="sm:hidden">Price List</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/button:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Exclusive Badge for Featured Properties */}
                {props.is_featured && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full shadow-md animate-bounce">
                    Featured
                  </div>
                )}

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 ease-out" />
              </button>
            }
            title={props.project_name}
            subtitle="Request Price List"
            city={props.city}
            proj_name={props.project_name}
            defaultmessage={`Hi! I'm interested in ${props.project_name}. Could you please send me the price list, floor plans, and any current promotions? Thank you!`}
            image={
              props.image?.image
                ? `https://api.condomonk.ca${props.image.image}`
                : "/noimage.webp"
            }
          />
        </div>
      </div>

      {/* Hover Glow Effect */}
      {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-white/0 transition-all duration-500 pointer-events-none" /> */}
    </div>
  );
}

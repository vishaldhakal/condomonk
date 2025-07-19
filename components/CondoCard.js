"use client";
import Link from "next/link";
import Nformatter from "./Nformatter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomModal from "./Modal";

export default function CondoCard(props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkPricing = (price) => {
    return parseInt(price) > 0
      ? `Starting From CAD $${parseInt(price).toLocaleString()}`
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
    <div className="group relative flex flex-col rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden my-3 md:my-0">
      <div className="relative">
        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="block"
          target="_blank"
        >
          {props.is_featured && (
            <span className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500 text-white text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="shrink-0"
                viewBox="0 0 22 22"
                aria-hidden="true"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              <span>Featured</span>
            </span>
          )}
          <div className="relative w-full h-[200px] md:h-[230px] overflow-hidden">
            <img
              src={
                props.image.image
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              alt={`${props.project_name} - ${props.project_type} in ${props.city.name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={props.priority ? "eager" : "lazy"}
            />
          </div>
        </Link>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 border border-black bg-black rounded-full text-white text-[11px] md:text-xs font-medium">
            {props.status}
          </span>
          <span className="px-2.5 py-1 bg-white rounded text-gray-900 text-[11px] md:text-xs font-medium shadow-sm">
            {props.project_type}
          </span>
        </div>

        <span className="absolute top-2 left-4 text-white font-black text-3xl md:text-4xl drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          {props.no + 1 ? props.no + 1 + " " : " "}
        </span>
      </div>

      {/* Project details */}
      <Link
        href={`/${props.city.slug}/${props.slug}`}
        className="flex flex-col flex-grow md:p-4 p-2 text-gray-900"
        target="_blank"
      >
        <h3 className="text-sm md:text-xl font-extrabold leading-tight mb-1">
          {props.project_name}
        </h3>
        <p className="text-[11px] md:text-base text-blue-500 font-semibold">
          {checkPricing(props.price_starting_from)}
        </p>
        <p className="text-[11px] md:text-sm text-gray-900 truncate">
          {props.project_address}
        </p>
        <p className="text-[11px] md:text-sm text-gray-500 truncate">
          Occupancy: {props.occupancy}
        </p>
      </Link>

      {/* Send Info button triggers modal */}
      <CustomModal
        linkText={
          <button
            type="button"
            className="inline-flex items-center justify-center w-full md:px-4 px-2 md:py-3 py-2 md:text-base text-xs font-semibold text-white bg-green-700 rounded-md shadow hover:bg-green-800 transition-colors duration-200"
          >
            Request Price List{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </button>
        }
        title={props.project_name}
        subtitle="Request Price List"
        city={props.city}
        proj_name={props.project_name}
        defaultmessage={`Please send me additional information about ${props.project_name}. Thank you !`}
        image={
          props.image?.image
            ? `https://api.condomonk.ca${props.image.image}`
            : "/noimage.webp"
        }
      />
    </div>
  );
}

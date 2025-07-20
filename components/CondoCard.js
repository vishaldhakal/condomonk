"use client";
import Link from "next/link";
import Nformatter from "./Nformatter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomModal from "./Modal";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SideContactForm from "./SideContactForm";
export default function CondoCard(props) {
  console.log(props);
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
  // // Minimal version for map infowindow
  // if (minimal) {
  //   return (
  //     <div
  //       className={`rounded-xl my-3 md:my-0 transition-all duration-300 ${
  //         props.is_featured
  //           ? "shadow-featured border-blue-500 border"
  //           : "shadow-lg"
  //       } hover:shadow-xl hover:translate-y-[-5px]`}
  //       style={{ maxWidth: "280px" }}
  //     >
  //       <div className={`relative`}>
  //         {props.images && props.images.length > 0 ? (
  //           <img
  //             loading="lazy"
  //             src={props.images[0].split(",")[0]}
  //             className="w-full h-[150px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
  //             style={{
  //               background:
  //                 "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
  //             }}
  //             alt={`${props.project_name} located at ${props.project_address} cover image`}
  //           />
  //         ) : (
  //           <img
  //             loading="lazy"
  //             src="/noimage.webp"
  //             className="w-full h-[150px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
  //             style={{
  //               background:
  //                 "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
  //             }}
  //             alt={"no image available for " + props.project_name}
  //           />
  //         )}
  //         {props.is_featured && (
  //           <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="14"
  //               height="14"
  //               fill="currentColor"
  //               className="bi bi-star"
  //               viewBox="0 0 22 22"
  //             >
  //               <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
  //             </svg>
  //             Featured
  //           </span>
  //         )}
  //         <span className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs">
  //           {props.status}
  //         </span>
  //       </div>
  //       <div className={`block p-4 bg-white rounded-b-xl no-underline`}>
  //         <div className="space-y-1">
  //           <Link
  //             href={`/${city}/${props.slug}`}
  //             className="no-underline"
  //             target="_blank"
  //           >
  //             <h3 className="md:text-[1.1rem] font-bold my-0 leading-tight line-clamp-1 hover:text-[#00b5d6] transition-colors duration-300">
  //               {props.project_name}
  //             </h3>
  //           </Link>

  //           <h5 className="truncate text-[0.9rem] my-0">
  //             {props.project_address}
  //           </h5>
  //           <p className="text-[0.9rem] truncate my-0">
  //             Occupancy {props.occupancy}
  //           </p>

  //           <InquiryButton minimal={true} city={city} props={props} />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Original version for regular props pages
  return (
    <>
      <div
        className={`rounded-xl my-3 md:my-0 transition-all duration-300 ${
          props.is_featured
            ? "md:col-span-1 shadow-featured border-cmhc-green border"
            : "shadow-lg"
        } hover:shadow-xl hover:translate-y-[-5px]`}
      >
        <div className={`relative overflow-hidden rounded-t-xl`}>
          <Link
            href={`/${city}/${props.slug}`}
            className="block h-[300px] md:h-[250px]"
            target="_blank"
          >
            <img
              loading="lazy"
              src={
                props.image.image
                  ? `https://api.condomonk.ca${props.image.image}`
                  : "/noimage.webp"
              }
              className="w-full h-[350px] md:h-[250px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
              }}
              alt={`${props.project_name} located at ${props.project_address} cover image`}
            />
          </Link>
          {props.is_featured && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 22 22"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              Featured
            </span>
          )}
          <span className="absolute bottom-2 left-2">
            <span className="bg-white px-2 py-1 rounded text-xs">
              {props.status}
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 p-3">
          <div className="flex items-end justify-start gap-1">
            <Link
              href={`/${city}/${props.slug}`}
              className="text-sm md:text-[1.4rem] leading-tight text-black font-extrabold whitespace-nowrap overflow-hidden text-ellipsis hover:text-[#00b5d6] transition-colors duration-300"
            >
              {/* {props.no + 1 || "1"} */}
              {props.project_name}
            </Link>
          </div>
          {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2">
            <p className="text-xs md:text-sm font-medium text-gray-600">
              {props.price_starting_from === 0 && `Price Coming Soon`}
              {props.price_starting_from > 0 &&
                `Starting From Low $${nFormatter(props.price_starting_from)}`}
            </p>
          </div> */}
          <dl className="mt-0">
            <dd>
              <ul className="space-y-0.5 p-0 m-0">
                <li className="flex items-start text-gray-600">
                  <span className="flex-1 text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {props.project_address}
                  </span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Link
                    href={`/developers/${props.developer.slug}`}
                    className="text-xs md:text-sm text-black hover:underline whitespace-nowrap overflow-hidden text-ellipsis"
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
          <h4 className="text-[0.9rem] font-normal text-black my-0">
            {checkPricing(props.price_starting_from)}
          </h4>
          <Dialog>
            <DialogTrigger asChild>
              <button className="py-2 text-xs md:text-base text-center flex flex-row items-center justify-center shadow-green-100 shadow-md gap-0.5 text-white bg-cmhc-green font-bold hover:text-white hover:bg-green-900 border px-2 rounded-md w-full transition-all duration-200">
                Request Price List
              </button>
            </DialogTrigger>
            <DialogContent className="p-3 w-[80%] md:w-[30rem] max-h-fit z-[99999]">
              <div className="block">
                <div className="flex flex-col items-center mb-4 md:mb-5">
                  {/* <Image
                    src="/contact-bottom-2.png"
                    alt="Real Estate Agent"
                    width={100}
                    height={100}
                    className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[100px] md:h-[100px] object-cover hidden md:block"
                    priority
                  /> */}
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
        {/* CTA Section */}
      </div>
    </>
  );
}

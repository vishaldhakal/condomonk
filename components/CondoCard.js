import Link from "next/link";
import Nformatter from "./Nformatter";
import Image from "next/legacy/image";

export default function CondoCard(props) {
  function checkPricing(price) {
    if (parseInt(price) > 0) {
      return `Starting from low $${Nformatter(price, 2)}`;
    } else {
      return `Pricing not available`;
    }
  }

  function daysCount(x) {
    let date_1 = new Date(x);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (TotalDays == 0) {
      return "Today";
    } else {
      return Math.abs(TotalDays) + " day ago ";
    }
  }

  return (
    <>
      <div className=" rounded-[10px] shadow-md my-3 md:my-0 transition-all duration-300 hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
        <div className="relative">
          <Link
            href={`/${props.city.slug}/${props.slug}`}
            className="block"
            target="_blank"
          >
            {props.is_featured && (
              <span className="absolute top-3 right-3 flex items-center justify-center gap-1 px-2 py-1 rounded bg-primary text-white text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 22 22"
                  aria-hidden="true"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span>Featured</span>
              </span>
            )}
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <img
                src={
                  props.image.image != null
                    ? `https://api.condomonk.ca${props.image.image}`
                    : "/noimage.webp"
                }
                alt={`${props.project_name} - ${props.project_type} in ${props.city.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-[10px] w-full h-full object-cover"
                priority={props.priority}
                quality={props.priority ? 85 : 75}
                loading="lazy"
              />
            </div>
          </Link>

          <div className="absolute bottom-5 left-4 flex gap-2">
            <span className="px-2 py-1 bg-orange-600 rounded text-white md:text-xs text-[11px] font-medium">
              {props.status}
            </span>
            <span className="px-2 py-1 bg-white rounded text-black md:text-xs text-[11px] font-medium">
              {props.project_type}
            </span>
          </div>

          <span className="absolute top-1 left-3 text-white font-black text-3xl md:text-4xl drop-shadow-[3px_4px_0px_rgba(0,0,0,1)]">
            {props.no + 1 ? props.no + 1 + " " : " "}
          </span>
        </div>

        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="block px-3 md:px-4 pt-3 text-black rounded-b-[10px] "
          target="_blank"
        >
          <div className="pt-0">
            <p className="mb-0 text-dark text-sm md:text-xl font-extrabold leading-[20px]">
              {props.project_name}
            </p>
            <p className="mb-0 text-orange-500 text-xs md:text-base font-semibold">
              {checkPricing(props.price_starting_from)}
            </p>
            <p className="mb-1 text-[11px] md:text-sm text-black truncate">
              {props.project_address}
            </p>
            <p className="mb-1 text-[11px] md:text-sm text-gray-500 truncate">
              Occupancy: {props.occupancy}
            </p>
          </div>
        </Link>
        <Link
          href={`/${props.city.slug}/${props.slug}`}
          className="inline-block text-black mx-3 mt-2 mb-3 px-3 py-2 rounded-xl border-1 border-blue-500 hover:border-black shadow-md bg-white text-sm font-medium "
          target="_blank"
        >
          View Details
        </Link>
      </div>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function DeveloperCard(props) {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 my-3 md:my-0">
      <div className="relative overflow-hidden">
        <Link
          href={`/builders/${props.slug}`}
          className="block"
          target="_blank"
        >
          <div className="relative h-40 w-full bg-gray-100">
            {props.image ? (
              <Image
                src={props.image}
                alt={`${props.name} builder's logo`}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <Image
                src="/noimage.webp"
                alt={`no image available for ${props.name}`}
                fill
                className="object-contain p-4"
                loading="lazy"
              />
            )}
          </div>
        </Link>
      </div>
      <Link
        href={`/builders/${props.slug}`}
        className="block p-4 bg-white rounded-b-xl"
        target="_blank"
      >
        <h3 className="text-sm md:text-base font-bold text-gray-900 text-center truncate">
          {props.name}
        </h3>
      </Link>
    </div>
  );
}

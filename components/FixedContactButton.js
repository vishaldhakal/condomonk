import Link from "next/link";

export default function FixedContactButton() {
  return (
    <Link
      href="#contact"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white rounded-full shadow-xl transition-transform hover:scale-105 duration-200 ease-in-out"
    >
      <div className="md:hidden block flex mx-auto items-center justify-center p-4">
        <span className="text-white font-medium text-md whitespace-nowrap">
          Send me latest info
        </span>
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
      </div>
    </Link>
  );
}

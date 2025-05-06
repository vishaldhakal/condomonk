import Link from "next/link";

export default function FixedContactButton() {
  return (
    <Link
      href="#contact"
      className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl transition-transform hover:scale-105 duration-200 ease-in-out"
    >
      <div className="flex items-center gap-3 p-3 md:hidden block">
        <img
          src="/COA-agent-pic.jpg"
          alt="Contact Agent"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-gray-900 font-medium text-sm whitespace-nowrap">
          Send me latest info
        </span>
      </div>
    </Link>
  );
}

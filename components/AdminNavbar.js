import Link from "next/link";

const AdminNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/admin/" className="flex items-center">
          <span className="hidden lg:block text-xl font-semibold text-gray-800">
            Dashboard
          </span>
        </Link>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <form className="relative" method="POST" action="#">
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
      <nav className="flex items-center">
        <ul className="flex items-center">
          <li className="text-gray-700 font-medium">Admin</li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavbar;

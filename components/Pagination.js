"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    return params.toString();
  };

  return (
    <div className="flex justify-center gap-2 mt-8 md:text-sm text-xs ">
      <Link
        href={`${pathname}?${createQueryString(currentPage - 1)}`}
        className={`md:px-4 px-2 py-2 border rounded ${
          currentPage <= 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Previous
      </Link>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2)
        ) {
          return (
            <Link
              key={page}
              href={`${pathname}?${createQueryString(page)}`}
              className={`md:px-4 px-2 py-2 border rounded ${
                currentPage === page
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          );
        }
        if (page === currentPage - 3 || page === currentPage + 3) {
          return (
            <span key={page} className="px-4 py-2">
              ...
            </span>
          );
        }
        return null;
      })}

      <Link
        href={`${pathname}?${createQueryString(currentPage + 1)}`}
        className={`md:px-4 px-2 py-2 border rounded ${
          currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}

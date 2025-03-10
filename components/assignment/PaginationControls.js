"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const pathname = usePathname();

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="flex flex-col items-center space-y-4 py-6">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> assignments
      </div>

      <div className="flex items-center space-x-2">
        {/* Previous page button */}
        <Link
          href={currentPage > 1 ? `${pathname}?page=${currentPage - 1}` : "#"}
          className={`px-3 py-2 rounded-md flex items-center ${
            currentPage > 1
              ? "text-blue-600 hover:bg-blue-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : 0}
        >
          <HiChevronLeft className="w-5 h-5" />
          <span className="sr-only">Previous</span>
        </Link>

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <Link
            key={page}
            href={`${pathname}?page=${page}`}
            className={`px-4 py-2 rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}

        {/* Next page button */}
        <Link
          href={
            currentPage < totalPages
              ? `${pathname}?page=${currentPage + 1}`
              : "#"
          }
          className={`px-3 py-2 rounded-md flex items-center ${
            currentPage < totalPages
              ? "text-blue-600 hover:bg-blue-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : 0}
        >
          <HiChevronRight className="w-5 h-5" />
          <span className="sr-only">Next</span>
        </Link>
      </div>
    </div>
  );
};

export default PaginationControls;

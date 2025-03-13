import React from "react";
import useIsMobile from "../utils/useIsmobile";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isMobile = useIsMobile();
  const getPageNumbers = () => {
    const pages = [];
    const showMaxPages = isMobile ? 3 : 5;

    if (totalPages <= showMaxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (isMobile) {
        if (currentPage === 1) {
          endPage = Math.min(2, totalPages - 1);
        } else if (currentPage === totalPages) {
          startPage = Math.max(totalPages - 1, 2);
          endPage = totalPages - 1;
        }
      } else {
        if (currentPage <= 3) {
          endPage = Math.min(showMaxPages - 1, totalPages - 1);
        }
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - showMaxPages + 2);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm font-medium ${
          currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        }`}
        aria-label="Previous page"
      >
        {isMobile ? "←" : "Previous"}
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm font-medium flex items-center justify-center ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        }`}
        aria-label="Next page"
      >
        {isMobile ? "→" : "Next"}
      </button>
    </div>
  );
};

export default Pagination;

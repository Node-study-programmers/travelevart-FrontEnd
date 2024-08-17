import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 페이지 번호를 계산합니다
  const pageNumbers = [];
  const maxPagesToShow = 5; // 페이지 표시 개수

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // 현재 페이지가 시작 페이지를 초과하는 경우 조정합니다
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className={`p-2 ${currentPage === 1 ? "text-gray-400" : "text-black"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={20} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`p-2 ${currentPage === page ? "text-blue-500 font-bold" : "text-black"} hover:text-blue-700 transition-colors`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`p-2 ${currentPage === totalPages ? "text-gray-400" : "text-black"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}

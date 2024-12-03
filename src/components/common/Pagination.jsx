import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Pagination({ totalPages, filters, setFilters }) {
  const maxPages = 5;
  const pagesToShow = Math.min(maxPages, totalPages);
  const navigate = useNavigate();

  function createPaginationArray(totalPages, currentPage, maxPages) {
    if (totalPages <= 0 || currentPage <= 0 || maxPages <= 0) {
      return [];
    }

    let startPage, endPage;

    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(maxPages / 2)) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + Math.floor(maxPages / 2) >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPages / 2);
      endPage = currentPage + Math.floor(maxPages / 2);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  const paginationArray = createPaginationArray(totalPages, parseInt(filters.page), pagesToShow);

  function handlePageChange(num) {
    const updatedFilters = { ...filters, page: num.toString() };
    setFilters(updatedFilters);

    const queryString = Object.entries(updatedFilters)
      .filter(([_, value]) => value !== "") // Remove empty filters
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    navigate(`/discover-local?${queryString}`);
  }

  function handlePrevious() {
    if (parseInt(filters.page) > 1) {
      handlePageChange(parseInt(filters.page) - 1);
    }
  }

  function handleNext() {
    if (parseInt(filters.page) < totalPages) {
      handlePageChange(parseInt(filters.page) + 1);
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={parseInt(filters.page) <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginationArray.map((num) => (
        <Button
          key={num}
          variant={parseInt(filters.page) === num ? "default" : "outline"}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={parseInt(filters.page) >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}


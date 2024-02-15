import { type ReactNode, useState } from "react";

export function usePaginatedForm(steps: ReactNode[]) {
  const [currentPage, setCurrentPage] = useState(0);
  const next = () => {
    if (currentPage <= steps.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const back = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const goTo = (index: number) => {
    setCurrentPage(index);
  };
  return {
    steps,
    step: steps[currentPage],
    next,
    back,
    goTo,
    currentPage,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === steps.length - 1,
  };
}

import { useCallback, useMemo, useState } from "react";

type UsePaginationProps = {
  data: Array<any>;
  // eslint-disable-next-line no-unused-vars
  filterFn: (value: any, index: number, array: any[]) => unknown;
  perPage?: number;
};

export type Pagination = {
  index: number;
  perPage: number;
  page: number;
  totalPages: number;
  next: boolean;
  prev: boolean;
};

export const initialPaginationState = {
  index: 0,
  perPage: 6,
  page: 1,
  totalPages: 1,
  next: true,
  prev: false,
};

const usePagination = ({
  data = [],
  filterFn,
  perPage = 6,
}: UsePaginationProps) => {
  const [pagination, setPagination] = useState(() => ({
    ...initialPaginationState,
    perPage,
  }));

  const filteredData = useMemo(
    () => data.filter(filterFn || []),
    [data, filterFn]
  );

  const slicedData = useMemo(
    () =>
      filteredData.slice(
        pagination.index,
        (pagination.index + 1) * pagination.perPage
      ),
    [filteredData, pagination.index, pagination.perPage]
  );

  const setPrevPage = useCallback(() => {
    setPagination((prevState) => {
      const prevPage = prevState.page - 1;
      const prevIndex = (prevPage - 1) * prevState.perPage;

      return {
        ...prevState,

        index: prevIndex,
        page: prevPage,
      };
    });
  }, []);

  const setNextPage = useCallback(() => {
    setPagination((prevState) => {
      const nextPage = prevState.page + 1;
      const nextIndex = (nextPage - 1) * prevState.perPage;

      return {
        ...prevState,
        index: nextIndex,
        page: nextPage,
      };
    });
  }, []);

  const hasNext = slicedData.length >= pagination.perPage;
  const hasPrev = pagination.page > 1;
  const totalPages = Math.ceil(filteredData.length / pagination.perPage);

  return {
    pagination,
    filteredData,
    slicedData,
    setPrevPage,
    setNextPage,
    hasNext,
    hasPrev,
    totalPages,
  };
};

export default usePagination;

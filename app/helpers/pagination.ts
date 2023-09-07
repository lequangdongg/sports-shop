import { FormProducts } from '@/lib/types';

export const paginationCalculation = (
  length: number,
  currentPage = 1,
  itemsPerPage = 10,
) => {
  return {
    total: length,
    perPage: itemsPerPage,
    currentPage: currentPage,
    lastPage: Math.ceil(length / itemsPerPage),
    from: (currentPage - 1) * itemsPerPage + 1,
    to: currentPage * itemsPerPage,
  };
};

export const paginationGetItem = <T = FormProducts>(
  data: T[],
  pageSize = 10,
  page: number,
) => data.slice((page - 1) * pageSize, page * pageSize);

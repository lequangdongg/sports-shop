import { PaginationType } from '@/lib/types';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

const Pagination: React.FC<{ pagination: PaginationType }> = ({ pagination }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-end -space-x-px h-10 text-base">
          <li>
            <button
              className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={currentPage <= 1}
              onClick={() => onChangePage(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: pagination.lastPage }).map((_, index) => (
            <li key={index}>
              <button
                className={classNames(
                  'flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                  {
                    'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700':
                      currentPage === index + 1,
                  },
                )}
                onClick={() => onChangePage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={currentPage === pagination.lastPage}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onChangePage(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

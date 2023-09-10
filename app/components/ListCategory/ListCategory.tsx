import { formatCurrency } from '@/app/helpers/format-currency';
import { DataResponse } from '@/utils/constants';
import Image from 'next/image';
import React from 'react';

const ListCategory: React.FC<{
  data: string[];
  onDelete: (item: string, index: number) => void;
}> = ({ data, onDelete }) => {
  return (
    <ul className="max-w max-h-96 overflow-auto divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((item, index) => (
        <li className="pb-3 sm:pb-4" key={item[DataResponse.Id]}>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                className="w-30 h-30"
                src={`https://lh3.googleusercontent.com/d/${
                  item[DataResponse.Image]
                }`}
                alt="Neil image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {item[DataResponse.Title]}
              </p>
              {item[DataResponse.Category] && (
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {item[DataResponse.Category]}
                </p>
              )}
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {formatCurrency(+item[DataResponse.Price])}
            </div>
            <button
              type="button"
              className="ext-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={() => onDelete(item, index)}
            >
              Xoá sản phẩm
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCategory;

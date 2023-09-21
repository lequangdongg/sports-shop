import { formatCurrency } from '@/app/helpers/format-currency';
import { DataResponse } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DataGrid: React.FC<{
  products: string[];
  title: string;
  idSection: string;
}> = ({ products, title, idSection }) => {
  return (
    <section className="mx-auto px-4 py-4 w-full lg:px-8" id={idSection}>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {products.map((product) => (
          <Link
            key={product[DataResponse.Id]}
            href={`/products/${product[DataResponse.Slug]}`}
            className="group"
          >
            <div className="h-96 overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={`https://lh3.googleusercontent.com/d/${
                  product[DataResponse.Image]
                }`}
                alt={product[DataResponse.Title]}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              {product[DataResponse.Title]}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {formatCurrency(+product[DataResponse.Price])}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DataGrid;

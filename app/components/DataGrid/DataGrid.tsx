import { formatCurrency } from '@/app/helpers/format-currency';
import { FormProducts } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DataGrid: React.FC<{ products: FormProducts[]; title: string }> = ({
  products,
  title,
}) => {
  return (
    <div className="mx-auto px-4 py-4 w-full lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src={`https://lh3.googleusercontent.com/d/${product.image}`}
                alt={product.title}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {formatCurrency(product.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataGrid;

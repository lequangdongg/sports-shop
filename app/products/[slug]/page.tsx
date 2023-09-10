import Carousel from '@/app/components/Carousel';
import Footer from '@/app/components/Footer';
import { formatCurrency } from '@/app/helpers/format-currency';
import { getProducts, staticFetching } from '@/app/services/http';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { FormProducts } from '@/lib/types';
import { DataResponse } from '@/utils/constants';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params;

  const response = await staticFetching();

  const product = response.find(
    (data) => data[DataResponse.Slug] === slug,
  ) as string;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product[DataResponse.Title],
    openGraph: {
      images: [
        `https://lh3.googleusercontent.com/d/${product[DataResponse.Image]}`,
        ...previousImages,
      ],
      title: product[DataResponse.Title],
    },
  };
}

export async function generateStaticParams() {
  const products = await staticFetching() || [];
  return products.map((product) => ({
    slug: product[DataResponse.Slug],
  }));
}

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const data = await staticFetching();

  const productDetail = data.find(
    (item) => item[DataResponse.Slug] === params.slug,
  ) as string;
  const relatedProducts = data
    .filter((product) => {
      const categoryMapped = (
        productDetail?.[DataResponse.Category] as unknown as string
      )
        .split(', ')
        .reduce((acc, cur) => ({ ...acc, [cur]: cur }), {});
      const productCategories = (
        product[DataResponse.Category] as unknown as string
      ).split(', ');

      return productCategories.some(
        (category) => category === (categoryMapped as any)[category],
      );
    })
    .filter(
      (product) =>
        product[DataResponse.Id] !== productDetail?.[DataResponse.Id],
    );

  return (
    <section className="bg-white">
      <div className="pt-6">
        <nav
          aria-label="Breadcrumb"
          className="px-6 lg:px-8 max-w-full sm:px-6 lg:px-8"
        >
          <Link
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-neutral-900 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700 inline-flex items-center"
            href="/"
          >
            <svg
              className="w-5 h-5 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
            <span className="ml-2">Quay lại cửa hàng</span>
          </Link>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 px-6 lg:px-8 max-w-full sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 rounded-lg lg:block">
            <Image
              src={`https://lh3.googleusercontent.com/d/${
                productDetail[DataResponse.Image]
              }`}
              alt={productDetail[DataResponse.Title]}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="max-w-2xl lg:max-w-max">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl xl:mt-3 mt-3 font-bold tracking-tight text-gray-900 sm:text-3xl sm:mt-3">
                {productDetail[DataResponse.Title]}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="mt-3 text-3xl tracking-tight text-gray-900">
                {formatCurrency(+productDetail[DataResponse.Price])}
              </p>

              <div className="mt-2 max-w-full">
                {/* Sizes */}
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>
                  <div className="mt-4">
                    <label className="sr-only">Choose a size</label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {(productDetail[DataResponse.Sizes] as unknown as string)
                        .split(', ')
                        .map((size) => (
                          <div
                            key={size}
                            className={classNames(
                              'cursor-pointer bg-white text-gray-900 shadow-sm',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                            )}
                          >
                            <label>{size}</label>
                            {
                              <span
                                className={classNames(
                                  'border-2',
                                  'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md',
                                )}
                                aria-hidden="true"
                              />
                            }
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}

              <div className="mt-2">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: productDetail[DataResponse.Description],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<Carousel data={relatedProducts} />}
      <Footer />
    </section>
  );
}

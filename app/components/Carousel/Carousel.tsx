'use client';
import React, { Fragment, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import { FormProducts } from '@/lib/types';
import { formatCurrency } from '@/app/helpers/format-currency';

const Carousel: React.FC<{ data: FormProducts[] }> = ({ data }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="relative mx-auto px-4 py-4 w-full lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Các sản phẩm thể thao nổi bật
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="swiper px-4 py-4 mt-6"
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/products/${product.slug}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={`https://lh3.googleusercontent.com/d/${product.image}`}
                  alt={product.title}
                  width={235}
                  height={235}
                  className="h-full w-full xl:w-235 xl:h-235 2xl:w-235 2xl:h-235 lg:xl:w-235 lg:h-235 object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {formatCurrency(product.price)}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Fragment>
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="previous"
          className="absolute md-max:hidden z-10 left-0 top-1/2 -translate-y-full rotate-180 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center ml-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
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
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="next"
          className="absolute md-max:hidden z-10 right-0 top-1/2 -translate-y-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
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
        </button>
      </Fragment>
    </div>
  );
};

export default Carousel;

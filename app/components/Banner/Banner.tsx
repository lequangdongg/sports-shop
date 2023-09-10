import Image from 'next/image';
import React from 'react';

const mediaSocials = [
  {
    name: 'Fampage: ',
    link: 'https://www.facebook.com/jackphan100895',
  },
  {
    name: 'Tiktok: ',
    link: 'https://www.tiktok.com/@ytbhoangminhcoffee',
  },
];

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <Image
          className="mx-auto"
          src="/hm-logo.png"
          alt=""
          width={300}
          height={100}
        />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Chuyên cung cấp các mặt hàng và phụ kiện liên quan đến thể thao.”
            </p>
          </blockquote>
          {/* <figcaption className="mt-10">
            <Image
              className="mx-auto h-10 w-10 rounded-full"
              src="https://scontent.xx.fbcdn.net/v/t39.30808-1/283003174_789100248738748_6911774192362152147_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5fac6f&_nc_ohc=qP43pxGoivoAX8kBCIp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfCHI9OIM5T9RCKq3D-TOjeyrO-7kXd3cyfSs-Hju1OvKQ&oe=64FC41F9"
              alt=""
              width={80}
              height={80}
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Hoang Minh Phan</div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-blue-600">
                <a href="tel:+84933857472">0933857472</a>
              </div>
            </div>
          </figcaption> */}
          <div className="flex flex-col justify-center items-center gap-1">
            {mediaSocials.map((social) => (
              <div key={social.name}>
                <span>{social.name}</span>
                <a
                  href={social.link}
                  rel="noreferrer"
                  target="_blank"
                  className="font-medium text-blue-600 dark:text-blue-500 underline"
                >
                  {social.link}
                </a>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Banner;

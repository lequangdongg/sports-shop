import React from 'react';
import Carousel from '@/app/components/Carousel';
import Banner from '@/app/components/Banner';
import ProductBanner from '@/app/components/ProductBanner';
import DataGrid from '@/app/components/DataGrid';
import Footer from './components/Footer';
import { getProducts } from './services/http';
import { TypeProductEnum } from '@/utils/constants';

const HomePage = async () => {
  const data = await getProducts();

  return (
    <div className="bg-white">
      <Banner />
      <ProductBanner />
      <Carousel
        data={data.filter(({ isPopular }) => String(isPopular) === '1')}
      />
      <DataGrid
        products={data.filter(
          ({ category }) => String(category) === TypeProductEnum.SportClothes,
        )}
        title="Đồ dùng thể thao"
      />

      <DataGrid
        products={data.filter(
          ({ category }) => String(category) === TypeProductEnum.SportClothes,
        )}
        title="Dụng cụ thể thao"
      />
      <Footer />
    </div>
  );
};

export default HomePage;

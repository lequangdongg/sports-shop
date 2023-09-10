import React from 'react';
import Carousel from '@/app/components/Carousel';
import Banner from '@/app/components/Banner';
import ProductBanner from '@/app/components/ProductBanner';
import DataGrid from '@/app/components/DataGrid';
import Footer from './components/Footer';
import { staticFetching } from './services/http';
import { DataResponse, TypeProductEnum } from '@/utils/constants';

const HomePage = async () => {
  const data = await staticFetching();

  return (
    <div className="bg-white">
      <Banner />
      <ProductBanner />
      <Carousel
        data={data.filter((item) => item[DataResponse.isPopular] === '1')}
      />
      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.SportClothes,
        )}
        title={TypeProductEnum.SportClothes}
      />

      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.SportsAccessories,
        )}
        title={TypeProductEnum.SportsAccessories}
      />
      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.DesignUponRequest,
        )}
        title={TypeProductEnum.DesignUponRequest}
      />
      <Footer />
    </div>
  );
};

export default HomePage;

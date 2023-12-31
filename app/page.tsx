import React from 'react';
import Carousel from '@/app/components/Carousel';
import Banner from '@/app/components/Banner';
import ProductBanner from '@/app/components/ProductBanner';
import DataGrid from '@/app/components/DataGrid';
import Footer from './components/Footer';
import { staticFetching } from './services/http';
import { DataResponse, TypeProductEnum } from '@/utils/constants';
import BannerPage from './components/BannerPage';

const HomePage = async () => {
  const data = await staticFetching();

  return (
    <div className="bg-white">
      <BannerPage />
      {/* <Banner /> */}
      {/* <ProductBanner /> */}
      <Carousel
        data={data.filter((item) => item[DataResponse.isPopular] === '1')}
        isSelling
      />
      <DataGrid
        products={data.filter(
          (item) => item[DataResponse.Category] === TypeProductEnum.SportShorts,
        )}
        title={TypeProductEnum.SportShorts}
        idSection="quan-the-thao"
      />
      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.ClothesSports,
        )}
        title={TypeProductEnum.ClothesSports}
        idSection="ao-the-thao"
      />
      <DataGrid
        products={data.filter(
          (item) => item[DataResponse.Category] === TypeProductEnum.SportsWear,
        )}
        title={TypeProductEnum.SportsWear}
        idSection="do-bo-the-thao"
      />

      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.JacketSports,
        )}
        title={TypeProductEnum.JacketSports}
        idSection="ao-khoac-the-thao"
      />

      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.SportsAccessories,
        )}
        title={TypeProductEnum.SportsAccessories}
        idSection="phu-kien-the-thao"
      />
      <DataGrid
        products={data.filter(
          (item) =>
            item[DataResponse.Category] === TypeProductEnum.DesignUponRequest,
        )}
        title={TypeProductEnum.DesignUponRequest}
        idSection="thiet-ke-quan-ao-thi-dau-theo-yeu-cau"
      />
      <Footer />
    </div>
  );
};

export default HomePage;

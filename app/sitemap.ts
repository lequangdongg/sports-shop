import { DataResponse } from '@/utils/constants';
import { staticFetching } from './services/http';

export default async function sitemap() {
  const data = await staticFetching() || [];
  const productDetail = data.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product[DataResponse.Slug]}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...productDetail,
  ];
}

import { DataResponse } from '@/utils/constants';

export default async function sitemap() {
  const data: string[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sheet`,
    { next: { revalidate: 3600 } },
  ).then((res) => res.json()).catch(() => []);
  const productDetail = data.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${
      product[DataResponse.Slug]
    }`,
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

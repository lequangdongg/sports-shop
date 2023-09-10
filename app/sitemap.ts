import { getProducts } from './services/http';

export default async function sitemap() {
  const data = await getProducts();
  const productDetail = data.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
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

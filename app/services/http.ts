import { FormProducts } from '@/lib/types';
import axios from 'axios';

export const getProducts = async (
  params = {},
  suffix = '/'
): Promise<FormProducts[]> => {
  const res = await axios.get<any, { data: FormProducts[] }>(
    `${process.env.NEXT_PUBLIC_SHEET_API}${suffix}`,
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SHEET_TOKEN}`,
      },
    },
  );

  return res.data;
};

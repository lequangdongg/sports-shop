import axios from 'axios';

export const getProducts = async (): Promise<string[]> => {
  const res = await axios.get<any, { data: string[] }>(`api/sheet`);

  return res.data;
};

export const staticFetching = async (): Promise<string[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sheet`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());
  return response;
};

import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import dataJson from '@/utils/data.json';
import {
  paginationCalculation,
  paginationGetItem,
} from '@/app/helpers/pagination';
import { FormProducts } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'utils/data.json');

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = {
    id: crypto.randomUUID(),
    ...req,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fsPromises.writeFile(
    dataFilePath,
    JSON.stringify({ data: [res, ...dataJson.data] }),
  );
  return NextResponse.json(res);
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page') as string;
  const searchValue = request.nextUrl.searchParams.get('searchValue') as string;
  let products = dataJson.data as unknown as FormProducts[];
  if (searchValue) {
    products = products.filter((product) =>
      product.title
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim()),
    );
  }
  products = paginationGetItem(products, 10, page ? +page : 1);
  const pagination = paginationCalculation(products.length, page ? +page : 1);
  return NextResponse.json({ products, pagination });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') as string;
  const data = dataJson.data.filter((product) => product.id !== id);
  fsPromises.writeFile(
    dataFilePath,
    JSON.stringify({ data }),
  );
  return NextResponse.json({});
}

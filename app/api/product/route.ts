import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import {
  paginationCalculation,
  paginationGetItem,
} from '@/app/helpers/pagination';
import { FormProducts } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const res = {
      id: crypto.randomUUID(),
      ...req,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const jsonDirectory = path.join(process.cwd(), 'json');
    let products = JSON.parse(
      await fsPromises.readFile(jsonDirectory + '/data.json', 'utf8'),
    ) as unknown as { data: FormProducts[] };
    await fsPromises.writeFile(
      `${jsonDirectory}/data.json`,
      JSON.stringify({ data: [res, ...products.data] }),
    );
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page') as string;
  const searchValue = request.nextUrl.searchParams.get('searchValue') as string;
  const jsonDirectory = path.join(process.cwd(), 'json');
  let products = JSON.parse(
    await fsPromises.readFile(jsonDirectory + '/data.json', 'utf8'),
  ) as unknown as { data: FormProducts[] };

  if (searchValue) {
    products.data = products.data.filter((product) =>
      product.title
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim()),
    );
  }
  products.data = paginationGetItem(products.data, 10, page ? +page : 1);
  const pagination = paginationCalculation(
    products.data.length,
    page ? +page : 1,
  );
  return NextResponse.json({ products: products.data, pagination });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') as string;
  const jsonDirectory = path.join(process.cwd(), 'json');
  let products = JSON.parse(
    await fsPromises.readFile(jsonDirectory + '/data.json', 'utf8'),
  ) as unknown as { data: FormProducts[] };

  const data = (products.data as unknown as FormProducts[]).filter(
    (product) => product.id !== id,
  );
  await fsPromises.writeFile(
    `${jsonDirectory}/data.json`,
    JSON.stringify({ data }),
  );
  return NextResponse.json({});
}

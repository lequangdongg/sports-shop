import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  const data = await request.json();
  const res = await prisma.categories.create({
    data: {
      ...data,
    },
  });
  return NextResponse.json(res);
}

export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get('skip') as string;
  const take = request.nextUrl.searchParams.get('take') as string;
  const searchValue = request.nextUrl.searchParams.get('searchValue') as string;
  const res = await prisma.categories.findMany({
    skip: skip ? +skip : 0,
    take: take ? +take : 20,
    where: {
      isPublish: true,
      title: {
        contains: searchValue,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(res);
}

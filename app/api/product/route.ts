import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import data from '@/utils/data.json';

const dataFilePath = path.join(process.cwd(), 'utils/data.json');

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = {
    id: crypto.randomUUID(),
    ...req,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fsPromises.writeFile(dataFilePath, JSON.stringify({ ...data, res }));
  return NextResponse.json(res);
}

import google from '@/lib/google-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
  const result = await google
    .sheets({ version: 'v4' })
    .spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_FILE_ID,
      range: process.env.SHEET_NAME,
    });
  return NextResponse.json(result.data.values);
}

export async function POST(request: Request) {
  const requestBody = await request.json();

  const items = [
    'id',
    'title',
    'slug',
    'price',
    'description',
    'image',
    'isPopular',
    'sizes',
    'category',
    'createdAt',
    'updatedAt',
  ];
  const payload = items.map((item) => requestBody[item]);

  google.sheets({ version: 'v4' }).spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_FILE_ID,
    range: process.env.SHEET_NAME,
    valueInputOption: 'RAW',
    includeValuesInResponse: true,
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [payload],
    },
  });
  return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
  const index = request.nextUrl.searchParams.get('index') as string;
  google.sheets({ version: 'v4' }).spreadsheets.values.batchClear({
    spreadsheetId: process.env.SHEET_FILE_ID,
    requestBody: {
      ranges: [`A${+index}:W${+index}`],
    },
  });
  return NextResponse.json({});
}

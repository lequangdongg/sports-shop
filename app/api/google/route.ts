import google from '@/lib/google-api';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';

export async function GET(request: Request) {
  const drive = google.drive({
    version: 'v3',
  });
  const a = await drive.files.list({
    q: `${process.env.GOOGLE_FOLDER_IMAGE} in parents and trashed=false`,
  });

  console.log(a.data);
  return new Response(`afff`, {
    status: 200,
    headers: {},
  });
}

export async function POST(request: Request, response: Response) {
  const drive = google.drive({
    version: 'v3',
  });
  const file = (await request.formData()).get('file') as File;
  const fileBuffer = file.stream();

  const result = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [process.env.GOOGLE_FOLDER_IMAGE as string],
    },
    media: {
      mimeType: file.type,
      body: Readable.from(fileBuffer as any),
    },
  });
  return NextResponse.json(result.data);
}

export async function DELETE(request: NextRequest) {
  const drive = google.drive({
    version: 'v3',
  });

  const fileId = request.nextUrl.searchParams.get('fileId') as string;
  await drive.files.delete({ fileId });

  return NextResponse.json({});
}

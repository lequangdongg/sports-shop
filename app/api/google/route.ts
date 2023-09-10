import google from '@/lib/google-api';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';

export async function POST(request: Request, response: Response) {
  try {
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
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: NextRequest) {
  const drive = google.drive({
    version: 'v3',
  });

  const fileId = request.nextUrl.searchParams.get('fileId') as string;
  await drive.files.delete({ fileId });

  return NextResponse.json({});
}

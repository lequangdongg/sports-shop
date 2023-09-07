import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  const timestamp = new Date().getTime();
  let fileName = '';
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === 'object' &&
      'arrayBuffer' in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      fileName = file.name;
      fs.writeFileSync(
        path.join(process.cwd(), `public/${timestamp}-${fileName}`),
        buffer,
      );
    }
  }
  return NextResponse.json({ id: `${timestamp}-${fileName}` });
}

export async function DELETE(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get('fileId') as string;
  console.log(fileId);
  fs.unlinkSync(path.join(process.cwd(), `public/${fileId}`));

  return NextResponse.json({});
}

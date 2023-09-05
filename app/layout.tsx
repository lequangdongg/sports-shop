import '@/app/globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';

const inter = Roboto({ subsets: ['vietnamese'], weight: '500' });

export const metadata: Metadata = {
  title: 'Hoàng Minh shop Thể thao',
  description: 'Hoàng Minh shop, chuyên cung cấp các mặt hàng về thể thao(sports)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: 'hidden',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

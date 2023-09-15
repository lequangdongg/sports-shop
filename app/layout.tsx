import '@/app/globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';
import FacebookMessenger from './components/FacebookMessenger';

const inter = Roboto({ subsets: ['vietnamese'], weight: '500' });

export const metadata: Metadata = {
  title: 'HM-sports shop Thể thao',
  description:
    'HM-sports shop, chuyên cung cấp các mặt hàng về thể thao(sports)',
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
        <body className={inter.className}>
          <FacebookMessenger />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

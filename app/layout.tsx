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

          <div
            id="marketing-banner"
            className="fixed z-50 flex flex-col md:flex-row justify-between p-4 translate-x-0 right-0 bottom-28 bg-violet-100 text-violet-800 lg:text-lg 2xl:text-2xl xl:text-xl md:text-xs font-medium rounded dark:bg-gray-700 dark:text-violet-400 border border-violet-400"
          >
            <p className="flex flex-col items-start md:items-center md:flex-row leading-0">
              Liên hệ zalo: 0902.283.051
            </p>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { Poppins } from 'next/font/google';
import './global.css';
import { QueryProvider } from './query-provider';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Chat Dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${poppins.className}`}>
        <QueryProvider>
          <Toaster position="top-right" richColors />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

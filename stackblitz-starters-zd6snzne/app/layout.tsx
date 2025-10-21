import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

/* 🎵 Elegante Schrift für die Flötenkönigin */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Pascale die Flötenkönigin 🎶💖',
  description: 'Dein persönlicher 6-Wochen-Musikplan für Technik und Ausdruck.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      {/* 🌸 Playfair Display für den gesamten Stil */}
      <body className={playfair.className}>{children}</body>
    </html>
  );
}

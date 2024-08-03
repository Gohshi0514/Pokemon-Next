import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeNext",
  description: "Next.jsで構築されたモダンなポケモン図鑑アプリ",
  keywords: ["Pokemon", "Pokedex", "Next.js", "React"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="bg-red-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              PokeNext
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Server Actions版
                </Link>
              </li>
              <li>
                <Link href="/pokemon/1" className="hover:underline">
                  Dynamic Routes版
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeNext - ポケモン図鑑",
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
            <Link href="/" className="text-2xl font-bold flex items-center">
              <span className="mr-2">PokeNext</span>
              <span className="text-base font-normal bg-white text-red-600 px-2 py-1 rounded-md">ポケモン図鑑</span>
            </Link>
            <ul className="flex space-x-2">
              <li>
                <Link href="/" className="hover:underline px-3 py-2 rounded-full transition-all duration-300">
                  Server Actions版
                </Link>
              </li>
              <li>
                <Link href="/pokemon/1" className="hover:underline px-3 py-2 rounded-full transition-all duration-300">
                  Dynamic Routes版
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-8 pb-8">{children}</main>
        <footer className="bg-gray-900 text-white py-4 text-center text-sm">
          <div className="container mx-auto">
            <p>このアプリは教育目的で作成されたポケモン図鑑です。データは<a href="https://pokeapi.co/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">PokeAPI</a>から取得しています。</p>
            <p className="mt-2">Pokémon ©2023 Pokémon. ©1995-2023 Nintendo/Creatures Inc./GAME FREAK inc.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
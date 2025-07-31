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
      <body className={`${inter.className} font-pokedex bg-pokedex-bg text-pokedex-dark min-h-screen`}>
        <header className="bg-pokedex-red text-white sticky top-0 z-50 border-b-4 border-pokedex-dark-red shadow-lg">
          <nav className="max-w-container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold flex items-center text-white hover:text-white transition-all duration-300 group">
              <div className="w-6 h-6 bg-white rounded-full border-2 border-pokedex-dark-red mr-2 group-hover:animate-pulse"></div>
              <span className="mr-2">PokeNext</span>
              <span className="text-base font-normal bg-white text-pokedex-red px-2 py-1 rounded-md shadow-md">ポケモン図鑑</span>
            </Link>
            <ul className="flex space-x-2">
              <li>
                <Link href="/" className="text-white hover:bg-white/20 px-3 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  Server Actions版
                </Link>
              </li>
              <li>
                <Link href="/pokemon/1" className="text-white hover:bg-white/20 px-3 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  Dynamic Routes版
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-container mx-auto px-4 py-8 flex-1 flex items-center justify-center min-h-[calc(100vh-200px)]">{children}</main>
        <footer className="bg-gray-900 text-white py-4 text-center text-sm mt-auto">
          <div className="max-w-container mx-auto px-4">
            <p>このアプリは教育目的で作成されたポケモン図鑑です。データは<a href="https://pokeapi.co/" className="text-pokedex-accent-light hover:underline" target="_blank" rel="noopener noreferrer">PokeAPI</a>から取得しています。</p>
            <p className="mt-2">Pokémon ©2023 Pokémon. ©1995-2023 Nintendo/Creatures Inc./GAME FREAK inc.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pokedex: {
          red: '#e3350d',
          'dark-red': '#b8240a',
          light: '#f0f0f0',
          dark: '#333',
          accent: '#3d7dca',
          'accent-light': '#5090e0',
          screen: '#98cb98',
          yellow: '#ffcb05',
          blue: '#3d7dca',
          border: '#222224',
        },
        pokemon: {
          normal: '#A8A878',
          fire: '#F08030',
          water: '#6890F0',
          electric: '#F8D030',
          grass: '#78C850',
          ice: '#98D8D8',
          fighting: '#C03028',
          poison: '#A040A0',
          ground: '#E0C068',
          flying: '#A890F0',
          psychic: '#F85888',
          bug: '#A8B820',
          rock: '#B8A038',
          ghost: '#705898',
          dragon: '#7038F8',
          dark: '#705848',
          steel: '#B8B8D0',
          fairy: '#EE99AC',
        }
      },
      fontFamily: {
        'pokedex': ['Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic Pro', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pokedex-bg": "linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%)",
        "pokedex-container": "linear-gradient(145deg, #e3350d, #b8240a)",
      },
      maxWidth: {
        'pokedex': '450px',
        'container': '1200px',
      },
      boxShadow: {
        'pokedex': '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 10px #222224, inset 0 5px 15px rgba(255, 255, 255, 0.2)',
        'pokedex-screen': 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;

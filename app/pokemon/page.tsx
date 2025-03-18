import { redirect } from 'next/navigation';

export default function PokemonSearchPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;

  if (id) {
    const pokemonId = parseInt(id);
    if (!isNaN(pokemonId) && pokemonId >= 1 && pokemonId <= 898) {
      redirect(`/pokemon/${pokemonId}`);
    }
  }

  // ランダムなポケモンにリダイレクト
  const randomId = Math.floor(Math.random() * 898) + 1;
  redirect(`/pokemon/${randomId}`);
}
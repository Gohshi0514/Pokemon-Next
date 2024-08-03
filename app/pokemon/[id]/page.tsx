import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string } }>;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
}

async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await getPokemon(params.id);
  const prevId = pokemon.id > 1 ? pokemon.id - 1 : 898;
  const nextId = pokemon.id < 898 ? pokemon.id + 1 : 1;

  return (
    <main>
      <div className="pokedex-container">
        <div className="pokedex-screen">
          <div className="pokedex-content">
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              height={96}
              width={96}
              sizes="96px"
              className="pokemon-image"
            />
            <div className="pokemon-info">
              <p>タイプ: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
              <p>身長: {pokemon.height / 10}m</p>
              <p>体重: {pokemon.weight / 10}kg</p>
              <p>能力:</p>
              <ul className="pokemon-abilities">
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pokedex-controls">
          <div className="navigation-buttons">
            <Link href={`/pokemon/${prevId}`}>
              <button className="fetch-button nav-button">前へ</button>
            </Link>
            <Link href={`/pokemon/${nextId}`}>
              <button className="fetch-button nav-button">次へ</button>
            </Link>
          </div>
          <form action="/pokemon" method="get" className="search-form">
            <input
              type="number"
              name="id"
              placeholder="ポケモン番号 (1-898)"
              min="1"
              max="898"
              required
              className="pokemon-input"
            />
            <button type="submit" className="fetch-button">
              検索
            </button>
          </form>
          <Link href={`/pokemon/${Math.floor(Math.random() * 898) + 1}`}>
            <button className="fetch-button random-button">ランダム</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

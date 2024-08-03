'use server'

export async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  return getPokemonById(randomId);
}

export async function getPokemonById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('ポケモンの取得に失敗しました');
  }
  return response.json();
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRandomPokemon, getPokemonById } from "@/app/action/action";

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}

export default function RandomPokemonApp() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [pokemonId, setPokemonId] = useState("");
  const [error, setError] = useState("");

  const handleFetchPokemon = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRandomPokemon();
      setPokemon(data);
    } catch (error) {
      console.error("エラー:", error);
      setError("ポケモンの取得に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPokemonById = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await getPokemonById(id);
      setPokemon(data);
      setPokemonId(String(id));
    } catch (error) {
      console.error("エラー:", error);
      setError("ポケモンの取得に失敗しました。番号を確認してもう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pokemonId.trim() || isNaN(Number(pokemonId))) {
      setError("有効なポケモン番号を入力してください。");
      return;
    }
    handleFetchPokemonById(Number(pokemonId));
  };

  const prevId = pokemon && pokemon.id > 1 ? pokemon.id - 1 : 898;
  const nextId = pokemon && pokemon.id < 898 ? pokemon.id + 1 : 1;

  return (
    <div className="pokedex-container">
      <div className="pokedex-screen">
        <div className="pokedex-content">
          {pokemon ? (
            <>
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={96}
                height={96}
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
            </>
          ) : (
            <p>ポケモンを表示するにはボタンをクリックするか、番号を入力してください。</p>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <div className="pokedex-controls">
        <div className="navigation-buttons">
          <button onClick={() => handleFetchPokemonById(prevId)} disabled={loading} className="fetch-button nav-button">
            前へ
          </button>
          <button onClick={() => handleFetchPokemonById(nextId)} disabled={loading} className="fetch-button nav-button">
            次へ
          </button>
        </div>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="number"
            value={pokemonId}
            onChange={(e) => setPokemonId(e.target.value)}
            placeholder="ポケモン番号 (1-898)"
            min="1"
            max="898"
            required
            className="pokemon-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="fetch-button"
          >
            検索
          </button>
        </form>
        <button
          onClick={handleFetchPokemon}
          disabled={loading}
          className="fetch-button random-button"
        >
          {loading ? "ロード中..." : "ランダム"}
        </button>
      </div>
    </div>
  );
}
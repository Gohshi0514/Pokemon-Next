"use client";

import React, { useState, useEffect } from "react";
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

// ポケモンタイプごとの日本語名マッピング
const typeTranslations: Record<string, string> = {
  normal: "ノーマル",
  fire: "ほのお",
  water: "みず",
  electric: "でんき",
  grass: "くさ",
  ice: "こおり",
  fighting: "かくとう",
  poison: "どく",
  ground: "じめん",
  flying: "ひこう",
  psychic: "エスパー",
  bug: "むし",
  rock: "いわ",
  ghost: "ゴースト",
  dragon: "ドラゴン",
  dark: "あく",
  steel: "はがね",
  fairy: "フェアリー",
};

export default function RandomPokemonApp() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [pokemonId, setPokemonId] = useState("");
  const [error, setError] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);

  const handleFetchPokemon = async () => {
    setLoading(true);
    setError("");
    setIsBlinking(true);
    try {
      const data = await getRandomPokemon();
      setPokemon(data);
    } catch (error) {
      console.error("エラー:", error);
      setError("ポケモンの取得に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
      setTimeout(() => setIsBlinking(false), 2000);
    }
  };

  const handleFetchPokemonById = async (id: number) => {
    setLoading(true);
    setError("");
    setIsBlinking(true);
    try {
      const data = await getPokemonById(id);
      setPokemon(data);
      setPokemonId(String(id));
    } catch (error) {
      console.error("エラー:", error);
      setError("ポケモンの取得に失敗しました。番号を確認してもう一度お試しください。");
    } finally {
      setLoading(false);
      setTimeout(() => setIsBlinking(false), 2000);
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

  // LEDライトの装飾要素
  useEffect(() => {
    const container = document.querySelector('.pokedex-container');
    if (container) {
      // すでに存在する場合は追加しない
      if (!document.querySelector('.led-light:not(.main)')) {
        const colors = ['#f00', '#ff0', '#0f0'];
        colors.forEach((color, index) => {
          const light = document.createElement('div');
          light.classList.add('led-light');
          light.style.setProperty('--color', color);
          light.style.left = `${60 + index * 20}px`;
          light.style.top = '20px';
          container.appendChild(light);
        });
      }
    }
  }, []);

  return (
    <div className="pokedex-container">
      <div className={`pokedex-screen ${isBlinking ? 'blink' : ''}`}>
        <div className="pokedex-content">
          {pokemon ? (
            <>
              <div className="pokemon-id">#{pokemon.id}</div>
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <div className="pokemon-image-container">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  className="pokemon-image"
                />
              </div>
              <div className="type-badges">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="type-badge"
                    style={{ backgroundColor: `var(--pokemon-${type.type.name})` }}
                  >
                    {typeTranslations[type.type.name] || type.type.name}
                  </span>
                ))}
              </div>
              <div className="pokemon-info">
                <p>身長: {pokemon.height / 10}m</p>
                <p>体重: {pokemon.weight / 10}kg</p>
                <p>特性:</p>
                <ul className="pokemon-abilities">
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center p-5">
              <div className="pokemon-image-container mx-auto mb-4" style={{ opacity: 0.7 }}>
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-400 opacity-50">
                    <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5Z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-700">ポケモン図鑑</p>
              <p className="text-sm text-gray-500 mt-2">ボタンをクリックするか、番号を入力してください。</p>
            </div>
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
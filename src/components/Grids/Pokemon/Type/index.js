"use effect";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CondensedTypeIcon from "@/components/TypeIcon/Condensed";
import { capitalizeWords } from "@/lib/utils";

const PokemonByTypeGrid = ({ type }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSpriteUrl = (pokemon) => {
    if (pokemon.sprites.length > 0) {
      const spritesData = pokemon.sprites[0].sprites;
      const sprites =
        typeof spritesData === "string" ? JSON.parse(spritesData) : spritesData;
      return sprites.front_default || null;
    }
    return null;
  };

  useEffect(() => {
    const getPokemonByType = async (type) => {
      try {
        const url = `/api/pokedex/type?type=${encodeURIComponent(type)}`;
        const response = await fetch(url);
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.species_id - b.species_id);
        setPokemonData(sortedData);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonByType(type);
  }, []);

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {pokemonData &&
        pokemonData.map((pokemon, idx) => {
          let spriteUrl = getSpriteUrl(pokemon);
          return (
            <div key={idx} className="flex rounded-xl">
              <div className="p-2">
                <img
                  src={spriteUrl}
                  alt={pokemon.name}
                  className="mx-auto w-16 h-16 "
                />
              </div>
              <div className="">
                <Link
                  prefetch={false}
                  href={`/pokedex/${pokemon.name}`}
                  className="link-hover font-bold capitalize"
                >
                  {capitalizeWords(pokemon.name)}
                </Link>
                <div className="flex gap-2 text-sm">
                  <p className="text-gray-500">#{pokemon.species_id}</p>
                  <div className="flex gap-2">
                    {pokemon.types.map((type, id) => (
                      <span key={id}>
                        <CondensedTypeIcon type={type.pokemon_v2_type.name} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PokemonByTypeGrid;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { capitalizeWords, gameColors } from "@/lib/utils";
import Image from "next/image";

const HeldItemsTable = ({ itemData }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonPromises = itemData.held_by_pokemon.map(
          async (pokemonEntry) => {
            const url = pokemonEntry.pokemon.url;
            const response = await fetch(url);
            const data = await response.json();
            return pokemonEntry.version_details.map((versionDetail) => ({
              ...data,
              game: versionDetail.version.name,
              rarity: versionDetail.rarity,
            }));
          },
        );

        const results = await Promise.all(pokemonPromises);
        const flattenedResults = results.flat();
        setPokemonData(flattenedResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data: ", error);
        setError(error.toString());
        setLoading(false);
      }
    };

    if (itemData && itemData.held_by_pokemon.length > 0) {
      fetchPokemonData();
    } else {
      setLoading(false);
    }
  }, [itemData]);

  if (itemData && itemData.held_by_pokemon.length > 0) {
    return (
      <div id="held-by-pokemon" className="px-4">
        <h1 className="text-3xl font-semibold py-5">
          Pokémon Holding This Item
        </h1>
        {loading ? (
          <div className="flex w-full justify-center">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {pokemonData.length > 0 ? (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="uppercase text-left text-sm font-medium tracking-wider p-2 bg-base-200">
                      ID
                    </th>
                    <th className="uppercase text-left text-sm font-medium tracking-wider bg-base-200">
                      Name
                    </th>
                    <th className="uppercase text-left text-sm font-medium tracking-wider bg-base-200">
                      Games
                    </th>
                    <th className="uppercase text-left text-sm font-medium tracking-wider bg-base-200">
                      Rarity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pokemonData
                    .reduce((acc, pokemon) => {
                      const existingPokemon = acc.find(
                        (p) =>
                          p.id === pokemon.id && p.rarity === pokemon.rarity,
                      );
                      if (existingPokemon) {
                        existingPokemon.games.push(pokemon.game);
                      } else {
                        acc.push({
                          id: pokemon.id,
                          name: pokemon.species.name,
                          varietyName:
                            pokemon.name !== pokemon.species.name
                              ? pokemon.name
                              : null,
                          sprite: pokemon.sprites.front_default,
                          rarity: pokemon.rarity,
                          games: [pokemon.game],
                        });
                      }
                      return acc;
                    }, [])
                    .map((pokemon, index) => (
                      <tr key={index} className="hover:bg-base-100">
                        <td className="border-t border-base-100 py-2 pl-2">
                          {pokemon.id}
                        </td>
                        <td className="border-t border-base-100 py-2 pr-12">
                          <div className="flex items-center">
                            <img
                              src={pokemon.sprite}
                              alt={pokemon.name}
                              className="size-10 rendering-pixelated"
                            />
                            <div className="flex flex-col">
                              <Link
                                prefetch={false}
                                className="hover:text-blue-400"
                                href={`/pokedex/${pokemon.name}`}
                              >
                                {capitalizeWords(pokemon.name)}
                              </Link>
                              {pokemon.varietyName && (
                                <span className="text-xs">
                                  {capitalizeWords(pokemon.varietyName)}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="border-t border-base-100 py-2">
                          <div className="max-w-xl">
                            {pokemon.games
                              .map((game, gIndex) => {
                                const gameFullName =
                                  Object.keys(gameColors).find(
                                    (key) =>
                                      key.toLowerCase() ===
                                      capitalizeWords(game).toLowerCase(),
                                  ) || game;
                                return (
                                  <span
                                    key={gIndex}
                                    className="break-words"
                                    style={{ color: gameColors[gameFullName] }}
                                  >
                                    {capitalizeWords(gameFullName)}
                                  </span>
                                );
                              })
                              .reduce((prev, curr) => [prev, ", ", curr])}
                          </div>
                        </td>
                        <td className="border-t border-base-100 py-2">
                          {pokemon.rarity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <span>No Pokémon found holding this item.</span>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default HeldItemsTable;

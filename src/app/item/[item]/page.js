"use client";

import React, { useState, useEffect } from "react";
import PikachuLoader from "@/components/Loaders/Pokeball";
import { capitalizeWords, versionGroups, languages, gameColors } from "@/lib/utils";
import Error from "@/components/Errors";
import ItemPageNavigator from "@/components/Navigation/Item";
import Link from "next/link";

export default function ItemPage({ params }) {
  const [itemData, setItemData] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descriptionLanguage, setDescriptionLanguage] = useState('en');

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/item/${params.item}/`;
        const response = await fetch(url);
        const data = await response.json();
        setItemData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item data: ", error);
        setLoading(false);
        setError(error.toString());
      }
    };

    fetchItemData();
  }, [params.item]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonPromises = itemData.held_by_pokemon.map(async (pokemonEntry) => {
          const url = pokemonEntry.pokemon.url;
          const response = await fetch(url);
          const data = await response.json();
          return pokemonEntry.version_details.map(versionDetail => ({
            ...data,
            game: versionDetail.version.name,
            rarity: versionDetail.rarity
          }));
        });

        const results = await Promise.all(pokemonPromises);
        const flattenedResults = results.flat();
        setPokemonData(flattenedResults);
      } catch (error) {
        console.error('Error fetching Pokémon data: ', error);
        setError(error.toString());
      }
    };

    if (itemData && itemData.held_by_pokemon.length > 0) {
      fetchPokemonData();
    }
  }, [itemData]);

  if (loading) {
    return <PikachuLoader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full rounded-lg mt-3 max-w-6xl">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex px-6 items-center justify-center">
            {itemData.sprites.default && (
              <img
                src={itemData.sprites.default}
                className="size-16 rendering-pixelated"
                alt={itemData.name}
              />
            )}
            <span className="text-4xl font-semibold">
              {capitalizeWords(itemData.name)}
            </span>
          </div>
        </div>
        <div className="sticky top-12 z-30">
          <ItemPageNavigator />
        </div>
        <div className="flex justify-between md:flex-row flex-col px-4">
          <div id="item-data">
            <h1 className="text-3xl font-semibold py-5">Item Data</h1>
            <table className="table-auto border-collapse">
              <tr>
                <th className="text-right pr-4">ID</th>
                <td>{itemData.id}</td>
              </tr>
              <tr>
                <th className="text-right pr-4">Category</th>
                <td>{capitalizeWords(itemData.category.name)}</td>
              </tr>
              <tr>
                <th className="text-right pr-4">Cost</th>
                <td>{itemData.cost} Pokédollars</td>
              </tr>
              <tr>
                <th className="text-right pr-4">Attributes</th>
                <td>
                  {itemData.attributes.length > 0 ? (
                    itemData.attributes
                      .map((attr, index) => {
                        return <span key={index}>{capitalizeWords(attr.name)}</span>;
                      })
                      .reduce((prev, curr) => [prev, ", ", curr])
                  ) : (
                    <span>None</span>
                  )}
                </td>
              </tr>
            </table>
          </div>
          <div id="effects" className="max-w-md">
            <h1 className="text-3xl font-semibold py-5">Effects</h1>
            <div className="flex flex-col">
              {itemData.effect_entries.length > 0 ? (
                <table>
                  {itemData.effect_entries.map((effect, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-zinc-600" key={index}>
                          {effect.effect}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              ) : (
                <span className="text-zinc-600">
                  No effect entries found for this item.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between md:flex-row flex-col px-4">
          <div id="game-descriptions">
            <h1 className="text-3xl font-semibold py-5">Game Descriptions</h1>
            {itemData.flavor_text_entries.length > 0 ? (
              <div>
                <span>Change langauge: </span>
                <select
                  value={descriptionLanguage}
                  onChange={(e) => setDescriptionLanguage(e.target.value)}
                  className="select focus:outline-none focus:border-none bg-zinc-200 select-sm"
                >
                  {(() => {
                    const uniqueLanguages = new Set();
                    return itemData.flavor_text_entries
                      .map((entry, index) => {
                        const language = languages.find(
                          (lang) => lang.name === entry.language.name
                        );
                        if (!uniqueLanguages.has(language.name)) {
                          uniqueLanguages.add(language.name);
                          return (
                            <option value={language.name} key={index}>
                              {language.fullName}
                            </option>
                          );
                        }
                        return null;
                      })
                      .filter(Boolean);
                  })()}
                </select>
              </div>
            ) : (
              <span className="text-zinc-600">
                No game descriptions found for this item.
              </span>
            )}
            <table className="table-auto border-collapse">
              {itemData.flavor_text_entries.map((entry, index) => {
                if (entry.language.name == descriptionLanguage) {
                  const games = versionGroups.find(
                    (group) => group.name == entry.version_group.name
                  );
                  return (
                    <tr key={index}>
                      <th className="text-sm w-1 text-zinc-400 text-right">
                        {games.fullName
                          .split("/")
                          .map((game, gIndex) => {
                            return (
                              <span
                                key={gIndex}
                                style={{ color: gameColors[game.trim()] }}
                              >
                                {game.trim()}
                              </span>
                            );
                          })
                          .reduce((prev, curr) => [prev, "/", curr])}
                      </th>
                      <td className="text-md p-3 text-zinc-600">{entry.text}</td>
                    </tr>
                  );
                }
              })}
            </table>
          </div>

          <div id="other-languages">
            <h1 className="text-3xl font-semibold py-5">Other Languages</h1>
            <table className="table-auto">
              {itemData.names.map((name, index) => {
                const language = languages.find(
                  (lang) => lang.name == name.language.name
                );
                return (
                  <tr key={index}>
                    <th className="text-sm break-words text-zinc-400 text-right">
                      {language.fullName}
                    </th>
                    <td className="text-md p-1 text-zinc-600">{name.name}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>

        <div id="held-by-pokemon" className="px-4">
          <h1 className="text-3xl font-semibold py-5">Pokémon Holding This Item</h1>
          <div className="overflow-x-auto">
            {pokemonData.length > 0 ? (
              <table className="table-auto border w-full">
                <thead>
                  <tr>
                    <th className="border-b text-left border-gray-300 p-2 bg-zinc-100">ID</th>
                    <th className="border-b text-left border-gray-300 p-2 bg-zinc-100">Sprite</th>
                    <th className="border-b text-left border-gray-300 p-2 bg-zinc-100">Name</th>
                    <th className="border-b text-left border-gray-300 p-2 bg-zinc-100">Games</th>
                    <th className="border-b text-left border-gray-300 p-2 bg-zinc-100">Rarity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {pokemonData.reduce((acc, pokemon) => {
                    const existingPokemon = acc.find(p => p.id === pokemon.id && p.rarity === pokemon.rarity);
                    if (existingPokemon) {
                      existingPokemon.games.push(pokemon.game);
                    } else {
                      acc.push({
                        id: pokemon.id,
                        name: pokemon.species.name,
                        varietyName: pokemon.name !== pokemon.species.name ? pokemon.name : null,
                        sprite: pokemon.sprites.front_default,
                        rarity: pokemon.rarity,
                        games: [pokemon.game]
                      });
                    }
                    return acc;
                  }, []).map((pokemon, index) => (
                    <tr key={index} className="hover:bg-zinc-200">
                      <td className="border-t border-gray-300 p-2">{pokemon.id}</td>
                      <td className="border-t border-gray-300 p-2">
                        <img
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          className="size-10 rendering-pixelated"
                        />
                      </td>
                      <td className="border-t border-gray-300 p-2">
                        <div className="flex flex-col">
                          <Link className="hover:text-blue-400" href={`/pokedex/${pokemon.name}`}>{capitalizeWords(pokemon.name)}</Link>
                          {pokemon.varietyName && (
                            <span className="text-xs text-zinc-400">{capitalizeWords(pokemon.varietyName)}</span>
                          )}
                        </div>
                      </td>
                      <td className="border-t border-gray-300 p-2 ">
                        {pokemon.games.map((game, gIndex) => {
                          const gameFullName = Object.keys(gameColors).find(key => key.toLowerCase() === capitalizeWords(game).toLowerCase()) || game;
                          return (
                            <span
                              key={gIndex}
                              className="break-normal"
                              style={{ color: gameColors[gameFullName] }}
                            >
                              {capitalizeWords(gameFullName)}
                            </span>
                          );
                        }).reduce((prev, curr) => [prev, "/", curr])}
                      </td>
                      <td className="border-t border-gray-300 p-2">{pokemon.rarity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className="text-zinc-600">
                No Pokémon found holding this item.
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

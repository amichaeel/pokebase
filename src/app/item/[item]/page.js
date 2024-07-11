"use client";

import React, { useState, useEffect } from "react";
import PikachuLoader from "@/components/Loaders/Pokeball";
import { capitalizeWords, versionGroups, languages, gameColors } from "@/lib/utils";
import Error from "@/components/Errors";
import ItemPageNavigator from "@/components/Navigation/Item";
import Link from "next/link";
import HeldItemsTable from "@/components/Tables/HeldItems";

export default function ItemPage({ params }) {
  const [itemData, setItemData] = useState(null);
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
          <ItemPageNavigator itemData={itemData} />
        </div>
        <div className="flex justify-between md:flex-row flex-col px-4">
          <div id="item-data">
            <h1 className="text-3xl font-semibold py-5">Item Data</h1>
            <table className="table-auto border-collapse">
              <tbody>
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
              </tbody>
            </table>
          </div>
          <div id="effects" className="max-w-md">
            <h1 className="text-3xl font-semibold py-5">Effects</h1>
            <div className="flex flex-col">
              {itemData.effect_entries.length > 0 ? (
                <table className="table-auto">
                  <tbody>
                    {itemData.effect_entries.map((effect, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-zinc-600" key={index}>
                            <span className="whitespace-pre-wrap">{effect.effect.replaceAll('\n:   ', ': ')}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
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
            <table className="table-auto mt-5 border-collapse">
              <tbody>
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
                        <td className="text-md p-2 max-w-lg text-zinc-600">{entry.text}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          <div id="other-languages">
            <h1 className="text-3xl font-semibold py-5">Other Languages</h1>
            <table className="table-auto">
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <HeldItemsTable itemData={itemData} />
        </div>

      </div>
    </div>
  );
}

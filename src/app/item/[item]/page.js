"use client";

import React, { useState, useEffect } from "react";
import PikachuLoader from "@/components/Loaders/Pokeball";
import { capitalizeWords, versionGroups, languages, gameColors } from "@/lib/utils";
import Error from "@/components/Errors";

export default function ItemPage({ params }) {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [descriptionLanguage, setDescriptionLanguage] = useState('en')

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/item/${params.item}/`
        const response = await fetch(url);
        const data = await response.json();
        setItemData(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching item data: ", error)
        setLoading(false)
        setError(error.toString())
      }
    }

    fetchItemData()
  }, [])

  useEffect(() => {
    if (itemData) {
      console.log(itemData)
    }
  }, [itemData])

  if (loading) {
    return (
      <PikachuLoader />
    )
  }

  if (error) {
    return (
      <Error message={error} />
    )
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full bg-zinc-200 rounded-lg mt-3 max-w-6xl">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex px-6 items-center justify-center">
            {itemData.sprites.default && (
              <img src={itemData.sprites.default} className="size-16 rendering-pixelated" alt={itemData.name} />
            )}
            <span className="text-4xl font-semibold">{capitalizeWords(itemData.name)}</span>
          </div>
          <span className="">Category: {capitalizeWords(itemData.category.name)}</span>
          <div className="text-sm text--zinc-600">
            <span>Attributes: </span>
            {itemData.attributes.length > 0 ? itemData.attributes.map((attr, index) => {
              return (
                <span key={index}>{capitalizeWords(attr.name)}</span>
              )
            }).reduce((prev, curr) => [prev, ', ', curr]) : (
              <span>None</span>
            )}
          </div>
          <span className="text-sm text-green-600">Cost: {itemData.cost} Pokédollars</span>
        </div>
        <div className="flex px-4 flex-col">
          <h1 className="text-3xl font-semibold py-5">Effects</h1>
          <div className="flex flex-col">
            {itemData.effect_entries.length > 0 ? (
              <table>
                {itemData.effect_entries.map((effect, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-zinc-600" key={index}>{effect.effect}</td>
                    </tr>
                  )
                })}
              </table>
            ) : (
              <span className="text-zinc-600">
                No effect entries found for this item.
              </span>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col px-4">
          <div>
            <h1 className="text-3xl font-semibold pt-5">Game Descriptions</h1>
            <div className="flex flex-wrap gap-1">
              {(() => {
                const uniqueLanguages = new Set();
                return itemData.flavor_text_entries.map((entry, index) => {
                  const language = languages.find(lang => lang.name === entry.language.name);
                  if (uniqueLanguages.has(language.name)) {
                    return null;
                  }
                  uniqueLanguages.add(language.name);
                  return (
                    <button
                      key={index}
                      className={`text-sm p-2 rounded-3xl hover:bg-black/10  ${descriptionLanguage == language.name && "btn-active !bg-zinc-300"}`}
                      onClick={() => setDescriptionLanguage(language.name)}
                    >
                      {language.fullName}
                    </button>
                  );
                });
              })()}
            </div>

            <table className="border-collapse border-spacing-0 table" >
              {itemData.flavor_text_entries.map((entry, index) => {
                if (entry.language.name == descriptionLanguage) {
                  const games = versionGroups.find(group => group.name == entry.version_group.name)
                  return (
                    <tr key={index} className="table-row-group">
                      <th className="text-sm text-zinc-400 text-right" >
                        {games.fullName.split('/').map((game, gIndex) => {
                          return (
                            <span key={gIndex} style={{ color: gameColors[game.trim()] }}>
                              {game.trim()}
                            </span>
                          )
                        }).reduce((prev, curr) => [prev, '/', curr])}
                      </th>
                      <td className="text-md p-3 text-zinc-600 max-w-md">{entry.text}</td>
                    </tr>
                  )
                }
              })}
            </table>
          </div>

          <div>
            <h1 className="text-3xl font-semibold py-5">Other Languages</h1>
            <table className="table border-collapse border-spacing-0">
              {itemData.names.map((name, index) => {
                const language = languages.find(lang => lang.name == name.language.name)
                return (
                  <tr key={index} className="table-row-group">
                    <th className="text-sm break-words text-zinc-600 text-right">{language.fullName}</th>
                    <td className="text-md p-1 text-zinc-600">{name.name}</td>
                  </tr>
                )
              })}
            </table>
          </div>


        </div>
      </div>
    </div>
  )
}
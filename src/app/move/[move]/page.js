"use client";

import React, { useState, useEffect } from "react";
import PikachuLoader from "@/components/Loaders/Pokeball";
import Error from "@/components/Errors";
import MovePageNavigator from "@/components/Navigation/Move";
import PokemonByMoveAndLearningMethod from "@/components/Tables/Moves/Pokemon";
import {
  capitalizeWords,
  versionGroups,
  languages,
  gameColors,
} from "@/lib/utils";
import WideTypeIcon from "@/components/TypeIcon/Wide";

export default function MovePage({ params }) {
  const [moveData, setMoveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descriptionLanguage, setDescriptionLanguage] = useState("en");

  const capitalizeGeneration = (generation) => {
    const words = generation.split("-");
    return (
      words[0].charAt(0).toUpperCase() +
      words[0].slice(1) +
      " " +
      words[1].toUpperCase()
    );
  };

  useEffect(() => {
    const fetchMoveData = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/move/${params.move}/`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setMoveData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching move data: ", error);
        setError(error.toString());
        setLoading(false);
      }
    };
    fetchMoveData();
  }, [params.move]);

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
          <div className="flex px-6 flex-col items-center justify-center">
            <span className="text-4xl font-semibold">
              {capitalizeWords(moveData.name)}
            </span>
          </div>
        </div>
        <div className="sticky top-12 z-30">
          <MovePageNavigator moveData={moveData} />
        </div>
        <div className="flex justify-between gap-3 md:flex-row flex-col px-4">
          <div id="move-data">
            <h1 className="text-3xl font-semibold py-5">Move Data</h1>
            <table className="table-auto border-collapse">
              <tbody>
                <tr>
                  <th className="text-right pr-4">ID</th>
                  <td>{moveData.id}</td>
                </tr>
                <tr>
                  <th className="text-right pr-4">Category</th>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={`/move-${moveData.damage_class.name}.png`}
                        className="w-8"
                        alt={moveData.damage_class.name}
                      />
                      {capitalizeWords(moveData.damage_class.name)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="text-right pr-4">Type</th>
                  <td>
                    <WideTypeIcon type={moveData.type.name} />
                  </td>
                </tr>
                <tr>
                  <th className="text-right pr-4">Power</th>
                  <td>{moveData.power ? moveData.power : "—"}</td>
                </tr>
                <tr>
                  <th className="text-right pr-4">Accuracy</th>
                  <td>{moveData.accuracy ? moveData.accuracy : "—"}</td>
                </tr>
                <tr>
                  <th className="text-right pr-4">PP</th>
                  <td>{moveData.pp}</td>
                </tr>
                <tr>
                  <th className="text-right pr-4">Introduced</th>
                  <td>{capitalizeGeneration(moveData.generation.name)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="effects" className="max-w-full">
            <h1 className="text-3xl font-semibold py-5">Effects</h1>
            <div className="flex flex-col">
              {moveData.effect_entries.length > 0 ? (
                <table className="table-auto">
                  <tbody>
                    {moveData.effect_entries.map((effect, index) => {
                      return (
                        <tr key={index}>
                          <td key={index}>
                            <span className="whitespace-pre-wrap">
                              {effect.effect.replaceAll("\n:   ", ": ")}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <span className="text-zinc-600">
                  No effect entries found for this move.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between md:flex-row flex-col px-4">
          <div id="game-descriptions">
            <h1 className="text-3xl font-semibold py-5">Game Descriptions</h1>
            {moveData.flavor_text_entries.length > 0 ? (
              <div>
                <span>Change langauge: </span>
                <select
                  value={descriptionLanguage}
                  onChange={(e) => setDescriptionLanguage(e.target.value)}
                  className="select focus:outline-none focus:border-none bg-base-100 select-sm"
                >
                  {(() => {
                    const uniqueLanguages = new Set();
                    return moveData.flavor_text_entries
                      .map((entry, index) => {
                        const language = languages.find(
                          (lang) => lang.name === entry.language.name,
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
              <span>No game descriptions found for this item.</span>
            )}
            <table className="table-auto mt-5 border-collapse">
              <tbody>
                {moveData.flavor_text_entries.map((entry, index) => {
                  if (entry.language.name == descriptionLanguage) {
                    const games = versionGroups.find(
                      (group) => group.name == entry.version_group.name,
                    );
                    return (
                      <tr key={index}>
                        <th className="text-sm w-1 text-right">
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
                        <td className="text-md p-2 max-w-lg">
                          {entry.flavor_text}
                        </td>
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
                {moveData.names.map((name, index) => {
                  const language = languages.find(
                    (lang) => lang.name == name.language.name,
                  );
                  return (
                    <tr key={index}>
                      <th className="text-sm break-words text-base-content/60 text-right">
                        {language.fullName}
                      </th>
                      <td className="text-md p-1">{name.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div id="learned-by-pokemon" className="px-4">
          <h1 className="text-3xl font-semibold py-5">Learnt by level up</h1>
          <PokemonByMoveAndLearningMethod
            move={params.move}
            learningMethod={"level-up"}
          />
          <h1 className="text-3xl font-semibold py-5">Learnt by breeding</h1>
          <PokemonByMoveAndLearningMethod
            move={params.move}
            learningMethod={"egg"}
          />
        </div>
      </div>
    </div>
  );
}

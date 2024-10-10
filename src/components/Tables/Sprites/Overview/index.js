import { capitalizeWords } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SpritesOverviewTable = ({ pokemonData }) => {
  const [sprites, setSprites] = useState({ normal: [], shiny: [] });
  const [loading, setLoading] = useState(true);

  const generations = {
    "generation-i": "Generation I",
    "generation-ii": "Generation II",
    "generation-iii": "Generation III",
    "generation-iv": "Generation IV",
    "generation-v": "Generation V",
    "generation-vi": "Generation VI",
    "generation-vii": "Generation VII",
    "generation-viii": "Generation VIII",
    "generation-ix": "Generation IX",
  };

  useEffect(() => {
    const fetchSprites = () => {
      const normalSprites = [];
      const shinySprites = [];

      Object.keys(generations).forEach((gen) => {
        if (pokemonData.sprites.versions[gen]) {
          const genKeys = Object.keys(pokemonData.sprites.versions[gen]);
          if (genKeys.length > 0) {
            const genData = pokemonData.sprites.versions[gen][genKeys[0]];
            const normalSprite = genData.front_default || "-";
            const shinySprite = genData.front_shiny || "-";
            normalSprites.push(normalSprite);
            shinySprites.push(shinySprite);
          } else {
            normalSprites.push("-");
            shinySprites.push("-");
          }
        } else {
          normalSprites.push("-");
          shinySprites.push("-");
        }
      });

      setSprites({ normal: normalSprites, shiny: shinySprites });
      setLoading(false);
    };

    fetchSprites();
  }, [pokemonData]);

  return (
    <div className="w-full overflow-auto px-4">
      <h2 className="text-2xl font-bold mb-4">
        {capitalizeWords(pokemonData.name)} sprites
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-fixed" style={{ minWidth: "1200px" }}>
            <thead className="sticky top-0 bg-base-200">
              <tr>
                <th className="py-2" style={{ width: "200px" }}>
                  Type
                </th>
                {Object.values(generations).map((gen) => (
                  <th key={gen} className="py-2" style={{ width: "200px" }}>
                    {gen}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Normal</td>
                {sprites.normal.map((sprite, index) => (
                  <td key={index} className="h-24" style={{ width: "200px" }}>
                    {sprite !== "-" ? (
                      <div className="flex items-center justify-center hover:bg-green-200/50 hover:cursor-pointer w-full h-full transition-all">
                        <Image
                          src={sprite}
                          alt={`Normal Sprite ${generations[Object.keys(generations)[index]]}`}
                          className="h-full w-full p-1 rendering-pixelated"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span> - </span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2">Shiny</td>
                {sprites.shiny.map((sprite, index) => (
                  <td
                    key={index}
                    className="h-24border"
                    style={{ width: "200px" }}
                  >
                    {sprite !== "-" ? (
                      <div className="flex items-center justify-center hover:bg-green-200/50 hover:cursor-pointer w-full h-full transition-all">
                        <Image
                          src={sprite}
                          alt={`Shiny Sprite ${generations[Object.keys(generations)[index]]}`}
                          className="h-full w-full p-1 rendering-pixelated"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span> - </span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpritesOverviewTable;

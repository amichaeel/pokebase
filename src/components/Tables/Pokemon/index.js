import React from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import WideTypeIcon from "@/components/TypeIcon/Wide";

const PokemonTable = ({ filteredData, sortConfig, handleSort, router }) => {
  return (
    <div className="container mx-auto w-full max-w-6xl p-4 bg-white">
      <div className="w-full flex flex-col justify-center overflow-x-auto">
        <table className="table max-w-6xl">
          <thead>
            <tr className="hover:*:bg-black/10 hover:*:cursor-pointer">
              <th
                className={` ${sortConfig.key === "#" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("#")}
              >
                <div className="flex justify-between items-center">
                  <span>#</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "name" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("name")}
              >
                <div className="flex justify-between items-center">
                  <span>Name</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th>Type</th>
              <th
                className={` ${sortConfig.key === "total" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("total")}
              >
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "hp" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("hp")}
              >
                <div className="flex justify-between items-center">
                  <span>HP</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "attack" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("attack")}
              >
                <div className="flex justify-between items-center">
                  <span>Attack</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "defense" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("defense")}
              >
                <div className="flex justify-between items-center">
                  <span>Defense</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "sp. atk" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("sp. atk")}
              >
                <div className="flex justify-between items-center">
                  <span>Sp. Atk</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "sp. def" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("sp. def")}
              >
                <div className="flex justify-between items-center">
                  <span>Sp. Def</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                className={` ${sortConfig.key === "speed" ? "bg-blue-100" : ""}`}
                onClick={() => handleSort("speed")}
              >
                <div className="flex justify-between items-center">
                  <span>Speed</span>
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pokemon) => (
              <tr className="hover:bg-black/10" key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td className="flex items-center space-x-2">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-16 h-16"
                  />
                  <div>
                    <span
                      className="hover:underline hover:cursor-pointer"
                      onClick={() =>
                        router.push(`/pokedex/pokemon/${pokemon.name}`)
                      }
                    >
                      {pokemon.species.name
                        .replace("-", " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </span>
                    {pokemon.species.name !== pokemon.name && (
                      <div className="text-sm text-gray-500">
                        {pokemon.name
                          .replace("-", " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </div>
                    )}
                  </div>
                </td>
                <td className="space-y-1">
                  {pokemon.types.map((typeInfo) => (
                    <div key={typeInfo.type.name} className={`mr-1`}>
                      <WideTypeIcon type={typeInfo.type.name} />
                    </div>
                  ))}
                </td>
                <td>
                  {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
                </td>
                <td>{pokemon.stats[0].base_stat}</td>
                <td>{pokemon.stats[1].base_stat}</td>
                <td>{pokemon.stats[2].base_stat}</td>
                <td>{pokemon.stats[3].base_stat}</td>
                <td>{pokemon.stats[4].base_stat}</td>
                <td>{pokemon.stats[5].base_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonTable;

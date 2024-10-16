import React, { useState, useEffect, useMemo } from "react";
import { ChevronUpDownIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { capitalizeWords } from "@/lib/utils";
import Link from "next/link";

const PokedexTable = ({ pokemonData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPokemonData = useMemo(() => {
    let sortableData = [...pokemonData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "name":
            aValue = a.species_name.toLowerCase();
            bValue = b.species_name.toLowerCase();
            break;
          case "total":
            aValue = a.varieties[0].stats.reduce(
              (acc, stat) => acc + stat.base_stat,
              0,
            );
            bValue = b.varieties[0].stats.reduce(
              (acc, stat) => acc + stat.base_stat,
              0,
            );
            break;
          case "hp":
            aValue = a.varieties[0].stats[0].base_stat;
            bValue = b.varieties[0].stats[0].base_stat;
            break;
          case "attack":
            aValue = a.varieties[0].stats[1].base_stat;
            bValue = b.varieties[0].stats[1].base_stat;
            break;
          case "defense":
            aValue = a.varieties[0].stats[2].base_stat;
            bValue = b.varieties[0].stats[2].base_stat;
            break;
          case "sp. atk":
            aValue = a.varieties[0].stats[3].base_stat;
            bValue = b.varieties[0].stats[3].base_stat;
            break;
          case "sp. def":
            aValue = a.varieties[0].stats[4].base_stat;
            bValue = b.varieties[0].stats[4].base_stat;
            break;
          case "speed":
            aValue = a.varieties[0].stats[5].base_stat;
            bValue = b.varieties[0].stats[5].base_stat;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [pokemonData, sortConfig]);

  const getClassNamesFor = (name) => {
    return sortConfig.key === name ? "!bg-base-100" : "";
  };

  return (
    <div className="table-auto overflow-x-auto">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("id")}`}
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  #
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("name")}`}
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Name
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th className="border-b border-base-100 text-left text-xs font-medium uppercase tracking-wider p-3 bg-base-200">
              Type
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("total")}`}
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Total
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("hp")}`}
              onClick={() => handleSort("hp")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  HP
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("attack")}`}
              onClick={() => handleSort("attack")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Attack
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("defense")}`}
              onClick={() => handleSort("defense")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Defense
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("sp. atk")}`}
              onClick={() => handleSort("sp. atk")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Sp. Atk
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("sp. def")}`}
              onClick={() => handleSort("sp. def")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Sp. Def
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("speed")}`}
              onClick={() => handleSort("speed")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Speed
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {sortedPokemonData.map((pokemon) => (
            <React.Fragment key={pokemon.id}>
              {pokemon.varieties.map((variety, vIndex) => (
                <tr key={vIndex} className="hover:bg-base-100">
                  <td className="">
                    <span className="flex justify-center">
                      {pokemon.id.toString().padStart(4, "0")}
                    </span>
                  </td>
                  <td className="">
                    <div className="flex items-center space-x-2">
                      {variety.sprites.front_default ? (
                        <img
                          src={variety.sprites.front_default}
                          alt={variety.name}
                          className="w-10 h-10 rendering-pixelated"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10">
                          <NoSymbolIcon className="size-10" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <Link
                          prefetch={false}
                          className="hover:text-blue-400"
                          href={`/pokedex/${pokemon.species_name}`}
                        >
                          {capitalizeWords(pokemon.species_name)}
                        </Link>
                        {pokemon.species_name !== variety.name && (
                          <span className="text-xs text-gray-500">
                            {capitalizeWords(variety.name)}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="space-y-1 p-1  align-middle">
                    {variety.types.map((type) => (
                      <div key={type} className="mr-1">
                        <WideTypeIcon type={type} />
                      </div>
                    ))}
                  </td>
                  <td className=" align-middle">
                    {variety.stats.reduce(
                      (acc, stat) => acc + stat.base_stat,
                      0,
                    )}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[0].base_stat}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[1].base_stat}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[2].base_stat}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[3].base_stat}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[4].base_stat}
                  </td>
                  <td className=" align-middle">
                    {variety.stats[5].base_stat}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokedexTable;

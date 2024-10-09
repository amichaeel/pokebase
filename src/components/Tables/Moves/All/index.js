import React, { useState } from "react";
import { capitalizeWords } from "@/lib/utils";
import { ChevronUpDownIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import WideTypeIcon from "@/components/TypeIcon/Wide";

const MovesTable = ({ movesData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const sortedMoves = [...movesData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    return sortConfig.key === name ? "!bg-base-100" : "";
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("name")}`}
              onClick={() => requestSort("name")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Name
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("type")}`}
              onClick={() => requestSort("type")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Type
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("category")}`}
              onClick={() => requestSort("category")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Cat.
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("power")}`}
              onClick={() => requestSort("power")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Pow.
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("accuracy")}`}
              onClick={() => requestSort("accuracy")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Acc.
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("pp")}`}
              onClick={() => requestSort("pp")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  PP
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>

            <th className="border-b border-base-100 p-3 bg-base-200">
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Effect
                </span>
              </div>
            </th>

            <th
              className={`border-b border-base-100 p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("prob")}`}
              onClick={() => requestSort("prob")}
            >
              <div className="flex items-center justify-between ">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Prob. (%)
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {sortedMoves.map((move, idx) => (
            <tr key={idx} className="hover:bg-base-100">
              <td className="border-t border-base-100 p-1">
                <Link
                  prefetch={false}
                  className="hover:text-blue-400"
                  href={`/move/${move.name}`}
                >
                  {capitalizeWords(move.name)}
                </Link>
              </td>
              <td className="border-t border-base-100">
                {move.type ? <WideTypeIcon type={move.type} /> : <span>—</span>}
              </td>
              <td className="border-t border-base-100">
                {move.category ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={`/move-${move.category}.png`}
                      className="w-8"
                      alt={move.category}
                    />
                  </div>
                ) : (
                  <span>—</span>
                )}
              </td>
              <td className="border-t border-base-100">
                {move.power ? <span>{move.power}</span> : <span>—</span>}
              </td>
              <td className="border-t border-base-100">
                {move.accuracy ? <span>{move.accuracy}</span> : <span>—</span>}
              </td>
              <td className="border-t border-base-100">
                {move.pp ? <span>{move.pp}</span> : <span>—</span>}
              </td>
              <td className="border-t border-base-100 max-w-md">
                {move.short_effect ? (
                  <span>{move.short_effect}</span>
                ) : (
                  <span>—</span>
                )}
              </td>
              <td className="border-t border-base-100 text-right p-1">
                {move.effect_chance > 0 ? (
                  <span>{move.effect_chance}</span>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovesTable;

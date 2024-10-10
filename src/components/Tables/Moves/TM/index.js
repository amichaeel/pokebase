import React, { useEffect, useState } from "react";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { moveCatergories } from "@/lib/utils";
import Image from "next/image";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const TMMovesTable = ({ pokemonData }) => {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "tm", direction: "asc" });

  useEffect(() => {
    const fetchTMMoves = async () => {
      setLoading(true);
      const moveDetails = await Promise.all(
        pokemonData.moves
          .filter((move) =>
            move.version_group_details.some(
              (detail) => detail.move_learn_method.name === "machine",
            ),
          )
          .map(async (move) => {
            const url = move.move.url;
            const response = await fetch(url);
            const moveDetail = await response.json();

            if (moveDetail.machines.length > 0) {
              const machineUrl = moveDetail.machines[0].machine.url;
              const machineResponse = await fetch(machineUrl);
              const machineDetail = await machineResponse.json();

              if (machineDetail.item.name.startsWith("tm")) {
                const tmNumber = machineDetail.item.name.match(/\d+/)[0];
                return {
                  tm: `TM${tmNumber}`,
                  name: capitalize(moveDetail.name.replace("-", " ")),
                  type: capitalize(moveDetail.type.name),
                  category: capitalize(moveDetail.damage_class.name),
                  power: moveDetail.power,
                  accuracy: moveDetail.accuracy,
                  pp: moveDetail.pp,
                };
              }
            }
            return null;
          }),
      );
      setMoves(moveDetails.filter((move) => move !== null));
      setLoading(false);
    };

    fetchTMMoves();
  }, [pokemonData]);

  const sortedMoves = [...moves].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (
      sortConfig.key === "name" ||
      sortConfig.key === "type" ||
      sortConfig.key === "category"
    ) {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : moves.length === 0 ? (
        <div className="text-center">
          {capitalize(pokemonData.name)} cannot be taught any TM moves.
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="w-full text-left text-sm">
            <thead className="sticky-header">
              <tr className="hover:*:bg-base-100 hover:*:cursor-pointer">
                <th
                  onClick={() => handleSort("tm")}
                  className={`py-2 ${sortConfig.key === "tm" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>TM</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className={`py-2 ${sortConfig.key === "name" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>Move</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("type")}
                  className={`py-2 ${sortConfig.key === "type" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>Type</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("category")}
                  className={`py-2 ${sortConfig.key === "category" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>Category</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("power")}
                  className={`py-2 ${sortConfig.key === "power" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>Power</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("accuracy")}
                  className={`py-2 ${sortConfig.key === "accuracy" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>Accuracy</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("pp")}
                  className={`py-2 ${sortConfig.key === "pp" ? "bg-base-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <span>PP</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMoves.map((move, index) => (
                <tr key={index} className="hover:bg-base-200">
                  <td className="py-2">{move.tm}</td>
                  <td className="py-2">{move.name}</td>
                  <td className="py-2">
                    <WideTypeIcon type={move.type} />
                  </td>
                  <td className="py-2">
                    <div className="w-8 h-8">
                      <img
                        src={`${moveCatergories[move.category.toLowerCase()]}`}
                        alt={move.category}
                      />
                    </div>
                  </td>
                  <td className="py-2">{move.power ? move.power : "-"}</td>
                  <td className="py-2">
                    {move.accuracy ? move.accuracy : "-"}
                  </td>
                  <td className="py-2">{move.pp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TMMovesTable;

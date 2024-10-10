import React, { useState } from "react";
import { capitalizeWords } from "@/lib/utils";
import { ChevronUpDownIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ItemsTable = ({ itemsData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const sortedItems = [...itemsData].sort((a, b) => {
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
              className={`p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("name")}`}
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
              className={`p-3 bg-base-200 hover:bg-base-100 cursor-pointer ${getClassNamesFor("category")}`}
              onClick={() => requestSort("category")}
            >
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Category
                </span>
                <ChevronUpDownIcon className="size-4" />
              </div>
            </th>
            <th className="p-3 bg-base-200">
              <div className="flex items-center justify-between">
                <span className="uppercase text-left text-xs font-medium tracking-wider">
                  Effect
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, idx) => (
            <tr key={idx} className="hover:bg-base-100">
              <td className=" p-1">
                <div className="flex items-center">
                  {item.sprite ? (
                    <img
                      src={item.sprite}
                      alt={item.name}
                      className="w-10 h-10 rendering-pixelated"
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <NoSymbolIcon className="size-10 bg-base-100 opacity-10" />
                    </div>
                  )}
                  <Link
                    prefetch={false}
                    className="hover:text-blue-400 ml-2"
                    href={`/item/${item.name}`}
                  >
                    {capitalizeWords(item.name)}
                  </Link>
                </div>
              </td>
              <td className="">{capitalizeWords(item.category)}</td>
              <td className=" p-1">{item.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;

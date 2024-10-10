import React from "react";
import { capitalizeWords } from "@/lib/utils";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const ItemsGrid = ({ itemsData }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
      {itemsData.map((item) => (
        <Link
          prefetch={false}
          href={`/item/${item.name}`}
          key={item.url}
          className="cursor-pointer p-3 rounded-lg hover:bg-base-200"
        >
          {item.sprite ? (
            <img
              src={item.sprite}
              alt={item.name}
              className="w-20 h-20 mx-auto rendering-pixelated"
            />
          ) : (
            <div className="flex items-center justify-center">
              <NoSymbolIcon className="size-10 bg-base-100 opacity-10" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-center mt-2">
            {capitalizeWords(item.name)}
          </h2>
          <p className="text-center text-base-content/70">
            {capitalizeWords(item.category)}
          </p>
          <p className="text-center text-xs mt-1 text-base-content/50">
            {item.effect}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ItemsGrid;

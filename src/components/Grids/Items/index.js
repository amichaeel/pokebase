import React from 'react';
import { capitalizeWords } from '@/lib/utils';
import Link from 'next/link';

const ItemsGrid = ({ itemsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {itemsData.map((item) => (
        <Link href={`/item/${item.name}`} key={item.url} className="cursor-pointer p-4 rounded-lg hover:bg-zinc-200">
          <img src={item.sprite} alt={item.name} className="w-20 h-20 mx-auto rendering-pixelated" />
          <h2 className="text-xl font-semibold text-center mt-2">{capitalizeWords(item.name)}</h2>
          <p className="text-center text-gray-500">{capitalizeWords(item.category)}</p>
          <p className="text-center text-xs text-gray-500 mt-1">{item.effect}</p>
        </Link>
      ))}
    </div>
  );
}

export default ItemsGrid;

import React from 'react';
import { capitalizeWords } from '@/lib/utils';
import Link from 'next/link';

const ItemsTable = ({ itemsData }) => {
  return (
    <table className="w-full max-w-6xl divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sprite</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effect</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {itemsData.map((item) => (
          <tr key={item.url} className='hover:bg-zinc-200'>
            <td className="px-6 py-4">
              <img src={item.sprite} alt={item.name} className="w-10 h-10 rendering-pixelated" />
            </td>
            <td className="px-6 py-4">
              <Link className='hover:text-blue-400' href={`/item/${item.name}`}>{capitalizeWords(item.name)}</Link>
            </td>
            <td className="px-6 py-4">{capitalizeWords(item.category)}</td>
            <td className="px-6 py-4">{item.effect}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemsTable;

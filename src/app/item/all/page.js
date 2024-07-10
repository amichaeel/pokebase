"use client"

import React, { useEffect, useState, useMemo } from 'react';

import PikachuLoader from '@/components/Loaders/Pokeball';
import ItemsTable from '@/components/Tables/Items';
import ItemsGrid from '@/components/Grids/Items';
import { TableCellsIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const MasterItemsPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item/all');
        if (!response.ok) {
          throw new Error(`Error fetching items data: ${response.statusText}`);
        }
        const data = await response.json();
        setItemsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredItemsData = useMemo(() => {
    return itemsData.filter(item =>
      item.name.toLowerCase().includes(searchQuery)
    );
  }, [itemsData, searchQuery]);

  if (loading) {
    return <PikachuLoader />;
  }

  return (
    <div className='container mx-auto w-full max-w-6xl p-4'>
      <h1 className='text-3xl py-5 font-semibold'>The Complete Pokémon Items List</h1>
      <div className='flex flex-col bg-zinc-200 p-4 rounded-xl mb-10 space-y-3 text-zinc-700'>
        <span>This is a full list of every item in the Pokémon universe, along with their details.</span>
        <span>The table is searchable by using the controls above it.</span>
      </div>
      <div className="flex justify-between space-x-3 mb-4">
        <input
          type="text"
          placeholder="Search Items"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border w-96 border-gray-300 rounded"
        />
        <div className='flex items-center justify-center'>
          <button
            onClick={() => setView('table')}
            className={`mr-2 flex space-x-2 btn items-center justify-center ${view === 'table' ? 'btn-active' : 'bg-black/10 hover:bg-black/5'}`}
          >
            <TableCellsIcon className='size-6' />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`mr-2 flex space-x-2 btn items-center justify-center ${view === 'grid' ? 'btn-active' : 'bg-black/10 hover:bg-black/5'}`}
          >
            <Squares2X2Icon className='size-6' />
          </button>
        </div>
      </div>
      {view === 'table' ? (
        <ItemsTable itemsData={filteredItemsData} />
      ) : (
        <ItemsGrid itemsData={filteredItemsData} />
      )}
    </div>
  );
}

export default MasterItemsPage;

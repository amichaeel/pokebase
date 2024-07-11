"use client"

import React, { useEffect, useState, useMemo } from 'react';

import PikachuLoader from '@/components/Loaders/Pokeball';
import { TableCellsIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import MovesTable from '@/components/Tables/Moves/All';

const MasterMovesPage = () => {
  const [moveData, setMovesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch('/api/move/all');
        if (!response.ok) {
          throw new Error(`Error fetching moves data: ${response.statusText}`);
        }
        const data = await response.json();
        setMovesData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching moves:', error);
        setLoading(false);
      }
    };

    fetchMoves();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMovesData = useMemo(() => {
    return moveData.filter(move =>
      move.name.toLowerCase().includes(searchQuery)
    );
  }, [moveData, searchQuery]);

  if (loading) {
    return <PikachuLoader />;
  }

  return (
    <div className='container mx-auto w-full max-w-6xl p-4'>
      <h1 className='text-3xl py-5 font-semibold'>The Complete Pokémon Move List</h1>
      <div className='flex flex-col bg-zinc-200 p-4 rounded-xl mb-10 space-y-3 text-zinc-700'>
        <span>This is a full list of every move in the Pokémon universe, along with their details.</span>
        <span>The table is searchable by using the controls above it.</span>
        <div className='flex items-center gap-3'>
          <span>Category key:</span>
          <div id="categories" className='flex items-center gap-2'>
            <div className='flex items-center'>
              <img src="/move-physical.png" className='w-10' alt="move-physical" />
              <span>Physical</span>
            </div>
            <div className='flex items-center'>
              <img src="/move-special.png" className='w-10' alt="move-special" />
              <span>Special</span>
            </div>
            <div className='flex items-center'>
              <img src="/move-status.png" className='w-10' alt="move-status" />
              <span>Status</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-3 mb-4">
        <input
          type="text"
          placeholder="Search Moves"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border w-96 border-gray-300 focus:outline-none rounded"
        />
      </div>
      <MovesTable movesData={filteredMovesData} />
    </div>
  );
}

export default MasterMovesPage;

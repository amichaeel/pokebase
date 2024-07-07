"use client"

import React, { useEffect, useState, useMemo } from 'react';
import PikachuLoader from '@/components/Loaders/Pokeball';
import PokedexTable from '@/components/Tables/Pokedex';
import PokedexGrid from '@/components/Grids/Pokedex'; // New component for grid view

const MasterPokedexPage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pokedex/all');
        if (!response.ok) {
          throw new Error(`Error fetching Pokedex data: ${response.statusText}`);
        }
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokedex:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPokemonData = useMemo(() => {
    return pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );
  }, [pokemonData, searchQuery]);

  if (loading) {
    return <PikachuLoader />;
  }

  return (
    <div className='container mx-auto w-full max-w-6xl p-4'>
      <h1>The Complete Pokedex</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <div>
          <button
            onClick={() => setView('table')}
            className={`mr-2 ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Table View
          </button>
          <button
            onClick={() => setView('grid')}
            className={`${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Grid View
          </button>
        </div>
      </div>
      {view === 'table' ? (
        <PokedexTable pokemonData={filteredPokemonData} />
      ) : (
        <PokedexGrid pokemonData={filteredPokemonData} />
      )}
    </div>
  );
}

export default MasterPokedexPage;

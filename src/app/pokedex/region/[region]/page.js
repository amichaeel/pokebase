"use client"

import React, { useEffect, useState, useMemo } from 'react';
import PikachuLoader from '@/components/Loaders/Pokeball';
import PokedexTable from '@/components/Tables/Pokedex';
import PokedexGrid from '@/components/Grids/Pokedex';
import { TableCellsIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { capitalizeWords, pokedexMap } from '@/lib/utils';

const RegionalPokedexPage = ({ params }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pokedex/${params.region}`);
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
  }, [params.region]);

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
      <h1 className='text-3xl py-5 font-semibold'>The {capitalizeWords(params.region)} Pokédex</h1>
      <div className='flex flex-col bg-base-100 p-4 mb-10 space-y-3 rounded-xl'>
        <span>This is a list of every Pokémon in the {capitalizeWords(params.region)} region, along with their main stats.</span>
        <div>
          <span>This region is composed of the following games: </span>
          {pokedexMap[params.region].games.join(', ')}
        </div>
        <span>The table is sortable by clicking a column header, and searchable by using the controls above it.</span>
      </div>
      <div className="flex justify-between space-x-3 mb-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 w-96 rounded-xl focus:outline-none bg-base-100"
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
        <PokedexTable pokemonData={filteredPokemonData} />
      ) : (
        <PokedexGrid pokemonData={filteredPokemonData} />
      )}
    </div>
  );
}

export default RegionalPokedexPage;

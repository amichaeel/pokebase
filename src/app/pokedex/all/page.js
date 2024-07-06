"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PikachuLoader from '@/components/Loaders/Pokeball';
import PokemonTable from '@/components/Tables/Pokemon';
import PokemonList from '@/components/Lists/PokemonList';
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline';

import { openDB } from 'idb';

const DB_NAME = 'PokemonDB';
const STORE_NAME = 'pokemons';

const openDatabase = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
};

const PokedexAll = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '#', direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('table');
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await response.json();
        const promises = data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
        const pokemonDetails = await Promise.all(promises);

        setPokemonData(pokemonDetails);
        setFilteredData(pokemonDetails);

        const db = await openDatabase();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.put(pokemonDetails, 'allPokemons');
        await tx.done;
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    const loadCachedData = async () => {
      const db = await openDatabase();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const cachedData = await store.get('allPokemons');

      if (cachedData) {
        setPokemonData(cachedData);
        setFilteredData(cachedData);
      } else {
        fetchPokemonData();
      }
      setLoading(false);
    };

    loadCachedData();
  }, []);

  const sortedData = useMemo(() => {
    let sortedData = [...pokemonData];

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case '#':
            aValue = a.id;
            bValue = b.id;
            break;
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'total':
            aValue = a.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
            bValue = b.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
            break;
          case 'hp':
            aValue = a.stats[0].base_stat;
            bValue = b.stats[0].base_stat;
            break;
          case 'attack':
            aValue = a.stats[1].base_stat;
            bValue = b.stats[1].base_stat;
            break;
          case 'defense':
            aValue = a.stats[2].base_stat;
            bValue = b.stats[2].base_stat;
            break;
          case 'sp. atk':
            aValue = a.stats[3].base_stat;
            bValue = b.stats[3].base_stat;
            break;
          case 'sp. def':
            aValue = a.stats[4].base_stat;
            bValue = b.stats[4].base_stat;
            break;
          case 'speed':
            aValue = a.stats[5].base_stat;
            bValue = b.stats[5].base_stat;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedData;
  }, [pokemonData, sortConfig]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(sortedData);
    } else {
      setFilteredData(
        sortedData.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, sortedData]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCardClick = (name) => {
    router.push(`/pokedex/pokemon/${name}`);
  };

  if (loading) return (
    <div className='flex items-center justify-center w-full'>
      <PikachuLoader />
    </div>
  );

  return (
    <div className="container mx-auto w-full max-w-6xl p-4 bg-white">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="input input-primary focus:outline-none w-full max-w-xs"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-ghost hover:bg-black/10" onClick={() => setView(view === 'table' ? 'list' : 'table')}>
          {view === 'table' ? (
            <div className='flex items-center text-xs justify-center space-x-2'>
              <span>Switch to Grid View</span>
              <Squares2X2Icon className='size-6' />
            </div>
          ) : (
            <div className='flex items-center text-xs justify-center space-x-2'>
              <span>Switch to Table View</span>
              <TableCellsIcon className='size-6' />
            </div>
          )}
        </button>
      </div>
      {view === 'table' ? (
        <PokemonTable
          filteredData={filteredData}
          sortConfig={sortConfig}
          handleSort={handleSort}
          router={router}
        />
      ) : (
        <PokemonList pokemonData={filteredData} onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default PokedexAll;

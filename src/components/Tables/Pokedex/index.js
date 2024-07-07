import React, { useState, useMemo } from 'react';
import { ChevronUpDownIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import WideTypeIcon from '@/components/TypeIcon/Wide';
import { capitalizeWords } from '@/lib/utils';
import Link from 'next/link';

const PokedexTable = ({ pokemonData }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPokemonData = useMemo(() => {
    let sortableData = [...pokemonData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case 'id':
            aValue = a.id;
            bValue = b.id;
            break;
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'total':
            aValue = a.varieties[0].pokemon.data.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
            bValue = b.varieties[0].pokemon.data.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
            break;
          case 'hp':
            aValue = a.varieties[0].pokemon.data.stats[0].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[0].base_stat;
            break;
          case 'attack':
            aValue = a.varieties[0].pokemon.data.stats[1].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[1].base_stat;
            break;
          case 'defense':
            aValue = a.varieties[0].pokemon.data.stats[2].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[2].base_stat;
            break;
          case 'sp. atk':
            aValue = a.varieties[0].pokemon.data.stats[3].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[3].base_stat;
            break;
          case 'sp. def':
            aValue = a.varieties[0].pokemon.data.stats[4].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[4].base_stat;
            break;
          case 'speed':
            aValue = a.varieties[0].pokemon.data.stats[5].base_stat;
            bValue = b.varieties[0].pokemon.data.stats[5].base_stat;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [pokemonData, sortConfig]);

  return (
    <div className='w-full flex flex-col justify-center overflow-x-auto'>
      <table className='table max-w-6xl'>
        <thead>
          <tr className='hover:*:bg-black/10 hover:*:cursor-pointer'>
            <th className={`${sortConfig.key === 'id' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('id')}>
              <div className="flex justify-between items-center">
                <span>#</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'name' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('name')}>
              <div className="flex justify-between items-center">
                <span>Name</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th>Type</th>
            <th className={`${sortConfig.key === 'total' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('total')}>
              <div className="flex justify-between items-center">
                <span>Total</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'hp' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('hp')}>
              <div className="flex justify-between items-center">
                <span>HP</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'attack' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('attack')}>
              <div className="flex justify-between items-center">
                <span>Attack</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'defense' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('defense')}>
              <div className="flex justify-between items-center">
                <span>Defense</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'sp. atk' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('sp. atk')}>
              <div className="flex justify-between items-center">
                <span>Sp. Atk</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'sp. def' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('sp. def')}>
              <div className="flex justify-between items-center">
                <span>Sp. Def</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
            <th className={`${sortConfig.key === 'speed' ? 'bg-blue-100' : ''}`} onClick={() => handleSort('speed')}>
              <div className="flex justify-between items-center">
                <span>Speed</span>
                <ChevronUpDownIcon className='w-4 h-4' />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPokemonData.map((pokemon) => (
            <React.Fragment key={pokemon.id}>
              {pokemon.varieties.map((variety, vIndex) => (
                <tr key={vIndex} className='hover:bg-black/10'>
                  <td>{pokemon.id}</td>
                  <td className='flex items-center space-x-2'>
                    {variety.pokemon.data.sprites.front_default ? (
                      <img src={variety.pokemon.data.sprites.front_default} alt={pokemon.name} className='w-16 h-16 rendering-pixelated' />
                    ) : (
                      <NoSymbolIcon className='size-16 ' />
                    )}
                    <div className='flex flex-col'>
                      <Link className='hover:underline' href={`/pokedex/${pokemon.name}`}>
                        {capitalizeWords(pokemon.name)}
                      </Link>
                      {pokemon.name !== variety.pokemon.name && <span className='text-xs text-gray-500'>{capitalizeWords(variety.pokemon.name)}</span>}
                    </div>
                  </td>
                  <td className='space-y-1'>
                    {variety.pokemon.data.types.map((type) => (
                      <div key={type.type.name} className='mr-1'>
                        <WideTypeIcon type={type.type.name} />
                      </div>
                    ))}
                  </td>
                  <td>{variety.pokemon.data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</td>
                  <td>{variety.pokemon.data.stats[0].base_stat}</td>
                  <td>{variety.pokemon.data.stats[1].base_stat}</td>
                  <td>{variety.pokemon.data.stats[2].base_stat}</td>
                  <td>{variety.pokemon.data.stats[3].base_stat}</td>
                  <td>{variety.pokemon.data.stats[4].base_stat}</td>
                  <td>{variety.pokemon.data.stats[5].base_stat}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokedexTable;

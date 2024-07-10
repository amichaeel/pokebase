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

  const getClassNamesFor = (name) => {
    return sortConfig.key === name ? 'bg-blue-200' : '';
  };

  return (
    <div className='table-auto overflow-x-auto'>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('id')}`}
              onClick={() => handleSort('id')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>#</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('name')}`}
              onClick={() => handleSort('name')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Name</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th className="border-b border-gray-300 text-left text-xs font-medium uppercase tracking-wider p-3 bg-zinc-100">
              Type
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('total')}`}
              onClick={() => handleSort('total')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Total</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('hp')}`}
              onClick={() => handleSort('hp')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>HP</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('attack')}`}
              onClick={() => handleSort('attack')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Attack</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('defense')}`}
              onClick={() => handleSort('defense')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Defense</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('sp. atk')}`}
              onClick={() => handleSort('sp. atk')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Sp. Atk</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('sp. def')}`}
              onClick={() => handleSort('sp. def')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Sp. Def</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
            <th
              className={`border-b border-gray-300 p-3 bg-zinc-100 hover:bg-blue-200 cursor-pointer ${getClassNamesFor('speed')}`}
              onClick={() => handleSort('speed')}
            >
              <div className='flex justify-between'>
                <span className='uppercase text-left text-xs font-medium tracking-wider'>Speed</span>
                <ChevronUpDownIcon className='size-4' />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-300'>
          {sortedPokemonData.map((pokemon) => (
            <React.Fragment key={pokemon.id}>
              {pokemon.varieties.map((variety, vIndex) => (
                <tr key={vIndex} className='hover:bg-zinc-200'>
                  <td className="border-t border-gray-300">
                    <span className='flex justify-center'>{pokemon.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className='border-t border-gray-300'>
                    <div className='flex items-center space-x-2'>
                      {variety.pokemon.data.sprites.front_default ? (
                        <img src={variety.pokemon.data.sprites.front_default} alt={pokemon.name} className='w-10 h-10 rendering-pixelated' />
                      ) : (
                        <div className='flex items-center justify-center w-10 h-10'>
                          <NoSymbolIcon className='size-10 text-zinc-200' />
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <Link className='hover:text-blue-400' href={`/pokedex/${pokemon.name}`}>
                          {capitalizeWords(pokemon.name)}
                        </Link>
                        {pokemon.name !== variety.pokemon.name && <span className='text-xs text-gray-500'>{capitalizeWords(variety.pokemon.name)}</span>}
                      </div>
                    </div>
                  </td>
                  <td className='space-y-1 border-t border-gray-300 align-middle'>
                    {variety.pokemon.data.types.map((type) => (
                      <div key={type.type.name} className='mr-1'>
                        <WideTypeIcon type={type.type.name} />
                      </div>
                    ))}
                  </td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[0].base_stat}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[1].base_stat}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[2].base_stat}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[3].base_stat}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[4].base_stat}</td>
                  <td className="border-t border-gray-300 align-middle">{variety.pokemon.data.stats[5].base_stat}</td>
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

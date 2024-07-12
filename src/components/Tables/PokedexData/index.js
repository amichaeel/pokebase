import React from 'react';
import WideTypeIcon from '@/components/TypeIcon/Wide';
import { pokedexMap, capitalizeWords } from '@/lib/utils';

const PokedexDataTable = ({ pokemonData = {}, speciesData = {} }) => {
  if (!pokemonData || Object.keys(pokemonData).length === 0) {
    return <div>No Pokemon data available</div>;
  }
  const convertHeight = (decimeters) => {
    const meters = decimeters / 10;
    const totalInches = Math.round(meters * 39.3701);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return {
      meters: meters.toFixed(1),
      feet,
      inches: inches.toString().padStart(2, '0')
    };
  };

  const convertWeight = (hectograms) => {
    const kilograms = hectograms / 10;
    const pounds = (kilograms * 2.20462).toFixed(1);
    return {
      kilograms: kilograms.toFixed(1),
      pounds
    };
  };

  const processPokedexNumbers = (pokedexNumbers) => {
    const pokedexMapCopy = { ...pokedexMap };
    const gameMap = {};

    pokedexNumbers.forEach(({ entry_number, pokedex }) => {
      const { name } = pokedex;
      const games = pokedexMapCopy[name]?.games || [];

      if (!gameMap[entry_number]) {
        gameMap[entry_number] = [];
      }
      gameMap[entry_number].push(...games.map(capitalizeWords));
    });

    return Object.entries(gameMap).map(([index, games]) => ({
      index,
      games: Array.from(new Set(games)).join(', ')
    }));
  };


  const gameIndices = processPokedexNumbers(speciesData.pokedex_numbers);


  const { meters, feet, inches } = convertHeight(pokemonData.height);
  const { kilograms, pounds } = convertWeight(pokemonData.weight);

  return (
    <div className='w-full p-4 bg-black/5 rounded-3xl'>
      <h1 className="text-center font-bold text-2xl mb-4 text-white/90">Pokédex Data</h1>
      <table className="table-auto w-full text-white/90 text-left border-collapse">
        <tbody>
          <tr>
            <th className="py-2 text-right pr-4">National №</th>
            <td className="py-2 font-semibold">{speciesData.id.toString().padStart(4, '0')}</td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Type</th>
            <td className="py-2 flex space-x-1">
              {pokemonData.types.map((type) => (
                <WideTypeIcon key={type.slot} type={capitalizeWords(type.type.name)} />
              ))}
            </td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Species</th>
            <td className="py-2">{speciesData ? speciesData.genera.find(genus => genus.language.name === 'en').genus : 'Loading...'}</td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Height</th>
            <td className="py-2">{meters} m ({feet}′{inches}″)</td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Weight</th>
            <td className="py-2">{kilograms} kg ({pounds} lbs)</td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Abilities</th>
            <td className="py-2 flex flex-col space-y-1">
              {pokemonData.abilities.map((ability, index) => (
                <span key={index} className={ability.is_hidden ? 'text-white/70' : ''}>
                  {!ability.is_hidden && `${index + 1}. `} {capitalizeWords(ability.ability.name)} {ability.is_hidden && "(Hidden Ability)"}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th className="py-2 text-right pr-4">Local №</th>
            <td className="py-2 flex flex-col space-y-1">
              {gameIndices.map(({ index, games }) => {
                if (games.length > 0) {
                  return (
                    <div key={index} className="space-x-2 flex break-words">
                      <span className="font-semibold">{index.padStart(4, '0')}</span>
                      <span className="text-sm text-white/70">({games})</span>
                    </div>
                  )
                }
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
};

export default PokedexDataTable;

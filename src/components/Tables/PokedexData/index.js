import React from 'react';
import WideTypeIcon from '@/components/TypeIcon/Wide';

const PokedexDataTable = ({ pokemonData, speciesData }) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

  const processGameIndices = (gameIndices) => {
    const gameMap = {};

    gameIndices.forEach(({ game_index, version }) => {
      const { name } = version;
      if (!gameMap[game_index]) {
        gameMap[game_index] = [];
      }
      gameMap[game_index].push(capitalize(name.replace("-", " ")));
    });

    return Object.entries(gameMap).map(([index, games]) => ({
      index,
      games: games.join('/')
    }));
  };

  const { meters, feet, inches } = convertHeight(pokemonData.height);
  const { kilograms, pounds } = convertWeight(pokemonData.weight);
  const gameIndices = processGameIndices(pokemonData.game_indices);

  return (
    <div className='w-full p-4'>
      <h1 className="text-center font-bold text-2xl mb-4">Pokédex Data</h1>
      <table className="w-full text-left">
        <tbody className='*:border-t *:border-white/30'>
          <tr>
            <th className="py-2">National №</th>
            <td className="py-2">{pokemonData.id.toString().padStart(4, '0')}</td>
          </tr>
          <tr>
            <th className="py-2">Type</th>
            <td className="py-2 flex space-x-1">
              {pokemonData.types.map((type) => (
                <WideTypeIcon key={type.slot} type={capitalize(type.type.name)} />
              ))}
            </td>
          </tr>
          <tr>
            <th className="py-2">Species</th>
            <td className="py-2">{speciesData ? speciesData.genera.find(genus => genus.language.name === 'en').genus : 'Loading...'}</td>
          </tr>
          <tr>
            <th className="py-2">Height</th>
            <td className="py-2">{meters} m ({feet}′{inches}″)</td>
          </tr>
          <tr>
            <th className="py-2">Weight</th>
            <td className="py-2">{kilograms} kg ({pounds} lbs)</td>
          </tr>
          <tr>
            <th className="py-2">Abilities</th>
            <td className="py-2 flex flex-col space-y-1">
              {pokemonData.abilities.map((ability, index) => (
                <span key={index} className={ability.is_hidden ? 'text-white/60' : ''}>
                  {capitalize(ability.ability.name)} {ability.is_hidden && "(Hidden Ability)"}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th className="py-2">Local №</th>
            <td className="py-2 flex flex-col space-y-1 break-all">
              {gameIndices.map(({ index, games }) => (
                <span key={index} className="space-x-2">
                  <span className="font-semibold">{index.padStart(4, '0')}</span>
                  <span className="text-sm text-white/60">({games})</span>
                </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokedexDataTable;

import React from 'react';
import WideTypeIcon from '@/components/TypeIcon/Wide';

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="p-4 w-1/5">
      <div className="flex flex-col items-center bg-white rounded-lg hover:bg-black/10 p-4 hover:cursor-pointer" onClick={onClick}>
        <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} className="w-36 h-36 mb-2" />
        <span className="font-bold">{`#${pokemon.id.toString().padStart(4, '0')}`}</span>
        <span className="text-lg mb-2">{pokemon.species.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
        <div className="flex space-x-2">
          {pokemon.types.map((typeInfo) => (
            <WideTypeIcon key={typeInfo.type.name} type={typeInfo.type.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

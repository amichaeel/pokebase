import React from 'react';
import PokemonCard from '@/components/Cards/Pokemon';

const PokemonList = ({ pokemonData, onCardClick }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => onCardClick(pokemon.name)} />
      ))}
    </div>
  );
};

export default PokemonList;

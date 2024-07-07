import React from 'react';
import PokemonCard from '@/components/Cards/Pokemon';

const PokedexGrid = ({ pokemonData }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {pokemonData.map((pokemon) =>
        pokemon.varieties.map(variety => {
          const pokemonInfo = {
            name: pokemon.name,
            id: pokemon.id,
            data: variety
          }
          return (
            <div key={`${pokemon.id}-${variety.pokemon.name}`}>
              <PokemonCard pokemon={pokemonInfo} />
            </div>
          )
        })
      )}
    </div>
  );
}

export default PokedexGrid;

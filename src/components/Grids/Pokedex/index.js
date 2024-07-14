import React from 'react';
import PokemonCard from '@/components/Cards/Pokemon';

const PokedexGrid = ({ pokemonData }) => {
  const sortedPokemonData = pokemonData.sort((a, b) => a.id - b.id)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sortedPokemonData.map((pokemon) =>
        pokemon.varieties.map(variety => {
          const pokemonInfo = {
            name: pokemon.species_name,
            id: pokemon.id,
            data: variety
          }
          return (
            <div key={`${pokemon.id}-${pokemonInfo.name}`}>
              <PokemonCard pokemon={pokemonInfo} />
            </div>
          )
        })
      )}
    </div>
  );
}

export default PokedexGrid;

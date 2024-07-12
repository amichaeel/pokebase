import React, { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import WideTypeIcon from '@/components/TypeIcon/Wide';
import { useRouter } from 'next/navigation';

const EvolutionChart = ({ speciesData }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await fetch(speciesData.evolution_chain.url);
        const data = await response.json();
        setEvolutionChain(data.chain);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
      }
    };

    fetchEvolutionChain();
  }, [speciesData.evolution_chain.url]);

  useEffect(() => {
    const fetchPokemonDetails = async (chain) => {
      if (!chain) return;

      const speciesName = chain.species.name;

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
        const data = await response.json();
        setPokemonDetails(prevDetails => ({
          ...prevDetails,
          [speciesName]: {
            image: data.sprites.other.home.front_default,
            types: data.types.map(typeInfo => typeInfo.type.name)
          }
        }));
      } catch (error) {
        console.error(`Error fetching details for ${speciesName}:`, error);
      }

      for (const evolution of chain.evolves_to) {
        await fetchPokemonDetails(evolution);
      }
    };

    if (evolutionChain) {
      fetchPokemonDetails(evolutionChain);
    }
  }, [evolutionChain]);

  const renderEvolution = (chain) => {
    if (!chain) return null;

    const speciesName = chain.species.name;
    const speciesUrl = chain.species.url;
    const speciesId = speciesUrl.split('/')[speciesUrl.split('/').length - 2];

    return (
      <div className="evolution-stage flex">
        <div className="pokemon flex items-center">
          <div onClick={() => router.push(`/pokedex/${speciesName}`)} className="p-2 pokemon-info text-center flex flex-col items-center justify-center hover:bg-base-100 hover:cursor-pointer rounded-lg">
            <img className="pokemon-img" height={'100px'} width={'100px'} src={pokemonDetails[speciesName]?.image} alt={speciesName} />
            <div className='py-2'>
              <p className='text-xs text-base-content/50'>{`#${speciesId.toString().padStart(4, '0')}`}</p>
              <p className='font-semibold'>{`${speciesName.charAt(0).toUpperCase() + speciesName.slice(1)}`}</p>
            </div>
            <div className="pokemon-types flex space-x-2">
              {pokemonDetails[speciesName]?.types.map(type => (
                <WideTypeIcon key={type} type={type} />
              ))}
            </div>
          </div>
          {chain.evolves_to.length > 0 && (
            <div className="evolution-details flex flex-col items-center space-y-4">
              {chain.evolves_to.map((evolution) => (
                <div key={evolution.species.name} className="flex items-center">
                  <div className="flex flex-col w-52 items-center justify-center">
                    <ArrowLongRightIcon className='w-6 h-6' />
                    <p className="evolution-method mx-4">{renderEvolutionDetails(evolution.evolution_details)}</p>
                  </div>
                  {renderEvolution(evolution)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEvolutionDetails = (detailsArray) => {
    return detailsArray.map((details, index) => {
      if (!details) return null;
      if (details.trigger.name === 'level-up') {
        if (details.min_happiness) {
          return `(High Friendship)`;
        }
        if (details.min_level) {
          return `(Level ${details.min_level})`;
        }
      }
      if (details.trigger.name === 'use-item' && details.item) {
        return `(use ${details.item.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')})`;
      }
      if (details.trigger.name === 'trade') {
        if (details.held_item) {
          return `(trade holding ${details.held_item.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}}`;
        }
        return `Trade`;
      }
      return '';
    }).filter(Boolean).join(' or ');
  };

  if (!evolutionChain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="evolution-chart-container flex md:!justify-center overflow-x-auto">
      <div className="evolution-chart flex flex-nowrap justify-start text-center text-sm items-center p-6 rounded-lg">
        {renderEvolution(evolutionChain)}
      </div>
    </div>
  );
};

export default EvolutionChart;

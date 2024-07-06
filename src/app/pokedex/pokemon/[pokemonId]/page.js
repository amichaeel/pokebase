"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

import BaseStatsTable from '@/components/Tables/BaseStats';
import PokedexDataTable from '@/components/Tables/PokedexData';
import TrainingTable from '@/components/Tables/Training';
import BreedingTable from '@/components/Tables/Breeding';
import EvolutionChart from '@/components/Charts/Evolution';
import PikachuLoader from '@/components/Loaders/Pokeball';
import Error from '@/components/Errors';
import LevelUpMovesTable from '@/components/Tables/Moves/LevelUp';
import TMMovesTable from '@/components/Tables/Moves/TM';
import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import EggMovesTable from '@/components/Tables/Moves/Egg';
import HMMovesTable from '@/components/Tables/Moves/HM';
import TutorMovesTable from '@/components/Tables/Moves/Tutor';
import FormChangeMovesTable from '@/components/Tables/Moves/FormChange';
import SpritesOverviewTable from '@/components/Tables/Sprites/Overview';

export default function PokemonPage({ params }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState('');
  const [nextPokemon, setNextPokemon] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const fetchPokemonAndSpeciesData = async (pokemonId) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found!');
      }
      const data = await response.json();
      setPokemonData(data);

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      setSpeciesData(speciesData);
      return data.id;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPreviousAndNextPokemon = async (index) => {
    const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const maxPokemonId = 1025;

    const fetchPokemon = async (pokemonIndex) => {
      try {
        const response = await fetch(`${API_BASE_URL}${pokemonIndex}`);
        if (!response.ok) {
          throw new Error('Pokemon not found!');
        }
        const data = await response.json();
        return capitalize(data.name);
      } catch (error) {
        console.error(`Error fetching Pokémon with index ${pokemonIndex}:`, error.message);
        return null;
      }
    };

    if (index > 1) {
      const previous = await fetchPokemon(index - 1);
      setPreviousPokemon(previous);
    }

    if (index < maxPokemonId) {
      const next = await fetchPokemon(index + 1);
      setNextPokemon(next);
    }
  };

  const typeGradients = {
    normal: 'linear-gradient(to bottom, rgba(156, 163, 175, 0.6), rgba(107, 114, 128, 0.9))', // gray
    fire: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.6), rgba(220, 38, 38, 0.9))', // red
    water: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.9))', // blue
    electric: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), rgba(234, 179, 8, 0.9))', // yellow
    grass: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.6), rgba(22, 163, 74, 0.9))', // green
    ice: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.6), rgba(125, 211, 252, 0.9))', // blue
    fighting: 'linear-gradient(to bottom, rgba(185, 28, 28, 0.6), rgba(153, 27, 27, 0.9))', // red
    poison: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.9))', // purple
    ground: 'linear-gradient(to bottom, rgba(202, 138, 4, 0.6), rgba(163, 88, 5, 0.9))', // yellow
    flying: 'linear-gradient(to bottom, rgba(129, 140, 248, 0.6), rgba(99, 102, 241, 0.9))', // indigo
    psychic: 'linear-gradient(to bottom, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.9))', // pink
    bug: 'linear-gradient(to bottom, rgba(52, 211, 153, 0.6), rgba(16, 185, 129, 0.9))', // green
    rock: 'linear-gradient(to bottom, rgba(120, 113, 108, 0.6), rgba(75, 85, 99, 0.9))', // yellow
    ghost: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.9))', // indigo
    dragon: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.6), rgba(124, 58, 237, 0.9))', // purple
    dark: 'linear-gradient(to bottom, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.9))', // gray
    steel: 'linear-gradient(to bottom, rgba(107, 114, 128, 0.6), rgba(75, 85, 99, 0.9))', // gray
    fairy: 'linear-gradient(to bottom, rgba(232, 121, 249, 0.6), rgba(217, 70, 239, 0.9))', // pink
  };

  useEffect(() => {
    if (!params.pokemonId) return;

    const fetchData = async () => {
      const pokemonId = await fetchPokemonAndSpeciesData(params.pokemonId);
      if (pokemonId) {
        await getPreviousAndNextPokemon(pokemonId);
      }
    };

    fetchData();
  }, [params.pokemonId]);

  const playCry = async () => {
    if (!pokemonData) return;

    try {
      const cryUrl = `https://pokemoncries.com/cries/${pokemonData.id}.mp3`;
      const audio = new Audio(cryUrl);
      await audio.play();
    } catch (error) {
      console.error('Error playing Pokémon cry:', error);
    }
  };

  if (loading) return (
    <div>
      <PikachuLoader />
    </div>
  );

  if (error) return (
    <div>
      <Error message={error} />
    </div>
  );

  if (!pokemonData) return (
    <div>
      <Error message={"Pokemon not found!"} />
    </div>
  );

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col w-full max-w-6xl'>
        <div className={`flex flex-col text-white w-full rounded-b-3xl items-center justify-between`} style={{ background: typeGradients[pokemonData.types[0].type.name] }}>
          <div id="pokemon-navigation" className='flex px-12 w-full justify-between'>
            <div className='flex h-full my-0 -m-12'>
              <Link legacyBehavior={true} href={`/pokedex/pokemon/${previousPokemon}`}>
                <a className='flex items-center h-full w-full px-4 rounded-br-3xl hover:bg-white/10'>
                  {previousPokemon && (
                    <>
                      <ChevronLeftIcon className='w-5 h-5 mr-2' />
                      {previousPokemon.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                    </>
                  )}
                </a>
              </Link>
            </div>
            <div className='text-4xl text-shadow-sm py-2 font-semibold'>
              {pokemonData.name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <div className='flex h-full my-0 -m-12'>
              <Link legacyBehavior={true} href={`/pokedex/pokemon/${nextPokemon}`}>
                <a className='flex items-center h-full w-full px-4 rounded-bl-3xl hover:bg-white/10'>
                  {nextPokemon && (
                    <>
                      {nextPokemon.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                      <ChevronRightIcon className='w-5 h-5 ml-2' />
                    </>
                  )}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row justify-between items-center rounded-b-3xl">
            <div
              className="relative w-full md:w-1/2 flex justify-center mb-4 rounded-3xl md:mb-0 transition-all hover:scale-102"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={pokemonData.sprites.other['official-artwork'].front_default}
                alt={pokemonData.name}
                className={`h-96 transition-all`}
              />
              {hovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SpeakerWaveIcon onClick={playCry} className="w-20 h-20 p-6 transition-all bg-white/40 hover:bg-white/70 rounded-full text-gray-700 cursor-pointer" />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <PokedexDataTable pokemonData={pokemonData} speciesData={speciesData} />
            </div>
          </div>
        </div>
        <div>
          <BaseStatsTable pokemonData={pokemonData} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <TrainingTable pokemonData={pokemonData} speciesData={speciesData} />
          <BreedingTable speciesData={speciesData} />
        </div>

        <div>
          <h1 className="font-bold text-2xl pl-4">Evolution Chart</h1>
          <EvolutionChart speciesData={speciesData} pokemonData={pokemonData} />
        </div>

        <div className='flex w-full lg:flex-row flex-col'>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Leveling Up</h2>
            <div className="scrollable-container">
              <LevelUpMovesTable pokemonData={pokemonData} />
            </div>
          </div>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by TM</h2>
            <div className="scrollable-container">
              <TMMovesTable pokemonData={pokemonData} />
            </div>
          </div>
        </div>

        <div className='flex w-full lg:flex-row flex-col'>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Egg</h2>
            <div className="scrollable-container">
              <EggMovesTable pokemonData={pokemonData} />
            </div>
          </div>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by HM</h2>
            <div className="scrollable-container">
              <HMMovesTable pokemonData={pokemonData} />
            </div>
          </div>
        </div>

        <div className='flex w-full lg:flex-row flex-col'>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Tutor</h2>
            <div className="scrollable-container">
              <TutorMovesTable pokemonData={pokemonData} />
            </div>
          </div>
          <div className="w-full border">
            <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Form Change</h2>
            <div className="scrollable-container">
              <FormChangeMovesTable pokemonData={pokemonData} />
            </div>
          </div>
        </div>

        <div>
          <SpritesOverviewTable pokemonData={pokemonData} />
        </div>

      </div>
    </div>
  );
}

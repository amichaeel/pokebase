"use client";

import React, { useEffect, useState, useRef } from 'react';

import BaseStatsTable from '@/components/Tables/BaseStats';
import PokedexDataTable from '@/components/Tables/PokedexData';
import TrainingTable from '@/components/Tables/Training';
import BreedingTable from '@/components/Tables/Breeding';
import EvolutionChart from '@/components/Charts/Evolution';
import PikachuLoader from '@/components/Loaders/Pokeball';
import PokemonPageNavigator from '@/components/Navigation/Pokemon';
import Error from '@/components/Errors';
import LevelUpMovesTable from '@/components/Tables/Moves/LevelUp';
import TMMovesTable from '@/components/Tables/Moves/TM';
import { ChevronRightIcon, ChevronLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import EggMovesTable from '@/components/Tables/Moves/Egg';
import HMMovesTable from '@/components/Tables/Moves/HM';
import TutorMovesTable from '@/components/Tables/Moves/Tutor';
import FormChangeMovesTable from '@/components/Tables/Moves/FormChange';
import SpritesOverviewTable from '@/components/Tables/Sprites/Overview';
import Link from 'next/link';

import { capitalizeWords, typeGradients } from '@/lib/utils';

export default function PokemonPage({ params }) {
  const [speciesData, setSpeciesData] = useState({});
  const [selectedPokemonData, setSelectedPokemonData] = useState({});
  const [navigation, setNavigation] = useState([]);
  const [defaultPokemonData, setDefaultPokemonData] = useState({});
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  const playCry = async () => {
    if (!defaultPokemonData) return;

    try {
      const cryUrl = `https://pokemoncries.com/cries/${defaultPokemonData.id}.mp3`;
      const audio = new Audio(cryUrl);
      await audio.play();
    } catch (error) {
      console.error('Error playing Pokémon cry:', error);
    }
  };

  useEffect(() => {
    const fetchSpeciesData = async (url) => {
      const speciesCall = await fetch(url);
      const speciesObj = await speciesCall.json();
      setSpeciesData(speciesObj);
    }

    const identifySpecies = async (species) => {
      try {
        const pokedexCall = await fetch('https://pokeapi.co/api/v2/pokedex/1');
        const pokedex = await pokedexCall.json();
        const matchIndex = pokedex.pokemon_entries.findIndex(entry => entry.pokemon_species.name === species.toLowerCase() || entry.entry_number == species);
        const match = pokedex.pokemon_entries[matchIndex] || {};

        if (Object.keys(match).length > 0) {
          await fetchSpeciesData(match.pokemon_species.url);

          const prevAndNext = {
            prev: null,
            next: null
          }

          if (matchIndex > 0) {
            prevAndNext.prev = pokedex.pokemon_entries[matchIndex - 1];
          }
          if (matchIndex < pokedex.pokemon_entries.length - 1) {
            prevAndNext.next = pokedex.pokemon_entries[matchIndex + 1];
          }
          setNavigation(prevAndNext)
        } else {
          setError("Pokemon not found!")
          setLoading(false)
        }
      } catch (error) {
        console.error('Error: ', error);
        setError('Failed to fetch species data');
        setLoading(false)
      }
    }

    identifySpecies(params.pokemonId);
  }, [params.pokemonId]);

  useEffect(() => {
    const fetchPokemonData = async (url, isDefault) => {
      const pokemonCall = await fetch(url);
      const pokemonObj = await pokemonCall.json();
      setAllPokemonData((prevData) => {
        const alreadyExists = prevData.some(pokemon => pokemon.id === pokemonObj.id);
        if (alreadyExists) {
          return prevData;
        }
        const newData = [...prevData, pokemonObj];
        newData.sort((a, b) => a.id - b.id);
        return newData;
      });
      if (isDefault) {
        setDefaultPokemonData(pokemonObj);
        setSelectedPokemonData(pokemonObj);
      }
    }

    if (speciesData.varieties) {
      setAllPokemonData([]);
      speciesData.varieties.forEach(variety => {
        fetchPokemonData(variety.pokemon.url, variety.is_default);
      });
    }

  }, [speciesData]);

  useEffect(() => {
    if (Object.keys(selectedPokemonData).length > 0) {
      setLoading(false)
    }
  }, [selectedPokemonData]);

  if (error) return (
    <div>
      <Error message={error} />
    </div>
  );

  if (loading) {
    return (
      <PikachuLoader />
    )
  }

  return (
    <div className='flex w-full justify-center'>
      <div className='flex space-y-6 flex-col w-full max-w-6xl'>

        <div className={`flex flex-col text-white w-full lg:rounded-b-3xl rounded-none items-center justify-between`} style={{ background: typeGradients[selectedPokemonData.types[0].type.name] }}>
          <div className='pb-4 grid grid-cols-3 w-full'>
            <div className='w-full flex items-center justify-start'>
              {navigation.prev && (
                <Link href={`/pokedex/${navigation.prev.pokemon_species.name}`} className='hover:bg-black/10 h-full py-4 pr-6 flex items-center rounded-br-3xl cursor-pointer'>
                  <ChevronLeftIcon className='w-5 h-5 ml-2' />
                  {capitalizeWords(navigation.prev.pokemon_species.name)}
                </Link>
              )}
            </div>
            <div className='flex col-span-1 w-full justify-center'>
              <h1 className='md:text-4xl text-2xl py-3 w-full font-bold text-center'>{capitalizeWords(defaultPokemonData.name)}</h1>
            </div>
            <div className='w-full flex items-center justify-end'>
              {navigation.next && (
                <Link href={`/pokedex/${navigation.next.pokemon_species.name}`} className='hover:bg-black/10 h-full py-4 pl-6 flex items-center rounded-bl-3xl cursor-pointer'>
                  {capitalizeWords(navigation.next.pokemon_species.name)}
                  <ChevronRightIcon className='w-5 h-5 ml-2' />
                </Link>
              )}
            </div>
          </div>

          <div role="tablist" className="tabs flex gap-y-1 *:transition-all flex-wrap w-full">
            {Object.keys(allPokemonData).length > 1 && allPokemonData.map((pokemon, index) => {
              return (
                <a
                  onClick={() => setSelectedPokemonData(allPokemonData[index])}
                  key={index}
                  role="tab"
                  className={`tab flex flex-grow bg-black/10 hover:bg-black/15 break-words ${selectedPokemonData.name === pokemon.name ? 'tab-active !bg-black/20' : ''}`}
                >
                  {capitalizeWords(pokemon.name)}
                </a>
              );
            })}
          </div>

          <div className='p-4 w-full items-center justify-center flex md:flex-row flex-col'>
            <div className='relative h-full w-full flex items-center justify-center' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <img
                src={selectedPokemonData.sprites.other['official-artwork'].front_default}
                alt={selectedPokemonData.name}
                className='w-96 h-96 object-contain rendering-auto'
              />
              {hovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SpeakerWaveIcon onClick={playCry} className="w-20 h-20 p-6 transition-all bg-white/40 hover:bg-white/70 rounded-full text-gray-700 cursor-pointer" />
                </div>
              )}
            </div>

            <PokedexDataTable pokemonData={selectedPokemonData} speciesData={speciesData} />
          </div>
        </div>

        <div className='sticky top-12 z-30'>
          <PokemonPageNavigator />
        </div>

        <div id="base-stats">
          <BaseStatsTable pokemonData={selectedPokemonData} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div id="training" className='w-full'>
            <TrainingTable pokemonData={selectedPokemonData} speciesData={speciesData} />
          </div>
          <div id="breeding" className='w-full'>
            <BreedingTable speciesData={speciesData} />
          </div>
        </div>

        <div id="evolution-tree">
          <h1 className="font-bold text-2xl pl-4">Evolution Tree</h1>
          <EvolutionChart speciesData={speciesData} pokemonData={selectedPokemonData} />
        </div>

        <div id="moves" className='px-4'>
          <div className='flex w-full lg:flex-row flex-col'>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Leveling Up</h2>
              <div className="scrollable-container">
                <LevelUpMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by TM</h2>
              <div className="scrollable-container">
                <TMMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
          </div>

          <div className='flex w-full lg:flex-row flex-col'>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Egg</h2>
              <div className="scrollable-container">
                <EggMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by HM</h2>
              <div className="scrollable-container">
                <HMMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
          </div>

          <div className='flex w-full lg:flex-row flex-col'>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Tutor</h2>
              <div className="scrollable-container">
                <TutorMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
            <div className="w-full border">
              <h2 className="font-bold text-2xl my-4 text-center">Moves Learned by Form Change</h2>
              <div className="scrollable-container">
                <FormChangeMovesTable pokemonData={selectedPokemonData} />
              </div>
            </div>
          </div>
        </div>

        <div id="sprites" className='overflow-x-auto'>
          <SpritesOverviewTable pokemonData={selectedPokemonData} />
        </div>

      </div>
    </div>
  );
}

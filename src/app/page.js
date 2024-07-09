"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { types, capitalizeWords } from "@/lib/utils";
import WideTypeIcon from "@/components/TypeIcon/Wide";

const fetchNationalPokedex = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokedex/1/');
  if (!response.ok) {
    throw new Error('Failed to fetch National Pokédex');
  }
  const data = await response.json();
  return data.pokemon_entries;
};

const fetchPokemonDetails = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
};

const getRandomPokemonOfTheDay = async () => {
  const pokemonEntries = await fetchNationalPokedex();
  const randomIndex = Math.floor(Math.random() * pokemonEntries.length);
  const randomPokemon = pokemonEntries[randomIndex];
  const pokemonDetails = await fetchPokemonDetails(randomPokemon.pokemon_species.url.replace('pokemon-species', 'pokemon'));
  return {
    name: pokemonDetails.name,
    sprite: pokemonDetails.sprites.other['official-artwork'].front_default,
    id: pokemonDetails.id,
    stats: pokemonDetails.stats,
    types: pokemonDetails.types
  };
};

const setPokemonOfTheDay = (pokemon) => {
  const today = new Date().toDateString();
  localStorage.setItem('pokemonOfTheDay', JSON.stringify({ ...pokemon, date: today }));
};

const getPokemonOfTheDay = () => {
  const pokemonData = localStorage.getItem('pokemonOfTheDay');
  if (!pokemonData) return null;
  const parsedData = JSON.parse(pokemonData);
  if (parsedData.date !== new Date().toDateString()) return null;
  return parsedData;
};

export default function Home() {
  const router = useRouter();
  const [pokemonOfTheDay, setPokemonOfTheDayState] = useState(null);

  useEffect(() => {
    const loadPokemonOfTheDay = async () => {
      const cachedPokemon = getPokemonOfTheDay();
      if (cachedPokemon) {
        setPokemonOfTheDayState(cachedPokemon);
      } else {
        const newPokemon = await getRandomPokemonOfTheDay();
        setPokemonOfTheDayState(newPokemon);
        setPokemonOfTheDay(newPokemon);
      }
    };

    loadPokemonOfTheDay();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 mb-8">
        <div className="flex flex-col justify-center bg-gray-200 p-3 mb-3 rounded-3xl">
          <h1 className="text-4xl font-bold text-center">PokéBase</h1>
          <p className="text-sm text-black/40 text-center">
            PokéBase is under construction and will have limited functionality available for public use. Access to beta features are limited.
          </p>
        </div>
        <div className="flex bg-gray-200 rounded-3xl flex-col md:flex-row justify-around items-center mb-8">
          <div className="w-full flex items-center justify-center md:w-1/3 p-4">
            <div>
              <h1 className="text-xl mb-2 font-semibold">Quick Links</h1>
              <ul className="grid grid-cols-2 gap-1">
                <li><Link className="text-sm hover:text-blue-500" href="/pokedex/all">National Pokédex</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Pokémon Stats</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Type Chart</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Shiny Pokemon</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Interactive Map</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Evolution Chains</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Moves</Link></li>
              </ul>
              <div className="grid lg:grid-cols-4 grid-cols-3 gap-1 py-4">
                {types.map(type => {
                  return (
                    <WideTypeIcon type={type} key={type} />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4">
            <div className="flex flex-col items-center justify-around space-y-4">
              <Link
                className="btn btn-square hover:bg-black/10 w-full"
                href='/pokedex/all'
              >
                Explore Pokédex
              </Link>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Game Mechanics
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Breeding
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Pokémon Games
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Community
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-6xl flex-col justify-center bg-gray-200 p-3 mb-3 rounded-3xl">
            <h1 className="text-4xl font-bold text-center">Your Pokémon of the Day</h1>
            {pokemonOfTheDay && (
              <div className="flex md:flex-row gap-2 rounded-3xl flex-col items-center justify-center mt-4">
                <div onClick={() => router.push(`/pokedex/${pokemonOfTheDay.name}`)} className="flex flex-col items-center justify-center w-full p-3 cursor-pointer transition-all hover:bg-black/10 rounded-3xl ">
                  <img
                    src={pokemonOfTheDay.sprite}
                    alt={pokemonOfTheDay.name}
                    width={150}
                    height={150}
                  />
                  <h2 className="text-2xl font-semibold">{capitalizeWords(pokemonOfTheDay.name)}</h2>
                  <div className="flex space-x-2 mt-2">
                    {pokemonOfTheDay.types.map(type => (
                      <WideTypeIcon type={type.type.name} key={type.type.name} />
                    ))}
                  </div>
                </div>
                <div className="mt-4 w-full p-5">
                  <h3 className="text-xl font-semibold mb-2">Stats</h3>
                  <ul className="text-left">
                    {pokemonOfTheDay.stats.map((stat, index) => (
                      <li key={index} className="flex justify-between mb-1">
                        <span>{capitalizeWords(stat.stat.name)}:</span>
                        <span>{stat.base_stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-black/40 text-center mb-6">
          Powered by PokéAPI
        </p>
      </div>
    </main>
  );
}

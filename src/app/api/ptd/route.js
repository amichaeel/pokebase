import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'public', 'pokemonOfTheDay.json');

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
    name: pokemonDetails.species.name,
    sprite: pokemonDetails.sprites.other['official-artwork'].front_default,
    id: pokemonDetails.id,
    stats: pokemonDetails.stats,
    types: pokemonDetails.types
  };
};

export async function GET() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];


  let cachedPokemon;

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    cachedPokemon = JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading the file, new Pokémon being fetched!');
    cachedPokemon = null;
  }

  if (!cachedPokemon || cachedPokemon.date !== today) {
    const newPokemon = await getRandomPokemonOfTheDay();
    cachedPokemon = { ...newPokemon, date: today };

    try {
      fs.writeFileSync(filePath, JSON.stringify(cachedPokemon, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to the file:', error);
    }
  }

  return NextResponse.json(cachedPokemon);
}


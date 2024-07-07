// src/app/api/pokedex/route.js

const fetchPokemonEntry = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching Pokémon entry: ${response.statusText}`);
  }
  const data = await response.json();
  return data.varieties;
}

const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching Pokémon details: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    types: data.types,
    stats: data.stats,
    sprites: data.sprites
  };
}

export const GET = async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    if (!response.ok) {
      throw new Error(`Error fetching Pokedex: ${response.statusText}`);
    }
    const data = await response.json();
    const pokemonEntries = data.pokemon_entries;

    const concurrencyLimit = 500;
    const delay = 1000;
    let index = 0;
    let allPokemonData = [];

    const fetchBatches = async () => {
      while (index < pokemonEntries.length) {
        const batch = pokemonEntries.slice(index, index + concurrencyLimit);
        const promises = batch.map(async (entry) => {
          const varieties = await fetchPokemonEntry(entry.pokemon_species.url);
          const varietyDetails = await Promise.all(varieties.map(async (variety) => {
            const details = await fetchPokemonDetails(variety.pokemon.url);
            return {
              ...variety,
              pokemon: {
                ...variety.pokemon,
                data: details,
              },
            };
          }));
          return {
            name: entry.pokemon_species.name,
            id: entry.entry_number,
            varieties: varietyDetails,
          };
        });

        const results = await Promise.all(promises);
        allPokemonData = [...allPokemonData, ...results];

        index += concurrencyLimit;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    await fetchBatches();

    return new Response(JSON.stringify(allPokemonData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Pokedex:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Pokedex data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const regionMap = {
  "national": 1,
  "kanto": 2,
  "original-johto": 3,
  "hoenn": 4,
  "original-sinnoh": 5,
  "extended-sinnoh": 6,
  "updated-johto": 7,
  "original-unova": 8,
  "updated-unova": 9,
  "conquest-gallery": 11,
  "kalos-central": 12,
  "kalos-coastal": 13,
  "kalos-mountain": 14,
  "updated-hoenn": 15,
  "original-alola": 16,
  "original-melemele": 17,
  "original-akala": 18,
  "original-ulaula": 19,
  "original-poni": 20,
  "updated-alola": 21
};

const fetchPokemonEntry = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching Pokémon entry: ${response.statusText}`);
  }
  const data = await response.json();
  return data.varieties.filter(variety => variety.is_default);
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
    // Extract the region from the request URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const regionName = url.pathname.split('/').pop();
    const region = regionMap[regionName];

    if (!region) {
      return new Response(JSON.stringify({ error: 'Invalid region' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
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
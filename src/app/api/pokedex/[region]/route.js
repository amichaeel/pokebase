// const regionMap = {
//   "national": 1,
//   "kanto": 2,
//   "original-johto": 3,
//   "hoenn": 4,
//   "original-sinnoh": 5,
//   "extended-sinnoh": 6,
//   "updated-johto": 7,
//   "original-unova": 8,
//   "updated-unova": 9,
//   "conquest-gallery": 11,
//   "kalos-central": 12,
//   "kalos-coastal": 13,
//   "kalos-mountain": 14,
//   "updated-hoenn": 15,
//   "original-alola": 16,
//   "original-melemele": 17,
//   "original-akala": 18,
//   "original-ulaula": 19,
//   "original-poni": 20,
//   "updated-alola": 21,
//   "updated-melemele": 22,
//   "updated-akala": 23,
//   "updated-ulaula": 24,
//   "updated-poni": 25,
//   "letsgo-kanto": 26,
//   "galar": 27,
//   "isle-of-armor": 28,
//   "crown-tundra": 29,
//   "hisui": 30,
//   "paldea": 31,
//   "kitakami": 32,
//   "blueberry": 33
// };

// const fetchPokemonEntry = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Error fetching Pokémon entry: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return data.varieties;
// }

// const fetchPokemonDetails = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Error fetching Pokémon details: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return {
//     types: data.types,
//     stats: data.stats,
//     sprites: data.sprites
//   };
// }

// export const GET = async (req, res) => {
//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const regionName = url.pathname.split('/').pop();
//     const region = regionMap[regionName];

//     const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
//     if (!response.ok) {
//       throw new Error(`Error fetching Pokedex: ${response.statusText}`);
//     }
//     const data = await response.json();
//     const pokemonEntries = data.pokemon_entries;

//     const concurrencyLimit = 500;
//     const delay = 1000;
//     let index = 0;
//     let allPokemonData = [];

//     const fetchBatches = async () => {
//       while (index < pokemonEntries.length) {
//         const batch = pokemonEntries.slice(index, index + concurrencyLimit);
//         const promises = batch.map(async (entry) => {
//           const varieties = await fetchPokemonEntry(entry.pokemon_species.url);
//           const firstVariety = varieties[0];
//           const details = await fetchPokemonDetails(firstVariety.pokemon.url);

//           return {
//             name: entry.pokemon_species.name,
//             id: entry.entry_number,
//             varieties: [{
//               ...firstVariety,
//               pokemon: {
//                 ...firstVariety.pokemon,
//                 data: details,
//               },
//             }],
//           };
//         });

//         const results = await Promise.all(promises);
//         allPokemonData = [...allPokemonData, ...results];

//         index += concurrencyLimit;
//         await new Promise(resolve => setTimeout(resolve, delay));
//       }
//     }

//     await fetchBatches();

//     return new Response(JSON.stringify(allPokemonData), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching Pokedex:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch Pokedex data' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

const graphQLClient = new GraphQLClient(endpoint);

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
  "updated-alola": 21,
  "updated-melemele": 22,
  "updated-akala": 23,
  "updated-ulaula": 24,
  "updated-poni": 25,
  "letsgo-kanto": 26,
  "galar": 27,
  "isle-of-armor": 28,
  "crown-tundra": 29,
  "hisui": 30,
  "paldea": 31,
  "kitakami": 32,
  "blueberry": 33
};

const fetchRegionPokemon = async (regionId) => {
  const query = gql`
    query getRegionPokemon($regionId: Int!) {
      pokemon_v2_pokedex(where: {id: {_eq: $regionId}}) {
        pokemon_v2_pokemondexnumbers {
          pokedex_number
          pokemon_v2_pokemonspecy {
            name
            pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {
              name
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
      }
    }
  `;

  const variables = { regionId };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers.map(entry => ({
      id: entry.pokedex_number,
      species_name: entry.pokemon_v2_pokemonspecy.name,
      varieties: entry.pokemon_v2_pokemonspecy.pokemon_v2_pokemons.map(pokemon => {
        return {
          name: pokemon.name,
          types: pokemon.pokemon_v2_pokemontypes.map(typeEntry => typeEntry.pokemon_v2_type.name),
          stats: pokemon.pokemon_v2_pokemonstats.map(statEntry => ({
            base_stat: statEntry.base_stat,
            name: statEntry.pokemon_v2_stat.name
          })),
          sprites: {
            front_default: pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default || null,
            home_default: pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default || null
          }
        };
      })
    }));
  } catch (error) {
    throw new Error(`Error fetching region Pokémon details: ${error.message}`);
  }
};

export const GET = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const regionName = url.pathname.split('/').pop();
    const region = regionMap[regionName];

    if (!region) {
      throw new Error(`Invalid region name: ${regionName}`);
    }

    const regionPokemonData = await fetchRegionPokemon(region);

    return new Response(JSON.stringify(regionPokemonData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching region Pokedex:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch region Pokedex data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

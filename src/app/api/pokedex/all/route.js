import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

const graphQLClient = new GraphQLClient(endpoint);

const fetchPokemonDetails = async () => {
  const query = gql`
    query getAllPokemon {
      pokemon_v2_pokedex(where: { id: { _eq: 1 } }) {
        pokemon_v2_pokemondexnumbers {
          pokedex_number
          pokemon_v2_pokemonspecy {
            name
            pokemon_v2_pokemons {
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
              is_default
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers.map(
      (entry) => ({
        id: entry.pokedex_number,
        species_name: entry.pokemon_v2_pokemonspecy.name,
        varieties: entry.pokemon_v2_pokemonspecy.pokemon_v2_pokemons.map(
          (pokemon) => ({
            name: pokemon.name,
            is_default: pokemon.is_default,
            types: pokemon.pokemon_v2_pokemontypes.map(
              (typeEntry) => typeEntry.pokemon_v2_type.name,
            ),
            stats: pokemon.pokemon_v2_pokemonstats.map((statEntry) => ({
              base_stat: statEntry.base_stat,
              name: statEntry.pokemon_v2_stat.name,
            })),
            sprites: {
              front_default:
                pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default ||
                null,
              home_default:
                pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home
                  .front_default || null,
            },
          }),
        ),
      }),
    );
  } catch (error) {
    throw new Error(`Error fetching Pokémon details: ${error.message}`);
  }
};

export const GET = async (req, res) => {
  try {
    const allPokemonData = await fetchPokemonDetails();
    return new Response(JSON.stringify(allPokemonData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Pokedex:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Pokedex data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

const graphQLClient = new GraphQLClient(endpoint);

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return new Response(JSON.stringify({ error: "Missing type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const query = `
    query getPokemonByType($type: String!) {
      pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $type}}}, is_default: {_eq: true}}) {
        id
        name
        pokemon_species_id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonsprites {
              sprites
        }
      }
    }
  `;

  const variables = {
    type,
  };

  try {
    const data = await graphQLClient.request(query, variables);
    const pokemonList = data.pokemon_v2_pokemon.map((pokemon) => {
      const poke = {
        id: pokemon.id,
        name: pokemon.name,
        species_id: pokemon.pokemon_species_id,
        types: pokemon.pokemon_v2_pokemontypes,
        sprites: pokemon.pokemon_v2_pokemonsprites,
      };
      return poke;
    });

    return new Response(JSON.stringify(pokemonList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Pokémon data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

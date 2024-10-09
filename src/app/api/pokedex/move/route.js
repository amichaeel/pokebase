import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

const graphQLClient = new GraphQLClient(endpoint);

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const moveName = searchParams.get("moveName");
  const learnMethod = searchParams.get("learnMethod");

  if (!moveName || !learnMethod) {
    return new Response(
      JSON.stringify({ error: "Missing moveName or learnMethod parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const query = gql`
    query getPokemonByMove($moveName: String!, $learnMethod: String!) {
      pokemon_v2_pokemon(
        order_by: { id: asc }
        where: {
          pokemon_v2_pokemonmoves: {
            pokemon_v2_movelearnmethod: { name: { _eq: $learnMethod } }
            pokemon_v2_move: { name: { _eq: $moveName } }
          }
        }
      ) {
        id
        name
        pokemon_species_id
        pokemon_v2_pokemonmoves(
          where: {
            pokemon_v2_move: { name: { _eq: $moveName } }
            pokemon_v2_movelearnmethod: { name: { _eq: $learnMethod } }
          }
        ) {
          level
          pokemon_v2_versiongroup {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const variables = {
    moveName,
    learnMethod,
  };

  try {
    const data = await graphQLClient.request(query, variables);
    const pokemonList = data.pokemon_v2_pokemon.map((pokemon) => {
      // let spriteUrl = null;
      const level =
        pokemon.pokemon_v2_pokemonmoves.length > 0
          ? pokemon.pokemon_v2_pokemonmoves[0].level
          : null;

      return {
        id: pokemon.id,
        name: pokemon.name,
        species_id: pokemon.pokemon_species_id,
        sprites: pokemon.pokemon_v2_pokemonsprites,
        levels: pokemon.pokemon_v2_pokemonmoves,
        types: pokemon.pokemon_v2_pokemontypes,
      };
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

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

const graphQLClient = new GraphQLClient(endpoint);

const fetchMoveDetails = async () => {
  const query = gql`
    query getMoves {
      pokemon_v2_move {
        name
        id
        accuracy
        power
        pp
        priority
        pokemon_v2_type {
          name
        }
        move_effect_chance
        pokemon_v2_moveeffect {
          pokemon_v2_moveeffecteffecttexts {
            short_effect
            effect
          }
        }
        pokemon_v2_movedamageclass {
          name
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data.pokemon_v2_move.map(move => ({
      id: move.id,
      name: move.name,
      type: move.pokemon_v2_type.name,
      category: move.pokemon_v2_movedamageclass.name,
      power: move.power,
      accuracy: move.accuracy,
      pp: move.pp,
      effect: move.pokemon_v2_moveeffect?.pokemon_v2_moveeffecteffecttexts[0]?.effect,
      short_effect: move.pokemon_v2_moveeffect?.pokemon_v2_moveeffecteffecttexts[0]?.short_effect,
      effect_chance: move.move_effect_chance
    }));
  } catch (error) {
    throw new Error(`Error fetching move details: ${error.message}`);
  }
}

export const GET = async (req, res) => {
  try {
    const allMovesData = await fetchMoveDetails();

    return new Response(JSON.stringify(allMovesData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching moves:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch moves data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

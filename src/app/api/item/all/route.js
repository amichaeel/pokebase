// const fetchItemDetails = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Error fetching item details: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return {
//     name: data.name,
//     category: data.category.name,
//     effect: data.effect_entries[0]?.short_effect,
//     sprite: data.sprites.default
//   };
// }

// export const GET = async (req, res) => {
//   try {
//     const response = await fetch('https://pokeapi.co/api/v2/item?limit=2500');
//     if (!response.ok) {
//       throw new Error(`Error fetching items: ${response.statusText}`);
//     }
//     const data = await response.json();

//     const concurrencyLimit = 500;
//     const delay = 1000;
//     let index = 0;
//     let allItemsData = [];

//     const fetchBatches = async () => {
//       while (index < data.results.length) {
//         const batch = data.results.slice(index, index + concurrencyLimit);
//         const promises = batch.map(async (item) => {
//           const details = await fetchItemDetails(item.url);
//           return {
//             ...details,
//             url: item.url
//           };
//         });

//         const results = await Promise.all(promises);
//         allItemsData = [...allItemsData, ...results];

//         index += concurrencyLimit;
//         await new Promise(resolve => setTimeout(resolve, delay));
//       }
//     }

//     await fetchBatches();

//     return new Response(JSON.stringify(allItemsData), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch items data' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

const graphQLClient = new GraphQLClient(endpoint);

const fetchItemDetails = async () => {
  const query = gql`
      query getItems {
        pokemon_v2_item {
          name
          pokemon_v2_itemeffecttexts {
            short_effect
          }
          pokemon_v2_itemsprites {
            sprites
          }
          pokemon_v2_itemcategory {
            name
          }
        }
      }
    `;

  try {
    const data = await graphQLClient.request(query);
    return data.pokemon_v2_item.map(item => ({
      name: item.name,
      category: item.pokemon_v2_itemcategory.name,
      effect: item.pokemon_v2_itemeffecttexts[0]?.short_effect,
      sprite: item.pokemon_v2_itemsprites[0]?.sprites.default
    }));
  } catch (error) {
    throw new Error(`Error fetching item details: ${error.message}`);
  }
}

export const GET = async (req, res) => {
  try {
    const allItemsData = await fetchItemDetails();

    return new Response(JSON.stringify(allItemsData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch items data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

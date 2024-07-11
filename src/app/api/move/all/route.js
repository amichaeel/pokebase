const fetchMoveDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching move details: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    type: data.type.name,
    category: data.damage_class.name,
    power: data.power,
    accuracy: data.accuracy,
    pp: data.pp,
    effect: data.effect_entries[0]?.effect,
    short_effect: data.effect_entries[0]?.short_effect,
    meta: data.meta,
    effect_chance: data.effect_chance
  };
}

export const GET = async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
    if (!response.ok) {
      throw new Error(`Error fetching moves: ${response.statusText}`);
    }
    const data = await response.json();

    const concurrencyLimit = 500;
    const delay = 1000;
    let index = 0;
    let allMovesData = [];

    const fetchBatches = async () => {
      while (index < data.results.length) {
        const batch = data.results.slice(index, index + concurrencyLimit);
        const promises = batch.map(async (move) => {
          const details = await fetchMoveDetails(move.url);
          return {
            ...details,
            url: move.url
          };
        });

        const results = await Promise.all(promises);
        allMovesData = [...allMovesData, ...results];

        index += concurrencyLimit;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    await fetchBatches();

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

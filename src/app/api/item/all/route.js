const fetchItemDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching item details: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    name: data.name,
    category: data.category.name,
    effect: data.effect_entries[0]?.short_effect,
    sprite: data.sprites.default
  };
}

export const GET = async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/item?limit=2500');
    if (!response.ok) {
      throw new Error(`Error fetching items: ${response.statusText}`);
    }
    const data = await response.json();

    const concurrencyLimit = 500;
    const delay = 1000;
    let index = 0;
    let allItemsData = [];

    const fetchBatches = async () => {
      while (index < data.results.length) {
        const batch = data.results.slice(index, index + concurrencyLimit);
        const promises = batch.map(async (item) => {
          const details = await fetchItemDetails(item.url);
          return {
            ...details,
            url: item.url
          };
        });

        const results = await Promise.all(promises);
        allItemsData = [...allItemsData, ...results];

        index += concurrencyLimit;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    await fetchBatches();

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

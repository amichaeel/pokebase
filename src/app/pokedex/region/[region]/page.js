"use client"

import React, { useEffect, useState } from 'react';
import PikachuLoader from '@/components/Loaders/Pokeball';
import PokedexTable from '@/components/Tables/Pokedex';

const RegionalPokedexPage = ({ params }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pokedex/${params.region}`);
        if (!response.ok) {
          throw new Error(`Error fetching Pokedex data: ${response.statusText}`);
        }
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokedex:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PikachuLoader />;
  }

  return (
    <div className='container mx-auto w-full max-w-6xl p-4'>
      <h1>The Complete Pokedex</h1>
      <PokedexTable pokemonData={pokemonData} />
    </div>
  );
}

export default RegionalPokedexPage;

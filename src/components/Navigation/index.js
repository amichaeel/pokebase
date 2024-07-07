"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await response.json();
        const pokemonNames = data.results.map(pokemon => pokemon.name);
        setAllPokemonNames(pokemonNames);
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
      }
    };

    fetchPokemonNames();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = allPokemonNames
        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, allPokemonNames]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') return;
    router.push(`/pokedex/${searchTerm.toLowerCase()}`);
  };

  const handleSuggestionClick = (suggestion) => {
    router.push(`/pokedex/${suggestion}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="flex items-center justify-center h-12 bg-zinc-800 text-white/70 text-xs">
      <div className="flex items-center h-full justify-between max-w-6xl w-full">
        <div className="space-x-6 h-full">
          <ul className="flex h-full items-center space-x-6 *:transition-all">

            <li className="flex h-full hover:text-white p-2 items-center space-x-2 hover:bg-white/10 hover:cursor-pointer">
              <img src="/pokeball.png" alt="Pokeball Logo" className="w-5 h-5 invert" />
              <span className="text-lg">PokéBase</span>
            </li>

            <li className="h-full pt-4 group dropdown relative cursor-default hover:text-white hover:bg-white/10">
              <a className="h-full px-2">Pokédex</a>
              <div className="group-hover:block top-12 dropdown-menu absolute hidden h-auto w-64">
                <ul className=" bg-zinc-900 text-white/70 *:cursor-pointer hover:*:text-white">
                  <li onClick={() => router.push("/pokedex/all")} className="py-4 flex w-full h-full px-2 flex-col hover:bg-white/10">
                    <span className="font-semibold text-lg">All Pokémon</span>
                    <span className="text-xs">The Master Pokedex</span>
                  </li>
                  {/* <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">National Dex (Generation 9)</li> */}
                  {/* <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Scarlet & Violet (Paldea)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Legends: Arceus (Hisui)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Brilliant Diamond & Shining Pearl (Sinnoh)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Sword & Shield (Galar)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Let's Go Pikachu & Let's Go Eevee (Kanto)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Ultra Sun & Ultra Moon (Alola)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Sun & Moon (Alola)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Omega Ruby & Alpha Sapphire (Hoenn)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">X & Y (Kalos)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Black 2 & White 2 (Unova)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Black & White (Unova)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">HeartGold & SoulSilver (Johto)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Platinum (Sinnoh)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Diamond & Pearl (Sinnoh)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">FireRed & LeafGreen (Kanto)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Ruby, Sapphire & Emerald (Hoenn)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Gold, Silver & Crystal (Johto)</li>
                  <li className="py-2 flex w-full h-full px-2 hover:bg-white/10">Red, Blue & Yellow (Kanto)</li> */}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-x-6 flex items-center px-2 relative">
          <form onSubmit={handleSearch} className="flex w-56 bg-zinc-900 text-white/70 rounded">
            <input
              type="text"
              className="w-full p-2 bg-zinc-900 text-white/70 placeholder-white/50 rounded focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="p-2 text-white rounded">
              <MagnifyingGlassIcon className="w-4 h-4" />
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute top-9 -left-6 w-full bg-zinc-800 text-white/70">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-zinc-700 cursor-pointer font-bold"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

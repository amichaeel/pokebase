"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { capitalizeWords, regions } from "@/lib/utils";
import ThemeSwitcher from "@/components/Theme";
import Link from "next/link";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [allItemNames, setAllItemNames] = useState([]);
  const [allMoveNames, setAllMoveNames] = useState([]);
  const [theme, setTheme] = useState(null);
  const router = useRouter();

  const handleTheme = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokedex/1");
        const data = await response.json();
        const pokemonNames = data.pokemon_entries.map((pokemon) => ({
          name: capitalizeWords(pokemon.pokemon_species.name),
          type: "Pokédex",
        }));
        setAllPokemonNames(pokemonNames);
      } catch (error) {
        console.error("Error fetching Pokémon names:", error);
      }
    };

    const fetchItemNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/item?limit=2169",
        );
        const data = await response.json();
        const itemNames = data.results.map((item) => ({
          name: capitalizeWords(item.name),
          type: "Item",
        }));
        setAllItemNames(itemNames);
      } catch (error) {
        console.error("Error fetching item names:", error);
      }
    };

    const fetchMoveNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/move?limit=1000",
        );
        const data = await response.json();
        const moveNames = data.results.map((move) => ({
          name: capitalizeWords(move.name),
          type: "Move",
        }));
        setAllMoveNames(moveNames);
      } catch (error) {
        console.error("Error fetching move names:", error);
      }
    };

    fetchPokemonNames();
    fetchItemNames();
    fetchMoveNames();
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
    } else {
      const allNames = [...allPokemonNames, ...allItemNames, ...allMoveNames];
      const filteredSuggestions = allNames
        .filter((entry) =>
          entry.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 10);
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, allPokemonNames, allItemNames, allMoveNames]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (suggestions.length > 0 && searchTerm.trim() !== "") {
      let url = "";
      switch (suggestions[0].type) {
        case "Pokédex":
          url = "/pokedex/";
          break;
        case "Item":
          url = "/item/";
          break;
        case "Move":
          url = "/move.";
          break;
      }
      const suggestionFormatted = suggestions[0].name
        .toLowerCase()
        .replace(" ", "-");
      router.push(`${url}${suggestionFormatted}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const suggestionFormatted = suggestion.name.toLowerCase().replace(" ", "-");
    let url = "";
    switch (suggestion.type) {
      case "Pokédex":
        url = "/pokedex/";
        break;
      case "Item":
        url = "/item/";
        break;
      case "Move":
        url = "/move/";
        break;
    }
    router.push(`${url}${suggestionFormatted}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="flex items-center justify-center h-12 w-full bg-base-100  text-xs sticky z-40 top-0">
      <div className="flex items-center h-full justify-between max-w-6xl w-full px-4">
        <div className="space-x-1 h-full flex items-center">
          <Link
            href="/"
            className=" h-full hover:bg-base-300 hover:cursor-pointer px-3"
          >
            <div className="flex h-full items-center space-x-2">
              <img
                src="/pokeball.png"
                alt="Pokeball Logo"
                className={`w-5 h-5 ${theme == "dark" ? "invert" : ""}`}
              />
              <span className="text-lg">PokéBase</span>
            </div>
          </Link>

          <div className="h-full hover:bg-base-200 group dropdown relative cursor-default">
            <span className="h-full flex items-center justify-center w-full text-center px-2">
              Pokémon Data
            </span>
            <div className="group-hover:block bg-base-200 rounded-b-xl top-12 dropdown-menu absolute hidden h-auto w-64">
              <ul className="*:cursor-pointer">
                <li>
                  <Link
                    href="/pokedex/all"
                    className="py-4 flex w-full h-full px-2 flex-col  hover:bg-base-300"
                  >
                    <span className="font-semibold text-lg">All Pokémon</span>
                    <span className="text-xs">The National Pokedex</span>
                  </Link>
                </li>
                <li className="p-2 hover:bg-none hover:cursor-default text-xs font-semibold bg-base-300 uppercase ">
                  Other Regions
                </li>
                {regions.map((region, index) => (
                  <li
                    key={index}
                    className="  flex w-full h-full hover:bg-base-300"
                  >
                    <Link
                      className="w-full p-2 h-full"
                      href={`/pokedex/region/${region.name.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {capitalizeWords(region.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden h-full pt-4 group dropdown relative cursor-default  hover:bg-base-200">
            <span className="h-full px-2">Games</span>
          </div>
        </div>

        <div className="flex items-center px-2 z-50 relative">
          <form onSubmit={handleSearch} className="flex bg-base-300 rounded">
            <input
              type="text"
              className="w-full p-2 bg-base-300 rounded focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="p-2 rounded">
              <MagnifyingGlassIcon className="w-4 h-4" />
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute top-[46px] left-0 w-full rounded-b-xl bg-base-100">
              {suggestions.map((suggestion, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-base-300 cursor-pointer font-bold"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="font-semibold text-md">
                      {suggestion.name}
                    </span>
                    <span>{suggestion.type}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="flex items-center justify-center p-3">
            <ThemeSwitcher handleTheme={handleTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { capitalizeWords } from "@/lib/utils";
import WideTypeIcon from "../TypeIcon/Wide";
import Link from "next/link";

const PokemonOfTheDay = () => {
  const [pokemonOfTheDay, setPokemonOfTheDay] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonOfTheDay = async () => {
    const response = await fetch("/api/ptd");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon of the day");
    }
    return response.json();
  };

  const calculateStatRange = (statName, baseStat) => {
    const maxEV = 63;
    const maxIV = 31;
    const beneficialNature = 1.1;
    const negativeNature = 0.9;

    let min, max;
    if (statName.toLowerCase() === "hp") {
      min = 2 * baseStat + 110;
      max = 2 * baseStat + 110 + maxEV + maxIV;
    } else {
      min = Math.floor((2 * baseStat + 5) * negativeNature);
      max = Math.floor((2 * baseStat + maxEV + maxIV + 5) * beneficialNature);
    }

    return { min, max };
  };

  useEffect(() => {
    const loadPokemonOfTheDay = async () => {
      try {
        const pokemon = await fetchPokemonOfTheDay();
        setPokemonOfTheDay(pokemon);
      } catch (error) {
        console.error("Error fetching Pokémon of the day:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonOfTheDay();
  }, []);

  useEffect(() => {
    if (pokemonOfTheDay != null) {
      const pokemonStats = [
        { name: "HP", base: pokemonOfTheDay.stats[0].base_stat },
        { name: "Attack", base: pokemonOfTheDay.stats[1].base_stat },
        { name: "Defense", base: pokemonOfTheDay.stats[2].base_stat },
        { name: "Sp. Atk", base: pokemonOfTheDay.stats[3].base_stat },
        { name: "Sp. Def", base: pokemonOfTheDay.stats[4].base_stat },
        { name: "Speed", base: pokemonOfTheDay.stats[5].base_stat },
      ];
      setStats(pokemonStats);
    }
  }, [pokemonOfTheDay]);

  const getProgressBarClass = (value) => {
    const percentage = (value / 255) * 100;

    if (percentage >= 80) {
      return "progress-purple";
    } else if (percentage >= 60) {
      return "progress-blue";
    } else if (percentage >= 40) {
      return "progress-green";
    } else if (percentage >= 30) {
      return "progress-yellow";
    } else if (percentage >= 15) {
      return "progress-orange";
    } else {
      return "progress-red";
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className={`flex w-full max-w-6xl flex-col justify-center p-3 mb-3 bg-base-200 rounded-3xl`}
      >
        <h1 className="text-4xl font-bold text-center">Pokémon of the Day</h1>
        {pokemonOfTheDay ? (
          <div className="flex md:flex-row flex-col gap-2 rounded-3xl items-center justify-center mt-4">
            <Link
              href={`/pokedex/${pokemonOfTheDay.name}`}
              className="flex flex-col items-center justify-center w-full p-3 cursor-pointer transition-all hover:bg-base-300 rounded-3xl "
            >
              <img
                src={pokemonOfTheDay.sprite}
                alt={pokemonOfTheDay.name}
                width={300}
                height={300}
              />
              <h2 className="text-sm text-base-content/50">
                #{pokemonOfTheDay.id.toString().padStart(4, "0")}
              </h2>
              <h2 className="text-xl font-semibold">
                {capitalizeWords(pokemonOfTheDay.name)}
              </h2>
              <div className="flex space-x-2 mt-2">
                {pokemonOfTheDay.types.map((type) => (
                  <WideTypeIcon type={type.type.name} key={type.type.name} />
                ))}
              </div>
            </Link>
            <div className="mt-4 w-full">
              <table
                className="w-full text-right border-separate"
                style={{ borderSpacing: "0 10px" }}
              >
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-black/15"></th>
                    <th className="py-2 px-4 border-b border-black/15"></th>
                    <th className="py-2 px-4 border-b border-black/15"></th>
                    <th className="py-2 px-4 border-b border-black/15"></th>
                    <th className="py-2 px-4 border-b border-black/15"></th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat) => {
                    const { min, max } = calculateStatRange(
                      stat.name,
                      stat.base,
                    );
                    return (
                      <tr key={stat.name}>
                        <td className="py-2 px-4 border-b border-black/15">
                          {stat.name}
                        </td>
                        <td className="py-2 px-4 border-b border-black/15">
                          {stat.base}
                        </td>
                        <td className="py-2 px-4 w-full border-b border-black/15">
                          <progress
                            className={`progress progress-custom w-full h-3 ${getProgressBarClass(stat.base)}`}
                            value={stat.base}
                            max="255"
                          ></progress>
                        </td>
                        <td className="py-2 px-4 border-b border-black/15">
                          {min}
                        </td>
                        <td className="py-2 px-4 border-b border-black/15">
                          {max}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="py-2 px-4 font-bold border-b border-black/15">
                      Total
                    </td>
                    <td className="py-2 px-4 font-bold border-b border-black/15">
                      {stats.reduce((sum, stat) => sum + stat.base, 0)}
                    </td>
                    <td className="py-2 px-4 border-b border-black/15"></td>
                    <th className="py-2 px-4 border-b border-black/15">Min</th>
                    <th className="py-2 px-4 border-b border-black/15">Max</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-36">
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonOfTheDay;

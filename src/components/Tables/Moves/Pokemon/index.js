import React, { useEffect, useState } from "react";
import {
  versionGroups as vgMap,
  typeTextColors,
  capitalizeWords,
} from "@/lib/utils";
import Link from "next/link";
import CondensedTypeIcon from "@/components/TypeIcon/Condensed";
import Image from "next/image";

const PokemonByMoveAndLearningMethod = ({ move, learningMethod }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [versionGroups, setVersionGroups] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");

  const getLevelForGame = (pokemon) => {
    const levelEntry = pokemon.levels.find(
      (entry) => entry.pokemon_v2_versiongroup.name === selectedGame,
    );
    return levelEntry ? levelEntry.level : "N/A";
  };

  const getTypeColor = (type) => {
    return typeTextColors[type] || "text-red-300";
  };

  const getSpriteUrl = (pokemon) => {
    if (pokemon.sprites.length > 0) {
      const spritesData = pokemon.sprites[0].sprites;
      const sprites =
        typeof spritesData === "string" ? JSON.parse(spritesData) : spritesData;
      return sprites.front_default || null;
    }
    return null;
  };

  useEffect(() => {
    const getPokemon = async (move, learningMethod) => {
      try {
        const response = await fetch(
          `/api/pokedex/move?moveName=${encodeURIComponent(
            move,
          )}&learnMethod=${encodeURIComponent(learningMethod)}`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const allVersionGroups = new Set();

        data.forEach((pokemon) => {
          pokemon.levels.forEach((move) => {
            allVersionGroups.add(move.pokemon_v2_versiongroup.name);
          });
        });

        const versionGroupList = Array.from(allVersionGroups).sort();
        setSelectedGame(versionGroupList[0]);
        setPokemon(data);
        setVersionGroups(versionGroupList);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemon(move, learningMethod);
  }, [move, learningMethod]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  const filteredPokemon = pokemon.filter(
    (pokemon) => getLevelForGame(pokemon) !== "N/A",
  );

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="versionGroup" className="mr-2">
          Select Game:
        </label>
        <select
          id="versionGroup"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="select focus:outline-none focus:border-none bg-base-100 select-sm"
        >
          {vgMap.map((vg) => (
            <option key={vg.name} value={vg.name}>
              {vg.fullName}
            </option>
          ))}
        </select>
      </div>
      {filteredPokemon.length === 0 && <div>No pokemon found</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemon.map((pokemon) => {
          const level = getLevelForGame(pokemon);
          const spriteUrl = getSpriteUrl(pokemon);

          if (level === "N/A" || !pokemon.is_default) return null;

          return (
            <div key={pokemon.id} className="flex rounded-xl">
              <div>
                <img
                  src={spriteUrl}
                  alt={pokemon.name}
                  className="mx-auto w-16 h-16"
                />
              </div>
              <div className="">
                <Link
                  prefetch={false}
                  href={`/pokedex/${pokemon.name}`}
                  className="link-hover font-bold capitalize"
                >
                  {capitalizeWords(pokemon.name)}
                </Link>
                <div className="flex gap-2 text-sm">
                  <p className="text-gray-500">#{pokemon.species_id}</p>
                  <div className="flex gap-2">
                    {pokemon.types.map((type, id) => (
                      <span key={id}>
                        <CondensedTypeIcon type={type.pokemon_v2_type.name} />
                      </span>
                    ))}
                  </div>
                </div>
                {learningMethod == "level-up" && (
                  <p className="text-base-content">Level {level}</p>
                )}
                {learningMethod == "egg" && (
                  <p className="text-base-content text-xs">
                    Breeding information coming soon
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonByMoveAndLearningMethod;

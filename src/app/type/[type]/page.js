"use client";

import React, { useState, useEffect } from "react";
import PikachuLoader from "@/components/Loaders/Pokeball";
import Error from "@/components/Errors";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { types, capitalizeWords } from "@/lib/utils";
import PokemonByTypeGrid from "@/components/Grids/Pokemon/Type";
import TypeEffectivenessGrid from "@/components/Grids/TypeEffectiveness";

const TypePage = ({ params }) => {
  const [typeData, setTypeData] = useState(null);
  const [typePokemonData, setTypePokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        const type = params.type;
        if (!types.includes(capitalizeWords(type))) {
          setError("Invalid type.");
          return;
        }
        const url = `https://pokeapi.co/api/v2/type/${type}`;
        const response = await fetch(url);
        const data = await response.json();
        setTypeData(data);
      } catch (error) {
        console.error("Error fetching move data: ", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchTypeData();
  }, [params.type]);

  if (loading) {
    return <PikachuLoader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full mt-3 max-w-6xl space-y-12 px-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex px-6 space-y-4 flex-col items-center justify-center">
            <span className="text-4xl font-semibold">
              {capitalizeWords(typeData.name)}
            </span>
            <div className="flex w-full gap-10 p-4 bg-base-100 rounded-3xl">
              <div className="flex flex-col text-center">
                <span className="text-3xl font-bold">
                  {typeData.pokemon.length}
                </span>
                <span>{capitalizeWords(typeData.name)} type Pokémon</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-3xl font-bold">
                  {typeData.moves.length}
                </span>
                <span>{capitalizeWords(typeData.name)} type moves</span>
              </div>
            </div>
          </div>

          <div className="flex mt-3 items-center justify-center flex-col lg:flex-row w-full">
            <div className="flex h-full items-center flex-col gap-6 w-full">
              <div
                id="attack-pros-cons"
                className="flex w-full h-full flex-col gap-4"
              >
                <h1 className="text-3xl font-semibold pb-5">
                  Attack pros &amp; cons
                </h1>

                <div className="flex">
                  <div>
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex flex-col gap-2 pl-4">
                    <span className="flex items-center">
                      {capitalizeWords(typeData.name)} moves are super-effective
                      against:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {typeData.damage_relations.double_damage_to.map(
                        (type, idx) => (
                          <div key={idx}>
                            <WideTypeIcon type={type.name} />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div>
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex flex-col gap-2 pl-4">
                    <span className="flex items-center">
                      {capitalizeWords(typeData.name)} moves are not very
                      effective against:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {typeData.damage_relations.half_damage_to.map(
                        (type, idx) => (
                          <div key={idx}>
                            <WideTypeIcon type={type.name} />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {typeData.damage_relations.no_damage_to.length > 0 && (
                  <div className="flex">
                    <div>
                      <XCircleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex flex-col gap-2 pl-4">
                      <span className="flex items-center">
                        {capitalizeWords(typeData.name)} moves have no effect
                        on:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.no_damage_to.map(
                          (type, idx) => (
                            <div key={idx}>
                              <WideTypeIcon type={type.name} />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                id="defense-pros-cons"
                className="flex w-full h-full flex-col gap-4"
              >
                <h1 className="text-3xl font-semibold pb-5">
                  Defense pros &amp; cons
                </h1>

                {typeData.damage_relations.no_damage_from.length > 0 && (
                  <div className="flex">
                    <div>
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex flex-col gap-2 pl-4">
                      <span className="flex items-center">
                        These types have no effect on{" "}
                        {capitalizeWords(typeData.name)} Pokémon:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.no_damage_from.map(
                          (type, idx) => (
                            <div key={idx}>
                              <WideTypeIcon type={type.name} />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex">
                  <div>
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex flex-col  gap-2 pl-4">
                    <span className="flex items-center">
                      These types are not very effective against{" "}
                      {capitalizeWords(typeData.name)} Pokémon:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {typeData.damage_relations.half_damage_from.map(
                        (type, idx) => (
                          <div key={idx}>
                            <WideTypeIcon type={type.name} />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div>
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex flex-col gap-2 pl-4">
                    <span className="flex items-center">
                      These types are super-effective against{" "}
                      {capitalizeWords(typeData.name)} Pokémon:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {typeData.damage_relations.double_damage_from.map(
                        (type, idx) => (
                          <div key={idx}>
                            <WideTypeIcon type={type.name} />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center h-full w-full">
              <h1 className="text-3xl font-semibold pb-5">
                Dual-type attack pros &amp; cons
              </h1>
              <span className="pt-2 pb-6">
                This chart shows the strength of the {params.type} type against
                every type combination. The fraction of damage a {params.type}{" "}
                type move will deal is shown - 0.5 means 50% damage (not very
                effective), 2 means 200% (super-effective) and so on.
              </span>
              <TypeEffectivenessGrid attackingType={params.type} />
            </div>
          </div>
        </div>
        <div id="pokemon-type-grid" className="flex flex-col">
          <h1 className="text-3xl font-semibold py-5">
            {capitalizeWords(typeData.name)} Pokémon
          </h1>
          <PokemonByTypeGrid type={params.type} />
        </div>
      </div>
    </div>
  );
};

export default TypePage;

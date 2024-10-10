import React, { useEffect, useState } from "react";
import WideTypeIcon from "@/components/TypeIcon/Wide";

const TypeEffectivenessGrid = ({ attackingType }) => {
  const [typeEffectiveness, setTypeEffectiveness] = useState({});
  const [loading, setLoading] = useState(true);
  const types = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  useEffect(() => {
    const fetchAllTypes = async () => {
      const typeData = {};
      for (let type of types) {
        const damageRelations = await fetchTypeData(type);
        typeData[type] = damageRelations;
      }
      setTypeEffectiveness(typeData);
      setLoading(false);
    };
    fetchAllTypes();
  }, []);

  const calculateEffectiveness = (defenderTypes) => {
    if (!typeEffectiveness[attackingType]) {
      return 1;
    }
    let totalEffectiveness = 1;

    defenderTypes.forEach((defender) => {
      const effectivenessData = typeEffectiveness[attackingType];

      if (
        effectivenessData.double_damage_to &&
        effectivenessData.double_damage_to.some((t) => t.name === defender)
      ) {
        totalEffectiveness *= 2;
      } else if (
        effectivenessData.half_damage_to &&
        effectivenessData.half_damage_to.some((t) => t.name === defender)
      ) {
        totalEffectiveness *= 0.5;
      } else if (
        effectivenessData.no_damage_to &&
        effectivenessData.no_damage_to.some((t) => t.name === defender)
      ) {
        totalEffectiveness *= 0;
      }
    });

    return totalEffectiveness;
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className=""></th>
            {types.map((type) => (
              <th key={type} className="text-sm font-bold">
                {<WideTypeIcon type={type} condensed={true} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {types.map((defender) => (
            <tr key={defender}>
              <th className="font-bold">{<WideTypeIcon type={defender} />}</th>
              {types.map((secondDefender) => {
                const effectiveness = calculateEffectiveness([
                  defender,
                  secondDefender,
                ]);

                let className = "text-black";
                if (effectiveness > 2) {
                  className = "bg-lime-700 text-yellow-200 "; // Super effective
                } else if (effectiveness > 1) {
                  className = "bg-green-600 text-yellow-200"; // Super effective
                } else if (effectiveness < 1 && effectiveness >= 0.5) {
                  className = "bg-red-600 text-yellow-200"; // Not very effective
                } else if (effectiveness <= 0.5 && effectiveness > 0) {
                  className = "bg-red-700 text-yellow-200"; // Not very effective
                } else if (effectiveness == 0) {
                  className = "bg-neutral-700 text-yellow-200";
                }

                return (
                  <td
                    key={`${defender}-${secondDefender}`}
                    className={`text-xs text-center ${className}`}
                  >
                    {effectiveness != 1 && effectiveness}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const fetchTypeData = async (type) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  return data.damage_relations;
};

const capitalizeWords = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default TypeEffectivenessGrid;

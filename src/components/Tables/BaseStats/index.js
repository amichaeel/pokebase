import React from "react";

const BaseStatsTable = ({ pokemonData }) => {
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

  const stats = [
    { name: "HP", base: pokemonData.stats[0].base_stat },
    { name: "Attack", base: pokemonData.stats[1].base_stat },
    { name: "Defense", base: pokemonData.stats[2].base_stat },
    { name: "Sp. Atk", base: pokemonData.stats[3].base_stat },
    { name: "Sp. Def", base: pokemonData.stats[4].base_stat },
    { name: "Speed", base: pokemonData.stats[5].base_stat },
  ];

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
    <div className="w-full p-4">
      <h2 className="font-bold text-2xl w-full">Base stats</h2>
      <table
        className="w-full text-right border-separate"
        style={{ borderSpacing: "0 10px" }}
      >
        <thead>
          <tr>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => {
            const { min, max } = calculateStatRange(stat.name, stat.base);
            return (
              <tr key={stat.name}>
                <td className="py-2 px-4">{stat.name}</td>
                <td className="py-2 px-4">{stat.base}</td>
                <td className="py-2 px-4 w-full">
                  <progress
                    className={`w-full progress-custom h-4 ${getProgressBarClass(stat.base)}`}
                    value={stat.base}
                    max="255"
                  ></progress>
                </td>
                <td className="py-2 px-4">{min}</td>
                <td className="py-2 px-4">{max}</td>
              </tr>
            );
          })}
          <tr>
            <td className="py-2 px-4 font-bold">Total</td>
            <td className="py-2 px-4 font-bold">
              {stats.reduce((sum, stat) => sum + stat.base, 0)}
            </td>
            <td className="py-2 px-4"></td>
            <th className="py-2 px-4">Min</th>
            <th className="py-2 px-4">Max</th>
          </tr>
        </tbody>
      </table>
      <div className="text-xs flex justify-center opacity-80 w-full text-center">
        <p className="max-w-md">
          Note: The ranges shown on the right are for a level 100 Pokémon.
          Maximum values are based on a beneficial nature, 252 EVs, 31 IVs;
          minimum values are based on a hindering nature, 0 EVs, 0 IVs.
        </p>
      </div>
    </div>
  );
};

export default BaseStatsTable;

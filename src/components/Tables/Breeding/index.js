import React from "react";

const BreedingTable = ({ speciesData }) => {
  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const calculateGenderProbality = (genderRate) => {
    if (genderRate === -1) {
      return {
        male: 0,
        female: 0,
        genderless: 1,
      };
    }

    const femaleProbability = genderRate / 8;
    const maleProbability = 1 - femaleProbability;

    return {
      male: maleProbability,
      female: femaleProbability,
      genderless: 0,
    };
  };

  const eggGroups = speciesData
    ? speciesData["egg_groups"]
        .map((group) => capitalize(group.name))
        .join(", ")
    : "N/A";
  const genderRatio = speciesData ? speciesData["gender_rate"] : -1;
  const eggCycles = speciesData ? `${speciesData["hatch_counter"]}` : "N/A";

  const maleGenderRate = calculateGenderProbality(genderRatio).male * 100;
  const femaleGenderRate = calculateGenderProbality(genderRatio).female * 100;

  return (
    <div className="w-full p-4">
      <h1 className="font-bold text-2xl mb-4">Breeding</h1>
      <table className="w-full text-left">
        <tbody>
          <tr>
            <th className="py-2">Egg Groups</th>
            <td className="py-2">{eggGroups}</td>
          </tr>
          <tr>
            <th className="py-2">Gender</th>
            <td className="py-2">
              {maleGenderRate == 0 && femaleGenderRate == 0 ? (
                <span>Genderless</span>
              ) : (
                <div>
                  <span className="text-blue-400">{`${maleGenderRate}% male`}</span>
                  ,
                  <span className="text-pink-400">{` ${femaleGenderRate}% female`}</span>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <th className="py-2">Egg cycles</th>
            <td className="py-2 space-x-1">
              <span>{eggCycles}</span>
              <span className="text-xs text-gray-500">{`(${(eggCycles * 257 - 256).toLocaleString()}-${(eggCycles * 257).toLocaleString()} steps)`}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BreedingTable;

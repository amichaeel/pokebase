import React from 'react';

const BreedingTable = ({ speciesData }) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const eggGroups = speciesData ? speciesData['egg_groups'].map(group => capitalize(group.name)).join(', ') : 'N/A';
  const genderRatio = speciesData
    ? `${speciesData['gender_rate']}% male, ${100 - speciesData['gender_rate']}% female`
    : 'N/A';
  const eggCycles = speciesData ? `${speciesData['hatch_counter']} (4,884–5,140 steps)` : 'N/A';
  return (
    <div className='w-full p-4'>
      <h1 className="font-bold text-2xl mb-4">Breeding</h1>
      <table className="w-full text-left">
        <tbody className='*:border-y *:border-black/15'>
          <tr>
            <th className="py-2">Egg Groups</th>
            <td className="py-2">{eggGroups}</td>
          </tr>
          <tr>
            <th className="py-2">Gender</th>
            <td className="py-2">{genderRatio}</td>
          </tr>
          <tr>
            <th className="py-2">Egg cycles</th>
            <td className="py-2">{eggCycles}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BreedingTable;

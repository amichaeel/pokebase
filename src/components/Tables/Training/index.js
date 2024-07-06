import React from 'react';

const TrainingTable = ({ pokemonData, speciesData }) => {

  const evYield = speciesData ? speciesData['ev_yield'] : 'N/A';
  const catchRate = speciesData ? `${speciesData['capture_rate']} (5.9% with PokéBall, full HP)` : 'N/A';
  const baseFriendship = speciesData ? `${speciesData['base_happiness']} (normal)` : 'N/A';
  const baseExp = pokemonData.base_experience;
  const growthRate = speciesData ? speciesData['growth_rate'].name : 'N/A';

  return (
    <div className='w-full p-4'>
      <h1 className="font-bold text-2xl mb-4">Training</h1>
      <table className="w-full text-left">
        <tbody className='*:border-y *:border-black/15'>
          <tr>
            <th className="py-2">EV yield</th>
            <td className="py-2">{evYield}</td>
          </tr>
          <tr>
            <th className="py-2">Catch rate</th>
            <td className="py-2">{catchRate}</td>
          </tr>
          <tr>
            <th className="py-2">Base Friendship</th>
            <td className="py-2">{baseFriendship}</td>
          </tr>
          <tr>
            <th className="py-2">Base Exp.</th>
            <td className="py-2">{baseExp}</td>
          </tr>
          <tr>
            <th className="py-2">Growth Rate</th>
            <td className="py-2">{growthRate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;

import React from 'react';
import { capitalizeWords } from '@/lib/utils';

const TrainingTable = ({ pokemonData, speciesData }) => {

  const evYield = pokemonData ? pokemonData.stats.filter(stat => stat.effort > 0) : 'N/A';
  const catchRate = speciesData ? `${speciesData['capture_rate']}` : 'N/A';
  const baseFriendship = speciesData ? `${speciesData['base_happiness']}` : 'N/A';
  const baseExp = pokemonData.base_experience;
  const growthRate = speciesData ? speciesData['growth_rate'].name : 'N/A';

  return (
    <div className='w-full p-4'>
      <h1 className="font-bold text-2xl mb-4">Training</h1>
      <table className="w-full text-left">
        <tbody className='*:border-y *:border-black/15'>
          <tr>
            <th className="py-2">EV yield</th>
            <td className="py-2">
              {evYield.map(item => `${item.effort} ${capitalizeWords(item.stat.name)}`).join(', ')}
            </td>
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
            <td className="py-2">{capitalizeWords(growthRate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;

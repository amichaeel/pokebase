import React from 'react';
import { Fira_Sans } from 'next/font/google';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-700',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-700',
  dragon: 'bg-purple-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function WideTypeIcon({ type }) {
  const typeClass = typeColors[type.toLowerCase()] || 'bg-gray-400';

  return (
    <div className={`flex justify-center text-xs text-white py-1 px-4 w-16 rounded-md border-[1px] border-black/40 ${typeClass} ${firaSans.className} hover:opacity-90 transition-all cursor-pointer`}>
      <span className='text-shadow-sm shadow-black'>{type.toUpperCase()}</span>
    </div>
  );
}
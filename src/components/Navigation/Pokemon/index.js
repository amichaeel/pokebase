import React from 'react';
import { ChartBarIcon, TrophyIcon, HeartIcon, ArrowTrendingUpIcon, BoltIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function PokemonPageNavigator() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 150;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  }
  return (
    <div className='px-4'>
      <div className='flex w-full bg-zinc-200 rounded-xl my-2 text-zinc-700 overflow-hidden'>
        <div className='flex items-center justify-center w-full'>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('base-stats')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <ChartBarIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Base Stats</span>
            </div>
          </div>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('training')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <TrophyIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Training</span>
            </div>
          </div>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('breeding')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <HeartIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Breeding</span>
            </div>
          </div>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('evolution-tree')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <ArrowTrendingUpIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Evolution Tree</span>
            </div>
          </div>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('moves')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <BoltIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Moves</span>
            </div>
          </div>

          <div
            className='flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-zinc-400/10'
            onClick={() => scrollToSection('sprites')}
          >
            <div className='flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center'>
              <PhotoIcon className='w-8 h-8 md:w-5 md:h-5' />
              <span className="text-xs md:text-base">Sprites</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

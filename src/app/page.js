"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { types, capitalizeWords } from "@/lib/utils";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { typeGradients } from "@/lib/utils";
import PokemonOfTheDay from "@/components/POTD";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <div className="w-full max-w-6xl p-8 mb-8">
        <div className="flex flex-col justify-center p-3 mb-3 rounded-3xl">
          <h1 className="text-4xl font-bold text-center">PokéBase</h1>
          <p className="text-sm text-black/40 text-center">
            PokéBase is under construction and will have limited functionality available for public use. Access to beta features are limited.
          </p>
        </div>
        <div className="flex bg-zinc-200 rounded-3xl flex-col md:flex-row justify-around items-center mb-8">
          <div className="w-full flex items-center justify-center md:w-1/3 p-4">
            <div>
              <h1 className="text-xl mb-2 font-semibold">Quick Links</h1>
              <ul className="grid grid-cols-2 gap-1">
                <li><Link className="text-sm hover:text-blue-500" href="/pokedex/all">National Pokédex</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Pokémon Stats</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Type Chart</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Shiny Pokemon</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Interactive Map</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Evolution Chains</Link></li>
                <li><Link className="text-sm hover:cursor-default text-gray-400" href="/">Moves</Link></li>
              </ul>
              <div className="grid lg:grid-cols-4 grid-cols-3 gap-1 py-4">
                {types.map(type => {
                  return (
                    <WideTypeIcon type={type} key={type} />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4">
            <div className="flex flex-col items-center justify-around space-y-4">
              <Link
                className="btn btn-square hover:bg-black/10 w-full"
                href='/pokedex/all'
              >
                Explore Pokédex
              </Link>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Game Mechanics
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Breeding
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Pokémon Games
              </button>
              <button
                className="btn !text-gray-400 btn-disabled w-full"
                onClick={() => router.push('/')}
              >
                Community
              </button>
            </div>
          </div>
        </div>
        <div>
          <PokemonOfTheDay />
        </div>
        <p className="text-sm text-black/40 text-center mb-6">
          Powered by PokéAPI
        </p>
      </div>
    </main>
  );
}

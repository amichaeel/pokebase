"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { types, quickLinks } from "@/lib/utils";
import WideTypeIcon from "@/components/TypeIcon/Wide";
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
          <div className="w-full flex items-center justify-center lg:w-1/3 p-4">
            <div className="flex flex-col w-full justify-center">
              <div className="flex lg:justify-start justify-center w-full mb-2 pl-2">
                <h1 className="font-semibold text-xl">
                  Quick Links
                </h1>
              </div>
              <ul className="grid grid-cols-2 align-middle gap-1 pl-2">
                {quickLinks.map((link, index) => {
                  return (
                    <li key={index} className="flex lg:justify-start justify-center">
                      <Link className={`text-sm  ${link.active ? "hover:text-blue-500" : "text-gray-400 cursor-default"}`} href={link.link}>{link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="grid lg:grid-cols-4 justify-center grid-cols-3 gap-1 py-4">
                {types.map((type, index) => {
                  return (
                    <div key={index} className="flex justify-center">
                      <WideTypeIcon type={type} key={type} />
                    </div>
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
          Powered by <Link className="hover:text-blue-400" href="https://pokeapi.co/">PokeAPI</Link>
        </p>
      </div>
    </main>
  );
}

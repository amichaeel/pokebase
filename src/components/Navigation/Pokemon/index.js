"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ChartBarIcon,
  TrophyIcon,
  HeartIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function PokemonPageNavigator() {
  const [isAtTop, setIsAtTop] = useState(false);
  const navigatorRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 150;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navigatorRef.current) {
        const rect = navigatorRef.current.getBoundingClientRect();
        setIsAtTop(rect.top <= 57);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`px-4 md:mt-0 mt-14`}>
      <div
        className={`flex transition-all w-full bg-base-100 ${isAtTop ? "drop-shadow-xl " : ""} rounded-xl my-2 overflow-hidden`}
        ref={navigatorRef}
      >
        <div className="flex items-center justify-center w-full">
          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("base-stats")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <ChartBarIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Base Stats</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("training")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <TrophyIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Training</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("breeding")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <HeartIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Breeding</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("evolution-tree")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <ArrowTrendingUpIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Evolution Tree</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("moves")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <BoltIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Moves</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("sprites")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <PhotoIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Sprites</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

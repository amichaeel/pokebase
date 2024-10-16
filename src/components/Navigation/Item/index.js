"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CircleStackIcon,
  BookOpenIcon,
  BeakerIcon,
  LanguageIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export default function ItemPageNavigator({ itemData }) {
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
        className={`flex transition-all w-full bg-base-100 ${isAtTop ? "drop-shadow-xl" : ""} rounded-xl my-2 `}
        ref={navigatorRef}
      >
        <div className="flex items-center justify-center w-full">
          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("item-data")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <CircleStackIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Item Data</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("effects")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <BeakerIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Effects</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("game-descriptions")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <BookOpenIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Game Descriptions</span>
            </div>
          </div>

          <div
            className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
            onClick={() => scrollToSection("other-languages")}
          >
            <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
              <LanguageIcon className="w-8 h-8 md:w-5 md:h-5" />
              <span className="text-xs md:text-base">Other Languages</span>
            </div>
          </div>

          {itemData.held_by_pokemon.length > 0 && (
            <div
              className="flex h-full items-center justify-center w-full md:p-3 p-1 flex-grow cursor-pointer hover:bg-base-200"
              onClick={() => scrollToSection("held-by-pokemon")}
            >
              <div className="flex md:flex-row md:space-x-2 flex-col text-center items-center justify-center">
                <HandRaisedIcon className="w-8 h-8 md:w-5 md:h-5" />
                <span className="text-xs md:text-base">Held By</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

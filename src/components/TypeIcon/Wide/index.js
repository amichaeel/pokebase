import React from "react";

import { typeColors } from "@/lib/utils";

export default function WideTypeIcon({ type }) {
  const typeClass = typeColors[type.toLowerCase()] || "bg-gray-400";

  return (
    <div
      className={`flex justify-center text-xs text-white py-1 px-4 w-16 rounded-md border-[1px] border-black/40 ${typeClass} hover:opacity-90 transition-all cursor-pointer`}
    >
      <span className="text-shadow-sm shadow-black">{type.toUpperCase()}</span>
    </div>
  );
}

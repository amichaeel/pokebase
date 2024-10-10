import React from "react";

import { typeColors } from "@/lib/utils";
import Link from "next/link";

export default function WideTypeIcon({ type, condensed = false }) {
  const typeClass = typeColors[type.toLowerCase()] || "bg-gray-400";

  return (
    <Link
      href={`/type/${type}`}
      className={`flex justify-center text-xs text-white ${condensed ? "w-5 py-1 px-3" : "w-16 py-1 px-4"} rounded-md border-[1px] border-black/40 ${typeClass} hover:opacity-90 transition-all cursor-pointer`}
    >
      <div href={`/type/${type}`} className="text-shadow-sm shadow-black">
        {condensed ? type.substring(0, 3).toUpperCase() : type.toUpperCase()}
      </div>
    </Link>
  );
}

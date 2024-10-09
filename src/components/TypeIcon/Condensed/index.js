import React from "react";

import { typeTextColors, capitalizeWords } from "@/lib/utils";

export default function CondensedTypeIcon({ type }) {
  const typeClass = typeTextColors[type.toLowerCase()] || "text-gray-400";

  return (
    <span className={`text-sm ${typeClass}`}>{capitalizeWords(type)}</span>
  );
}

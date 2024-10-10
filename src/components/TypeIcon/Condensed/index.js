import React from "react";

import { typeTextColors, capitalizeWords } from "@/lib/utils";
import Link from "next/link";

export default function CondensedTypeIcon({ type }) {
  const typeClass = typeTextColors[type.toLowerCase()] || "text-gray-400";

  return (
    <Link
      href={`/type/${type}`}
      className={`text-sm ${typeClass} hover:underline`}
    >
      {capitalizeWords(type)}
    </Link>
  );
}

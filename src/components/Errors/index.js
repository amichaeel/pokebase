import React from "react";
import Image from "next/image";

export default function Error({ message }) {
  const displayMessage = (message) => {
    if (message && message.includes("fetch")) {
      return (
        <div>
          <span>Make sure you are connected to the internet, then </span>
          <span
            onClick={() => window.location.reload()}
            className="text-blue-400 hover:underline hover:cursor-pointer"
          >
            refresh
          </span>
          <span> the page.</span>
        </div>
      );
    } else if (message && message.includes("Pokemon not found")) {
      return (
        <div>
          <span>{message}</span>
        </div>
      );
    } else {
      return <span>An unexpected error occurred.</span>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-12">
      <img
        src="/snorlax_sleeping.gif"
        alt="Error"
        className="w-28 h-28 rendering-pixelated"
      />
      <span className="font-semibold">
        Uh oh! Failed to fetch requested page.
      </span>
      <div className="text-xs text-gray-700">{displayMessage(message)}</div>
    </div>
  );
}

import React from 'react';

export default function PikachuLoader() {
  return (
    <div className="flex items-center rendering-pixelated justify-center h-screen -mt-12">
      <img src="/pikachu_running.webp" alt="Loading..." className="w-28 h-28" />
    </div>
  );
}

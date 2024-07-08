export const capitalizeWords = (string) => {
  return string.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
};

export const typeGradients = {
  normal: 'linear-gradient(to bottom, rgba(156, 163, 175, 0.6), rgba(107, 114, 128, 0.9))', // gray
  fire: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.6), rgba(220, 38, 38, 0.9))', // red
  water: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.9))', // blue
  electric: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), rgba(234, 179, 8, 0.9))', // yellow
  grass: 'linear-gradient(to bottom, rgba(34, 197, 94, 0.6), rgba(22, 163, 74, 0.9))', // green
  ice: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.6), rgba(125, 211, 252, 0.9))', // blue
  fighting: 'linear-gradient(to bottom, rgba(185, 28, 28, 0.6), rgba(153, 27, 27, 0.9))', // red
  poison: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.9))', // purple
  ground: 'linear-gradient(to bottom, rgba(202, 138, 4, 0.6), rgba(163, 88, 5, 0.9))', // yellow
  flying: 'linear-gradient(to bottom, rgba(129, 140, 248, 0.6), rgba(99, 102, 241, 0.9))', // indigo
  psychic: 'linear-gradient(to bottom, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.9))', // pink
  bug: 'linear-gradient(to bottom, rgba(52, 211, 153, 0.6), rgba(16, 185, 129, 0.9))', // green
  rock: 'linear-gradient(to bottom, rgba(120, 113, 108, 0.6), rgba(75, 85, 99, 0.9))', // yellow
  ghost: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.9))', // indigo
  dragon: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.6), rgba(124, 58, 237, 0.9))', // purple
  dark: 'linear-gradient(to bottom, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.9))', // gray
  steel: 'linear-gradient(to bottom, rgba(107, 114, 128, 0.6), rgba(75, 85, 99, 0.9))', // gray
  fairy: 'linear-gradient(to bottom, rgba(232, 121, 249, 0.6), rgba(217, 70, 239, 0.9))', // pink
};

export const moveCatergories = {
  physical: "/move-physical.png",
  status: "/move-status.png",
  special: "/move-special.png"
}

export const regions = [
  { name: "kanto", url: "https://pokeapi.co/api/v2/pokedex/2/" },
  { name: "original-johto", url: "https://pokeapi.co/api/v2/pokedex/3/" },
  { name: "hoenn", url: "https://pokeapi.co/api/v2/pokedex/4/" },
  { name: "original-sinnoh", url: "https://pokeapi.co/api/v2/pokedex/5/" },
  { name: "extended-sinnoh", url: "https://pokeapi.co/api/v2/pokedex/6/" },
  { name: "updated-johto", url: "https://pokeapi.co/api/v2/pokedex/7/" },
  { name: "original-unova", url: "https://pokeapi.co/api/v2/pokedex/8/" },
  { name: "updated-unova", url: "https://pokeapi.co/api/v2/pokedex/9/" },
  { name: "conquest-gallery", url: "https://pokeapi.co/api/v2/pokedex/11/" },
  { name: "kalos-central", url: "https://pokeapi.co/api/v2/pokedex/12/" },
  { name: "kalos-coastal", url: "https://pokeapi.co/api/v2/pokedex/13/" },
  { name: "kalos-mountain", url: "https://pokeapi.co/api/v2/pokedex/14/" },
  { name: "updated-hoenn", url: "https://pokeapi.co/api/v2/pokedex/15/" },
  { name: "original-alola", url: "https://pokeapi.co/api/v2/pokedex/16/" },
  { name: "original-melemele", url: "https://pokeapi.co/api/v2/pokedex/17/" },
  { name: "original-akala", url: "https://pokeapi.co/api/v2/pokedex/18/" },
  { name: "original-ulaula", url: "https://pokeapi.co/api/v2/pokedex/19/" },
  { name: "original-poni", url: "https://pokeapi.co/api/v2/pokedex/20/" },
  { name: "updated-alola", url: "https://pokeapi.co/api/v2/pokedex/21/" }
];

export const pokedexMap = {
  "kanto": {
    "url": "https://pokeapi.co/api/v2/pokedex/2/",
    "games": ["Red", "Blue", "Green", "Yellow", "FireRed", "LeafGreen", "Let's Go, Pikachu!", "Let's Go, Eevee!"],
    "generation": 1
  },
  "original-johto": {
    "url": "https://pokeapi.co/api/v2/pokedex/3/",
    "games": ["Gold", "Silver", "Crystal"],
    "generation": 2
  },
  "hoenn": {
    "url": "https://pokeapi.co/api/v2/pokedex/4/",
    "games": ["Ruby", "Sapphire", "Emerald"],
    "generation": 3
  },
  "original-sinnoh": {
    "url": "https://pokeapi.co/api/v2/pokedex/5/",
    "games": ["Diamond", "Pearl"],
    "generation": 4
  },
  "extended-sinnoh": {
    "url": "https://pokeapi.co/api/v2/pokedex/6/",
    "games": ["Diamond", "Pearl", "Platinum"],
    "generation": 4
  },
  "updated-johto": {
    "url": "https://pokeapi.co/api/v2/pokedex/7/",
    "games": ["HeartGold", "SoulSilver"],
    "generation": 4
  },
  "original-unova": {
    "url": "https://pokeapi.co/api/v2/pokedex/8/",
    "games": ["Black", "White"],
    "generation": 5
  },
  "updated-unova": {
    "url": "https://pokeapi.co/api/v2/pokedex/9/",
    "games": ["Black 2", "White 2"],
    "generation": 5
  },
  "conquest-gallery": {
    "url": "https://pokeapi.co/api/v2/pokedex/11/",
    "games": ["Pokémon Conquest"],
    "generation": 5
  },
  "kalos-central": {
    "url": "https://pokeapi.co/api/v2/pokedex/12/",
    "games": ["X", "Y"],
    "generation": 6
  },
  "kalos-coastal": {
    "url": "https://pokeapi.co/api/v2/pokedex/13/",
    "games": ["X", "Y"],
    "generation": 6
  },
  "kalos-mountain": {
    "url": "https://pokeapi.co/api/v2/pokedex/14/",
    "games": ["X", "Y"],
    "generation": 6
  },
  "updated-hoenn": {
    "url": "https://pokeapi.co/api/v2/pokedex/15/",
    "games": ["Omega Ruby", "Alpha Sapphire"],
    "generation": 6
  },
  "original-alola": {
    "url": "https://pokeapi.co/api/v2/pokedex/16/",
    "games": ["Sun", "Moon"],
    "generation": 7
  },
  "original-melemele": {
    "url": "https://pokeapi.co/api/v2/pokedex/17/",
    "games": ["Sun", "Moon"],
    "generation": 7
  },
  "original-akala": {
    "url": "https://pokeapi.co/api/v2/pokedex/18/",
    "games": ["Sun", "Moon"],
    "generation": 7
  },
  "original-ulaula": {
    "url": "https://pokeapi.co/api/v2/pokedex/19/",
    "games": ["Sun", "Moon"],
    "generation": 7
  },
  "original-poni": {
    "url": "https://pokeapi.co/api/v2/pokedex/20/",
    "games": ["Sun", "Moon"],
    "generation": 7
  },
  "updated-alola": {
    "url": "https://pokeapi.co/api/v2/pokedex/21/",
    "games": ["Ultra Sun", "Ultra Moon"],
    "generation": 7
  },
  "updated-melemele": {
    "url": "https://pokeapi.co/api/v2/pokedex/22/",
    "games": ["Ultra Sun", "Ultra Moon"],
    "generation": 7
  },
  "updated-akala": {
    "url": "https://pokeapi.co/api/v2/pokedex/23/",
    "games": ["Ultra Sun", "Ultra Moon"],
    "generation": 7
  },
  "updated-ulaula": {
    "url": "https://pokeapi.co/api/v2/pokedex/24/",
    "games": ["Ultra Sun", "Ultra Moon"],
    "generation": 7
  },
  "updated-poni": {
    "url": "https://pokeapi.co/api/v2/pokedex/25/",
    "games": ["Ultra Sun", "Ultra Moon"],
    "generation": 7
  },
  "letsgo-kanto": {
    "url": "https://pokeapi.co/api/v2/pokedex/26/",
    "games": ["Let's Go, Pikachu!", "Let's Go, Eevee!"],
    "generation": 1
  },
  "galar": {
    "url": "https://pokeapi.co/api/v2/pokedex/27/",
    "games": ["Sword", "Shield"],
    "generation": 8
  },
  "isle-of-armor": {
    "url": "https://pokeapi.co/api/v2/pokedex/28/",
    "games": ["Sword", "Shield"],
    "generation": 8
  },
  "crown-tundra": {
    "url": "https://pokeapi.co/api/v2/pokedex/29/",
    "games": ["Sword", "Shield"],
    "generation": 8
  },
  "hisui": {
    "url": "https://pokeapi.co/api/v2/pokedex/30/",
    "games": ["Legends: Arceus"],
    "generation": 8
  },
  "paldea": {
    "url": "https://pokeapi.co/api/v2/pokedex/31/",
    "games": ["Scarlet", "Violet"],
    "generation": 9
  },
  "kitakami": {
    "url": "https://pokeapi.co/api/v2/pokedex/32/",
    "games": ["Scarlet", "Violet"],
    "generation": 9
  },
  "blueberry": {
    "url": "https://pokeapi.co/api/v2/pokedex/33/",
    "games": ["Scarlet", "Violet"],
    "generation": 9
  }
};
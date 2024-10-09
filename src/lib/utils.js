export const capitalizeWords = (string) => {
  return string
    .split("-")
    .map((word) => {
      return /^[a-zA-Z]/.test(word)
        ? word[0].toUpperCase() + word.slice(1)
        : word;
    })
    .join(" ");
};

export const typeGradients = {
  normal:
    "linear-gradient(to bottom, rgba(156, 163, 175, 0.6), rgba(107, 114, 128, 0.9))", // gray
  fire: "linear-gradient(to bottom, rgba(239, 68, 68, 0.6), rgba(220, 38, 38, 0.9))", // red
  water:
    "linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.9))", // blue
  electric:
    "linear-gradient(to bottom, rgba(251, 191, 36, 0.6), rgba(234, 179, 8, 0.9))", // yellow
  grass:
    "linear-gradient(to bottom, rgba(34, 197, 94, 0.6), rgba(22, 163, 74, 0.9))", // green
  ice: "linear-gradient(to bottom, rgba(147, 197, 253, 0.6), rgba(125, 211, 252, 0.9))", // blue
  fighting:
    "linear-gradient(to bottom, rgba(185, 28, 28, 0.6), rgba(153, 27, 27, 0.9))", // red
  poison:
    "linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.9))", // purple
  ground:
    "linear-gradient(to bottom, rgba(202, 138, 4, 0.6), rgba(163, 88, 5, 0.9))", // yellow
  flying:
    "linear-gradient(to bottom, rgba(129, 140, 248, 0.6), rgba(99, 102, 241, 0.9))", // indigo
  psychic:
    "linear-gradient(to bottom, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.9))", // pink
  bug: "linear-gradient(to bottom, rgba(52, 211, 153, 0.6), rgba(16, 185, 129, 0.9))", // green
  rock: "linear-gradient(to bottom, rgba(120, 113, 108, 0.6), rgba(75, 85, 99, 0.9))", // yellow
  ghost:
    "linear-gradient(to bottom, rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.9))", // indigo
  dragon:
    "linear-gradient(to bottom, rgba(147, 51, 234, 0.6), rgba(124, 58, 237, 0.9))", // purple
  dark: "linear-gradient(to bottom, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.9))", // gray
  steel:
    "linear-gradient(to bottom, rgba(107, 114, 128, 0.6), rgba(75, 85, 99, 0.9))", // gray
  fairy:
    "linear-gradient(to bottom, rgba(232, 121, 249, 0.6), rgba(217, 70, 239, 0.9))", // pink
};

export const types = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

export const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-700",
  rock: "bg-yellow-800",
  ghost: "bg-indigo-700",
  dragon: "bg-purple-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const typeTextColors = {
  normal: "text-gray-600", // Slightly darker gray for better readability
  fire: "text-red-400", // Lighter red
  water: "text-blue-400", // Lighter blue
  electric: "text-yellow-500", // Brighter yellow for better contrast
  grass: "text-green-400", // Lighter green
  ice: "text-blue-200", // Lighter blue
  fighting: "text-red-600", // Darker red for better readability
  poison: "text-purple-400", // Lighter purple
  ground: "text-yellow-600", // Darker yellow
  flying: "text-indigo-300", // Lighter indigo
  psychic: "text-pink-400", // Lighter pink
  bug: "text-green-600", // Darker green for better readability
  rock: "text-yellow-600", // Darker yellow
  ghost: "text-indigo-600", // Darker indigo
  dragon: "text-purple-600", // Darker purple
  dark: "text-gray-700", // Darker gray
  steel: "text-gray-400", // Lighter gray for better contrast
  fairy: "text-pink-200", // Lighter pink
};

export const moveCatergories = {
  physical: "/move-physical.png",
  status: "/move-status.png",
  special: "/move-special.png",
};

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
  { name: "updated-alola", url: "https://pokeapi.co/api/v2/pokedex/21/" },
];

export const pokedexMap = {
  kanto: {
    url: "https://pokeapi.co/api/v2/pokedex/2/",
    games: [
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "FireRed",
      "LeafGreen",
      "Let's Go, Pikachu!",
      "Let's Go, Eevee!",
    ],
    generation: 1,
  },
  "original-johto": {
    url: "https://pokeapi.co/api/v2/pokedex/3/",
    games: ["Gold", "Silver", "Crystal"],
    generation: 2,
  },
  hoenn: {
    url: "https://pokeapi.co/api/v2/pokedex/4/",
    games: ["Ruby", "Sapphire", "Emerald"],
    generation: 3,
  },
  "original-sinnoh": {
    url: "https://pokeapi.co/api/v2/pokedex/5/",
    games: ["Diamond", "Pearl"],
    generation: 4,
  },
  "extended-sinnoh": {
    url: "https://pokeapi.co/api/v2/pokedex/6/",
    games: ["Diamond", "Pearl", "Platinum"],
    generation: 4,
  },
  "updated-johto": {
    url: "https://pokeapi.co/api/v2/pokedex/7/",
    games: ["HeartGold", "SoulSilver"],
    generation: 4,
  },
  "original-unova": {
    url: "https://pokeapi.co/api/v2/pokedex/8/",
    games: ["Black", "White"],
    generation: 5,
  },
  "updated-unova": {
    url: "https://pokeapi.co/api/v2/pokedex/9/",
    games: ["Black 2", "White 2"],
    generation: 5,
  },
  "conquest-gallery": {
    url: "https://pokeapi.co/api/v2/pokedex/11/",
    games: ["Pokémon Conquest"],
    generation: 5,
  },
  "kalos-central": {
    url: "https://pokeapi.co/api/v2/pokedex/12/",
    games: ["X", "Y"],
    generation: 6,
  },
  "kalos-coastal": {
    url: "https://pokeapi.co/api/v2/pokedex/13/",
    games: ["X", "Y"],
    generation: 6,
  },
  "kalos-mountain": {
    url: "https://pokeapi.co/api/v2/pokedex/14/",
    games: ["X", "Y"],
    generation: 6,
  },
  "updated-hoenn": {
    url: "https://pokeapi.co/api/v2/pokedex/15/",
    games: ["Omega Ruby", "Alpha Sapphire"],
    generation: 6,
  },
  "original-alola": {
    url: "https://pokeapi.co/api/v2/pokedex/16/",
    games: ["Sun/Moon — Alola Dex"],
    generation: 7,
  },
  "original-melemele": {
    url: "https://pokeapi.co/api/v2/pokedex/17/",
    games: ["Sun/Moon — Melemele Dex"],
    generation: 7,
  },
  "original-akala": {
    url: "https://pokeapi.co/api/v2/pokedex/18/",
    games: ["Sun/Moon — Akala Dex"],
    generation: 7,
  },
  "original-ulaula": {
    url: "https://pokeapi.co/api/v2/pokedex/19/",
    games: ["Sun/Moon — Ulaula Dex"],
    generation: 7,
  },
  "original-poni": {
    url: "https://pokeapi.co/api/v2/pokedex/20/",
    games: ["Sun/Moon — Poni Dex"],
    generation: 7,
  },
  "updated-alola": {
    url: "https://pokeapi.co/api/v2/pokedex/21/",
    games: ["U. Sun/U. Moon — Alola Dex"],
    generation: 7,
  },
  "updated-melemele": {
    url: "https://pokeapi.co/api/v2/pokedex/22/",
    games: ["U. Sun/U. Moon — Melemele Dex"],
    generation: 7,
  },
  "updated-akala": {
    url: "https://pokeapi.co/api/v2/pokedex/23/",
    games: ["U. Sun/U. Moon — Akala Dex"],
    generation: 7,
  },
  "updated-ulaula": {
    url: "https://pokeapi.co/api/v2/pokedex/24/",
    games: ["U. Sun/U. Moon — Ulaula Dex"],
    generation: 7,
  },
  "updated-poni": {
    url: "https://pokeapi.co/api/v2/pokedex/25/",
    games: ["U. Sun/U. Moon — Poni Dex"],
    generation: 7,
  },
  "letsgo-kanto": {
    url: "https://pokeapi.co/api/v2/pokedex/26/",
    games: ["Let's Go Pikachu!", "Let's Go Eevee!"],
    generation: 1,
  },
  galar: {
    url: "https://pokeapi.co/api/v2/pokedex/27/",
    games: ["Sword", "Shield"],
    generation: 8,
  },
  "isle-of-armor": {
    url: "https://pokeapi.co/api/v2/pokedex/28/",
    games: ["The Isle of Armor"],
    generation: 8,
  },
  "crown-tundra": {
    url: "https://pokeapi.co/api/v2/pokedex/29/",
    games: ["The Crown Tundra"],
    generation: 8,
  },
  hisui: {
    url: "https://pokeapi.co/api/v2/pokedex/30/",
    games: ["Legends: Arceus"],
    generation: 8,
  },
  paldea: {
    url: "https://pokeapi.co/api/v2/pokedex/31/",
    games: ["Scarlet", "Violet"],
    generation: 9,
  },
  kitakami: {
    url: "https://pokeapi.co/api/v2/pokedex/32/",
    games: ["The Teal Mask"],
    generation: 9,
  },
  blueberry: {
    url: "https://pokeapi.co/api/v2/pokedex/33/",
    games: ["The Indigo Disk"],
    generation: 9,
  },
};

export const quickLinks = [
  {
    name: "National Pokedex",
    link: "/pokedex/all",
    active: true,
  },
  {
    name: "All Items",
    link: "/item/all",
    active: true,
  },
  {
    name: "All Moves",
    link: "/move/all",
    active: true,
  },
  {
    name: "Pokémon Stats",
    link: "/",
    active: false,
  },
  {
    name: "Type Chart",
    link: "/",
    active: false,
  },
  {
    name: "Shiny Pokemon",
    link: "/",
    active: false,
  },
  {
    name: "Interactive Map",
    link: "/",
    active: false,
  },
  {
    name: "Evolution Trees",
    link: "/",
    active: false,
  },
];

export const languages = [
  { name: "ja-Hrkt", fullName: "Japanese (Hiragana/Katakana)" },
  { name: "roomaji", fullName: "Romaji" },
  { name: "ko", fullName: "Korean" },
  { name: "zh-Hant", fullName: "Chinese (Traditional)" },
  { name: "fr", fullName: "French" },
  { name: "de", fullName: "German" },
  { name: "es", fullName: "Spanish" },
  { name: "it", fullName: "Italian" },
  { name: "en", fullName: "English" },
  { name: "cs", fullName: "Czech" },
  { name: "ja", fullName: "Japanese" },
  { name: "zh-Hans", fullName: "Chinese (Simplified)" },
  { name: "pt-BR", fullName: "Portuguese (Brazil)" },
];

export const versionGroups = [
  { name: "red-blue", fullName: "Red/Blue" },
  { name: "yellow", fullName: "Yellow" },
  { name: "gold-silver", fullName: "Gold/Silver" },
  { name: "crystal", fullName: "Crystal" },
  { name: "ruby-sapphire", fullName: "Ruby/Sapphire" },
  { name: "emerald", fullName: "Emerald" },
  { name: "firered-leafgreen", fullName: "FireRed/LeafGreen" },
  { name: "diamond-pearl", fullName: "Diamond/Pearl" },
  { name: "platinum", fullName: "Platinum" },
  { name: "heartgold-soulsilver", fullName: "HeartGold/SoulSilver" },
  { name: "black-white", fullName: "Black/White" },
  { name: "colosseum", fullName: "Colosseum" },
  { name: "xd", fullName: "XD: Gale of Darkness" },
  { name: "black-2-white-2", fullName: "Black 2/White 2" },
  { name: "x-y", fullName: "X/Y" },
  { name: "omega-ruby-alpha-sapphire", fullName: "Omega Ruby/Alpha Sapphire" },
  { name: "sun-moon", fullName: "Sun/Moon" },
  { name: "ultra-sun-ultra-moon", fullName: "Ultra Sun/Ultra Moon" },
  {
    name: "lets-go-pikachu-lets-go-eevee",
    fullName: "Let's Go, Pikachu!/Let's Go, Eevee!",
  },
  { name: "sword-shield", fullName: "Sword/Shield" },
  { name: "the-isle-of-armor", fullName: "The Isle of Armor" },
  { name: "the-crown-tundra", fullName: "The Crown Tundra" },
  {
    name: "brilliant-diamond-and-shining-pearl",
    fullName: "Brilliant Diamond/Shining Pearl",
  },
  { name: "legends-arceus", fullName: "Legends: Arceus" },
  { name: "scarlet-violet", fullName: "Scarlet/Violet" },
  { name: "the-teal-mask", fullName: "The Teal Mask" },
  { name: "the-indigo-disk", fullName: "The Indigo Disk" },
];

export const gameColors = {
  Red: "#B71C1C", // Dark red
  Blue: "#0D47A1", // Dark blue
  Yellow: "#F57F17", // Dark yellow
  Gold: "#FFD700", // Gold (no change needed)
  Silver: "#757575", // Dark gray
  Crystal: "#0097A7", // Dark cyan
  Ruby: "#D32F2F", // Dark ruby
  Sapphire: "#1976D2", // Dark sapphire
  Emerald: "#2E7D32", // Dark green
  FireRed: "#C62828", // Dark orange-red
  LeafGreen: "#558B2F", // Dark green
  Diamond: "#0277BD", // Dark blue
  Pearl: "#C2185B", // Dark pink
  Platinum: "#757575", // Dark gray
  HeartGold: "#FFA000", // Dark gold
  SoulSilver: "#757575", // Dark gray
  Black: "#595959", // Dark black
  White: "#BDBDBD", // Dark gray
  Colosseum: "#512DA8", // Dark purple
  "XD: Gale of Darkness": "#673AB7", // Medium purple
  "Black 2": "#595959", // Dark black
  "White 2": "#BDBDBD", // Dark gray
  X: "#AD1457", // Dark pink
  Y: "#6A1B9A", // Dark purple
  "Omega Ruby": "#D32F2F", // Dark ruby
  "Alpha Sapphire": "#1976D2", // Dark sapphire
  Sun: "#E65100", // Dark orange
  Moon: "#4A148C", // Dark purple
  "Ultra Sun": "#EF6C00", // Dark orange
  "Ultra Moon": "#283593", // Dark blue
  "Let's Go, Pikachu!": "#FBC02D", // Dark yellow
  "Let's Go, Eevee!": "#6D4C41", // Dark brown
  Sword: "#1565C0", // Dark blue
  Shield: "#D32F2F", // Dark red
  "The Isle of Armor": "#FFA000", // Dark yellow
  "The Crown Tundra": "#0288D1", // Dark blue
  "Brilliant Diamond": "#0277BD", // Dark blue
  "Shining Pearl": "#C2185B", // Dark pink
  "Legends: Arceus": "#616161", // Dark gray
  Scarlet: "#C62828", // Dark red
  Violet: "#6A1B9A", // Dark purple
  "The Teal Mask": "#00796B", // Dark teal
  "The Indigo Disk": "#303F9F", // Dark indigo
};

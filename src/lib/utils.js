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
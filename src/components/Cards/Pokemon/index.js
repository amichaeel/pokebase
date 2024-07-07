import Link from "next/link";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { capitalizeWords } from "@/lib/utils";

const PokemonCard = ({ pokemon }) => {
  const isVariety = pokemon.name !== pokemon.data.pokemon.name;
  console.log(pokemon);

  return (
    <Link href={`/pokedex/${pokemon.name}`} className='w-full h-full'>
      <div className="flex flex-col justify-between h-full w-full items-center rounded-lg hover:bg-black/10 p-4 hover:cursor-pointer">
        <div className="w-36 h-36 relative">
          {pokemon.data.pokemon.data.sprites.other.home.front_default ? (
            <img src={pokemon.data.pokemon.data.sprites.other.home.front_default} alt={pokemon.name} className="w-full h-full object-contain" />
          ) : (
            <NoSymbolIcon className="w-full h-full" />
          )}
        </div>
        <span className="font-bold">{`#${pokemon.id.toString().padStart(4, '0')}`}</span>
        <span className="text-lg">{capitalizeWords(pokemon.name)}</span>
        {isVariety ? (
          <span className="text-sm mb-2">{capitalizeWords(pokemon.data.pokemon.name)}</span>
        ) : (
          <span className="text-sm mb-2">‎</span>
        )}
        <div className="flex space-x-2">
          {pokemon.data.pokemon.data.types.map((typeInfo) => (
            <WideTypeIcon key={typeInfo.type.name} type={typeInfo.type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

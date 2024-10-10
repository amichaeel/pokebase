import Link from "next/link";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import WideTypeIcon from "@/components/TypeIcon/Wide";
import { capitalizeWords } from "@/lib/utils";

const PokemonCard = ({ pokemon }) => {
  const isVariety = pokemon.name !== pokemon.data.name;

  return (
    <Link
      prefetch={false}
      href={`/pokedex/${pokemon.name}`}
      className="w-full h-full"
    >
      <div className="flex flex-col justify-between h-full w-full items-center rounded-lg hover:bg-base-100 p-4 hover:cursor-pointer">
        <div className="w-36 h-36 relative">
          {pokemon.data.sprites.home_default ? (
            <img
              src={pokemon.data.sprites.home_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <NoSymbolIcon className="size-8" />
            </div>
          )}
        </div>
        <span className="text-sm text-base-content/50">{`#${pokemon.id.toString().padStart(4, "0")}`}</span>
        <span className="text-lg">{capitalizeWords(pokemon.name)}</span>
        {isVariety ? (
          <span className="text-sm mb-2 text-center">
            {capitalizeWords(pokemon.data.name)}
          </span>
        ) : (
          <span className="text-sm mb-2">‎</span>
        )}
        <div className="flex space-x-2">
          {pokemon.data.types.map((typeName) => (
            <WideTypeIcon key={typeName} type={typeName} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

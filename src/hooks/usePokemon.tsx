import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
//   sprites: {
//     front_default: string;
//   };
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    const getPokemonById = async (id: number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const { name, sprites } = data;
      setPokemon({
        id,
        name,
        imageUrl: sprites.front_default,
      });
    };

    useEffect(() => {
      getPokemonById(id);
    }, [id]);

  return { 
    pokemon,
    formattedId: id.toString().padStart(3, '0')
 }
}


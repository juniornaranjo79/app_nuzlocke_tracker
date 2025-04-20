import React, { useState, useEffect } from "react";
import { useTracker } from "../../../../hooks/useTracker.tsx";

interface Props {
  url: string;
}

const CardPokemon = ({ url }: Props) => {
  const { addPokemonTo } = useTracker();
  console.log("url", url);
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    sprite: string;
    types: string;
  } | null>(null);

  console.log("pokemon", pokemon);
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        setPokemon({
          id: data.id,
          name: data.name,
          sprite: data.sprites.other["official-artwork"].front_default,
          types: data.types
            .map((types: { type: { name: string } }) => types.type.name)
            .join(", "),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [url]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemonDisplay">
      <div className="pokemonInfo">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <p>NOMBRE: {pokemon.name}</p>
        <p>TIPO: {pokemon.types}</p>
      </div>
      <div className="buttonsAdd">
        <button
          /* disabled={storedData.party.length >= 6} */
          onClick={() => addPokemonTo("party", pokemon)}
        >
          Añadir al equipo
        </button>
        <button onClick={() => addPokemonTo("pc", pokemon)}>
          Añadir al PC
        </button>
      </div>
    </div>
  );
};

export default CardPokemon;

import React from "react";
import { IconGrave, IconDeviceImac } from "@tabler/icons-react";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

interface PartyProps {
  party: Pokemon[];
  movePokemon: (from: string, to: string, pokemon: Pokemon) => void;
  evolvePokemon: (pokemon: Pokemon) => void;
}

const TheParty = ({ party, movePokemon, evolvePokemon }: PartyProps) => {
  return (
    <div>
      <div className="headerTitle">
        <h3>POKEMONES:</h3>
      </div>
      <div className="pokemonList">
        {party.map((pokemon) => (
          <div key={pokemon.id} className="pokemonContainer">
            <div className="pokemonContainerImg">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
            <div>
              <IconGrave
                onClick={() => movePokemon("party", "graveyard", pokemon)}
              />
              <IconDeviceImac
                onClick={() => movePokemon("party", "pc", pokemon)}
              />
            </div>
            <button onClick={() => evolvePokemon(pokemon)}>Evolucionar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheParty;

import React from "react";
import { IconPokeball, IconPokeballOff } from "@tabler/icons-react";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

interface PartyProps {
  pc: Pokemon[];
  movePokemon: (pokemon: Pokemon, from: string, to: string) => void;
  disabled: number;
}

const ThePc = ({ pc, movePokemon, disabled }: PartyProps) => {
  return (
    <div>
      <div className="headerTitle">
        <h3>PC:</h3>
      </div>
      <div className="pokemonList">
        {pc.map((pokemon) => (
          <div key={pokemon.id} className="pokemonContainer">
            <div className="pcContainerImg">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
            <div>
              <button
                disabled={disabled >= 6}
                onClick={() => movePokemon(pokemon, "pc", "party")}
              >
                MOVER A EQUIPO
              </button>
              {/* {disabled >= 6 ? <IconPokeballOff /> : <IconPokeball />} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThePc;

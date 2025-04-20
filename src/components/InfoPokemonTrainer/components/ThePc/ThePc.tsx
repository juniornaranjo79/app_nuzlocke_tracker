import React from "react";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

interface PartyProps {
  pc: Pokemon[];
  movePokemon: (from: string, to: string, pokemon: Pokemon) => void;
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
                onClick={() => movePokemon("pc", "party", pokemon)}
              >
                MOVER A EQUIPO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThePc;

import React from "react";

interface Props {
  name: string;
  sprite: string;
  types: Array<object>;
  addTeam: () => void;
  addPc: () => void;
}

const CardPokemon = ({ name, sprite, types, addTeam, addPc }: Props) => {
  return (
    <div className="pokemonDisplay">
      <div className="pokemonInfo">
        <img src={sprite} alt={name} />
        <p>NOMBRE: {name}</p>
        <p>TIPO: {types}</p>
      </div>
      {/* <div className="buttonsAdd">
        <button
          disabled={storedData.party.length >= 6}
          onClick={() => addTeam("party")}
        >
          Añadir al equipo
        </button>
        <button onClick={() => addPc("pc")}>Añadir al PC</button>
      </div> */}
    </div>
  );
};

export default CardPokemon;

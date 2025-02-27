import React from "react";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

interface GraveProps {
  graveyard: Pokemon[];
}

const TheGraveyard = ({ graveyard }: GraveProps) => {
  return (
    <div>
      <div className="headerTitle">
        <h3>CEMENTERIO:</h3>
      </div>
      <div className="pokemonList">
        {graveyard.map((pokemon) => (
          <div key={pokemon.id} className="pokemonContainer">
            <div className="graveyardContainerImg">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheGraveyard;

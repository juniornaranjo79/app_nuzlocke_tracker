import React, { useState } from "react";
import { IconPokeball } from "@tabler/icons-react";
import GridPokemons from "../GridPokemons/GridPokemons.tsx";

const AddPokemon = () => {
  const [searchedPokemon, setSearchedPokemon] = useState("");

  return (
    <div className="container">
      <div className="headerTitle">
        <IconPokeball size={19} stroke={2} />
        <h2>AGREGAR POKÉMON</h2>
      </div>
      <div>
        <div className="searchPokemon">
          <input
            type="text"
            value={searchedPokemon}
            onChange={(e) => setSearchedPokemon(e.target.value)}
            placeholder="Buscar Pokémon"
          />
        </div>
      </div>
      <GridPokemons searchPokemon={searchedPokemon} />
    </div>
  );
};

export default AddPokemon;

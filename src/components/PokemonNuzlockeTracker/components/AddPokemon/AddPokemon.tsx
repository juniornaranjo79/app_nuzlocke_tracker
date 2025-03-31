import React, { useState } from "react";
import { IconPokeball } from "@tabler/icons-react";
import GridPokemons from "../GridPokemons/GridPokemons.tsx";

const AddPokemon = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState("");

  const addPokemon = (addTo: "party" | "pc") => {
    if (!selectedPokemon) return;
    const storedData = JSON.parse(
      localStorage.getItem("nuzlockeTracker") || "{}"
    ) || {
      trainerName: "",
      lives: 0,
      party: [],
      pc: [],
    };

    const updatedData = {
      ...storedData,
      [addTo]: [...storedData[addTo], setSelectedPokemon],
    };

    localStorage.setItem("nuzlockeTracker", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("trainerDataUpdated"));
    setSelectedPokemon(null);
  };

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
      <GridPokemons
        searchPokemon={searchedPokemon}
        onSelectPokemon={setSelectedPokemon}
      />
      {selectedPokemon && (
        <div className="buttonsAdd">
          <button onClick={() => addPokemon("party")}>Añadir al equipo</button>
          <button onClick={() => addPokemon("pc")}>Añadir al PC</button>
        </div>
      )}
    </div>
  );
};

export default AddPokemon;

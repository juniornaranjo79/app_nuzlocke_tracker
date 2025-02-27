import React, { useState } from "react";
import { IconPokeball } from "@tabler/icons-react";

const AddPokemon = () => {
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error, setError] = useState(null);

  const [pokemonName, setPokemonName] = useState("");

  const storedData = JSON.parse(
    localStorage.getItem("nuzlockeTracker") || "{}"
  );

  const fetchPokemon = async () => {
    if (!pokemonName) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const data = await response.json();
      setSearchedPokemon({
        id: data.id,
        name: data.name,
        sprite: data.sprites.other.home.front_default,
        types: data.types.map((typeInfo) => typeInfo.type.name).join(", "),
      });
      setError(null);
    } catch (error) {
      setError("Pokémon no encontrado");
      setSearchedPokemon(null);
    }
  };

  const addPokemon = (addTo) => {
    if (!searchedPokemon) return;
    const storedData = JSON.parse(
      localStorage.getItem("nuzlockeTracker") || "{}"
    ) || {
      trainerName: "",
      lives: 0,
      party: [],
      pc: [],
      graveyard: [],
    };

    const updatedData = {
      ...storedData,
      [addTo]: [...storedData[addTo], searchedPokemon],
    };

    localStorage.setItem("nuzlockeTracker", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("trainerDataUpdated"));
    setPokemonName("");
    setSearchedPokemon(null);
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
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Nombre del Pokémon"
          />
          <button onClick={fetchPokemon}>Buscar</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {searchedPokemon && (
        <div className="pokemonDisplay">
          <div className="pokemonInfo">
            <img src={searchedPokemon.sprite} alt={searchedPokemon.name} />
            <p>NOMBRE: {searchedPokemon.name}</p>
            <p>TIPO: {searchedPokemon.types}</p>
          </div>
          <div className="buttonsAdd">
            <button
              disabled={storedData.party.length >= 6}
              onClick={() => addPokemon("party")}
            >
              Añadir al equipo
            </button>
            <button onClick={() => addPokemon("pc")}>Añadir al PC</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPokemon;

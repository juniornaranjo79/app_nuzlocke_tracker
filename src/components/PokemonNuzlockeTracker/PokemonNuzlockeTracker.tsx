import React, { useState, useEffect } from "react";
import CreateTrainer from "./components/CreateTrainer/CreateTrainer.tsx";
import AddPokemon from "./components/AddPokemon/AddPokemon.tsx";

const PokemonNUzlockeTracker = () => {
  const [showCreateTrainer, setShowCreateTrainer] = useState(() => {
    const savedState = localStorage.getItem("createTrainer");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("createTrainer", JSON.stringify(showCreateTrainer));
  }, [showCreateTrainer]);

  /* const clearLocalStorage = () => {
    localStorage.removeItem("nuzlockeTracker");
    setTrainerName("");
    setLives(0);
    setGameVersion("");
    setParty([]);
    setPc([]);
    setGraveyard([]);
  }; */

  return (
    <div>
      {showCreateTrainer ? (
        <CreateTrainer setShowCreateTrainer={setShowCreateTrainer} />
      ) : (
        <AddPokemon />
      )}
    </div>
  );
};

export default PokemonNUzlockeTracker;

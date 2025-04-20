import React from "react";
import CreateTrainer from "./components/CreateTrainer/CreateTrainer.tsx";
import AddPokemon from "./components/AddPokemon/AddPokemon.tsx";
import { useTracker } from "../../hooks/useTracker.tsx";

const PokemonNUzlockeTracker = () => {
  const { showCreateTrainer, setShowCreateTrainer } = useTracker();

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

import React from "react";
import PokemonNUzlockeTracker from "../../components/PokemonNuzlockeTracker/PokemonNuzlockeTracker.tsx";
import InfoPokemonTrainer from "../../components/InfoPokemonTrainer/InfoPokemonTrainer.tsx";
import { useTracker } from "../../hooks/useTracker.tsx";

const Home = () => {
  const { resetTrainer } = useTracker();
  return (
    <div>
      <div className="headerTitleHome">
        <div className="title">
          <h1>NUZLOCKE TRACKER</h1>
        </div>
        <button onClick={resetTrainer}>Clear</button>
      </div>
      <div className="containerHome">
        <PokemonNUzlockeTracker />
        <InfoPokemonTrainer />
      </div>
    </div>
  );
};

export default Home;

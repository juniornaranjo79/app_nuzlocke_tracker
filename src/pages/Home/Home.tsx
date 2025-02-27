import React from "react";
import PokemonNUzlockeTracker from "../../components/PokemonNuzlockeTracker/PokemonNuzlockeTracker.tsx";
import InfoPokemonTrainer from "../../components/InfoPokemonTrainer/InfoPokemonTrainer.tsx";

const Home = () => {
  return (
    <div>
      <div className="headerTitleHome">
        <h1>NUZLOCKE TRACKER</h1>
      </div>
      <div className="containerHome">
        <PokemonNUzlockeTracker />
        <InfoPokemonTrainer />
      </div>
    </div>
  );
};

export default Home;

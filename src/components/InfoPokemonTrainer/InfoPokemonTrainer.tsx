import React from "react";
import { IconPokeball } from "@tabler/icons-react";
import TheLives from "./components/TheLives/TheLives.tsx";
import TheParty from "./components/TheParty/TheParty.tsx";
import TheGraveyard from "./components/TheGraveyard/TheGraveyard.tsx";
import ThePc from "./components/ThePc/ThePc.tsx";
import Badges from "./components/Badges/Badges.tsx";
import { useTracker } from "../../hooks/useTracker.tsx";

const InfoPokemonTrainer = () => {
  const { trainerData, setTrainerData, movePokemonTo } = useTracker();

  const fetchEvolution = async (pokemonName) => {
    try {
      // 1. Obtener la especie del Pokémon
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );
      const speciesData = await speciesRes.json();

      // 2. Obtener la URL de la cadena evolutiva
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // 3. Buscar la siguiente evolución en la cadena
      let evolutionChain = evolutionData.chain;
      while (evolutionChain) {
        if (
          evolutionChain.species.name === pokemonName &&
          evolutionChain.evolves_to.length > 0
        ) {
          return evolutionChain.evolves_to[0].species.name; // Nombre del Pokémon evolucionado
        }
        evolutionChain = evolutionChain.evolves_to[0];
      }

      return null; // No tiene evolución
    } catch (error) {
      console.error("Error al obtener evolución:", error);
      return null;
    }
  };

  const evolvePokemon = async (pokemon) => {
    const evolutionName = await fetchEvolution(pokemon.name);
    if (!evolutionName) return alert(`${pokemon.name} no puede evolucionar`);

    // Obtener los datos del nuevo Pokémon
    const evolutionRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${evolutionName}`
    );
    const evolutionData = await evolutionRes.json();

    const evolvedPokemon = {
      ...pokemon,
      name: evolutionData.name,
      sprite: evolutionData.sprites.other["official-artwork"].front_default,
    };

    // Actualizar la party
    const updatedParty = trainerData.party.map((p) =>
      p.id === pokemon.id ? evolvedPokemon : p
    );

    const updatedData = {
      ...trainerData,
      party: updatedParty,
    };

    setTrainerData(updatedData);
    localStorage.setItem("nuzlockeTracker", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("trainerDataUpdated"));
  };

  return (
    <div className="container">
      <div className="headerTitle">
        <IconPokeball size={19} stroke={2} />
        <h2>INFORMACIÓN DEL ENTRENADOR</h2>
      </div>
      <div className="headerInfoTrainer">
        <div className="infoNameTrainer">
          <p>ENTRENADOR:</p>
          <h2 className="textUpper">{trainerData.trainerName || "..."}</h2>
        </div>
        <TheLives livesArray={trainerData.livesArray} />
      </div>
      <div>
        <TheParty
          party={trainerData.party}
          movePokemon={movePokemonTo}
          evolvePokemon={evolvePokemon}
        />
      </div>
      <div>
        <TheGraveyard graveyard={trainerData.graveyard} />
      </div>
      <div>
        <ThePc
          pc={trainerData.pc}
          movePokemon={movePokemonTo}
          disabled={trainerData.party.length}
        />
      </div>
      <div>
        <Badges gameVersion={trainerData.gameVersion} />
      </div>
    </div>
  );
};

export default InfoPokemonTrainer;

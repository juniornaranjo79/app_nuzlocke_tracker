import React, { createContext, useState, useEffect } from "react";
import { Pokemon, TrainerData, TrakerContextType } from "../interface/type";

export const TrackerContext = createContext<TrakerContextType | null>(null);

const LOCAL_STORAGE_KEY = "nuzlockeTracker";
const LOCAL_STORAGE_KEY_TRAINER = "createTrainer";

const defaultTrainer: TrainerData = {
  trainerName: "",
  lives: 0,
  gameVersion: "",
  party: [],
  pc: [],
  graveyard: [],
  livesArray: [],
};

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showCreateTrainer, setShowCreateTrainer] = useState(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY_TRAINER);
    return savedState !== null ? JSON.parse(savedState) : true;
  });
  const [trainerData, setTrainerData] = useState<TrainerData>(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = storedData ? JSON.parse(storedData) : defaultTrainer;

    const livesArray =
      parsed.livesArray && parsed.livesArray.length > 0
        ? parsed.livesArray
        : Array.from({ length: parsed.lives || 0 }, (_, i) => ({
            id: i + 1,
            state: true,
          }));

    return {
      ...parsed,
      livesArray,
    };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trainerData));
    localStorage.setItem(
      LOCAL_STORAGE_KEY_TRAINER,
      JSON.stringify(showCreateTrainer)
    );
    window.dispatchEvent(new Event("trainerDataUpdated"));
  }, [trainerData, showCreateTrainer]);

  const createTrainer = (
    data: Omit<TrainerData, "party" | "pc" | "graveyard" | "livesArray">
  ) => {
    const livesArray = Array.from({ length: data.lives || 0 }, (_, i) => ({
      id: i + 1,
      state: true,
    }));
    setTrainerData({ ...data, party: [], pc: [], graveyard: [], livesArray });
  };

  const addPokemonTo = (box: "party" | "pc", pokemon: Pokemon) => {
    setTrainerData((prevData) => ({
      ...prevData,
      [box]: [...prevData[box], pokemon],
    }));
  };

  const movePokemonTo = (
    from: "party" | "pc" | "graveyard",
    to: "party" | "pc" | "graveyard",
    pokemon: Pokemon
  ) => {
    const updatedData = { ...trainerData };

    updatedData[from] = updatedData[from].filter((p) => p.id !== pokemon.id);

    updatedData[to] = [...updatedData[to], pokemon];

    if (to === "graveyard") {
      const livesArray = [...updatedData.livesArray];
      const lastAliveIndex = livesArray.map((l) => l.state).lastIndexOf(true);
      if (lastAliveIndex !== -1) {
        livesArray[lastAliveIndex].state = false;
      }
      updatedData.livesArray = livesArray;
    }
    setTrainerData(updatedData);
  };

  const resetTrainer = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setTrainerData(defaultTrainer);
    setShowCreateTrainer(true);
  };

  return (
    <TrackerContext.Provider
      value={{
        trainerData,
        setTrainerData,
        createTrainer,
        addPokemonTo,
        resetTrainer,
        movePokemonTo,
        showCreateTrainer,
        setShowCreateTrainer,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

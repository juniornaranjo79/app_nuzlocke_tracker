import React, { createContext, useContext, useState, useEffect } from "react";
import { Pokemon, TrainerData, TrakerContextType } from "../interface/type";

export const TrackerContext = createContext<TrakerContextType | null>(null);

const LOCAL_STORAGE_KEY = "nuzlockeTracker";

const defaultTrainer = {
  trainerName: "",
  lives: 0,
  gameVersion: "",
  party: [],
  pc: [],
  graveyard: [],
};

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trainerData, setTrainerData] = useState<TrainerData>(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : defaultTrainer;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trainerData));
    window.dispatchEvent(new Event("trainerDataUpdated"));
  }, [trainerData]);

  const createTrainer = (
    data: Omit<TrainerData, "party" | "pc" | "graveyard">
  ) => {
    setTrainerData({ ...data, party: [], pc: [], graveyard: [] });
  };

  const addPokemonTo = (
    box: "party" | "pc" | "graveyard",
    pokemon: Pokemon
  ) => {
    setTrainerData((prevData) => ({
      ...prevData,
      [box]: [...prevData[box], pokemon],
    }));
  };

  const resetTrainer = () => {
    setTrainerData(defaultTrainer);
  };

  return (
    <TrackerContext.Provider
      value={{ trainerData, createTrainer, addPokemonTo, resetTrainer }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

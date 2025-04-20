export interface Info {
  count: number;
  next: string;
  previous: string | null;
  results: Result[];
}

export interface Result {
  // Define the properties of Result here
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  type: string[];
}

export interface TrainerData {
  trainerName: string;
  lives: number;
  gameVersion: string;
  party: Pokemon[];
  pc: Pokemon[];
  graveyard: Pokemon[];
}

export interface TrakerContextType {
  trainerData: TrainerData;
  createTrainer: (
    data: Omit<TrainerData, "party" | "pc" | "graveyard">
  ) => void;
  addPokemonTo: (box: "party" | "pc" | "graveyard", pokemon: Pokemon) => void;
}

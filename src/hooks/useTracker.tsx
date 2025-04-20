import { useContext } from "react";
import { TrackerContext } from "../context/TrackerContext.tsx";

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker debe usarse dentro de un TrackerProvider");
  }
  return context;
};

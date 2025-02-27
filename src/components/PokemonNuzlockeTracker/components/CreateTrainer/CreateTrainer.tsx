import React, { useState, useEffect } from "react";
import { IconCircleDashedPlus } from "@tabler/icons-react";

const CreateTrainer = ({ setShowCreateTrainer }) => {
  const [formTrainerName, setFormTrainerName] = useState("");
  const [formLives, setFormLives] = useState(0);
  const [formGameVersion, setFormGameVersion] = useState("");
  const [trainerData, setTrainerData] = useState({
    trainerName: "",
    lives: 0,
    gameVersion: "",
    party: [],
    pc: [],
    graveyard: [],
  });

  useEffect(() => {
    const storeData = JSON.parse(
      localStorage.getItem("nuzlockeTracker") || "null"
    );
    if (storeData) {
      setTrainerData({
        trainerName: storeData.trainerName || "",
        lives: storeData.lives || 0,
        gameVersion: storeData.gameVersion || "",
        party: storeData.party || [],
        pc: storeData.pc || [],
        graveyard: storeData.graveyard || [],
      });
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem(
      "nuzlockeTracker",
      JSON.stringify({
        ...trainerData,
        trainerName: formTrainerName,
        lives: formLives,
        gameVersion: formGameVersion,
      })
    );
    window.dispatchEvent(new Event("trainerDataUpdated"));
    setFormTrainerName("");
    setFormLives(0);
    setFormGameVersion("Diamante Brillante");
    setShowCreateTrainer(false);
  };

  return (
    <div className="container">
      <div className="headerTitle">
        <IconCircleDashedPlus size={19} stroke={2} />
        <h2>CREAR ENTRENADOR</h2>
      </div>
      <div className="formUserTrainer">
        <input
          id="nameTrainer"
          value={formTrainerName}
          type="text"
          placeholder="Nombre de entrenador"
          onChange={(e) => setFormTrainerName(e.target.value)}
        />
        <input
          id="numberLifes"
          value={formLives}
          type="number"
          placeholder="Cuantas vidas"
          onChange={(e) => setFormLives(Number(e.target.value))}
        />
        <select
          name="gameVersion"
          value={formGameVersion}
          onChange={(e) => setFormGameVersion(e.target.value)}
        >
          <option value="selectGame">Seleccionar juego</option>
          <option value="brilliantDiamond">Diamante brillante</option>
          <option value="shiningPearl">Perla reluciente</option>
          <option value="violet">Púrpura</option>
          <option value="scarlet">Escarlata</option>
        </select>
        <button onClick={saveToLocalStorage}>Crear</button>
      </div>
    </div>
  );
};

export default CreateTrainer;

import React, { useState } from "react";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { useTracker } from "../../../../hooks/useTracker.tsx";

const CreateTrainer = ({ setShowCreateTrainer }) => {
  const { createTrainer } = useTracker();
  const [name, setName] = useState("");
  const [lives, setLives] = useState(0);
  const [gameVersion, setGameVersion] = useState("");

  const handleSubmit = () => {
    createTrainer({ trainerName: name, lives, gameVersion });
    setName("");
    setLives(0);
    setGameVersion("Diamante Brillante");
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
          value={name}
          type="text"
          placeholder="Nombre de entrenador"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="numberLifes"
          value={lives}
          type="number"
          placeholder="Cuantas vidas"
          onChange={(e) => setLives(Number(e.target.value))}
        />
        <select
          name="gameVersion"
          value={gameVersion}
          onChange={(e) => setGameVersion(e.target.value)}
        >
          <option value="selectGame">Seleccionar juego</option>
          <option value="brilliantDiamond">Diamante brillante</option>
          <option value="shiningPearl">Perla reluciente</option>
          <option value="violet">Púrpura</option>
          <option value="scarlet">Escarlata</option>
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateTrainer;

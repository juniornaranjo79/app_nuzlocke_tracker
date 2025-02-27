import React from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

interface Live {
  id: number;
  name: string;
  state: boolean;
}

const TheLives = ({ livesArray = [] }: { livesArray: Live[] }) => {
  return (
    <div className="infoLivesTrainer">
      <p>VIDAS:</p>
      <div className="livesContainer">
        {livesArray.map((live) =>
          live.state ? (
            <IconHeartFilled key={live.id} color="#a54040" />
          ) : (
            <IconHeart key={live.id} stroke={2} />
          )
        )}
      </div>
    </div>
  );
};

export default TheLives;

import React, { useState, useEffect } from "react";
import dataDiamondPearl from "./data/diamondPearlBadges.json";
import dataxY from "./data/xYBadges.json";
import dataRubySapphire from "./data/rubySapphireBadges.json";

interface Badge {
  id: number;
  name: string;
  image: string;
  gym: string;
  obtained: boolean;
}

interface GameVersionProps {
  gameVersion: string;
}

const Badges = ({ gameVersion }: GameVersionProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("nuzlockeTracker") || "{}"
    );

    let savedGameVersion = storedData.gameVersion || gameVersion;
    let initialBadges: Badge[] = storedData.badges || [];

    if (initialBadges.length === 0) {
      if (savedGameVersion === "rubySapphire") {
        initialBadges = dataRubySapphire.badges.map((badge) => ({
          ...badge,
          obtained: false,
        }));
      }
      if (savedGameVersion === "diamondPearl") {
        initialBadges = dataDiamondPearl.badges.map((badge) => ({
          ...badge,
          obtained: false,
        }));
      }
      if (savedGameVersion === "xY") {
        initialBadges = dataxY.badges.map((badge) => ({
          ...badge,
          obtained: false,
        }));
      }
    }

    setBadges(initialBadges);

    localStorage.setItem(
      "nuzlockeTracker",
      JSON.stringify({
        ...storedData,
        gameVersion: savedGameVersion,
        badges: initialBadges,
      })
    );
  }, [gameVersion]);

  // Guardar cambios en localStorage cuando las medallas cambian
  useEffect(() => {
    if (badges.length > 0) {
      const storedData = JSON.parse(
        localStorage.getItem("nuzlockeTracker") || "{}"
      );
      localStorage.setItem(
        "nuzlockeTracker",
        JSON.stringify({ ...storedData, badges })
      );
    }
  }, [badges]);

  const handleBadge = (id: number) => {
    const updatedBadges = badges.map((badge) =>
      badge.id === id ? { ...badge, obtained: !badge.obtained } : badge
    );
    setBadges(updatedBadges);
  };

  return (
    <div>
      <div className="headerTitle">
        <h3>Badges</h3>
      </div>
      <div className="badgesList">
        {badges.map((badge) => (
          <div key={badge.id} className="badgeContainerImg">
            <div onClick={() => handleBadge(badge.id)}>
              <img
                src={badge.image}
                className={badge.obtained ? "imgColor" : "ImgSilueta"}
                alt={badge.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;

/* import React, { useState, useEffect } from "react";
import dataDiamond from "./data/diamondBadges.json";

interface Badge {
  id: number;
  name: string;
  image: string;
  gym: string;
  obtained: boolean;
}

interface GameVersionProps {
  gameVersion: string;
}

const Badges = ({ gameVersion }: GameVersionProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  console.log("badges", badges);
  useEffect(() => {
    if (gameVersion === "brilliantDiamond" || gameVersion === "shiningPearl") {
      setBadges(dataDiamond.badges);
    }
  }, [gameVersion]);

  const handleBadge = (id: number) => {
    const newBadges = badges.map((badge) => {
      if (badge.id === id) {
        return { ...badge, obtained: !badge.obtained };
      }
      return badge;
    });
    setBadges(newBadges);
  };

  return (
    <div>
      <div className="headerTitle">
        <h3>Badges</h3>
      </div>
      <div className="badgesList">
        {badges.map((badge) => (
          <div key={badge.id} className="badgeContainerImg">
            <div onClick={() => handleBadge(badge.id)}>
              <img
                src={badge.image}
                className={badge.obtained ? "imgColor" : "ImgSilueta"}
                alt={badge.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
 */

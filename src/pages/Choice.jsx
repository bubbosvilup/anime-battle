import { useState } from "react";
import RandomizationBox from "../components/RandomizationBox";
import RoleBox from "../components/RoleBox";
import BattleButton from "../components/BattleButton";
import "../styles/Choice.css";

export default function Choice() {
  console.log("Choice.jsx is rendering...");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerRoles, setPlayerRoles] = useState({
    Captain: null,
    "Vice Captain": null,
    Tank: null,
    Healer: null,
    Support: null,
  });

  const [aiRoles, setAiRoles] = useState({
    Captain: null,
    "Vice Captain": null,
    Tank: null,
    Healer: null,
    Support: null,
  });

  const handleAssign = (role) => {
    if (!playerRoles[role] && selectedCharacter) {
      setPlayerRoles((prev) => ({ ...prev, [role]: selectedCharacter }));
      setSelectedCharacter(null); // Reset dopo l'assegnazione
    }
  };

  return (
    <div className="choice-container">
      {/* Player Roles */}
      <div className="player-section">
        <h2>PLAYER 1</h2>
        {Object.keys(playerRoles).map((role) => (
          <RoleBox
            key={role}
            roleName={role}
            character={playerRoles[role]}
            onClick={() => handleAssign(role)}
            isHighlighted={!!selectedCharacter}
          />
        ))}
      </div>

      {/* Randomization Box */}
      <div className="randomization-section">
        <button
          onClick={() =>
            setSelectedCharacter({
              name: "Random Name",
              specialMove: "Special Move",
            })
          }
          className="generate-button"
        >
          GENERA!
        </button>

        {/* Scritta che guida il giocatore */}
        {selectedCharacter && (
          <p className="assign-message">
            Assign your character to an available role!"
          </p>
        )}

        <RandomizationBox character={selectedCharacter} />

        <BattleButton
          isEnabled={Object.values(playerRoles).every(Boolean)}
          onClick={() => console.log("Start Battle")}
        />
      </div>

      {/* AI Roles */}
      <div className="ai-section">
        <h2>IA</h2>
        {Object.keys(aiRoles).map((role) => (
          <RoleBox key={role} roleName={role} character={aiRoles[role]} />
        ))}
      </div>
    </div>
  );
}

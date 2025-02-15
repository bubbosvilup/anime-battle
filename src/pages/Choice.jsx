import { useState } from "react";
import RandomizationBox from "../components/RandomizationBox";
import RoleBox from "../components/RoleBox";
import BattleButton from "../components/BattleButton";
import characters from "../data/characters";
import "../styles/Choice.css";

export default function Choice() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingDisabled, setIsGeneratingDisabled] = useState(false);
  const [playerRoles, setPlayerRoles] = useState({
    Captain: null,
    "Vice Captain": null,
    Tank: null,
    Healer: null,
    Support: null,
  });

  const allRolesFilled = Object.values(playerRoles).every(Boolean);

  const handleGenerate = () => {
    if (isRolling || isGeneratingDisabled || allRolesFilled) return;

    setIsRolling(true);

    // 🔹 Filtra i personaggi già assegnati
    const assignedCharacters = Object.values(playerRoles).filter(Boolean);
    const availableCharacters = characters.filter(
      (char) => !assignedCharacters.includes(char)
    );

    // 🔹 Se non ci sono più personaggi disponibili, disabilita il pulsante
    if (availableCharacters.length === 0) {
      setIsGeneratingDisabled(true);
      return;
    }

    let counter = 0;
    const interval = setInterval(() => {
      setSelectedCharacter(
        availableCharacters[
          Math.floor(Math.random() * availableCharacters.length)
        ]
      );
      counter++;

      if (counter > 10) {
        clearInterval(interval);
        setIsRolling(false);
        setIsGeneratingDisabled(true);
      }
    }, 100);
  };

  const handleAssign = (role) => {
    if (!playerRoles[role] && selectedCharacter && !isRolling) {
      setPlayerRoles((prev) => ({ ...prev, [role]: selectedCharacter }));
      setSelectedCharacter(null);

      // 🔹 Controlla se ci sono ancora personaggi disponibili dopo l'assegnazione
      const assignedCharacters = Object.values({
        ...playerRoles,
        [role]: selectedCharacter,
      }).filter(Boolean);
      const availableCharacters = characters.filter(
        (char) => !assignedCharacters.includes(char)
      );

      setIsGeneratingDisabled(
        availableCharacters.length === 0 || allRolesFilled
      );
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
            isHighlighted={!!selectedCharacter && !isRolling}
          />
        ))}
      </div>

      {/* Randomization Box */}
      <div className="randomization-section">
        <button
          onClick={handleGenerate}
          className={`generate-button ${
            isGeneratingDisabled ? "disabled" : ""
          }`}
          disabled={isRolling || isGeneratingDisabled || allRolesFilled}
        >
          {isRolling ? "Rolling..." : "GENERATE!"}
        </button>

        <RandomizationBox character={selectedCharacter} />

        <BattleButton
          isEnabled={allRolesFilled}
          onClick={() => console.log("Start Battle")}
        />
      </div>

      {/* AI Roles */}
      <div className="ai-section">
        <h2>IA</h2>
        {Object.keys(playerRoles).map((role) => (
          <RoleBox key={role} roleName={role} character={playerRoles[role]} />
        ))}
      </div>
    </div>
  );
}

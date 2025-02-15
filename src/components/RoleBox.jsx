import { useEffect, useState } from "react";
import "../styles/Choice.css";

export default function RoleBox({
  roleName,
  character,
  onClick,
  isHighlighted,
}) {
  const shouldHighlight = isHighlighted && !character;

  // Icone per i sottotipi dei personaggi
  const subTypeIcons = {
    Fighter: "⚔️",
    Mage: "🔮",
    Citizen: "🏛️",
  };

  // Icone per i ruoli
  const roleIcons = {
    Captain: "🎖️",
    "Vice Captain": "⭐",
    Tank: "🛡️",
    Healer: "❤️",
    Support: "🔧",
  };

  return (
    <div
      className={`role-box ${shouldHighlight ? "highlighted" : ""} ${
        character ? "assigned" : "empty"
      }`}
      onClick={onClick}
    >
      {character ? (
        <>
          <span className="character-name">
            {subTypeIcons[character.subType] || ""} {character.name}
          </span>
        </>
      ) : (
        <span className="role-name">
          {roleIcons[roleName] || ""} {roleName}
        </span>
      )}
    </div>
  );
}

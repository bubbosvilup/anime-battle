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
      <div className="role-content">
        {character ? (
          <>
            <span className="character-name">{character.name}</span>
            <span className="role-icon">
              {subTypeIcons[character.subType] || ""}
            </span>
          </>
        ) : (
          <>
            <span className="role-name">{roleName}</span>
            <span className="role-icon">{roleIcons[roleName] || ""}</span>
          </>
        )}
      </div>
    </div>
  );
}

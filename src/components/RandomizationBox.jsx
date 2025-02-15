import { useState } from "react";

export default function RandomizationBox({ character }) {
  const [showSpecialMove, setShowSpecialMove] = useState(false);

  if (!character) {
    return <p>Press to generate a random character!</p>;
  }

  return (
    <div className="randomization-box">
      {/* Immagine della card, ora più grande */}
      <div className="card-container">
        {character.img ? (
          <img
            src={character.img}
            alt={character.name}
            className="character-card"
            onError={(e) => {
              e.target.onerror = null; // Evita loop di errori
              e.target.src = "/fallback-image.png"; // Fallback se l'immagine è rotta
            }}
          />
        ) : (
          <p>Immagine non disponibile</p>
        )}

        {/* Icona "i" per mostrare la mossa speciale */}
        <button
          className="info-button"
          onClick={() => setShowSpecialMove(!showSpecialMove)}
        >
          ℹ️
        </button>
      </div>

      {/* Nome del personaggio */}

      {/* Tooltip o modale per la mossa speciale */}
      {showSpecialMove && (
        <div className="special-move-tooltip">
          <p>
            <strong>Special Attack:</strong> {character.specialMove}
          </p>
        </div>
      )}
    </div>
  );
}

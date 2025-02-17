import React, { useState, useEffect } from "react";
import RoleBox from "../components/RoleBox";

const BATTLE_ROLES = ["Captain", "Vice Captain", "Tank", "Healer", "Support"];

const calculateStats = (character, role) => {
  if (!character) return 0;

  // Applica specialMove se presente
  let multiplier = 1;
  if (character.specialMove && character.specialMove.includes("Decrease")) {
    multiplier = 0.75; // 25% decrease
  }

  switch (role) {
    case "Captain":
    case "Vice Captain":
      return Math.round(character.leadership * multiplier) || 0;
    case "Tank":
      return Math.round(character.health * multiplier) || 0;
    case "Healer":
      return Math.round(character.magic * multiplier) || 0;
    case "Support":
      return (
        Math.round((character.strength + character.magic) * multiplier) || 0
      );
    default:
      return 0;
  }
};

export default function Battle() {
  const [playerTeam] = useState(() =>
    JSON.parse(localStorage.getItem("playerTeam") || "{}")
  );
  const [aiTeam] = useState(() =>
    JSON.parse(localStorage.getItem("aiTeam") || "{}")
  );

  const [currentDuelIndex, setCurrentDuelIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [battleEvents, setBattleEvents] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [currentMatchup, setCurrentMatchup] = useState(null);

  const processDuel = () => {
    if (currentDuelIndex >= BATTLE_ROLES.length) {
      setGameStatus("finished");
      return;
    }

    setIsAnimating(true);
    const role = BATTLE_ROLES[currentDuelIndex];
    const playerChar = playerTeam[role];
    const aiChar = aiTeam[role];

    // Check for special moves that affect stats
    let specialMoveText = "";
    if (playerChar?.specialMove?.includes("Decrease")) {
      specialMoveText = `${playerChar.name} activates ${playerChar.specialMove}`;
    }
    if (aiChar?.specialMove?.includes("Decrease")) {
      specialMoveText = `${aiChar.name} activates ${aiChar.specialMove}`;
    }

    const playerStat = calculateStats(playerChar, role);
    const aiStat = calculateStats(aiChar, role);

    setCurrentMatchup({
      role,
      playerChar,
      aiChar,
      playerStat,
      aiStat,
    });

    setTimeout(() => {
      if (specialMoveText) {
        setBattleEvents((prev) => [...prev, specialMoveText]);
      }

      let eventDescription = "";
      if (playerStat > aiStat) {
        setPlayerScore((prev) => prev + playerStat);
        eventDescription = `${role}: ${
          playerChar?.name || "Player"
        } wins with ${playerStat} points!`;
      } else if (aiStat > playerStat) {
        setAiScore((prev) => prev + aiStat);
        eventDescription = `${role}: ${
          aiChar?.name || "AI"
        } wins with ${aiStat} points!`;
      } else {
        eventDescription = `${role}: It's a tie between ${
          playerChar?.name || "Player"
        } and ${aiChar?.name || "AI"}!`;
      }

      setBattleEvents((prev) => [...prev, eventDescription]);

      setTimeout(() => {
        setIsAnimating(false);
        setCurrentMatchup(null);
        setCurrentDuelIndex((prev) => prev + 1);
      }, 1500);
    }, 1500);
  };

  useEffect(() => {
    if (!isAnimating && gameStatus === "playing") {
      processDuel();
    }
  }, [currentDuelIndex, isAnimating, gameStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-4">
      {/* Scoreboard */}
      <div className="w-full max-w-4xl mb-4 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4">
          <div
            className={`text-2xl font-bold transition-transform duration-300 ${
              playerScore > aiScore ? "scale-110" : ""
            }`}
          >
            Player Score: {playerScore}
          </div>
          <div
            className={`text-2xl font-bold transition-transform duration-300 ${
              aiScore > playerScore ? "scale-110" : ""
            }`}
          >
            AI Score: {aiScore}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Battle Phase</h1>

          {/* Teams Display */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold mb-4">Player Team</h2>
              {BATTLE_ROLES.map((role) => (
                <div
                  key={role}
                  className={`transition-all duration-300 ${
                    currentMatchup?.role === role
                      ? "scale-105 border-2 border-blue-400 rounded-lg"
                      : ""
                  }`}
                >
                  <div className="bg-gray-700 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      {playerTeam[role] && (
                        <img
                          src={playerTeam[role].img}
                          alt={playerTeam[role].name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-bold">{role}</div>
                        <div className="text-sm">
                          {playerTeam[role]?.name || "Empty"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold mb-4">AI Team</h2>
              {BATTLE_ROLES.map((role) => (
                <div
                  key={role}
                  className={`transition-all duration-300 ${
                    currentMatchup?.role === role
                      ? "scale-105 border-2 border-red-400 rounded-lg"
                      : ""
                  }`}
                >
                  <div className="bg-gray-700 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      {aiTeam[role] && (
                        <img
                          src={aiTeam[role].img}
                          alt={aiTeam[role].name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-bold">{role}</div>
                        <div className="text-sm">
                          {aiTeam[role]?.name || "Empty"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Matchup Display */}
          {currentMatchup && (
            <div className="text-center mb-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                {currentMatchup.role} Battle!
              </h3>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <img
                    src={currentMatchup.playerChar?.img}
                    alt={currentMatchup.playerChar?.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                  />
                  <div>{currentMatchup.playerChar?.name || "Player"}</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {currentMatchup.playerStat} pts
                  </div>
                </div>
                <div className="text-xl font-bold">VS</div>
                <div className="text-center">
                  <img
                    src={currentMatchup.aiChar?.img}
                    alt={currentMatchup.aiChar?.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                  />
                  <div>{currentMatchup.aiChar?.name || "AI"}</div>
                  <div className="text-2xl font-bold text-red-400">
                    {currentMatchup.aiStat} pts
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Battle Log */}
          <div className="border-2 border-gray-600 rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-900">
            {battleEvents.map((event, idx) => (
              <div key={idx} className="mb-2 last:mb-0 italic">
                {event}
              </div>
            ))}
          </div>

          {/* Final Winner */}
          {gameStatus === "finished" && (
            <div className="mt-6 text-2xl font-bold text-center text-yellow-400">
              {playerScore > aiScore
                ? "Player wins the battle!"
                : aiScore > playerScore
                ? "AI wins the battle!"
                : "It's a tie!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

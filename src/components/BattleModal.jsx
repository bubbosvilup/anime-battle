import React, { useEffect } from "react";
import battleBg from "../video/battle-bg.mp4";

export default function BattleModal({ isOpen, onClose, player, ai }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
    console.log(
      "Player Class:",
      player.stat > ai.stat ? "animate-winner" : "animate-loser"
    );
    console.log(
      "AI Class:",
      ai.stat > player.stat ? "animate-winner" : "animate-loser"
    );
  }, [isOpen, onClose, player.stat, ai.stat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center">
      {/* Background Video Container - Full width, fixed height */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        >
          <source src={battleBg} type="video/mp4" />
        </video>

        <div className="relative z-10 flex items-center justify-center w-full h-full overflow-visible">
          {/* Battle Arena */}
          <div className="flex items-center justify-between w-full px-16">
            {/* Player Character Card */}
            <div className="transform flex flex-col items-center animate-card-clash-left">
              <div className="bg-blue-500 bg-opacity-80 p-4 rounded-lg border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <div className="text-2xl font-bold text-white mt-2 text-center">
                  {player.name}
                </div>
                <div className="text-3xl font-bold text-center text-white mt-1">
                  {player.stat} pts
                </div>
              </div>
            </div>

            {/* VS Text - Initially hidden, appears after clash */}
            <div className="text-7xl font-extrabold text-black animate-vs-appear z-20 opacity-0">
              VS
            </div>

            {/* AI Character Card */}
            <div className="transform flex flex-col items-center animate-card-clash-right">
              <div className="bg-red-500 bg-opacity-80 p-4 rounded-lg border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <img
                  src={ai.img}
                  alt={ai.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <div className="text-2xl font-bold text-white mt-2 text-center">
                  {ai.name}
                </div>
                <div className="text-3xl font-bold text-center text-white mt-1">
                  {ai.stat} pts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import BattlebornTitle from "../components/BattlebornTitle";
import EmberParticles from "../components/EmberParticles";
import CharactersModal from "../components/CharactersModal";
import HowToModal from "../components/HowToModal";

export default function StartMenu() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef(null);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/start-music.mp3"],
      loop: true,
      volume: volume,
    });

    soundRef.current.play();

    return () => {
      soundRef.current.stop();
    };
  }, []);

  const toggleAudio = () => {
    const newIsPlaying = !isPlaying; // Calcoliamo il nuovo stato
    soundRef.current.mute(!newIsPlaying); // Mutiamo in base al nuovo stato
    setIsPlaying(newIsPlaying); // Aggiorniamo lo stato
  };

  const changeVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    soundRef.current.volume(newVolume);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-transparent text-white relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100 visible"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/start-menu-bg.mp4" type="video/mp4" />
      </video>

      {/* Battleborn Title */}
      <BattlebornTitle />

      {/* Particles Effect */}
      <EmberParticles />

      {/* Glass-effect menu container */}
      <div
        className={`relative w-[400px] p-6 rounded-xl backdrop-blur-lg bg-white/10 shadow-lg flex flex-col items-center gap-4 ${
          isCharactersOpen ? "blur-lg" : ""
        }`}
      >
        {/* START button */}
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-blue-700 hover:scale-105">
          Start
        </button>

        {/* HOW TO PLAY button */}
        <button
          onClick={() => setIsHowToPlayOpen(true)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105"
        >
          How to Play
        </button>

        {/* CHARACTERS button - Opens Modal */}
        <button
          onClick={() => setIsCharactersOpen(true)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105"
        >
          Characters
        </button>
      </div>

      {isHowToPlayOpen && (
        <HowToModal onClose={() => setIsHowToPlayOpen(false)} />
      )}
      {isCharactersOpen && (
        <CharactersModal onClose={() => setIsCharactersOpen(false)} />
      )}

      {/* Bottom-right icons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        {/* AUDIO button - Toggle mute/unmute */}
        <button
          className="p-3 bg-gray-700 rounded-full hover:scale-110"
          onClick={toggleAudio}
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>

        {/* SETTINGS button - Opens settings menu */}
        <button
          className="p-3 bg-gray-700 rounded-full hover:scale-110"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          ⚙️
        </button>
      </div>

      {/* SETTINGS MENU - Appears when isSettingsOpen is true */}
      {isSettingsOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Settings</h2>

          {/* VOLUME CONTROL SLIDER */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={changeVolume}
              className="w-40"
            />
          </label>

          {/* CLOSE SETTINGS BUTTON */}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => setIsSettingsOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Characters Modal */}
      {isCharactersOpen && (
        <CharactersModal onClose={() => setIsCharactersOpen(false)} />
      )}
    </div>
  );
}

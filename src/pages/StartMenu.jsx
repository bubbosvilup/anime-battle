import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useNavigate } from "react-router-dom";
import casualClickSound from "../sounds/casual-click.mp3";
import closeUiSound from "../sounds/closeUi.mp3";
import startSound from "../sounds/start.mp3";
import BattlebornTitle from "../components/BattlebornTitle";
import EmberParticles from "../components/EmberParticles";
import CharactersModal from "../components/CharactersModal";
import HowToModal from "../components/HowToModal";

export default function StartMenu() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // Volumi
  const [masterVolume, setMasterVolume] = useState(1);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [sfxVolume, setSfxVolume] = useState(0.5);

  // Riferimento alla musica di sottofondo
  const soundRef = useRef(null);

  // Audio attivo / muto
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate();

  // --- 1) LEGGI dal Local Storage quando il componente si monta
  useEffect(() => {
    const savedSettings = localStorage.getItem("audioSettings");
    if (savedSettings) {
      const { master, music, sfx } = JSON.parse(savedSettings);
      setMasterVolume(master);
      setMusicVolume(music);
      setSfxVolume(sfx);
    }
  }, []);

  // --- 2) SALVA nel Local Storage quando i volumi cambiano
  useEffect(() => {
    const audioSettings = {
      master: masterVolume,
      music: musicVolume,
      sfx: sfxVolume,
    };
    localStorage.setItem("audioSettings", JSON.stringify(audioSettings));
  }, [masterVolume, musicVolume, sfxVolume]);

  // Funzione per riprodurre effetti sonori
  const playSoundEffect = (soundFile) => {
    new Howl({
      src: [soundFile],
      volume: sfxVolume * masterVolume,
    }).play();
  };

  // Inizializza la musica di sottofondo
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/start-music.mp3"],
      loop: true,
      volume: musicVolume * masterVolume,
    });

    soundRef.current.play();

    return () => {
      soundRef.current.stop();
    };
  }, []);

  // Ogni volta che masterVolume o musicVolume cambiano, aggiorna il volume della musica
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(musicVolume * masterVolume);
    }
  }, [musicVolume, masterVolume]);

  // Muta o smuta l'audio
  const toggleAudio = () => {
    playSoundEffect(closeUiSound);
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);

    if (soundRef.current) {
      soundRef.current.mute(!newIsPlaying);
    }
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
        className={`relative w-[400px] p-6 rounded-xl border-2 border-red-500 backdrop-blur-lg bg-white/10 shadow-lg flex flex-col items-center gap-4 ${
          isCharactersOpen ? "blur-lg" : ""
        }`}
      >
        <button
          onClick={() => {
            playSoundEffect(startSound);
            navigate("/choice");
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
        >
          Start
        </button>

        <button
          onClick={() => {
            playSoundEffect(closeUiSound);
            setIsHowToPlayOpen(true);
          }}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105"
        >
          How to Play
        </button>

        <button
          onClick={() => {
            playSoundEffect(closeUiSound);
            setIsCharactersOpen(true);
          }}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105"
        >
          Characters
        </button>
      </div>

      {/* HOW TO PLAY MODAL */}
      {isHowToPlayOpen && (
        <HowToModal
          onClose={() => {
            playSoundEffect(casualClickSound);
            setIsHowToPlayOpen(false);
          }}
        />
      )}

      {/* CHARACTERS MODAL */}
      {isCharactersOpen && (
        <CharactersModal
          onClose={() => {
            playSoundEffect(casualClickSound);
            setIsCharactersOpen(false);
          }}
        />
      )}

      {/* BOTTOM-RIGHT ICONS */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-50">
        {/* AUDIO ON/OFF */}
        <button
          className="p-3 bg-gray-700 rounded-full hover:scale-110"
          onClick={toggleAudio}
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>

        {/* SETTINGS */}
        <button
          className="p-3 bg-gray-700 rounded-full hover:scale-110"
          onClick={() => {
            playSoundEffect(closeUiSound);
            setIsSettingsOpen(!isSettingsOpen);
          }}
        >
          ⚙️
        </button>
      </div>

      {/* SETTINGS MENU */}
      {isSettingsOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Settings</h2>

          {/* MASTER VOLUME */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Master Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-40"
            />
          </label>

          {/* MUSIC VOLUME */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Music Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="w-40"
            />
          </label>

          {/* SOUND EFFECTS VOLUME */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Sound Effects Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              className="w-40"
            />
          </label>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => {
              playSoundEffect(casualClickSound);
              setIsSettingsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

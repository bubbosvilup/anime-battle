import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import BattlebornTitle from "../components/BattlebornTitle";
import EmberParticles from "../components/EmberParticles";

export default function StartMenu() {
  // State to track if settings menu is open
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // State to track audio status (playing or muted)
  const [isPlaying, setIsPlaying] = useState(true);

  // State to track volume level
  const [volume, setVolume] = useState(0.5); // Default volume 50%

  // Ref to store Howl instance (ensures only one sound instance)
  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize Howler sound only once
    soundRef.current = new Howl({
      src: ["/start-music.mp3"], // Path to the audio file in 'public'
      loop: true, // Enables looping
      volume: volume, // Initial volume from state
    });

    // Start playing the music when the component mounts
    soundRef.current.play();

    return () => {
      // Stop music when the component unmounts
      soundRef.current.stop();
    };
  }, []); // Runs only once when the component mounts

  // Function to toggle audio mute/unmute
  const toggleAudio = () => {
    if (isPlaying) {
      soundRef.current.mute(true); // Mute the sound
    } else {
      soundRef.current.mute(false); // Unmute the sound
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  // Function to update volume level
  const changeVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    soundRef.current.volume(newVolume); // Update Howler volume
  };

  return (
    <div className="h-screen flex items-center justify-center bg-transparent text-white relative overflow-hidden">
      {/* Battleborn Title */}
      <BattlebornTitle />

      {/* Fullscreen background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100 visible"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/start-menu-bg.mp4" type="video/mp4" />
      </video>

      {/* Glass-effect menu container */}
      <div className="relative w-[400px] p-6 rounded-xl backdrop-blur-lg bg-white/10 shadow-lg flex flex-col items-center gap-4">
        {/* START button */}
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-blue-700 hover:scale-105">
          Start
        </button>

        {/* HOW TO PLAY button */}
        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105">
          How to Play
        </button>

        {/* CHARACTERS button */}
        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl transition-transform duration-300 hover:bg-gray-600 hover:scale-105">
          Characters
        </button>

        {/* Bottom-right icons inside the container */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          {/* AUDIO button - Toggle mute/unmute */}
          <button
            className="p-3 bg-gray-700 rounded-full hover:scale-110"
            onClick={toggleAudio}
          >
            {isPlaying ? "🔊" : "🔇"} {/* Change icon based on state */}
          </button>

          {/* SETTINGS button - Opens settings menu */}
          <button
            className="p-3 bg-gray-700 rounded-full hover:scale-110"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            ⚙️ {/* Toggle settings menu */}
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
      </div>
    </div>
  );
}

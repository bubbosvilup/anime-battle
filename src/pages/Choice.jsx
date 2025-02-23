import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import RandomizationBox from "../components/RandomizationBox";
import RoleBox from "../components/RoleBox";
import BattleButton from "../components/BattleButton";
import characters from "../data/characters";
import "../styles/Choice.css";
import ChoiceTitle from "../components/ChoiceTitle";
import generateSound from "../sounds/generate.mp3"; // Importa il file audio
import casualClickSound from "../sounds/casual-click.mp3";
import closeUiSound from "../sounds/closeUi.mp3";
import assignSound from "../sounds/assign.mp3";
import startSound from "../sounds/start-sound.mp3";

export default function Choice() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingDisabled, setIsGeneratingDisabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [masterVolume, setMasterVolume] = useState(1);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const soundRef = useRef(null);

  // Stati per i ruoli del giocatore
  const [playerRoles, setPlayerRoles] = useState({
    Captain: null,
    "Vice Captain": null,
    Tank: null,
    Healer: null,
    Support: null,
  });

  // Stati per i ruoli dell'IA
  const [aiRoles, setAiRoles] = useState({
    Captain: null,
    "Vice Captain": null,
    Tank: null,
    Healer: null,
    Support: null,
  });

  // Stati per il modal dell'IA
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalRole, setAiModalRole] = useState(null);
  const [aiModalCandidate, setAiModalCandidate] = useState(null);

  const allRolesFilled = Object.values(playerRoles).every(Boolean);

  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per riprodurre il suono
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = 0.15;
    audio.play();
  };

  // Funzione per riprodurre effetti sonori
  const playSoundEffect = (soundFile) => {
    new Howl({
      src: [soundFile],
      volume: sfxVolume * masterVolume,
    }).play();
  };

  const playAssignSound = () => {
    const audio = new Audio(assignSound);
    audio.volume = 0.4;
    audio.play();
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem("audioSettings");
    if (savedSettings) {
      const { master, music, sfx } = JSON.parse(savedSettings);
      setMasterVolume(master);
      setMusicVolume(music);
      setSfxVolume(sfx);
    }
  }, []);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/choice-music.mp3"],
      loop: true,
      volume: musicVolume * masterVolume,
    });

    soundRef.current.play();

    return () => {
      soundRef.current.stop();
    };
  }, [musicVolume, masterVolume]);

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

  const changeVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    soundRef.current.volume(newVolume);
  };

  // Generazione del personaggio per il giocatore (rolling visivo)
  const handleGenerate = () => {
    if (isRolling || isGeneratingDisabled || allRolesFilled) return;
    setIsRolling(true);
    playSound(generateSound); // Riproduci il suono

    const assignedCharacters = Object.values(playerRoles).filter(Boolean);
    const availableCharacters = characters.filter(
      (char) => !assignedCharacters.includes(char)
    );

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
      if (counter > 22) {
        clearInterval(interval);
        setIsRolling(false);
        setIsGeneratingDisabled(true);
      }
    }, 100);
  };

  // Assegnazione del personaggio selezionato al ruolo del giocatore
  const handleAssign = (role) => {
    if (!playerRoles[role] && selectedCharacter && !isRolling) {
      setPlayerRoles((prev) => ({ ...prev, [role]: selectedCharacter }));
      setSelectedCharacter(null);

      playAssignSound(); // Riproduci il suono

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

  // Quando il giocatore ha completato la selezione, l'IA inizia la scelta via modal
  useEffect(() => {
    if (allRolesFilled) {
      const usedByPlayer = Object.values(playerRoles).filter(Boolean);
      const availableForAI = characters.filter(
        (char) => !usedByPlayer.includes(char)
      );
      // Randomizza l'ordine dei ruoli
      const roles = ["Captain", "Vice Captain", "Tank", "Healer", "Support"];
      const shuffledRoles = roles.sort(() => 0.5 - Math.random());
      animateAiModalSequentially(shuffledRoles, availableForAI);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRolesFilled]);

  // Salva le squadre in localStorage quando sono complete
  useEffect(() => {
    if (allRolesFilled) {
      localStorage.setItem("playerTeam", JSON.stringify(playerRoles));
      localStorage.setItem("aiTeam", JSON.stringify(aiRoles));
    }
  }, [allRolesFilled, playerRoles, aiRoles]);

  // Funzione per animare il modal dell'IA per ogni ruolo in sequenza con pause
  function animateAiModalSequentially(roles, available) {
    let updatedAvailable = [...available];
    function processNext(index) {
      if (index >= roles.length) return;
      const role = roles[index];
      setAiModalRole(role);
      setShowAiModal(true);
      playSound(generateSound); // Riproduci il suono
      let counter = 0;
      const interval = setInterval(() => {
        setAiModalCandidate(
          updatedAvailable[Math.floor(Math.random() * updatedAvailable.length)]
        );
        counter++;
        if (counter > 22) {
          clearInterval(interval);
          // Scegli il candidato finale in base al criterio strategico
          const finalCandidate = chooseCandidate(role, updatedAvailable);
          setAiModalCandidate(finalCandidate); // Mostra il candidato finale nel modal
          setAiRoles((prev) => ({ ...prev, [role]: finalCandidate }));
          updatedAvailable = updatedAvailable.filter(
            (c) => c !== finalCandidate
          );
          // Mantieni il modal aperto per 1.5 secondi per simulare "ragionamento"
          setTimeout(() => {
            setShowAiModal(false);
            // Dopo una breve pausa (0.5 sec), passa al ruolo successivo
            setTimeout(() => processNext(index + 1), 500);
          }, 1500);
        }
      }, 100);
    }
    processNext(0);
  }

  // Funzione di scelta: calcola il punteggio e poi sceglie casualmente tra i migliori
  function chooseCandidate(role, available) {
    if (available.length === 0) return null;

    // 30% di possibilità di scelta completamente casuale
    if (Math.random() < 0.3) {
      return available[Math.floor(Math.random() * available.length)];
    }

    const scored = available.map((candidate) => {
      let baseValue = 0;
      switch (role) {
        case "Captain":
        case "Vice Captain":
          baseValue = candidate.leadership;
          break;
        case "Tank":
          baseValue = candidate.health;
          break;
        case "Healer":
          baseValue = candidate.magic;
          break;
        case "Support":
          baseValue = candidate.magic + candidate.strength;
          break;
        default:
          baseValue = candidate.leadership;
      }
      // Moltiplica per 0.8 e aggiungi un fattore casuale tra -10 e +10
      const weighted = baseValue * 0.8;
      const randomFactor = Math.random() * 20 - 10;
      const score = weighted + randomFactor;
      return { candidate, score };
    });

    // Ordina i candidati per punteggio in ordine decrescente
    scored.sort((a, b) => b.score - a.score);

    // Estendi il pool ai primi 5 candidati (o meno, se non ci sono abbastanza)
    const topCount = Math.min(5, scored.length);
    const topCandidates = scored.slice(0, topCount);

    // Seleziona casualmente tra questi candidati
    const randomIndex = Math.floor(Math.random() * topCandidates.length);
    return topCandidates[randomIndex].candidate;
  }

  return (
    <>
      {/* Video background fuori dal container principale */}
      <div className="bg-video">
        <video autoPlay loop muted playsInline>
          <source src="/choice-menu-BG.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="page">
        <ChoiceTitle />
        <div className="choice-container">
          {/* Player Section */}
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

          {/* Randomization Section */}
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
              onClick={() => {
                playSound(startSound);
                navigate("/battle");
              }}
            />
          </div>

          {/* AI Section */}
          <div className="ai-section">
            <h2>IA</h2>
            {Object.keys(aiRoles).map((role) => (
              <RoleBox
                key={role}
                roleName={role}
                character={aiRoles[role]}
                onClick={() => {}}
                isHighlighted={false}
              />
            ))}
          </div>
        </div>

        {/* Modal per la scelta dell'IA (se presente) */}
        {showAiModal && (
          <div className="modal-overlay">
            <div className="ai-modal">
              <RandomizationBox character={aiModalCandidate} />
            </div>
          </div>
        )}

        {/* Bottom-right icons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-99">
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
            onClick={() => {
              playSoundEffect(closeUiSound);
              setIsSettingsOpen(!isSettingsOpen);
            }}
          >
            ⚙️
          </button>
        </div>

        {/* SETTINGS MENU - Appears when isSettingsOpen is true */}
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

            {/* CLOSE SETTINGS BUTTON */}
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
    </>
  );
}

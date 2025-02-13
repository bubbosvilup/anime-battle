import { useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const characters = [
  {
    name: "Goku",
    image: "/goku-card.png",
    class: "Fighter",
    special: "Ultra Instinct - Leadership +25% if 3 Fighters",
  },
  {
    name: "Naruto Uzumaki",
    image: "/naruto-card.png",
    class: "Mage",
    special: "Sage Mode - Leadership & Magic +15% if 2 Mages",
  },
  {
    name: "Luffy",
    image: "/luffy-card.png",
    class: "Fighter",
    special: "Will of D. - Leadership +20% if team is half Fighters",
  },
  {
    name: "Ichigo Kurosaki",
    image: "/ichigo-card.png",
    class: "Fighter",
    special: "Bankai - Magic & Strength +20% vs Mage",
  },
];

export default function CharactersModal({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setCurrentIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      {/* Modal Box */}
      <div className="relative w-full max-w-[800px] h-[500px] flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>

        {/* Carousel Container */}
        <div className="relative flex justify-center items-center w-full h-[400px] overflow-hidden">
          {characters.map((character, index) => {
            const position =
              index === currentIndex
                ? "scale-100 z-20"
                : index === (currentIndex + 1) % characters.length
                ? "scale-75 translate-x-40 opacity-50 z-10"
                : index ===
                  (currentIndex - 1 + characters.length) % characters.length
                ? "scale-75 -translate-x-40 opacity-50 z-10"
                : "hidden"; // Nasconde gli altri

            return (
              <div
                key={index}
                className={`absolute transition-transform duration-700 ease-in-out transform ${position}`}
              >
                <div className="relative w-[256px] h-[384px] bg-[#ffd200] rounded-xs shadow-lg border-2 flex flex-col items-center justify-center">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-[100%] object-cover rounded-t-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-6">
          <button
            onClick={prevCharacter}
            className="text-white text-4xl border-2 border-white bg-transparent p-2 rounded-full hover:bg-yellow-500/50 transition"
          >
            <AiOutlineLeft />
          </button>
          <button
            onClick={nextCharacter}
            className="text-white text-4xl border-2 border-white bg-transparent p-2 rounded-full hover:bg-yellow-500/50 transition"
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </div>
  );
}

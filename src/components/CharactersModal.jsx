import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const characters = [
  {
    name: "Goku",
    image: "goku-card.png",
    class: "Fighter",
    special: "Ultra Instinct - Leadership +25% if 3 Fighters",
  },
  {
    name: "Naruto Uzumaki",
    image: "naruto-card.png",
    class: "Mage",
    special: "Sage Mode - Leadership & Magic +15% if 2 Mages",
  },
  {
    name: "Luffy",
    image: "luffy-card.png",
    class: "Fighter",
    special: "Will of D. - Leadership +20% if team is half Fighters",
  },
  {
    name: "Ichigo Kurosaki",
    image: "ichigo-card.png",
    class: "Fighter",
    special: "Bankai - Magic & Strength +20% vs Mage",
  },
];

export default function CharactersModal({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCharacter = () => {
    if (currentIndex < characters.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevCharacter = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      {/* Modal Box */}
      <div className="relative w-[400px] h-[500px] bg-gray-900 p-6 rounded-xl flex flex-col items-center shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>

        {/* Character Card */}
        <div className="w-full h-[400px] flex flex-col items-center justify-center">
          <img
            src={characters[currentIndex].image}
            alt={characters[currentIndex].name}
            className="w-[250px] h-[300px] object-cover rounded-lg"
          />
          <h2 className="text-xl font-bold mt-4 text-white">
            {characters[currentIndex].name}
          </h2>
          <p className="text-sm text-gray-300">
            {characters[currentIndex].class}
          </p>
          <p className="text-xs text-gray-400 italic text-center mt-2">
            {characters[currentIndex].special}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full px-6 mt-4">
          <button
            onClick={prevCharacter}
            className={`text-white text-3xl bg-blue-500 p-3 rounded-full hover:scale-110 transition ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentIndex === 0}
          >
            ◀
          </button>
          <button
            onClick={nextCharacter}
            className={`text-white text-3xl bg-blue-500 p-3 rounded-full hover:scale-110 transition ${
              currentIndex === characters.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentIndex === characters.length - 1}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

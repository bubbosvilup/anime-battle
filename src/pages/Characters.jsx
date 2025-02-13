import { useState } from "react";
import { Link } from "react-router-dom"; // For navigation back to the Start Menu

// Character data (add more characters as you create their cards)
const characters = [
  {
    name: "Goku",
    image: "src/assets/char-cards/goku-card.png",
    class: "Fighter",
  },
  {
    name: "Naruto Uzumaki",
    image: "src/assets/char-cards/naruto-card.png",
    class: "Mage",
  },
  {
    name: "Luffy",
    image: "src/assets/char-cards/luffy-card.png",
    class: "Fighter",
  },
  {
    name: "Ichigo Kurosaki",
    image: "src/assets/char-cards/ichigo-card.png",
    class: "Fighter",
  },
  // Add more characters here as you create their cards
];

export default function Characters() {
  const [selected, setSelected] = useState(null); // State for handling character selection (if needed in future)

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Characters</h1>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char, index) => (
          <div key={index} className="relative group cursor-pointer">
            {/* Character Image */}
            <img
              src={char.image}
              alt={char.name}
              className="w-48 h-72 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Effect - Show Name, Class, and Special Move */}
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg">
              <h2 className="text-xl font-bold">{char.name}</h2>
              <p className="text-sm text-gray-300">{char.class}</p>
              <p className="text-xs text-gray-400 italic text-center">
                {char.special}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button - Returns to Start Menu */}
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-700">
          Back
        </button>
      </Link>
    </div>
  );
}

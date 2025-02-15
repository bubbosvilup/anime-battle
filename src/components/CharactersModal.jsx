import { useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const characters = [
  {
    name: "Goku",
    image: "/goku-card.png",
  },
  {
    name: "Naruto Uzumaki",
    image: "/naruto-card.png",
  },
  {
    name: "Luffy",
    image: "/luffy-card.png",
  },
  {
    name: "Ichigo Kurosaki",
    image: "/ichigo-card.png",
  },
  {
    name: "Saitama",
    image: "/saitama-card.png",
  },
  {
    name: "Edward Elric",
    image: "/edward-card.png",
  },
  {
    name: "Levi Ackerman",
    image: "/levi-card.png",
  },
  {
    name: "Gojo Satoru",
    image: "/gojo-card.png",
  },
  {
    name: "Asta",
    image: "/asta-card.png",
  },
  {
    name: "Tanjirou Kamado",
    image: "/tanjirou-card.png",
  },
  {
    name: "Griffith",
    image: "/griffith-card.png",
  },
  {
    name: "King Bradley",
    image: "/bradley-card.png",
  },
  {
    name: "Hanamichi Sakuragi",
    image: "/hanamichi-card.png",
  },
  {
    name: "L",
    image: "/l-card.png",
  },
  {
    name: "Vash the Stampede",
    image: "/vash-card.png",
  },
  {
    name: "Asuka Soryu Langley",
    image: "/asuka-card.png",
  },
  {
    name: "Zodd",
    image: "/zodd-card.png",
  },
  {
    name: "Kenpachi Zaraki",
    image: "/kenpachi-card.png",
  },
  {
    name: "Spike Spiegel",
    image: "/spike-card.png",
  },
  {
    name: "Natsu Dragneel",
    image: "/natsu-card.png",
  },
  {
    name: "Gray Fullbuster",
    image: "/gray-card.png",
  },
  {
    name: "Yami Sukehiro",
    image: "/yami-card.png",
  },
  {
    name: "Yuno",
    image: "/yuno-card.png",
  },
  {
    name: "Homura Akemi",
    image: "/homura-card.png",
  },
  {
    name: "Merlin",
    image: "/merlin-card.png",
  },
  {
    name: "Okabe Rintaro",
    image: "/okabe-card.png",
  },
  {
    name: "Reigen Arataka",
    image: "/reigen-card.png",
  },
  {
    name: "Lain Iwakura",
    image: "/lain-card.png",
  },
  {
    name: "Holo",
    image: "/holo-card.png",
  },
  {
    name: "Violet Evergarden",
    image: "/violet-card.png",
  },
  {
    name: "Conan Edogawa",
    image: "/conan-card.png",
  },
  {
    name: "Senku Ishigami",
    image: "/senku-card.png",
  },
  {
    name: "Lelouch Lamperouge",
    image: "/lelouch-card.png",
  },
  {
    name: "Sun Wukong",
    image: "/wukong-card.png",
  },
  {
    name: "Sesshōmaru",
    image: "/sesso-card.png",
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

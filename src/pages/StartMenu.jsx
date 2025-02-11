export default function StartMenu() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
      <h1 className="text-4xl font-bold mb-6">Anime Battle</h1>

      {/* Pulsanti centrali */}
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl mb-4">
        Start
      </button>
      <button className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl mb-4">
        How to Play
      </button>
      <button className="px-6 py-3 bg-gray-700 text-white rounded-lg text-xl">
        Characters
      </button>

      {/* Bottoni icona in basso a destra */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        {/* Pulsante Audio */}
        <button className="p-3 bg-gray-700 rounded-full">
          🔊 {/* Cambieremo con un'icona dopo */}
        </button>

        {/* Pulsante Impostazioni */}
        <button className="p-3 bg-gray-700 rounded-full">
          ⚙️ {/* Cambieremo con un'icona dopo */}
        </button>
      </div>
    </div>
  );
}

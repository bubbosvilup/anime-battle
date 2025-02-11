export default function Choice() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      {/* main container */}
      <div className="border-4 border-white p-8 rounded-lg w-[600px] bg-gray-900">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Character Selection
        </h1>

        {/* container for Player 1 e AI */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-32 h-32 border-2 border-white flex items-center justify-center">
            <img
              src=""
              alt="Player Character"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Box name and special attack */}
          <div className="border-2 border-gray-400 p-2 rounded-lg text-center w-60 bg-gray-700">
            <p className="text-lg font-semibold">Character Name</p>
            <p className="text-sm italic text-gray-300">Special Attack</p>
          </div>

          <div className="w-32 h-32 border-2 border-white flex items-center justify-center">
            <img
              src=""
              alt="AI Character"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Random Generator + Skip Buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl">
            Randomize!
          </button>
          <button className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm">
            Skip (1 Left)
          </button>
        </div>

        {/* roles grid allign */}
        <div className="grid grid-cols-3 gap-8 justify-center items-center">
          {/* left column - Player 1 */}
          <div className="flex flex-col gap-4 items-center">
            {["Captain", "Vice Captain", "Healer", "Support", "Support"].map(
              (role, index) => (
                <div
                  key={index}
                  className="border-2 border-white p-4 text-center w-48"
                >
                  {role}
                </div>
              )
            )}
          </div>

          {/* empty space to center roles */}
          <div className="w-12"></div>

          {/* right column - AI */}
          <div className="flex flex-col gap-4 items-center">
            {["Captain", "Vice Captain", "Healer", "Support", "Support"].map(
              (role, index) => (
                <div
                  key={index}
                  className="border-2 border-white p-4 text-center w-48"
                >
                  {role}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

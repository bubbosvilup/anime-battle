export default function HowToModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-[400px] text-center">
        <h2 className="text-xl font-bold text-white mb-4">How to Play</h2>
        <p className="text-gray-300 text-sm mb-4">
          1. A character will be generated randomly.
          <br />
          2. Assign the random character to a role in your team.
          <br />
          3. Each role impacts the battle based on stats.
          <br />
          3. Strategy is key to victory!
        </p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

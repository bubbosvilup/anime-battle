export default function HowToModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-[400px] text-center">
        <h2 className="text-xl font-bold text-white mb-4">How to Play</h2>
        <p className="text-gray-300 text-sm mb-4">
          <strong>How to Play:</strong>
          <br />
          <br />
          1. Build your team: assign 5 random characters to these roles –
          Captain, Vice Captain, Tank, Healer, and Support.
          <br />
          <br />
          2. Each role uses a specific stat:
          <br />
          &bull; Captain/Vice Captain: Leadership
          <br />
          &bull; Tank: Health
          <br />
          &bull; Healer: Magic
          <br />
          &bull; Support: Strength + Magic
          <br />
          <br />
          3. Each role faces its counterpart; the winner adds its stat value to
          the team score.
          <br />
          <br />
          4. Special moves boost stats when conditions are met.
          <br />
          <br />
          5. The team with the highest score wins!
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

export default function BattleButton({ isEnabled, onClick }) {
  return (
    <button
      className={`battle-button ${isEnabled ? "active" : "disabled"}`}
      onClick={isEnabled ? onClick : null}
    >
      TO BATTLE!
    </button>
  );
}

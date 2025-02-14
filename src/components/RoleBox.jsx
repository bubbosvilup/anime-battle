export default function RoleBox({
  roleName,
  character,
  onClick,
  isHighlighted,
}) {
  const shouldHighlight = isHighlighted && !character; // Evidenzia solo se il ruolo è libero e un personaggio è pronto

  return (
    <div
      className={`role-box ${shouldHighlight ? "highlighted" : ""}`}
      onClick={onClick}
    >
      {character ? <p>{character.name}</p> : <span>{roleName}</span>}
    </div>
  );
}

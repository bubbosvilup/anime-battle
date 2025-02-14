export default function RandomizationBox({ character }) {
  return (
    <div className="randomization-box">
      {character ? (
        <>
          <h2>{character.name}</h2>
          <p>Mossa speciale: {character.specialMove}</p>
        </>
      ) : (
        <p>Clicca su "Genera!" per selezionare un personaggio</p>
      )}
    </div>
  );
}

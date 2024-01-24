export default function Outpieces({ killed }) {
  if (killed) {
    return (
      <div className="outpieces">
        {killed.map((e) => (
          <Img e={e} />
        ))}
      </div>
    );
  }
}

function Img({ e }) {
  return <img src={`pieces/${e}.png`} alt="out" className="out"></img>;
}

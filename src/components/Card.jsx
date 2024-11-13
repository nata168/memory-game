export { Card };

function Card({ name, imgUrl, handleClick }) {
  return (
    <div className="card" onClick={handleClick}>
      <img src={imgUrl} alt={name} className="card-img"/>
    </div>
  )
}
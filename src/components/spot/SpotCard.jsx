import { Link } from "react-router-dom";

const SpotCard = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} className="spot-card">
      <div className="spot-img-wrap">
        <img src={spot.imageUrl} alt={spot.title} />

        <button
          type="button"
          className="wish-btn"
          onClick={(e) => {
            e.preventDefault();
            alert("찜 기능 연결 예정");
          }}
        >
          ♥
        </button>

        <span className="status-badge">{spot.status}</span>
      </div>

      <div className="spot-info">
        <h3>{spot.title}</h3>
        <p>{spot.area}</p>
        <p>{spot.startDate} - {spot.endDate}</p>
        <strong>{spot.price === 0 ? "무료" : `₩${spot.price.toLocaleString()}`}</strong>
      </div>
    </Link>
  );
};

export default SpotCard;
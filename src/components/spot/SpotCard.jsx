import { Link } from "react-router-dom";
import "./SpotCard.css";
import { RiMapPinLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

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
          <FaRegHeart />
        </button>

        <span className="status-badge">{spot.status}</span>
      </div>

      <div className="spot-info">
        <p className="spot-type">{spot.spot_type}</p>
        <h3>{spot.title}</h3>
        <p><RiMapPinLine /> {spot.area}</p>
        <p><FiCalendar /> {spot.startDate} - {spot.endDate}</p>
        <strong className="price">{spot.price === 0 ? "무료" : `₩ ${spot.price.toLocaleString()}`}</strong>
      </div>
    </Link>
  );
};

export default SpotCard;
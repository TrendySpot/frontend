<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import dayjs from "dayjs";

const getStatus = (startDate, endDate) => {
  const today = dayjs();
  const start = dayjs(startDate);
  const end   = dayjs(endDate);
  if (today.isBefore(start)) return "오픈예정";
  if (today.isAfter(end))    return "종료";
  const d = end.diff(today, "day");
  if (d <= 3) return `D-${d}`;
  return "진행중";
};
=======
import { Link } from "react-router-dom";
import "./SpotCard.css";
import { RiMapPinLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
>>>>>>> origin/feature/frontend-narae

const SpotCard = ({ spot }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { wishedIds, toggle } = useWishlist();
  const isWished = wishedIds.has(spot.spotId);

  const handleWish = (e) => {
    e.preventDefault();
    if (!isLoggedIn) { navigate("/login"); return; }
    toggle(spot.spotId);
  };

  return (
    <Link to={`/spots/${spot.spotId}`} className="spot-card">
      <div className="spot-img-wrap">
<<<<<<< HEAD
        <img
          src={spot.imageUrl || "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800"}
          alt={spot.title}
          loading="lazy"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800"; }}
        />
        <button type="button" className="wish-btn" onClick={handleWish}>
          <span style={{ fontSize: 20, color: isWished ? "#ff5ea8" : "#d1d5db" }}>
            {isWished ? "♥" : "♡"}
          </span>
=======
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
>>>>>>> origin/feature/frontend-narae
        </button>
        <span className="status-badge">{getStatus(spot.startDate, spot.endDate)}</span>
      </div>

      <div className="spot-info">
<<<<<<< HEAD
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                         color: spot.spotType === "POPUP" ? "#ff5ea8" : "#6a5cff" }}>
            {spot.spotType === "POPUP" ? "팝업스토어" : "전시회"}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1e2f" }}>
            {spot.price === 0 ? "무료" : `₩${spot.price?.toLocaleString()}`}
          </span>
        </div>
        <h3>{spot.title}</h3>
        <p>📍 {spot.area}</p>
        <p>{dayjs(spot.startDate).format("YYYY.MM.DD")} - {dayjs(spot.endDate).format("YYYY.MM.DD")}</p>
=======
        <p className="spot-type">{spot.spot_type}</p>
        <h3>{spot.title}</h3>
        <p><RiMapPinLine /> {spot.area}</p>
        <p><FiCalendar /> {spot.startDate} - {spot.endDate}</p>
        <strong className="price">{spot.price === 0 ? "무료" : `₩ ${spot.price.toLocaleString()}`}</strong>
>>>>>>> origin/feature/frontend-narae
      </div>
    </Link>
  );
};

export default SpotCard;

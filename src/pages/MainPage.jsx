import { useNavigate } from "react-router-dom";
import SpotCard from "../components/spot/SpotCard";
import "./MainPage.css";
import { FaArrowRight } from "react-icons/fa";

const dummySpots = [
  {
    id: 1,
    title: "성수 감성 팝업스토어",
    spot_type: "팝업스토어",
    area: "서울특별시 성수동",
    startDate: "2026.06.10",
    endDate: "2026.07.01",
    price: 0,
    status: "진행중",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
  {
    id: 2,
    title: "빛의 전시회",
    spot_type: "전시회",
    area: "서울특별시 강남구",
    startDate: "2026.06.15",
    endDate: "2026.08.20",
    price: 12000,
    status: "오픈예정",
    imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800",
  },
  {
    id: 3,
    title: "여름 한정 브랜드 팝업",
    spot_type: "팝업스토어",
    area: "부산광역시 해운대구",
    startDate: "2026.06.20",
    endDate: "2026.07.10",
    price: 5000,
    status: "D-3",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-label">Premium Event Discovery</p>
          <h1>
            특별한 순간이 <br />
            여기에서 시작돼요
          </h1>
          <p>
            전국의 인기 팝업스토어와 전시회를 한눈에 발견하고 예약해보세요.
          </p>
        </div>

        <div className="search-panel">
          <input placeholder="지역 선택" />
          <input placeholder="날짜 선택" />
          <select>
            <option>전체</option>
            <option>팝업스토어</option>
            <option>전시회</option>
          </select>
          <button onClick={() => navigate("/search")}>검색</button>
        </div>
      </section>

      <section className="category-section">
        {["전체", "팝업스토어", "전시회", "무료", "유료", "진행중", "오픈예정"].map(
          (tag) => (
            <button key={tag} className="category-chip">
              {tag}
            </button>
          )
        )}
      </section>

      <section className="spot-section">
        <div className="section-title">
          <h2>지금 인기 있는 스팟</h2>
          <button
            className="view-all-btn"
            onClick={() => navigate("/search")}
          >
            전체보기 <FaArrowRight />
          </button>
        </div>

        <div className="spot-grid">
          {dummySpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
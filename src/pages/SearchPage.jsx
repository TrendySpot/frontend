import { useState } from "react";
import SpotCard from "../components/spot/SpotCard";

const dummySpots = [
  {
    id: 1,
    title: "성수 감성 팝업스토어",
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
    area: "서울특별시 강남구",
    startDate: "2026.06.15",
    endDate: "2026.08.20",
    price: 12000,
    status: "오픈예정",
    imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800",
  },
];

const SearchPage = () => {
  const [category, setCategory] = useState("전체");
  const [price, setPrice] = useState("전체");

  return (
    <div className="search-page">
      <aside className="filter-sidebar">
        <h2>필터</h2>

        <div className="filter-group">
          <label>지역</label>
          <select>
            <option>전체</option>
            <option>서울특별시</option>
            <option>부산광역시</option>
            <option>경기도</option>
          </select>
        </div>

        <div className="filter-group">
          <label>카테고리</label>
          {["전체", "팝업스토어", "전시회"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <label>가격</label>
          {["전체", "무료", "유료"].map((item) => (
            <button
              key={item}
              className={price === item ? "active" : ""}
              onClick={() => setPrice(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <section className="search-result">
        <div className="result-header">
          <h1>{dummySpots.length}개의 스팟 발견</h1>

          <select>
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </div>

        <div className="spot-grid">
          {dummySpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>

        <div className="pagination">
          <button>{"<"}</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>{">"}</button>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
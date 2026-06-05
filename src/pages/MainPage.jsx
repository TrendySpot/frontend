import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import AxiosApi from "../api/AxiosApi";
import SpotCard from "../components/spot/SpotCard";
import Pagination from "../components/common/Pagination";
import { FaArrowRight } from "react-icons/fa";
import "./MainPage.css";

const TAGS = ["전체", "팝업스토어", "전시회", "무료", "유료", "진행중", "오픈예정"];

const MainPage = () => {
  const navigate = useNavigate();
  const { spotType, setSpotType, free, setFree, ongoing, setOngoing, resetFilters, toQueryParams } = useFilter();
  const [spots, setSpots]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [page, setPage]             = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]           = useState(0);
  const [searchArea, setSearchArea] = useState("");
  const [activeTag, setActiveTag]   = useState("전체");

  const fetchSpots = useCallback(async (p = 0) => {
    setLoading(true);
    try {
      const { data } = await AxiosApi.getSpots({ ...toQueryParams(), page: p, size: 12 });
      const pd = data.data;
      setSpots(pd.content); setTotalPages(pd.totalPages); setTotal(pd.totalElements); setPage(p);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotType, free, ongoing]);

  useEffect(() => { fetchSpots(0); }, [fetchSpots]);

  const handleTag = (tag) => {
    setActiveTag(tag);
    if      (tag === "전체")       resetFilters();
    else if (tag === "팝업스토어") setSpotType("POPUP");
    else if (tag === "전시회")     setSpotType("EXHIBIT");
    else if (tag === "무료")       setFree(true);
    else if (tag === "유료")       setFree(false);
    else if (tag === "진행중")     setOngoing(true);
    else if (tag === "오픈예정")   setOngoing(false);
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-label">✨ Premium Event Discovery</p>
          <h1>지금 가장 인기 있는<br /><span style={{ opacity: 0.9 }}>팝업과 전시</span>를 만나보세요</h1>
          <p>전국의 인기 팝업스토어와 전시회를 한눈에 발견하고 예약해보세요.</p>
        </div>
        <div className="search-panel">
          <input placeholder="지역 검색 (예: 서울, 부산)" value={searchArea} onChange={(e) => setSearchArea(e.target.value)} />
          <input type="date" />
          <button onClick={() => navigate("/search")}>검색</button>
        </div>
      </section>

      <section className="category-section">
        {TAGS.map((tag) => (
          <button key={tag} className={`category-chip ${activeTag === tag ? "active" : ""}`} onClick={() => handleTag(tag)}>{tag}</button>
        ))}
      </section>

      <section className="spot-section">
        <div className="section-title">
          <h2>
            {!loading && <><span style={{ color: "#6a5cff" }}>{total}</span>개의 스팟 발견</>}
          </h2>
          <button className="view-all-btn" onClick={() => navigate("/search")}>
            전체보기 <FaArrowRight />
          </button>
        </div>

        {loading ? (
          <div className="spot-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ background: "white", borderRadius: 28, overflow: "hidden", boxShadow: "0 18px 38px rgba(29,29,47,0.08)" }}>
                <div style={{ height: 220, background: "#f1f2f6", animation: "pulse 1.5s infinite" }} />
                <div style={{ padding: 22 }}>
                  <div style={{ height: 12, background: "#f1f2f6", borderRadius: 8, width: "40%", marginBottom: 10 }} />
                  <div style={{ height: 16, background: "#f1f2f6", borderRadius: 8, width: "80%", marginBottom: 8 }} />
                  <div style={{ height: 12, background: "#f1f2f6", borderRadius: 8, width: "55%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : spots.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#6b7280" }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <p style={{ fontWeight: 700 }}>검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="spot-grid">
            {spots.map((spot) => <SpotCard key={spot.spotId} spot={spot} />)}
          </div>
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={fetchSpots} />
      </section>
    </div>
  );
};

export default MainPage;

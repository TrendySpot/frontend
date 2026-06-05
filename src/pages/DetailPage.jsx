import { useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const { spotId } = useParams();

  const spot = {
    id: spotId,
    title: "성수 감성 팝업스토어",
    area: "서울특별시 성수동",
    address: "서울특별시 성동구 성수이로 77",
    startDate: "2026.06.10",
    endDate: "2026.07.01",
    price: 12000,
    totalTickets: 100,
    reservedTickets: 68,
    remainedTickets: 32,
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
  };

  const progress = Math.round((spot.reservedTickets / spot.totalTickets) * 100);

  return (
    <div className="detail-page">
      <section className="detail-main">
        <img className="detail-image" src={spot.imageUrl} alt={spot.title} />

        <div className="detail-info">
          <span className="status-badge">진행중</span>
          <h1>{spot.title}</h1>
          <p>{spot.area}</p>
          <p>{spot.startDate} - {spot.endDate}</p>

          <h2>행사 소개</h2>
          <p>
            감각적인 브랜드와 공간을 경험할 수 있는 한정 팝업스토어입니다.
            다양한 체험존과 포토존, 굿즈 판매 공간이 준비되어 있습니다.
          </p>

          <h2>위치</h2>
          <div className="map-box">카카오맵 영역</div>

          <h2>댓글</h2>
          <div className="review-box">
            <textarea placeholder="댓글을 작성해주세요." />
            <button>등록</button>
          </div>
        </div>
      </section>

      <aside className="reservation-panel">
        <h2>예약하기</h2>

        <div className="ticket-status">
          <strong>예약률 {progress}%</strong>
          <div className="progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>

          <p>전체 티켓: {spot.totalTickets}장</p>
          <p>예약 완료: {spot.reservedTickets}장</p>
          <p>남은 티켓: {spot.remainedTickets}장</p>
        </div>

        <div className="reservation-form">
          <label>가격</label>
          <strong>₩{spot.price.toLocaleString()}</strong>

          <label>방문 날짜</label>
          <input type="date" />

          <label>예약 인원</label>
          <select>
            <option>1명</option>
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
          </select>

          <button>지금 예약하기</button>
        </div>
      </aside>
    </div>
  );
};

export default DetailPage;
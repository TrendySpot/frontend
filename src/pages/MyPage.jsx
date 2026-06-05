import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="mypage">
      <aside className="mypage-sidebar">
        <h2>마이페이지</h2>
        <button>프로필</button>
        <button>예약 내역</button>
        <button>찜한 스팟</button>
        <button>캘린더</button>
      </aside>

      <main className="mypage-content">
        <section className="profile-card">
          <div className="profile-image">🙂</div>
          <div>
            <h1>트렌디유저</h1>
            <p>user@email.com</p>
          </div>
        </section>

        <section className="mypage-stats">
          <div>
            <p>예약 내역</p>
            <strong>3건</strong>
          </div>
          <div>
            <p>찜한 스팟</p>
            <strong>8개</strong>
          </div>
          <div>
            <p>작성 댓글</p>
            <strong>5개</strong>
          </div>
        </section>

        <section className="mypage-box">
          <h2>다가오는 예약</h2>
          <p>2026.06.20 성수 감성 팝업스토어</p>
        </section>

        <section className="mypage-box">
          <h2>예약 캘린더</h2>
          <div className="calendar-placeholder">캘린더 영역</div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;
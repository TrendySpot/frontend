import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2>Trendy Spot</h2>

        <nav>
          <button>대시보드</button>
          <button>회원 관리</button>
          <button>행사 관리</button>
          <button>예약 관리</button>
          <button>결제 관리</button>
          <button>댓글 관리</button>
          <button>통계</button>
        </nav>
      </aside>

      <main className="admin-content">
        <h1>관리자 대시보드</h1>

        <section className="admin-stats">
          <div className="stat-card">
            <p>전체 회원 수</p>
            <strong>1,248명</strong>
          </div>

          <div className="stat-card">
            <p>전체 행사 수</p>
            <strong>326개</strong>
          </div>

          <div className="stat-card">
            <p>전체 예약 수</p>
            <strong>4,821건</strong>
          </div>

          <div className="stat-card">
            <p>총 매출</p>
            <strong>₩18,420,000</strong>
          </div>
        </section>

        <section className="admin-grid">
          <div className="admin-box">
            <h2>예약 통계</h2>
            <div className="chart-placeholder">차트 영역</div>
          </div>

          <div className="admin-box">
            <h2>인기 행사 TOP 5</h2>
            <ol>
              <li>성수 감성 팝업스토어</li>
              <li>빛의 전시회</li>
              <li>여름 한정 브랜드 팝업</li>
              <li>몰입형 미디어 전시</li>
              <li>부산 아트 페어</li>
            </ol>
          </div>
        </section>

        <section className="admin-box">
          <h2>최근 예약 내역</h2>

          <table>
            <thead>
              <tr>
                <th>예약번호</th>
                <th>회원명</th>
                <th>행사명</th>
                <th>결제금액</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>R-1001</td>
                <td>김트렌디</td>
                <td>성수 감성 팝업스토어</td>
                <td>₩12,000</td>
                <td>예약완료</td>
              </tr>
              <tr>
                <td>R-1002</td>
                <td>박스팟</td>
                <td>빛의 전시회</td>
                <td>₩24,000</td>
                <td>예약완료</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
  const stats = [
    { label: "총 회원수", value: "1,284명" },
    { label: "총 스팟수", value: "342개" },
    { label: "이번달 예약", value: "891건" },
    { label: "이번달 매출", value: "₩12.4M" },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 28 }}>관리자 대시보드</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            padding: 24, borderRadius: 24, color: "white",
            background: "linear-gradient(135deg,#6a5cff,#ff5ea8)",
          }}>
            <p style={{ fontSize: 13, opacity: 0.85, margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="panel">
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>최근 예약 내역</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f2f6" }}>
              {["예약ID", "스팟명", "회원", "금액", "상태"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: "#6b7280" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f1f2f6" }}>
              <td style={{ padding: "14px 16px", fontSize: 14 }}>#1024</td>
              <td style={{ padding: "14px 16px", fontSize: 14 }}>성수 감성 팝업스토어</td>
              <td style={{ padding: "14px 16px", fontSize: 14 }}>트렌디유저</td>
              <td style={{ padding: "14px 16px", fontSize: 14 }}>₩15,000</td>
              <td style={{ padding: "14px 16px" }}><span className="badge badge-ongoing">결제완료</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

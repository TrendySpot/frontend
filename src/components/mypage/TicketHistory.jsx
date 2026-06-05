import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import dayjs from "dayjs";

const STATUS = {
  PAID:      { label: "결제 완료", cls: "badge badge-ongoing" },
  CANCELLED: { label: "취소됨",   cls: "badge badge-ended" },
  PENDING:   { label: "결제 대기", cls: "badge badge-upcoming" },
};

const TicketHistory = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosApi.getMyTickets()
      .then(({ data }) => setTickets(data.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: "40px 0" }}><div className="spinner" style={{ margin: "0 auto" }} /></div>;

  if (tickets.length === 0) return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎟</div>
      <p style={{ fontSize: 14 }}>예약 내역이 없습니다.</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {tickets.map((t) => {
        const st = STATUS[t.status] ?? { label: t.status, cls: "badge" };
        return (
          <div key={t.ticketId} onClick={() => navigate(`/spots/${t.spotId}`)}
            style={{ display: "flex", gap: 16, padding: 18, background: "#f7f8fc", borderRadius: 20, cursor: "pointer", transition: "0.15s" }}
            onMouseOver={(e) => e.currentTarget.style.background = "#f1f0ff"}
            onMouseOut={(e) => e.currentTarget.style.background = "#f7f8fc"}>
            <img src={t.imageUrl || "https://images.unsplash.com/photo-1545987796-200677ee1011?w=80"}
              alt={t.spotTitle} style={{ width: 72, height: 72, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{t.spotTitle}</p>
                <span className={st.cls}>{st.label}</span>
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 2px" }}>방문일: {dayjs(t.eventDate).format("YYYY년 MM월 DD일")}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 2px" }}>인원: {t.count}명</p>
              <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{t.amount === 0 ? "무료" : `₩${t.amount?.toLocaleString()}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketHistory;

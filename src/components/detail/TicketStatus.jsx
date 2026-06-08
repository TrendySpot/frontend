import { useTicketSocket } from "../../hooks/useTicketSocket";

const TicketStatus = ({ spotId, selectedSchedule }) => {
  const { ticketStatus, isConnected } = useTicketSocket(spotId);

  const total    = ticketStatus?.totalTickets    ?? selectedSchedule?.totalTickets    ?? 0;
  const remained = ticketStatus?.remainedTickets ?? selectedSchedule?.remainedTickets ?? 0;
  const booked   = total - remained;
  const percent  = total > 0 ? Math.round((booked / total) * 100) : 0;

  return (
    <div style={{ background: "#f7f8fc", borderRadius: 24, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e1e2f", margin: 0 }}>실시간 예약 현황</h3>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                       color: isConnected ? "#059669" : "#9ca3af" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block",
                         background: isConnected ? "#059669" : "#9ca3af",
                         animation: isConnected ? "pulse 1.5s infinite" : "none" }} />
          {isConnected ? "실시간 연결됨" : "연결 중..."}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        {[["총 티켓", total], ["예약 완료", booked], ["남은 티켓", remained]].map(([label, val]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: "#1e1e2f", margin: 0 }}>{val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <p style={{ textAlign: "right", fontSize: 12, color: "#6b7280", margin: 0 }}>{percent}% 예약됨</p>
    </div>
  );
};

export default TicketStatus;

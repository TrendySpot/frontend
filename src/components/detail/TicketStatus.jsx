import { useTicketSocket } from "../../hooks/useTicketSocket";

const TicketStatus = ({ spotId, schedules = [] }) => {
  const { ticketStatus} = useTicketSocket(spotId);

  // 전체 스케줄 합계 계산
  const totalFromSchedules = schedules.reduce(
    (sum, s) => sum + (s.totalTickets ?? 0),
    0,
  );
  const remainedFromSchedules = schedules.reduce(
    (sum, s) => sum + (s.remainedTickets ?? 0),
    0,
  );

  // WebSocket 실시간 메시지가 오면 해당 스케줄만 업데이트
  const total = totalFromSchedules;
  const remained = ticketStatus
    ? remainedFromSchedules -
      (ticketStatus.totalTickets - ticketStatus.remainedTickets) +
      (schedules.find((s) => s.scheduleId === ticketStatus.scheduleId)
        ?.totalTickets ?? 0) -
      (schedules.find((s) => s.scheduleId === ticketStatus.scheduleId)
        ?.remainedTickets ?? 0)
    : remainedFromSchedules;

  const booked = total - remained;
  const percent = total > 0 ? Math.round((booked / total) * 100) : 0;

  return (
    <div style={{ background: "#f7f8fc", borderRadius: 24, padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3
          style={{ fontSize: 16, fontWeight: 800, color: "#1e1e2f", margin: 0 }}
        >
          실시간 예약 현황
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        {[
          ["총 티켓", total],
          ["예약 완료", booked],
          ["남은 티켓", remained],
        ].map(([label, val]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
              {label}
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#1e1e2f",
                margin: 0,
              }}
            >
              {val.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <p
        style={{
          textAlign: "right",
          fontSize: 12,
          color: "#6b7280",
          margin: 0,
        }}
      >
        {percent}% 예약됨
      </p>
    </div>
  );
};

export default TicketStatus;

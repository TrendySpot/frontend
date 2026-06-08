import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AxiosApi from "../../api/AxiosApi";
import dayjs from "dayjs";

const PaymentModal = ({ isOpen, onClose, spot, reservation, onSuccess }) => {
  const { member } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalAmount = (spot?.price ?? 0) * (reservation?.count ?? 1);
  const merchantUid = `trendy_spot_${Date.now()}`;

  const handlePay = async () => {
    setLoading(true);
    try {
      // 무료 예약
      if (totalAmount === 0) {
        await AxiosApi.verifyPayment({
          ticketId: reservation.ticketId,
          portonePaymentId: "FREE",
          merchantUid, // ← paymentId → merchantUid로 수정
          amount: 0,
        });
        onSuccess?.();
        onClose();
        alert("무료 예약이 완료되었습니다!");
        return;
      }

      // 포트원 V2 SDK 확인
      const PortOne = window.PortOne;
      if (!PortOne) {
        throw new Error(
          "포트원 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
        );
      }

      // 포트원 V2 결제 요청
      const response = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORTONE_STORE_ID,
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
        paymentId: merchantUid,
        orderName: spot.title,
        totalAmount,
        currency: "KRW",
        payMethod: "CARD",
        customer: {
          fullName: member?.nickname ?? "",
          email: member?.email ?? "",
        },
      });

      // 결제 실패 또는 취소
      if (response.code) {
        throw new Error(response.message ?? "결제에 실패했습니다.");
      }

      // 백엔드 검증
      await AxiosApi.verifyPayment({
        ticketId: reservation.ticketId,
        portonePaymentId: response.paymentId,
        merchantUid: response.paymentId, // ← paymentId → merchantUid로 수정
        amount: totalAmount,
      });

      onSuccess?.();
      onClose();
      alert("예약이 완료되었습니다!");
    } catch (e) {
      alert(e.message ?? "결제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>결제하기</h2>
          <button
            onClick={onClose}
            style={{
              border: 0,
              background: "transparent",
              cursor: "pointer",
              fontSize: 20,
              color: "#6b7280",
            }}
          >
            ✕
          </button>
        </div>
        <div
          className="modal-body"
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div
            style={{
              background: "#f7f8fc",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              ["공연명", spot?.title],
              [
                "방문 날짜",
                reservation?.eventDate
                  ? dayjs(reservation.eventDate).format("YYYY년 MM월 DD일")
                  : "-",
              ],
              ["인원", `${reservation?.count}명`],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span style={{ color: "#6b7280" }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              borderTop: "1px solid #f1f2f6",
            }}
          >
            <span style={{ fontWeight: 700 }}>결제 금액</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#6a5cff" }}>
              {totalAmount === 0 ? "무료" : `₩${totalAmount.toLocaleString()}`}
            </span>
          </div>
          <button
            className="btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: 15,
              borderRadius: 16,
            }}
            onClick={handlePay}
            disabled={loading}
          >
            {loading
              ? "처리 중..."
              : totalAmount === 0
                ? "무료 예약 완료"
                : "결제하기"}
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#9ca3af",
              margin: 0,
            }}
          >
            결제는 포트원(PortOne)을 통해 안전하게 처리됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

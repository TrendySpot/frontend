import { useState } from "react";

export function useTicketSocket(spotId, initialStatus = null) {
  // WebSocket 연결 임시 비활성화
  // 백엔드 WebSocket 준비 완료 후 아래 주석 해제하고 이 코드 삭제
  const ticketStatus = initialStatus;
  const isConnected  = false;

  return { ticketStatus, isConnected };

  /*
  import { useEffect } from "react";
  import { connectSocket, subscribeTicketStatus } from "../websocket/socket";

  const [ticketStatus, setTicketStatus] = useState(initialStatus);
  const [isConnected, setIsConnected]   = useState(false);

  useEffect(() => {
    if (!spotId) return;
    let unsubscribe = () => {};
    connectSocket(() => {
      setIsConnected(true);
      unsubscribe = subscribeTicketStatus(spotId, (msg) => setTicketStatus(msg));
    });
    return () => unsubscribe();
  }, [spotId]);

  return { ticketStatus, isConnected };
  */
}

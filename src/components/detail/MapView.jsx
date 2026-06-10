import { useEffect, useRef, useState } from "react";

const MapView = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (!window.kakao || !window.kakao.maps) {
      setError(true);
      return;
    }

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      });

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latitude, longitude),
      });
      marker.setMap(map);

      if (address) {
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px 12px;font-size:13px;font-weight:600;font-family:Pretendard,sans-serif">${address}</div>`,
        });
        infowindow.open(map, marker);
        // 인포윈도우 높이만큼 지도를 위로 올려서 마커가 화면 가운데 오도록
        map.panBy(0, -60);
      }
    });
  }, [latitude, longitude, address]);

  if (!latitude || !longitude) return null;

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    >
      {error ? (
        <div
          style={{
            height: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#eef0ff,#ffe7f3)",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 32 }}>🗺️</span>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            카카오맵 키를 설정해주세요.
          </p>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
            .env.local → REACT_APP_KAKAO_MAP_APP_KEY
          </p>
        </div>
      ) : (
        <div ref={mapRef} style={{ width: "100%", height: "280px" }} />
      )}

      {address && (
        <div
          style={{
            padding: "12px 16px",
            background: "#f7f8fc",
            fontSize: 13,
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          📍 {address}
        </div>
      )}
    </div>
  );
};

export default MapView;

import { useEffect, useRef } from "react";

const MapView = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    kakao.maps.load(() => {
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 4,
      });
      const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(latitude, longitude) });
      marker.setMap(map);
      if (address) {
        const info = new kakao.maps.InfoWindow({
          content: `<div style="padding:8px 12px;font-size:13px;font-weight:600">${address}</div>`,
        });
        info.open(map, marker);
      }
    });
  }, [latitude, longitude, address]);

  if (!latitude || !longitude) return null;

  return (
    <div className="map-box" style={{ flexDirection: "column", gap: 0 }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {!window.kakao?.maps && (
        <p style={{ fontSize: 13, color: "#6b7280" }}>카카오맵 SDK를 로드해주세요.</p>
      )}
    </div>
  );
};

export default MapView;

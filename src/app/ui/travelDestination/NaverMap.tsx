import { useEffect } from "react";

interface INaverMapProps {
  mapx: number;
  mapy: number;
  address: string;
  points?: { mapx: number; mapy: number; stepNumber: number }[]; // 스텝 번호 추가
}

export default function NaverMap({
  mapx,
  mapy,
  address,
  points,
}: INaverMapProps) {
  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;

      if (naver && naver.maps) {
        const mapOptions = {
          zoom: 12, // Zoom level을 조정하세요.
        };

        const map = new naver.maps.Map("map", mapOptions);

        // 스텝 번호별 색상 매핑
        const stepColors: { [key: number]: string } = {
          1: "#00A9FF",
          2: "#89CFF3",
          3: "#A0E9FF",
        };

        // LatLngBounds를 생성할 좌표 범위 계산
        let bounds: naver.maps.LatLngBounds | null = null;

        if (!points || points.length === 0) {
          // 좌표가 없을 때, 기본 마커만 표시
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(mapy, mapx),
            map: map,
          });

          naver.maps.Event.addListener(marker, "click", () => {
            const naverMapLink = `https://map.naver.com/index.nhn?enc=utf8&level=2&lng=${mapx}&lat=${mapy}&pinTitle=${address}&pinType=SITE`;
            window.open(naverMapLink, "_blank");
          });

          // 기본 중심으로 지도를 조정
          map.setCenter(new naver.maps.LatLng(mapy, mapx));
        } else {
          // 좌표가 있을 때, 모든 마커와 경로를 추가
          let swLat = Infinity;
          let swLng = Infinity;
          let neLat = -Infinity;
          let neLng = -Infinity;

          points.forEach((point) => {
            const { mapx, mapy, stepNumber } = point;
            const latLng = new naver.maps.LatLng(mapy, mapx);
            const color = stepColors[stepNumber] || "#FFFFFF"; // 기본 색상 설정

            // LatLngBounds 범위 계산
            if (mapy < swLat) swLat = mapy;
            if (mapx < swLng) swLng = mapx;
            if (mapy > neLat) neLat = mapy;
            if (mapx > neLng) neLng = mapx;

            new naver.maps.Marker({
              position: latLng,
              map: map,
              icon: {
                content: `<div class="step-number" style="background-color: ${color};">${stepNumber}</div>`,
                anchor: new naver.maps.Point(15, 15),
              },
            });
          });

          // LatLngBounds 객체 생성
          bounds = new naver.maps.LatLngBounds(
            new naver.maps.LatLng(swLat, swLng),
            new naver.maps.LatLng(neLat, neLng),
          );

          // Polyline 생성
          const pathCoordinates = points.map(
            (point) => new naver.maps.LatLng(point.mapy, point.mapx),
          );

          new naver.maps.Polyline({
            map: map,
            path: pathCoordinates,
            strokeColor: "#252A34",
            strokeOpacity: 0.6,
            strokeWeight: 4,
            strokeStyle: "dash",
          });

          // 모든 마커를 포함하도록 지도를 조정합니다.
          if (bounds) {
            map.fitBounds(bounds);
          }
        }

        // 스타일을 설정하기 위해 추가하는 방식
        const existingStyle = document.getElementById("step-number-style");
        if (!existingStyle) {
          const style = document.createElement("style");
          style.id = "step-number-style";
          style.innerHTML = `
            .step-number {
              color: white;
              padding: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              font-weight: bold;
              font-size: 14px;
            }
          `;
          document.head.appendChild(style);
        }
      }
    };

    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      loadMapScript();
    }
  }, [mapx, mapy, points]);

  return <div id="map" className="rounded-2xl w-full h-80 lg:h-96" />;
}

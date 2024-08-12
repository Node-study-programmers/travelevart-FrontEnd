import { useEffect } from "react";

interface INaverMapProps {
  mapx: number;
  mapy: number;
  address: string;
}

export default function NaverMap({ mapx, mapy, address }: INaverMapProps) {
  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;

      if (naver && naver.maps) {
        const mapOptions = {
          center: new naver.maps.LatLng(mapy, mapx),
          zoom: 15,
        };

        const map = new naver.maps.Map("map", mapOptions);

        // 마커
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(mapy, mapx),
          map: map,
        });

        naver.maps.Event.addListener(marker, "click", () => {
          const naverMapLink = `https://map.naver.com/index.nhn?enc=utf8&level=2&lng=${mapx}&lat=${mapy}&pinTitle=${address}&pinType=SITE`;
          window.open(naverMapLink, "_blank");
        });
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
  }, []);

  return <div id="map" className="rounded-2xl w-full h-64 lg:h-96" />;
}

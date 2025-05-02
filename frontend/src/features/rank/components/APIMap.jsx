import React, { useEffect } from 'react';

function APIMap({ address, rerenderkey }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.id = 'kakao-map-script';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        });

        if (address) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          const places = new window.kakao.maps.services.Places();

          geocoder.addressSearch(address, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new window.kakao.maps.Marker({ map, position: coords });

              const content = `
                <div class="custom-overlay">
                  ${address}
                  <button class="close-btn">X</button>
                </div>
              `;

              const overlay = new window.kakao.maps.CustomOverlay({
                map,
                position: coords,
                content,
                yAnchor: 2
              });

              document.addEventListener('click', (e) => {
                if (e.target.classList.contains('close-btn')) {
                  overlay.setMap(null);
                }
              });

              window.kakao.maps.event.addListener(marker, 'click', () => {
                overlay.setMap(map);
              });

              map.setCenter(coords);
            } else {
              places.keywordSearch(address, function (data, status) {
                if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                  const coords = new window.kakao.maps.LatLng(data[0].y, data[0].x);
                  const marker = new window.kakao.maps.Marker({ map, position: coords });

                  const content = `
                    <div class="custom-overlay">
                      ${address}
                      <button class="close-btn">X</button>
                    </div>
                  `;

                  const overlay = new window.kakao.maps.CustomOverlay({
                    map,
                    position: coords,
                    content,
                    yAnchor: 2
                  });

                  document.addEventListener('click', (e) => {
                    if (e.target.classList.contains('close-btn')) {
                      overlay.setMap(null);
                    }
                  });

                  window.kakao.maps.event.addListener(marker, 'click', () => {
                    overlay.setMap(map);
                  });

                  map.setCenter(coords);
                } else {
                  console.error('검색 실패 ㅠㅅㅠ', address);
                }
              });
            }
          });
        }
      });
    };
  }, [address, rerenderkey]);

  return <div id="map" style={{ width: '100vw', height: '100vh' }}></div>;
}

export default APIMap;

import React, { useEffect, useRef, useState } from 'react';
import Marker from './Marker';

function APIMap({ address, rerenderkey, onDragStart, onDragEnd, category }) {
    const mapRef = useRef(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        window.alertShown = false;
        const existingScript = document.getElementById('kakao-map-script');

        if (existingScript && window.kakao && window.kakao.maps) {
            window.kakao.maps.load(loadMap);
            return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.id = 'kakao-map-script';
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(loadMap);
            }
        };

        function loadMap() {
            const container = document.getElementById('map');
            if (!container) return;

            const map = new window.kakao.maps.Map(container, {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            });

            mapRef.current = map;

            if (onDragStart) {
                window.kakao.maps.event.addListener(map, 'dragstart', onDragStart);
            }
            if (onDragEnd) {
                window.kakao.maps.event.addListener(map, 'dragend', onDragEnd);
            }

            if (!address) return;

            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);
                    setCenter(coords);
                    showMarker(map, coords, address);
                } else {
                    if (!window.alertShown) {
                        alert('정확한 주소를 넣어주세요.');
                        console.warn('주소 검색 실패 😥:', address);
                        window.alertShown = true;
                    }
                }
            });
        }

        function showMarker(map, coords, address) {
            const marker = new window.kakao.maps.Marker({ position: coords });
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
                yAnchor: 2,
            });

            setTimeout(() => {
                marker.setMap(map);
                overlay.setMap(map);
            }, 200);

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('close-btn')) {
                    overlay.setMap(null);
                }
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                overlay.setMap(map);
            });
        }
    }, [address, rerenderkey]);

    return (
        <>
            <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
            {mapRef.current && center && (
                <Marker map={mapRef.current} category={category} center={center} />
            )}
        </>
    );
}

export default APIMap;
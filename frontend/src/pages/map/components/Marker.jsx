import { useEffect, useRef } from 'react';
import { CATEGORY_MAP, DEFAULT_RADIUS } from '@/constants/mapDefaults.js';

const Marker = ({ map, center, category, setCoords }) => {
    const markersRef = useRef({
        subway: [],
        school: [],
        mart: [],
        hospital: []
    });
    const clustererRef = useRef(null);

    useEffect(() => {
        if (!map || !category || !clustererRef.current) return;

        Object.entries(markersRef.current).forEach(([key, markers]) => {
            const visible = category[key];
            markers.forEach(marker => marker.setMap(visible ? map : null));
        });

    }, [category, map]);

    useEffect(() => {
        if (!map || !center) return;

        const ps = new window.kakao.maps.services.Places();

        Object.values(markersRef.current).flat().forEach((marker) => marker.setMap(null));
        Object.keys(markersRef.current).forEach((key) => (markersRef.current[key] = []));

        if (!clustererRef.current) {
            clustererRef.current = new window.kakao.maps.MarkerClusterer({
                map,
                averageCenter: true,
                minLevel: 3,
                disableClickZoom: true,
            });

            window.kakao.maps.event.addListener(clustererRef.current, 'clusterclick', (cluster) => {
                const level = map.getLevel();
                map.setLevel(level - 1, { anchor: cluster.getCenter() });
            });
        }

        // ✅ 중앙 마커 추가 (한 번만 생성, 이후 위치만 이동)
        const centerLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);

        if (!window.centerMarker) {
            const marker = new window.kakao.maps.Marker({
                position: centerLatLng,
                draggable: true,
                map,
                image: new window.kakao.maps.MarkerImage(
                    '/icons/center-marker.png',
                    new window.kakao.maps.Size(48, 48)
                ),
            });

            kakao.maps.event.addListener(marker, 'dragend', () => {
                const newPos = marker.getPosition();
                setCoords({
                    lat: newPos.getLat(),
                    lng: newPos.getLng(),
                });
            });

            window.centerMarker = marker;
        } else {
            window.centerMarker.setPosition(centerLatLng);
        }

        Object.entries(CATEGORY_MAP).forEach(([key, { code, image }]) => {
            ps.categorySearch(code, (result, status) => {
                if (status !== window.kakao.maps.services.Status.OK) return;

                const newMarkers = result.map((place) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                        image: new window.kakao.maps.MarkerImage(
                            image,
                            new window.kakao.maps.Size(55, 55)
                        ),
                    });

                    const overlay = new window.kakao.maps.CustomOverlay({
                        content: `<div class=\"custom-overlay\">${place.place_name || place.address_name}</div>`,
                        position: marker.getPosition(),
                        yAnchor: 2,
                    });

                    let fixed = false;

                    kakao.maps.event.addListener(marker, 'mouseover', () => {
                        if (!fixed) overlay.setMap(map);
                    });
                    kakao.maps.event.addListener(marker, 'mouseout', () => {
                        if (!fixed) overlay.setMap(null);
                    });
                    kakao.maps.event.addListener(marker, 'click', () => {
                        fixed = !fixed;
                        overlay.setMap(fixed ? map : null);
                    });

                    marker.setMap(category[key] ? map : null);

                    return marker;
                });

                markersRef.current[key] = newMarkers;
                clustererRef.current.addMarkers(newMarkers);
            }, { location: center, radius: DEFAULT_RADIUS });
        });

        return () => {
            Object.values(markersRef.current).flat().forEach((marker) => marker.setMap(null));
            Object.keys(markersRef.current).forEach((key) => (markersRef.current[key] = []));
            if (clustererRef.current) clustererRef.current.clear();
        };
    }, [map, center]);

    return null;
};

export default Marker;
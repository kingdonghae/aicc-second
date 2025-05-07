import { useEffect, useRef } from 'react';
import { CATEGORY_MAP, DEFAULT_RADIUS } from '@/constants/mapDefaults.js';

const Marker = ({ map, center, category }) => {
    const markersRef = useRef({});

    useEffect(() => {
        if (!map || !center) return;
        const ps = new window.kakao.maps.services.Places();

        Object.keys(markersRef.current).forEach((key) => {
            markersRef.current[key].forEach((m) => m.setMap(null));
        });
        markersRef.current = {};

        Object.entries(category).forEach(([key, isActive]) => {
            if (!isActive || !CATEGORY_MAP[key]) return;

            ps.categorySearch(CATEGORY_MAP[key].code, (result, status) => {
                if (status !== kakao.maps.services.Status.OK) return;

                const newMarkers = result.map((place) => {
                    const marker = new window.kakao.maps.Marker({
                        map,
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                        image: new window.kakao.maps.MarkerImage(
                            CATEGORY_MAP[key].image,
                            new window.kakao.maps.Size(50, 50)
                        ),
                    });

                    const overlay = new window.kakao.maps.CustomOverlay({
                        content: `<div class="custom-overlay"><strong>${place.place_name}</strong><br/>${place.road_address_name || place.address_name}</div>`,
                        position: marker.getPosition(),
                        yAnchor: 2,
                    });

                    kakao.maps.event.addListener(marker, 'mouseover', () => overlay.setMap(map));
                    kakao.maps.event.addListener(marker, 'mouseout', () => overlay.setMap(null));
                    return marker;
                });

                markersRef.current[key] = newMarkers;
            }, { location: center, radius: DEFAULT_RADIUS });
        });

        return () => {
            Object.values(markersRef.current).flat().forEach((m) => m.setMap(null));
            markersRef.current = {};
        };
    }, [map, center, category]);

    return null;
};

export default Marker;

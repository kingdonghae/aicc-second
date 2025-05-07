
import { useEffect, useRef } from 'react';
import { CATEGORY_MAP, DEFAULT_RADIUS } from '@/constants/mapDefaults.js';

const Marker = ({ map, center, category }) => {
    const markersRef = useRef({
        subway: [],
        school: [],
        mart: [],
        hospital: []
    });
    const clustererRef = useRef(null);

    useEffect(() => {
        if (!map || !center || !category) return;
        const ps = new window.kakao.maps.services.Places();

        Object.keys(markersRef.current).forEach((key) => {
            markersRef.current[key].forEach((marker) => marker.setMap(null));
            markersRef.current[key] = [];
        });

        if (clustererRef.current) {
            clustererRef.current.clear();
        }

        const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 3 ,
            disableClickZoom: true,
        });

        window.kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster) => {
            const level = map.getLevel();
            map.setLevel(level - 1, { anchor: cluster.getCenter() });
        });

        clustererRef.current = clusterer;

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
                            new window.kakao.maps.Size(55, 55)
                        ),
                    });

                    const overlay = new window.kakao.maps.CustomOverlay({
                        content: `<div class="custom-overlay"><strong>${place.place_name}</strong><br/>${place.road_address_name || place.address_name}</div>`,
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
                        if (fixed) {
                            overlay.setMap(map);
                        } else {
                            overlay.setMap(null);
                        }
                    });

                    return marker;
                });
                newMarkers.forEach((m) => clusterer.addMarker(m));
                markersRef.current[key] = newMarkers;
            }, { location: center, radius: DEFAULT_RADIUS });
        });

        return () => {
            Object.values(markersRef.current).flat().forEach((marker) => marker.setMap(null));
            Object.keys(markersRef.current).forEach((key) => (markersRef.current[key] = []));
            if (clustererRef.current) clustererRef.current.clear();
        };
    }, [map, center, category]);

    return null;
};

export default Marker;

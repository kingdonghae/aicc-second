import { useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from "@/pages/home/utils/loadKakaoMapScript.js";
import { DEFAULT_CENTER, DEFAULT_LEVEL } from "@/constants/mapDefaults.js";
import { createMarkerWithOverlay } from "@/pages/map/utils/createMarkerWithOverlay.js";

export const useKakaoMap = ({ coords, address, onDragStart, onDragEnd, mapRef, setCoords }) => {
    
    const mapInstanceRef = useRef(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current) return;

            await loadKakaoMapScript();

            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const latLng = coords?.lat && coords?.lng
                        ? new window.kakao.maps.LatLng(coords.lat, coords.lng)
                        : new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);

                    const map = new window.kakao.maps.Map(mapRef.current, {
                        center: latLng,
                        level: DEFAULT_LEVEL,
                    });

                    mapInstanceRef.current = map;
                    setCenter(latLng);

                    if (onDragStart) {
                        window.kakao.maps.event.addListener(map, 'dragstart', onDragStart);
                    }
                    if (onDragEnd) {
                        window.kakao.maps.event.addListener(map, 'dragend', onDragEnd);
                    }

                    if (coords?.lat && coords?.lng) {
                        createMarkerWithOverlay(map, latLng, address, setCoords);
                    }
                });
            }
        };

        initMap();
    }, [coords, address]);

    return {
        mapInstance: mapInstanceRef.current,
        center
    };
};

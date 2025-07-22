import { useEffect, useRef } from 'react';
import { CATEGORY_MAP, DEFAULT_RADIUS } from '@/constants/mapDefaults.js';

const Marker = ({ map, center, category }) => {
    const markersRef = useRef({
        subway: [],
        school: [],
        mart: [],
        hospital: [],
        daiso: [],
        culture: []
    });
    const clustererRef = useRef(null);

    // ✅ [1] 카테고리 상태 변경 시 마커 가시성만 토글 (깜빡임 최소화)
    useEffect(() => {
        if (!map || !category || !clustererRef.current) return;

        let needsRedraw = false; // 가시성 변경 여부 확인 플래그

        Object.entries(markersRef.current).forEach(([key, markers]) => {
            const isCategoryActive = category[key];

            markers.forEach(marker => {
                const currentMap = marker.getMap(); // 마커가 현재 지도에 있는지 확인

                // 마커가 활성화되어야 하는데 현재 지도에 없으면 지도에 추가
                if (isCategoryActive && !currentMap) {
                    marker.setMap(map);
                    needsRedraw = true;
                }
                // 마커가 비활성화되어야 하는데 현재 지도에 있으면 지도에서 제거
                else if (!isCategoryActive && currentMap) {
                    marker.setMap(null);
                    needsRedraw = true;
                }
                // 상태 변화가 없으면 아무것도 하지 않음
            });
        });

        // 가시성 변경 후 클러스터러가 필요한 경우만 redraw 호출
        if (needsRedraw && clustererRef.current) {
            requestAnimationFrame(() => {
                clustererRef.current.redraw(); // 클러스터러 새로 그리기
            });
        }
    }, [category, map]); // category나 map이 변경될 때마다 실행

    // ✅ [2] 맵/중심 변경 시 마커 데이터 재검색 및 클러스터러 재설정
    useEffect(() => {
        if (!map || !center) return;

        const ps = new window.kakao.maps.services.Places();

        // 기존 마커 및 클러스터러 초기화
        Object.values(markersRef.current).flat().forEach(marker => marker.setMap(null));
        Object.keys(markersRef.current).forEach(key => markersRef.current[key] = []);
        if (clustererRef.current) {
            clustererRef.current.clear();
        }

        // 클러스터러 인스턴스 생성 (최초에 한 번만)
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

        const fetchAndStoreMarkers = (key, code, keyword, image) => {
            const callback = (result, status) => {
                if (status !== window.kakao.maps.services.Status.OK) return;

                const newMarkers = result.map((place) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                        image: new window.kakao.maps.MarkerImage(image, new window.kakao.maps.Size(55, 55)),
                        map: category[key] ? map : null // 초기 가시성 설정
                    });

                    // 커스텀 오버레이
                    const overlay = new window.kakao.maps.CustomOverlay({
                        content: `<div class="custom-overlay">${place.place_name || place.address_name}</div>`,
                        position: marker.getPosition(),
                        yAnchor: 2,
                    });

                    let fixed = false;
                    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                        if (!fixed) overlay.setMap(map);
                    });
                    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                        if (!fixed) overlay.setMap(null);
                    });
                    window.kakao.maps.event.addListener(marker, 'click', () => {
                        fixed = !fixed;
                        overlay.setMap(fixed ? map : null);
                    });

                    return marker;
                });

                markersRef.current[key] = newMarkers;

                // 데이터 로드 후, 해당 카테고리가 활성화되어 있으면 클러스터러에 마커 추가
                const initiallyVisibleMarkers = newMarkers.filter(m => category[key]);
                clustererRef.current.addMarkers(initiallyVisibleMarkers);
            };

            if (keyword) {
                ps.keywordSearch(keyword, callback, { location: center, radius: DEFAULT_RADIUS });
            } else if (code) {
                ps.categorySearch(code, callback, { location: center, radius: DEFAULT_RADIUS });
            }
        };

        // 모든 카테고리별로 마커 검색
        Object.entries(CATEGORY_MAP).forEach(([key, { code, image }]) => {
            if (key === 'daiso') {
                fetchAndStoreMarkers(key, null, '다이소', image);
            } else if (key === 'park') {
                fetchAndStoreMarkers(key, null, '공원', image);
            } else {
                fetchAndStoreMarkers(key, code, null, image);
            }
        });

        // 클린업 함수: 컴포넌트 언마운트 또는 map/center 변경 시 마커와 클러스터러 정리
        return () => {
            Object.values(markersRef.current).flat().forEach(marker => marker.setMap(null));
            Object.keys(markersRef.current).forEach(key => markersRef.current[key] = []);
            if (clustererRef.current) clustererRef.current.clear();
        };
    }, [map, center, category]); // `category`를 의존성으로 추가하여 초기 로딩 시 반영되도록 함

    return null;
};

export default Marker;

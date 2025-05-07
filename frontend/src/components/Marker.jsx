import { useEffect, useRef } from 'react';

const categoryMap = {
  subway: { code: 'SW8', label: '지하철', image: '/icons/subway.png' },
  school: { code: 'SC4', label: '학교', image: '/icons/school.png' },
  mart: { code: 'MT1', label: '마트', image: '/icons/mart.png' },
  hospital: { code: 'HP8', label: '병원', image: '/icons/hospital.png' },
};

const Marker = ({ map, category, center }) => {
  const markersRef = useRef({
    subway: [],
    school: [],
    mart: [],
    hospital: []
  });

  const clustererRef = useRef(null);

  useEffect(() => {
    if (!map || !center) return;

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
      if (!isActive) return;

      const kind = categoryMap[key];
      if (!kind) return;

      ps.categorySearch(
        kind.code,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = result.map((place) => {
              const markerImage = new kakao.maps.MarkerImage(
                kind.image,
                new kakao.maps.Size(55, 55)
              );

              const marker = new window.kakao.maps.Marker({
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage,
              });

              const overlayContent = `
                <div class="custom-overlay">
                  <strong>${place.place_name}</strong><br/>
                  ${place.road_address_name || place.address_name}
                </div>
              `;

              const overlay = new kakao.maps.CustomOverlay({
                content: overlayContent,
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
          }
        },
        {
          location: center,
          radius: 1000
        }
      );
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

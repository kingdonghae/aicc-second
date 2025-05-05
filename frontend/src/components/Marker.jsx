import { useEffect, useRef } from 'react';

const categoryMap = {
  subway: { code: 'SW8', label: '지하철', image: '/icons/subway2.png' },
  school: { code: 'SC4', label: '학교', image: '/icons/school2.png' },
  mart: { code: 'MT1', label: '마트', image: '/icons/mart2.png' },
  hospital: { code: 'HP8', label: '병원', image: '/icons/hospital2.png' },
};

const Marker = ({ map, category, center }) => {
  const markersRef = useRef({
    subway: [],
    school: [],
    mart: [],
    hospital: []
  });

  useEffect(() => {
    if (!map || !center) return;

    const ps = new window.kakao.maps.services.Places();

    Object.keys(markersRef.current).forEach((key) => {
      if (!category[key]) {
        markersRef.current[key].forEach((marker) => marker.setMap(null));
        markersRef.current[key] = [];
      }
    });

    Object.entries(category).forEach(([key, isActive]) => {
      if (!isActive) return;
      const kind = categoryMap[key];
      if (!kind || markersRef.current[key].length > 0) return;

      ps.categorySearch(
        kind.code,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = result.map((place) => {
              const markerImage = new kakao.maps.MarkerImage(
                kind.image,
                new kakao.maps.Size(50, 50)
              );

              const marker = new window.kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage
              });

              const overlayContent = `
                <div class="custom-overlay">
                  <strong>${place.place_name}</strong><br/>
                  ${place.road_address_name || place.address_name}
                </div>
              `;

              const overlay = new kakao.maps.CustomOverlay({
                content: overlayContent,
                map: null,
                position: marker.getPosition(),
                yAnchor: 2
              });

              window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                overlay.setMap(map);
              });
              window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                overlay.setMap(null);
              });

              // 클릭으로 했다가 호버로 바꿨어요
              // let isOpen = false;
              // window.kakao.maps.event.addListener(marker, 'click', () => {
              //   if (isOpen) {
              //     overlay.setMap(null);
              //   } else {
              //     overlay.setMap(map);
              //   }
              //   isOpen = !isOpen;
              // });

              return marker;
            });

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
    };
  }, [map, center, category]);

  return null;
};

export default Marker;

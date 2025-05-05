import { useEffect, useRef } from 'react';

const categoryMap = {
  subway: { code: 'SW8', label: '지하철' },
  school: { code: 'SC4', label: '학교' },
  mart: { code: 'MT1', label: '마트' },
  hospital: { code: 'HP8', label: '병원' }
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
      if (!kind) return;

      if (markersRef.current[key].length > 0) return;

      ps.categorySearch(
        kind.code,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = result.map((place) => {
              return new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(place.y, place.x)
              });
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

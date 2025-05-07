export const DEFAULT_CENTER = {
    lat: 37.5665, // 서울시청 위도
    lng: 126.9780, // 서울시청 경도
};

export const DEFAULT_LEVEL = 3;

export const DEFAULT_RADIUS = 1000;

export const DEFAULT_MARKER_IMAGE = {
    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
    size: { width: 24, height: 35 },
};

// utils/constants.js
export const CATEGORY_MAP = {
    subway: {
        code: 'SW8',
        label: '지하철',
        image: '/icons/subway2.png',
        color: 'red',
    },
    school: {
        code: 'SC4',
        label: '학교',
        image: '/icons/school2.png',
        color: 'green',
    },
    mart: {
        code: 'MT1',
        label: '마트',
        image: '/icons/mart2.png',
        color: 'blue',
    },
    hospital: {
        code: 'HP8',
        label: '병원',
        image: '/icons/hospital2.png',
        color: 'purple',
    },
};

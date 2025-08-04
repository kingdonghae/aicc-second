export const DEFAULT_CENTER = {
    lat: 37.5665, 
    lng: 126.9780, 
};

export const DEFAULT_LEVEL = 3;

export const DEFAULT_RADIUS = 1000;

export const DEFAULT_MARKER_IMAGE = {
    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
    size: { width: 24, height: 35 },
};

export const CATEGORY_MAP = {
    subway: {
        code: 'SW8',
        label: '지하철',
        image: '/icons/subway5.png',
    },
    school: {
        code: 'SC4',
        label: '학교',
        image: '/icons/school5.png',
    },
    mart: {
        code: 'MT1',
        label: '마트',
        image: '/icons/mart5.png',
    },
    hospital: {
        code: 'HP8',
        label: '병원',
        image: '/icons/hospital5.png',
    },
    daiso: {
        code: '',
        label: '다이소',
        image: '/icons/daiso.png',
        color: '#6f42c1',
    },
    culture: {
        code: 'CT1',
        label: '문화시설',
        image: '/icons/culture.png',
        color: '#ff69b4',
    },
};

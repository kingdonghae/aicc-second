import SubwayIcon from '@mui/icons-material/Subway';
import ForestIcon from '@mui/icons-material/Forest';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Groups2Icon from '@mui/icons-material/Groups2';


export const LegendList = {
  transparents : {
    icon: <SubwayIcon/>,
    label: '교통',
    description: '근방의 지하철 노선수로 점수화',
    description2: '노선이 많이 지나갈수록 높은 점수',
    source: '출처 : 국가교통부 레일포털'
  },
  facility : {
    icon: <ForestIcon/>,
    label: '생활 인프라',
    description: '근방 다이소, 병원, 약국의 수로 점수화',
    description2: '개수가 많을수록 높은 점수',
    source: '출처 : 카카오맵'
    
  },
  rent : {
    icon: <MapsHomeWorkIcon/>,
    label: '시세',
    description: '근방 전월세 시세, 건축년도, 층을 점수화',
    description2: '시세가 저렴할수록 높은 점수',
    source: '출처 : 국토 교통부 오픈API',
  },
  safety : {
    icon: <ChildCareIcon/>,
    label: '치안',
    description: '근방 교육시설, 경찰서 수를 점수화',
    description2: '범죄율이 낮고 시설이 많을수록 높은 점수',
    source: '출처 : 오픈API Data'
  },
  noisy : {
    icon: <HeadphonesIcon/>,
    label: '소음',
    description: '근방 야간 평균 소음을 점수화',
    description2: '조용한 동네일수록 높은 점수',
    source: '출처 : 한국환경공단'
  },
  population : {
    icon: <Groups2Icon/>,
    label: '인구 밀도',
    description: '면적당 인구수로 점수화',
    description2: '인구밀도가 낮을수록 높은 점수.',
    source: '출처 : 통계지리정보서비스'
  },
}
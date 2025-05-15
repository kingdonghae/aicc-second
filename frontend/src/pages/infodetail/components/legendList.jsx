import SubwayIcon from '@mui/icons-material/Subway';
import ForestIcon from '@mui/icons-material/Forest';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Groups2Icon from '@mui/icons-material/Groups2';


export const legendList = {
  transparents : {
    icon: <SubwayIcon/>,
    label: '교통',
    description: 'd'
  },
  facility : {
    icon: <ForestIcon/>,
    label: '생활 인프라',
    description: '설명',
  },
  rent : {
    icon: <MapsHomeWorkIcon/>,
    label: '시세',
    description: '돈 많았으면 좋겠다',
  },
  safety : {
    icon: <ChildCareIcon/>,
    label: '치안',
    description: '안전한 곳',
  },
  noisy : {
    icon: <HeadphonesIcon/>,
    label: '소음',
    description: '시끄러운 곳 싫어요',
  },
  population : {
    icon: <Groups2Icon/>,
    label: '인구 밀도',
    description: '인간이 싫어요',
  },
}
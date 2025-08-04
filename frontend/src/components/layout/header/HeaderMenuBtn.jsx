import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/hook/useNavigation.js';
import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/authState';
import { ROUTES } from '@/constants/routes';

const HeaderMenuBtn = ({ menuRef }) => {
    const { goMap, goRank, goBoard, goCustom } = useNavigation();
    const { isLoggedIn } = useRecoilValue(authState);
    const location = useLocation();

    const isActive = (path) => location.pathname === `${path}`;

    return (
        <nav className="menu-popup" ref={menuRef}>
            <ul className="menu-group">
                <li className="menu-list" id={isActive(ROUTES.MAP) ? 'menu-select' : undefined} onClick={goMap}>
                    <button>
                        <MapIcon style={{ fontSize: '2rem' }} />지도 보기
                    </button>
                </li>
                <li className="menu-list" id={isActive(ROUTES.RANK) ? 'menu-select' : undefined} onClick={goRank}>
                    <button>
                        <TrendingUpIcon style={{ fontSize: '2rem' }} />검색 순위
                    </button>
                </li>
                <li className="menu-list" id={isActive(ROUTES.BOARD) ? 'menu-select' : undefined} onClick={goBoard}>
                    <button>
                        <Diversity3Icon style={{ fontSize: '2rem' }} />정보 마당
                    </button>
                </li>
                {isLoggedIn && (
                    <li className="menu-list" id={isActive(ROUTES.CUSTOM) ? 'menu-select' : undefined} onClick={() => goCustom()}   >
                        <button>
                            <SavedSearchIcon style={{ fontSize: '2.5rem' }} />맞춤 지역
                        </button>
                    </li>
                )}

            </ul>
        </nav>
    );
};
export default HeaderMenuBtn;

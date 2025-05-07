import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/hook/useNavigation.js';
import { ROUTES } from '@/constants/routes';

const HeaderMenuBtn = ({ menuRef }) => {
    const { goMap, goRank, goBoard } = useNavigation();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="menu-popup" ref={menuRef}>
            <ul className="menu-group">
                <li className="menu-list">
                    <button
                        onClick={goMap}
                        className={isActive(ROUTES.MAP) ? 'active' : ''}
                    >
                        <MapIcon style={{ fontSize: '2.5rem' }} />지도 보기
                    </button>
                </li>
                <li className="menu-list">
                    <button
                        onClick={goRank}
                        className={isActive(ROUTES.RANK) ? 'active' : ''}
                    >
                        <TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위
                    </button>
                </li>
                <li className="menu-list">
                    <button
                        onClick={goBoard}
                        className={isActive(ROUTES.BOARD) ? 'active' : ''}
                    >
                        <Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenuBtn;

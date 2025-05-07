import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from 'react-router-dom';

const HeaderMenuBtn = ({ menuRef }) => {
    const navigate = useNavigate();

    return (
        <nav className="menu-popup" ref={menuRef}>
            <ul className="menu-group">
                <li className="menu-list" onClick={() => navigate('/map')}>
                    <button><MapIcon style={{ fontSize: '2.5rem' }} />지도 보기</button>
                </li>
                <li className="menu-list" onClick={() => navigate('/rank')}>
                    <button><TrendingUpIcon style={{ fontSize: '2.5rem' }} />검색 순위</button>
                </li>
                <li className="menu-list" onClick={() => navigate('/board')}>
                    <button><Diversity3Icon style={{ fontSize: '2.5rem' }} />정보 마당</button>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenuBtn;

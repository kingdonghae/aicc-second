import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import {useNavigation} from "@/hook/useNavigation.js";

const HeaderBase = ({ children, showMenuButton = true }) => {
    const { goMyPage, goLogin, goHome } = useNavigation();
    const navigate = useNavigate();
    const auth = useRecoilValue(authState);
    const setAuth = useSetRecoilState(authState);
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => setMenu((prev) => !prev);
    const closeMenu = () => setMenu(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('token');
            setAuth({ token: null, isLoggedIn: false });
            navigate('/');
        }
    };

    const renderAuthButtons = () => {
        if (auth?.isLoggedIn) {
            return (
                <>
                    <button className="menu-button" onClick={goMyPage}>
                        <PersonIcon />
                    </button>
                    <button className="menu-button" onClick={handleLogout}>
                        <LogoutIcon />
                    </button>
                </>
            );
        } else {
            return (
                <button className="menu-button" onClick={goLogin}>
                    Login
                </button>
            );
        }
    };

    return (
        <header className="common-header" ref={menuRef}>
            {showMenuButton && (
                <button className="home-menu" onClick={goHome}>집PT</button>
            )}
            <div className="menu-box" ref={menuRef}>
                {renderAuthButtons()}
                {showMenuButton && (
                    <button className="menu-button" onClick={(e) => {
                        toggleMenu();
                    }}>
                        <MenuIcon />
                    </button>
                )}
            </div>
            {menu && children()}
        </header>
    );
};

export default HeaderBase;

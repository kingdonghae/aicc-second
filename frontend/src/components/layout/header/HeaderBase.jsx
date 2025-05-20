import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/authState';
import { useNavigation } from "@/hook/useNavigation.js";
import { useAuth } from '@/hook/useAuth';
import { useShowModal } from "@/utils/showModal.js";

const HeaderBase = ({ children, showMenuButton = true }) => {
    const { goMyPage, goLogin, goHome } = useNavigation();
    const auth = useRecoilValue(authState);
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();
    const { logout } = useAuth();
    const showModal = useShowModal();
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
        showModal({
            title: '   ',
            message: '로그아웃 하시겠습니까?',
            onConfirm: () => {
                logout();
                goHome();
            }, 
            showCancelButton: true,
        });
    };

    const renderAuthButtons = () => {
        if (location.pathname === '/login' || location.pathname === '/login/email') return null;

        if (location.pathname === '/mypage') return (
            <>
                <button className="menu-button" onClick={handleLogout}>
                    <LogoutIcon />
                </button>
            </>
        );

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
                <button className="home-menu" onClick={goHome}>
                    <img src="/logo.png" id="logo-img" alt="logo" />
                </button>
            )}
            <div className="menu-box" ref={menuRef}>
                {renderAuthButtons()}
                {showMenuButton && (
                    <button className="menu-button" onClick={() => {
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

import { Outlet, useLocation } from 'react-router-dom';
import DefaultHeader from "@/components/layout/header/DefaultHeader.jsx";
import HomeHeader from "@/components/layout/header/HomeHeader.jsx";
import '../../styles/Header.css'

const Layout = () => {
    const location = useLocation();
    const path = location.pathname;

    const renderHeader = () => {
        if (path === '/') return <HomeHeader />;
        return <DefaultHeader />;
    };

    return (
        <>
            {renderHeader()}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

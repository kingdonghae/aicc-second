import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import { ROUTES } from "@/constants/routes";

import Home from "@/pages/home/Home.jsx";
import Rank from "@/pages/rank/Rank.jsx";
import Signup from "@/pages/signup/Signup.jsx";
import Login from "@/pages/Login.jsx";
import Mypage from "@/pages/Mypage.jsx";
import WritePage from "@/pages/write/WritePage.jsx";
import TextDetail from "@/pages/textdetail/TextDetail.jsx";
import InfoDetail from "@/pages/infodetail/InfoDetail.jsx";
import Board from "@/pages/board/Board";
import MapPage from "@/pages/map/MapPage.jsx";


function App() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.RANK} element={<Rank />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.MYPAGE} element={<Mypage />} />
                <Route path={ROUTES.WRITE} element={<WritePage />} />
                <Route path={`${ROUTES.TEXT_DETAIL}/:id`} element={<TextDetail />} />
                <Route path={ROUTES.INFO_DETAIL} element={<InfoDetail />} />
                <Route path={ROUTES.MAP} element={<MapPage />} />
                <Route path={ROUTES.BOARD} element={<Board />} />

            </Route>
        </Routes>
    );
}

export default App;

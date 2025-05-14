import { Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout.jsx";
import { ROUTES } from "@/constants/routes";

import Home from "@/pages/home/Home.jsx";
import Rank from "@/pages/rank/Rank.jsx";
import LoginSelect from '@/pages/login/LoginSelect';
import EmailLogin from '@/pages/login/EmailLogin';
import SignupTerms from '@/pages/signup/SignupTerms';
import SignupForm from '@/pages/signup/SignupForm';
import Mypage from "@/pages/mypage/Mypage.jsx";
import WritePage from "@/pages/write/WritePage.jsx";
import TextDetail from "@/pages/textdetail/TextDetail.jsx";
import InfoDetail from "@/pages/infodetail/InfoDetail.jsx";
import Board from "@/pages/board/Board";
import MapPage from "@/pages/map/MapPage.jsx";
import OAuthSuccess from "@/pages/login/OAuthSuccess.jsx";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.RANK} element={<Rank />} />
                <Route path="/login" element={<LoginSelect />} />
                <Route path="/login/email" element={<EmailLogin />} />
                <Route path="/signup" element={<SignupTerms />} />
                <Route path="/signup/form" element={<SignupForm />} />
                <Route path={ROUTES.MYPAGE} element={
                    <ProtectedRoute><Mypage /></ProtectedRoute>}/>
                <Route path={ROUTES.WRITE} element={
                    <ProtectedRoute><WritePage /></ProtectedRoute>}/>
                <Route path={`${ROUTES.TEXT_DETAIL}/:id`} element={<TextDetail />} />
                <Route path={`${ROUTES.WRITE}/:id`} element={<WritePage />} />
                <Route path={ROUTES.INFO_DETAIL} element={<InfoDetail />} />
                <Route path={ROUTES.MAP} element={<MapPage />} />
                <Route path={ROUTES.BOARD} element={<Board />} />

            </Route>
        </Routes>
    );
}

export default App;

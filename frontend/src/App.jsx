import { Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout.jsx";
import { ROUTES } from "@/constants/routes";

import Home from "@/pages/home/Home.jsx";
import Rank from "@/pages/rank/Rank.jsx";
import LoginSelect from '@/pages/login/LoginSelect';
import EmailLogin from '@/pages/login/EmailLogin';
import SignupTerms from '@/pages/signup/SignupTerms';
import SignupForm from '@/pages/signup/SignupForm';
import SocialExtraForm from "./pages/signup/SocialExtraForm";
import Mypage from "@/pages/mypage/Mypage.jsx";
import WritePage from "@/pages/write/WritePage.jsx";
import TextDetail from "@/pages/textdetail/TextDetail.jsx";
import InfoDetail from "@/pages/infodetail/InfoDetail.jsx";
import Board from "@/pages/board/Board";
import MapPage from "@/pages/map/MapPage.jsx";
import OAuthSuccess from "@/pages/login/OAuthSuccess.jsx";
import AlertModal from "@/components/AlertModal.jsx";
import Custom from "@/pages/custom/Custom";
import CustomInput from "./pages/custom/CustomInput";


function App() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={ROUTES.RANK} element={<Rank />} />
                    <Route path={ROUTES.LOGIN} element={<LoginSelect />} />
                    <Route path={ROUTES.OAUTH_SUCCESS} element={<OAuthSuccess />} />
                    <Route path={ROUTES.LOGIN_EMAIL} element={<EmailLogin />} />
                    <Route path={ROUTES.SIGNUP} element={<SignupTerms />} />
                    <Route path={ROUTES.SIGNUP_FORM} element={<SignupForm />} />
                    <Route path={ROUTES.SIGNUP_SOCIAL_FORM} element={<SocialExtraForm />} />
                    <Route path={ROUTES.MYPAGE} element={<Mypage />}/>
                    <Route path={ROUTES.WRITE} element={<WritePage />}/>
                    <Route path={`${ROUTES.TEXT_DETAIL}/:id`} element={<TextDetail />} />
                    <Route path={`${ROUTES.WRITE}/:id`} element={<WritePage />} />
                    <Route path={ROUTES.INFO_DETAIL} element={<InfoDetail />} />
                    <Route path={ROUTES.MAP} element={<MapPage />} />
                    <Route path={ROUTES.BOARD} element={<Board />} />
                    <Route path={ROUTES.CUSTOM} element={<Custom />}/>
                    <Route path={ROUTES.CUSTOM_INPUT} element={<CustomInput/>}></Route>
                </Route>
            </Routes>
            <AlertModal />
        </>
    );
}

export default App;

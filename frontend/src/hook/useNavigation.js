import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useNavigation = () => {
    const navigate = useNavigate();

    return {
        goHome: () => navigate(ROUTES.HOME),
        goMap: () => navigate(ROUTES.MAP),
        goRank: () => navigate(ROUTES.RANK),
        goBoard: () => navigate(ROUTES.BOARD),
        goLogin: () => navigate(ROUTES.LOGIN),
        goSignup: () => navigate(ROUTES.SIGNUP),
        goMyPage: () => navigate(ROUTES.MYPAGE),
        goInfoDetail: () => navigate(ROUTES.INFO_DETAIL),
        goWrite: () => navigate(ROUTES.WRITE),
        goTextDetail: (id) => navigate(`${ROUTES.TEXT_DETAIL}/${id}`),
    };
};

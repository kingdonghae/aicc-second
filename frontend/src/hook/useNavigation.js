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
        goLoginEmail: () => navigate(ROUTES.LOGIN_EMAIL),
        goSignup: () => navigate(ROUTES.SIGNUP),
        goSignupForm: () => navigate(ROUTES.SIGNUP_FORM),
        goSignupSocialForm: () => navigate(ROUTES.SIGNUP_SOCIAL_FORM),
        goMyPage: () => navigate(ROUTES.MYPAGE),
        goInfoDetail: (coords, address) => navigate(ROUTES.INFO_DETAIL, {
            state: { coords, address }
        }),
        goWrite: () => navigate(ROUTES.WRITE),
        goTextDetail: (id) => navigate(`${ROUTES.TEXT_DETAIL}/${id}`),
        goEdit: (id) => navigate(`${ROUTES.WRITE}/${id}`),
        goOAuthSuccess: () => navigate(ROUTES.OAUTH_SUCCESS)
    };
};

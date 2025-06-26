import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useNavigation = () => {
    const navigate = useNavigate();

    return {
        goHome: () => navigate(ROUTES.HOME),
        goMap: () => navigate(ROUTES.MAP),
        goMapWithState: (coords, address, score, gpt) => navigate(ROUTES.MAP, { state: { coords, address, score, gpt } }),
        goRank: () => navigate(ROUTES.RANK),
        goBoard: () => navigate(ROUTES.BOARD),
        goLogin: () => navigate(ROUTES.LOGIN),
        goLoginEmail: () => navigate(ROUTES.LOGIN_EMAIL),
        goSignup: () => navigate(ROUTES.SIGNUP),
        goSignupForm: () => navigate(ROUTES.SIGNUP_FORM),
        goSignupSocialForm: () => navigate(ROUTES.SIGNUP_SOCIAL_FORM),
        goMyPage: () => navigate(ROUTES.MYPAGE),
        goInfoDetail: (coords, address, score, gpt) => navigate(ROUTES.INFO_DETAIL, {
            state: { coords, address, score, gpt }
        }),
        goWrite: () => navigate(ROUTES.WRITE),
        goTextDetail: (id) => navigate(`${ROUTES.TEXT_DETAIL}/${id}`),
        goEdit: (id) => navigate(`${ROUTES.WRITE}/${id}`),
        goOAuthSuccess: () => navigate(ROUTES.OAUTH_SUCCESS),
        goCustom: (selected = []) => navigate(ROUTES.CUSTOM, {
            state: { selectedItem: selected }
        }),
        goCustomInput: (selected, inputs) => navigate(ROUTES.CUSTOM_INPUT, {
            state: {
                selectedItem: selected,
                inputValues: inputs
            }
        }),
        goCustomResult: (selected, inputs) => navigate(ROUTES.CUSTOM_RESULT, {
            state: {
                selectedItem: selected,
                inputValues: inputs
            }
        })
    };
};

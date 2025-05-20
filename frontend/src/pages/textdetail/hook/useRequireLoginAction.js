import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useShowModal } from '@/utils/showModal';
import { authState } from "@/atoms/authState.js";

export const useRequireLoginAction = () => {
    const { isLoggedIn } = useRecoilValue(authState);
    const navigate = useNavigate();
    const showModal = useShowModal();

    return (actionCallback, goLogin) => {
        if (isLoggedIn) {
            actionCallback();
        } else {
            showModal({
                title: '로그인이 필요합니다',
                message: `이 기능은 로그인 후 사용할 수 있습니다.<br/>로그인 하시겠습니까?`,
                showCancelButton: true,
                onConfirm: goLogin,
                onCancel: () => {
                },
            });
        }
    };
};

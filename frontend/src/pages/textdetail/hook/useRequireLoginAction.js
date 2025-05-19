import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useShowModal } from '@/utils/showModal';
import { authState } from "@/atoms/authState.js";

/**
 * 로그인 확인 후 특정 행동을 수행하는 재사용 훅
 * @returns {function} requireLoginAction(callback)
 */
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

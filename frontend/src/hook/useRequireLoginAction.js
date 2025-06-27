import { useRecoilValue } from 'recoil';
import { useShowModal } from '@/utils/showModal';
import { authState } from "@/atoms/authState.js";
import { useEffect } from "react";
import { useNavigation } from './useNavigation';

export const useRequireLoginAction = () => {
    const { isLoggedIn } = useRecoilValue(authState);
    const showModal = useShowModal();
    const { goLogin } = useNavigation();

    useEffect(() => {
        if (!isLoggedIn) {
            showModal({
                title: '로그인이 필요합니다',
                message: `이 페이지는 로그인 후 이용할 수 있습니다.`,
                showCancelButton: false,
                onConfirm: () => {
                    goLogin();
                },
                onCancel: () => { },
            });
        }
    }, [isLoggedIn, showModal, goLogin]);


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

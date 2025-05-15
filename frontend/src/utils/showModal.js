import { modalState } from '@/atoms/modalState';
import { useSetRecoilState } from 'recoil';

export function useShowModal() {
  const setModal = useSetRecoilState(modalState);

  return ({ title, message, onConfirm, onCancel, showCancelButton = false }) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm: onConfirm || null,
      onCancel: onCancel || null,
      showCancelButton,
    });
  };
}

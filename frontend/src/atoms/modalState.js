// atoms/modalState.js
import { atom } from 'recoil';

export const modalState = atom({
    key: 'modalState',
    default: {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
        showCancelButton: false,
    },
});

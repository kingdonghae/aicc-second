import { atom } from 'recoil';

// export const authState = atom({
//     key: 'authState',
//     default: {
//         token: localStorage.getItem('token') || null,
//         isLoggedIn: !!localStorage.getItem('token'),
//     },
// });
export const authState = atom({
    key: 'authState',
    default: {
        token: null,
        isLoggedIn: true,
    },
});

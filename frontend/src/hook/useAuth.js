// src/hook/useAuth.js
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { saveToken, removeToken } from '@/utils/authService';

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  const login = (user, token) => {
    saveToken(token);
    setAuth({
      isLoggedIn: true,
      user,
      token,
    });
  };

  const logout = () => {
    removeToken();
    setAuth({
      isLoggedIn: false,
      user: null,
      token: null,
    });
  };

  return { login, logout };
};

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { getToken, removeToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';

const AuthInitializer = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            removeToken();
            return ;
        }
        setAuth({
          isLoggedIn: true,
          user: { id: decoded.user_id },
          token,
        });
      } catch {
        removeToken();
      }
    }
  }, []);

  return null;
};

export default AuthInitializer;

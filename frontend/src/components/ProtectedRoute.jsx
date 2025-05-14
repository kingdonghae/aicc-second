// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/authState';

const ProtectedRoute = ({ children }) => {
  const auth = useRecoilValue(authState);

  if (!auth.isLoggedIn) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

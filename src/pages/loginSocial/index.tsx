import React from 'react';
import useKakaoAuth from '../../hooks/useKakaoAuth';

const LoginSocial: React.FC = () => {
  useKakaoAuth();

  return <div>로그인 중입니다...</div>;
};

export default LoginSocial;

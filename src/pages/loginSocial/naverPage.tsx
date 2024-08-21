import React from 'react';
import useNaverAuth from '../../hooks/useNaverAuth';

const NaverPage: React.FC = () => {
  useNaverAuth();

  return <div>로그인 중입니다...</div>;
};

export default NaverPage;

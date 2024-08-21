import React from 'react';
import useGoogleAuth from '../../hooks/useGoogleAuth';

const GooglePage: React.FC = () => {
  useGoogleAuth();

  return <div>로그인 중입니다...</div>;
};

export default GooglePage;

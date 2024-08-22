import React from 'react';
import useKakaoAuth from '../../hooks/useKakaoAuth';
import { Loader, Center, Text } from '@mantine/core';

const KakaoPage: React.FC = () => {
  useKakaoAuth();

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <Loader size={49} variant='bars' color='yellow' />
      <Text mt='md' size='lg'>
        카카오톡 로그인중입니다.
      </Text>
    </Center>
  );
};

export default KakaoPage;

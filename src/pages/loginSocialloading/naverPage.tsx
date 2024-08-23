import React from 'react';
import useNaverAuth from '../../hooks/useNaverAuth';
import { Loader, Center, Text } from '@mantine/core';

const NaverPage: React.FC = () => {
  useNaverAuth();

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <Loader size={49} variant='bars' color='green' />
      <Text mt='md' size='lg'>
        네이버 로그인중입니다.
      </Text>
    </Center>
  );
};

export default NaverPage;

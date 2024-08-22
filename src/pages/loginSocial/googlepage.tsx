import React from 'react';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import { Loader, Center, Text } from '@mantine/core';

const GooglePage: React.FC = () => {
  useGoogleAuth();

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <Loader size={49} variant='bars' color='red' />
      <Text mt='md' size='lg'>
        구글 로그인중입니다.
      </Text>
    </Center>
  );
};

export default GooglePage;

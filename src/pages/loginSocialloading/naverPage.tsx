import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNaverAuth from '../../hooks/useNaverAuth';
import { Loader, Center, Text } from '@mantine/core';

const NaverPage: React.FC = () => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate(`/login`);
  };

  useNaverAuth();

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <Loader size={49} variant='bars' color='green' />
      <Text mt='md' size='lg'>
        네이버 로그인중입니다.
      </Text>
      <button
        onClick={onClickLogin}
        className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:px-[20px] text-black-400 hover:bg-black-950 hover:text-white focus:bg-black-950 focus:text-white mt-5'
      >
        로그인창으로 돌아가기
      </button>
    </Center>
  );
};

export default NaverPage;

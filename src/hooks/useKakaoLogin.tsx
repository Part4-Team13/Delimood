import Cookies from 'js-cookie';
import postKakao from '../apis/postKakao';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { rem } from '@mantine/core';

const useKakaoLogin = () => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (code: string) => {
      const data = await postKakao(code);

      Cookies.set('accessToken', data.accessToken, { expires: new Date(Date.now() + 1800 * 1000) });
      Cookies.set('refreshToken', data.refreshToken);

      return data;
    },
    onSuccess: () => {
      navigate('/epigrams');
      showNotification({
        title: '로그인 완료되었습니다.',
        message: '성공적으로 로그인되었습니다.',
        icon: checkIcon,
        color: 'teal',
        autoClose: 2000,
        styles: () => ({
          root: {
            position: 'fixed',
            top: '10%',
            right: '3%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            width: '40%',
            maxWidth: '70%',
          },
        }),
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (!status) return;

        if (status === 400) {
          showNotification({
            title: '죄송합니다. 다시 시도해주세요.',
            message: '로그인 중 문제가 발생했습니다.',
            icon: xIcon,
            color: 'red',
            autoClose: 2000,
            styles: () => ({
              root: {
                position: 'fixed',
                top: '10%',
                right: '3%',
                transform: 'translate(-50%, -50%)',
                minWidth: '300px',
                width: '40%',
                maxWidth: '70%',
              },
            }),
          });
          navigate('/login');
          return;
        }

        if (status >= 500) {
          showNotification({
            title: '죄송합니다. 잠시 후 다시 시도해 주세요.',
            message: '서버에 문제가 발생했습니다',
            icon: xIcon,
            color: 'red',
            autoClose: 2000,
            styles: () => ({
              root: {
                position: 'fixed',
                top: '10%',
                right: '3%',
                transform: 'translate(-50%, -50%)',
                minWidth: '300px',
                width: '40%',
                maxWidth: '70%',
              },
            }),
          });
        }
      } else {
        showNotification({
          title: '죄송합니다. 잠시 후 다시 시도해 주세요.',
          message: '알수 없는 문제가 발생했습니다. ',
          icon: xIcon,
          color: 'red',
          autoClose: 2000,
          styles: () => ({
            root: {
              position: 'fixed',
              top: '10%',
              right: '3%',
              transform: 'translate(-50%, -50%)',
              minWidth: '300px',
              width: '40%',
              maxWidth: '70%',
            },
          }),
        });
      }
    },
  });
};

export default useKakaoLogin;

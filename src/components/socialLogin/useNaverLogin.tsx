import Cookies from 'js-cookie';
import postNaver from '../../apis/postNaver';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import alertMessage from '../AlertMessage';

const useNaverLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ code, state }: { code: string; state: string }) => {
      const data = await postNaver(code, state);

      Cookies.set('accessToken', data.accessToken, { expires: new Date(Date.now() + 1800 * 1000) });
      Cookies.set('refreshToken', data.refreshToken);

      return data;
    },
    onSuccess: () => {
      navigate('/epigrams');
      alertMessage({ title: '로그인 완료되었습니다.', message: '성공적으로 로그인되었습니다.', color: 'green' });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (!status) return;

        if (status === 400) {
          alertMessage({ title: '죄송합니다. 다시 시도해주세요.', message: '로그인 중 문제가 발생했습니다.', color: 'red' });
          navigate('/login');
          return;
        }

        if (status >= 500) {
          alertMessage({ title: '죄송합니다. 잠시 후 다시 시도해 주세요.', message: '서버에 문제가 발생했습니다.', color: 'red' });
        }
      } else {
        alertMessage({ title: '죄송합니다. 잠시 후 다시 시도해 주세요.', message: '알수 없는 문제가 발생했습니다.', color: 'red' });
      }
    },
  });
};

export default useNaverLogin;

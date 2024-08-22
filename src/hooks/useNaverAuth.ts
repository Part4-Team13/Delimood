import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useNaverLogin from '../components/socialLogin/useNaverLogin';

const useNaverAuth = () => {
  const location = useLocation();
  const { mutate: NaverLogin } = useNaverLogin();

  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params.get('state');

  useEffect(() => {
    if (code && state) {
      NaverLogin({ code, state });
    }
  }, [code, state, NaverLogin]);

  return null;
};

export default useNaverAuth;

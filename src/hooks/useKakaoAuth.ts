import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useKakaoLogin from './useKakaoLogin';

const useKakaoAuth = () => {
  const location = useLocation();
  const { mutate: kakaoLogin } = useKakaoLogin();

  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
    }
  }, [code, kakaoLogin]);

  return null;
};

export default useKakaoAuth;

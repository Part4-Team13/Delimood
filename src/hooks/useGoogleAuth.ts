import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGoogleLogin from '../components/socialLogin/useGoogleLogin';

//사용자가 구글에서 인증을 마치면, 구글은 code라는 인증 코드를 포함한 URL로 사용자를 리다이렉트하게 되는데
//이때, useGoogleAuth 훅이 동작함.

const useGoogleAuth = () => {
  const location = useLocation();
  const { mutate: googleLogin } = useGoogleLogin();

  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      googleLogin(code);
    }
  }, [code, googleLogin]);

  return null;
};

export default useGoogleAuth;

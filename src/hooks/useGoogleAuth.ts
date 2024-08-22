import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGoogleLogin from '../components/socialLogin/useGoogleLogin';

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

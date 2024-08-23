import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useNaverLogin from '../components/socialLogin/useNaverLogin';

//네이버 로그인 인증 후, 네이버에서 리디렉션된 URL에서 쿼리 파라미터를 추출하고, 이를 사용하여 서버에 로그인 요청을 보내는 역할
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

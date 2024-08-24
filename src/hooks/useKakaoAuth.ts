import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useKakaoLogin from '../components/socialLogin/useKakaoLogin';

//사용자가 카카오 로그인 페이지에서 로그인을 완료하면, 설정된 redirect_uri로 리디렉션됨.
//이때, URL에 code 파라미터가 포함되어 있는데 카카오가 발급한 인증 코드로, 서버에 로그인요청할때 필요함.
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

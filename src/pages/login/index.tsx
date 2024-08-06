import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Container, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { LoginRequest, LoginRequestType } from '../../schema/authSchema';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons-react';
import Logo from '../../assets/ico_logo.svg';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/socialLogin';
import { useLogin } from '../../hooks/authQuery';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

type ErrorResponse = {
  message: string;
  details: Record<string, { message: string }>;
};

const Login: React.FC = () => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const form = useForm<LoginRequestType>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = LoginRequest.safeParse(values);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        return errors;
      }
      return {};
    },
  });

  const isFormValid = form.isValid();
  const navigate = useNavigate();
  const loginMutation = useLogin({
    onSuccess: (data) => {
      Cookies.set('accessToken', data.accessToken, { expires: new Date(Date.now() + 1800 * 1000) });
      Cookies.set('refreshToken', data.refreshToken);

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
      navigate('/');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      const response = axiosError.response?.data;
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
      if (response?.details) {
        const errors: Record<string, string> = {};
        for (const [key, value] of Object.entries(response.details)) {
          errors[key] = value.message;
        }
        form.setErrors(errors);
      } else {
        console.error('로그인 실패:', error);
      }
    },
  });

  return (
    <div className='flex flex-col items-center justify-center mt-[110px] tablet:mt-[140px] desktop:mt-[160px]'>
      <button onClick={() => navigate('/')}>
        <img src={Logo} alt='Logo' />
      </button>
      <Container className='flex items-center justify-center mt-[50px] tablet:mt-[60px]'>
        <form
          onSubmit={form.onSubmit((values) => {
            loginMutation.mutate(values);
          })}
          className='w-[312px] flex flex-col gap-2.5 tablet:w-[384px] desktop:gap-4 desktop:w-[640px]'
        >
          <TextInput
            placeholder='이메일'
            {...form.getInputProps('email')}
            error={form.errors.email}
            onBlur={() => form.validateField('email')}
            classNames={{
              input: 'focus:border-black-600 focus:border-2 h-[44px] text-base bg-blue-200 rounded-2xl px-3 w-full text-base text-black-950 tablet:px-4 desktop:h-[64px] desktop:text-xl',
              error: 'pl-2 text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />

          <div className='relative mb-2.5'>
            <PasswordInput
              placeholder='비밀번호'
              {...form.getInputProps('password')}
              error={form.errors.password}
              onBlur={() => form.validateField('password')}
              classNames={{
                input: 'hover:border-black-600 hover:border-2 bg-blue-200 rounded-2xl h-[44px] desktop:h-[64px]',
                error: 'pl-2 text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: 'px-3 w-full text-black-950 tablet:px-4 desktop:text-xl',
                section: 'absolute right-4',
                visibilityToggle: 'text-gray-200',
              }}
              visibilityToggleIcon={({ reveal }) => (reveal ? <IconEyeOff style={{ width: rem(24), height: rem(24) }} /> : <IconEyeCheck style={{ width: rem(24), height: rem(24) }} />)}
            />
          </div>

          <Button
            type='submit'
            mt='md'
            className={`h-[44px] rounded-2xl px-3 w-full text-white text-base font-semibold desktop:h-[64px] desktop:text-xl ${isFormValid ? 'bg-black-500 hover:bg-black-500' : 'bg-blue-300'}`}
            disabled={!isFormValid}
          >
            로그인
          </Button>
        </form>
      </Container>
      <div className='mt-2.5 text-sm font-medium text-blue-400 w-[312px] tablet:w-[384px] desktop:w-[640px] flex justify-end tablet:text-base desktop:text-xl'>
        회원이 아니신가요?
        <button className='ml-1 underline text-black-500' onClick={() => navigate('/signup')}>
          회원가입하기
        </button>
      </div>
      <SocialLogin />
    </div>
  );
};

export default Login;

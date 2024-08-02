import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { LoginRequest, LoginRequestType } from '../../schema/authSchema';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import Logo from '../../assets/ico_logo.svg';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/socialLogin';
import { useLogin } from '../../hooks/authQuery';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

type ErrorResponse = {
  message: string;
  details: Record<string, { message: string }>;
};

const Login: React.FC = () => {
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
      toast.success('성공적으로 로그인되었습니다.');
      console.log('로그인 성공!', data);
      navigate('/');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      const response = axiosError.response?.data;
      if (response?.details) {
        const errors: Record<string, string> = {};
        for (const [key, value] of Object.entries(response.details)) {
          errors[key] = value.message;
        }
        form.setErrors(errors);
      } else {
        toast.error('다시 로그인부탁드립니다.');
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
              input: ` h-[44px] text-base bg-blue-200 rounded-2xl px-3 w-full text-base text-black-950 tablet:px-4 desktop:h-[64px] desktop:text-xl ${form.errors.email ? 'border border-state-alert' : ''}`,
              error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />
          <div className='relative mb-2.5'>
            <PasswordInput
              placeholder='비밀번호'
              {...form.getInputProps('password')}
              error={form.errors.password}
              onBlur={() => form.validateField('password')}
              classNames={{
                error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: `h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black-950 tablet:px-4 desktop:h-[64px] desktop:text-xl ${form.errors.password ? 'border border-state-alert' : ''}`,
                section: 'absolute right-4 transform -translate-y-9 desktop:-translate-y-11',
                visibilityToggle: 'text-gray-200',
              }}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? (
                  <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                ) : (
                  <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                )
              }
            />
          </div>

          <Button
            type='submit'
            mt='md'
            className={`h-[44px] rounded-2xl px-3 w-full text-white text-base font-semibold desktop:h-[64px] desktop:text-xl ${isFormValid ? 'bg-black-500' : 'bg-blue-300'}`}
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

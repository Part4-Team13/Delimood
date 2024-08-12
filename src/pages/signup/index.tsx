import React from 'react';
import { TextInput, PasswordInput, Button, Container, rem, ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { SignUpRequest, SignUpRequestType } from '../../schema/authSchema';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons-react';
import Logo from '../../assets/ico_logo.svg';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/socialLogin';
import { useSignUp } from '../../hooks/authQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';

const SignUp: React.FC = () => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const initialValues: SignUpRequestType = {
    email: '',
    password: '',
    passwordConfirmation: '',
    nickname: '',
  };

  const form = useReactHookForm<SignUpRequestType>({
    defaultValues: initialValues,
    resolver: zodResolver(SignUpRequest),
  });

  const isFormValid = form.formState.isValid;
  const navigate = useNavigate();
  const signUpMutation = useSignUp({
    onSuccess: () => {
      showNotification({
        title: '회원가입이 성공적으로 완료되었습니다.',
        message: '로그인 이후 사용가능합니다.',
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
      navigate('/login');
    },
    onError: (error) => {
      showNotification({
        title: '죄송합니다. 다시 시도해주세요.',
        message: '회원가입 중 문제가 발생했습니다.',
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
      if (error.response) {
        if (error.response.status === 400) {
          form.setError('email', { type: 'manual', message: '이미 존재하는 이메일입니다.' });
        } else if (error.response.status === 500) {
          form.setError('nickname', { type: 'manual', message: '이미 존재하는 닉네임입니다.' });
        }
      }
    },
  });

  return (
    <div className='flex flex-col items-center justify-center mt-[110px] tablet:mt-[140px] desktop:mt-[160px]'>
      <ActionIcon style={{ width: '172px', height: '48px', backgroundColor: 'transparent' }} onClick={() => navigate('/')}>
        <img src={Logo} alt='Logo' />
      </ActionIcon>
      <Container className='flex items-center justify-center mt-[61px]'>
        <form
          onSubmit={form.handleSubmit((values) => {
            signUpMutation.mutate(values);
          })}
          className='w-[312px] flex flex-col gap-5 tablet:w-[384px] tablet:gap-10 desktop:w-[640px]'
        >
          <TextInput
            label='이메일'
            placeholder='이메일'
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            onBlur={() => form.trigger('email')}
            classNames={{
              root: 'tablet:text-sm desktop:text-base',
              label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
              input: 'focus:border-black-600 focus:border-2 mt-[16px] h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:mt-[20px] tablet:px-4 desktop:h-[64px] desktop:text-xl',
              error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />
          <div className='relative'>
            <PasswordInput
              label='비밀번호'
              placeholder='비밀번호'
              {...form.register('password')}
              error={form.formState.errors.password?.message}
              onBlur={() => form.trigger('password')}
              classNames={{
                input: 'hover:border-black-600 hover:border-2 h-[44px] mt-[16px] bg-blue-200 rounded-2xl tablet:mt-[20px] desktop:h-[64px]',
                label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
                error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: 'px-3 w-full text-black tablet:px-4 desktop:text-xl ',
                section: 'absolute right-4',
                visibilityToggle: 'text-gray-200',
              }}
              visibilityToggleIcon={({ reveal }) => (reveal ? <IconEyeOff style={{ width: rem(24), height: rem(24) }} /> : <IconEyeCheck style={{ width: rem(24), height: rem(24) }} />)}
            />
            <PasswordInput
              placeholder='비밀번호 확인'
              {...form.register('passwordConfirmation')}
              error={form.formState.errors.passwordConfirmation?.message}
              onBlur={() => form.trigger('passwordConfirmation')}
              classNames={{
                root: 'mt-[10px] tablet:mt-[16px]',
                input: 'hover:border-black-600 hover:border-2 h-[44px] mt-[16px] bg-blue-200 rounded-2xl tablet:mt-[20px] desktop:h-[64px]',
                error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: 'px-3 w-full text-black tablet:px-4 desktop:text-xl ',
                section: 'absolute right-4',
                visibilityToggle: 'text-gray-200',
              }}
              visibilityToggleIcon={({ reveal }) => (reveal ? <IconEyeOff style={{ width: rem(24), height: rem(24) }} /> : <IconEyeCheck style={{ width: rem(24), height: rem(24) }} />)}
            />
          </div>
          <TextInput
            label='닉네임'
            placeholder='닉네임'
            {...form.register('nickname')}
            error={form.formState.errors.nickname?.message}
            onBlur={() => form.trigger('nickname')}
            classNames={{
              label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
              input: 'focus:border-black-600 focus:border-2 mt-[16px] h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:mt-[20px] tablet:px-4 desktop:h-[64px] desktop:text-xl',
              error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />

          <Button
            type='submit'
            mt='md'
            className={`h-[44px] rounded-2xl px-3 w-full text-white text-base font-semibold desktop:h-[64px] desktop:text-xl ${isFormValid ? 'bg-black-500 hover:bg-black-500' : 'bg-blue-300'}`}
            disabled={!isFormValid}
          >
            가입하기
          </Button>
        </form>
      </Container>
      <div className='mt-2.5 text-sm font-medium text-blue-400 w-[312px] tablet:w-[384px] desktop:w-[640px] flex justify-end tablet:text-base desktop:text-xl'>
        이미 가입하셨나요?
        <button className='ml-1 underline text-black-500' onClick={() => navigate('/login')}>
          로그인하기
        </button>
      </div>
      <SocialLogin />
    </div>
  );
};

export default SignUp;

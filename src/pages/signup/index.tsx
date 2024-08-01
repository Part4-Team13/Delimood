import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { SignUpRequest, SignUpRequestType } from '../../schema/authSchema';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import Logo from '../../assets/ico_logo.svg';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/socialLogin';

const SignUp: React.FC = () => {
  const form = useForm<SignUpRequestType>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: '',
    },
    validate: (values) => {
      const result = SignUpRequest.safeParse(values);
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

  return (
    <div className='flex flex-col items-center justify-center mt-[110px] tablet:mt-[140px] desktop:mt-[160px]'>
      <button onClick={() => navigate('/')}>
        <img src={Logo} alt='Logo' />
      </button>
      <Container className='flex items-center justify-center mt-[61px]'>
        <form
          onSubmit={form.onSubmit((values) => {
            //TODO:회원가입 API 연동하기
            console.log(values);
          })}
          className='w-[312px] flex flex-col gap-5 tablet:w-[384px]  tablet:gap-10 desktop:w-[640px]'
        >
          <TextInput
            label='이메일'
            placeholder='이메일'
            {...form.getInputProps('email')}
            error={form.errors.email}
            onBlur={() => form.validateField('email')}
            classNames={{
              root: 'tablet:text-sm desktop:text-base',
              label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
              input: `mt-[16px] h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:mt-[20px] tablet:px-4 desktop:h-[64px] desktop:text-xl ${
                form.errors.email ? 'border border-state-alert' : ''
              }`,
              error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />
          <div className='relative'>
            <PasswordInput
              label='비밀번호'
              placeholder='비밀번호'
              {...form.getInputProps('password')}
              error={form.errors.password}
              onBlur={() => form.validateField('password')}
              classNames={{
                label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
                error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: `mt-[16px] h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:mt-[20px] tablet:px-4 desktop:h-[64px] desktop:text-xl ${
                  form.errors.password ? 'border border-state-alert' : ''
                }`,
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
            <PasswordInput
              placeholder='비밀번호 확인'
              {...form.getInputProps('passwordConfirmation')}
              error={form.errors.passwordConfirmation}
              onBlur={() => form.validateField('passwordConfirmation')}
              classNames={{
                root: 'mt-[10px] tablet:mt-[16px]',
                error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
                innerInput: `h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:px-4 desktop:h-[64px] desktop:text-xl ${form.errors.passwordConfirmation ? 'border border-state-alert' : ''}`,
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
          <TextInput
            label='닉네임'
            placeholder='닉네임'
            {...form.getInputProps('nickname')}
            error={form.errors.nickname}
            onBlur={() => form.validateField('nickname')}
            classNames={{
              label: 'pl-1 font-medium text-sm tablet:text-base desktop:text-xl',
              input: `mt-[16px] h-[44px] bg-blue-200 rounded-2xl px-3 w-full text-black tablet:mt-[20px] tablet:px-4 desktop:h-[64px] desktop:text-xl ${
                form.errors.nickname ? 'border border-state-alert' : ''
              }`,
              error: 'pl-2 text-state-alert text-xs font-normal mt-[8px] tablet:text-sm desktop:text-base',
            }}
          />
          <Button
            type='submit'
            mt='md'
            className={`h-[44px] rounded-2xl px-3 w-full text-white text-base font-semibold desktop:h-[64px] desktop:text-xl ${isFormValid ? 'bg-black-500' : 'bg-blue-300'}`}
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

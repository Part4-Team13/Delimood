import React, { useState, useEffect } from 'react';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconCamera, IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import { useGetMeQuery, useUpdateMe, useUpdateImage } from '../../hooks/useUserQuery';
import profileIcon from '../../assets/ico_profile.svg';

const UserProfile = () => {
  const { data } = useGetMeQuery();
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [newNickname, setNewNickname] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //닉네임 업데이트
  const updateMeMutation = useUpdateMe({
    onSuccess: () => {
      setEditing(false);
      setErrorMessage(null);
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        setErrorMessage('중복된 닉네임입니다. 다른 닉네임을 사용해주세요.');
      } else {
        setErrorMessage('닉네임 변경 중 오류가 발생했습니다.');
      }
    },
  });

  //프로필 이미지 업데이트
  const updateImageMutation = useUpdateImage({
    onSuccess: (updatedData) => {
      setProfileImage(updatedData.image);
    },
    onError: () => {
      setErrorMessage('이미지 업로드 중 오류가 발생했습니다.');
    },
  });

  //사용자 정보 데이터 로딩 후 상태 업데이트
  useEffect(() => {
    if (data) {
      setProfileImage(data.image);
      setNewNickname(data.nickname);
    }
  }, [data]);

  const userNickname = data.nickname;

  //프로필 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImageMutation.mutate({ file, data: { nickname: newNickname } });
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewNickname(data.nickname);
    setErrorMessage(null);
  };

  //닉네임 변경 확인 핸들러
  const handleConfirm = () => {
    if (newNickname.length > 20) {
      setErrorMessage('닉네임은 20자 이하로 설정해야 합니다.');
      return;
    }

    updateMeMutation.mutate({
      nickname: newNickname,
    });
  };

  return (
    <div className='-mt-[40px] desktop:-mt-[60px] flex flex-col gap-2 items-center desktop:gap-4'>
      <div className='relative'>
        <img
          src={profileImage || profileIcon}
          alt='프로필 이미지'
          className='w-[80px] h-[80px] rounded-full border-2 border-blue-300 desktop:w-[120px] desktop:h-[120px]'
          style={{ objectFit: 'cover' }}
        />
        <input type='file' accept='image/*' style={{ display: 'none' }} id='fileInput' onChange={handleImageUpload} />
        <ActionIcon
          onClick={() => {
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            fileInput?.click();
          }}
          className='absolute bottom-0 right-0 text-white bg-blue-500 focus:bg-purple-200 hover:bg-purple-200'
        >
          <IconCamera size={24} />
        </ActionIcon>
      </div>
      <div className='relative'>
        {editing ? (
          <div className='flex flex-col items-center gap-2'>
            <div className='flex items-center gap-2'>
              <TextInput
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder='새 닉네임'
                className='w-[200px] desktop:w-[250px] border-none'
                classNames={{
                  input: 'focus:border-black-600 focus:border-1 text-base bg-blue-200 rounded-xl px-3 text-base text-black-950',
                }}
              />
              <Button onClick={handleConfirm} color='blue' className='p-3 rounded-full'>
                <IconCheck size={18} />
              </Button>
              <Button onClick={handleCancel} color='red' className='p-3 rounded-full bg-state-alert'>
                <IconX size={18} />
              </Button>
            </div>
            {errorMessage && <div className='text-sm font-semibold text-state-alert'>{errorMessage}</div>}
          </div>
        ) : (
          <div className='flex items-center'>
            <h2 className='text-base font-medium text-black-950 desktop:text-2xl'>{userNickname}</h2>
            <ActionIcon onClick={handleEditClick} variant='subtle' className='ml-2 text-black-500'>
              <IconPencil size={18} />
            </ActionIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

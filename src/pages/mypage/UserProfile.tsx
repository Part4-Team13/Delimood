import React, { useState, useEffect } from 'react';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconCamera, IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import profileIcon from '../../assets/ico_profile.svg';

const UserProfile = () => {
  const { data, isLoading, error } = useGetMeQuery();
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [newNickname, setNewNickname] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setProfileImage(data.image);
      setNewNickname(data.nickname);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userNickname = data?.nickname || '사용자 닉네임';

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewNickname(data?.nickname || '사용자 닉네임');
  };

  const handleConfirm = () => {
    // 닉네임 업데이트 로직추가하기!
    setEditing(false);
  };

  return (
    <div className='-mt-[40px] desktop:-mt-[60px] flex flex-col gap-2 items-center desktop:gap-4'>
      <div className='relative'>
        <img src={profileImage || profileIcon} alt='프로필 이미지' className='w-[80px] h-[80px] rounded-full border-2 border-blue-300 desktop:w-[120px] desktop:h-[120px]' />
        <input type='file' accept='image/*' style={{ display: 'none' }} id='fileInput' onChange={handleImageUpload} />
        <ActionIcon
          onClick={() => {
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            fileInput?.click();
          }}
          className='absolute bottom-0 right-0 text-white bg-blue-500'
        >
          <IconCamera size={24} />
        </ActionIcon>
      </div>
      <div className='relative'>
        {editing ? (
          <div className='flex items-center gap-2'>
            <TextInput value={newNickname} onChange={(e) => setNewNickname(e.target.value)} placeholder='새 닉네임' className='w-[200px] desktop:w-[250px]' />
            <Button onClick={handleConfirm} color='blue' className='p-3'>
              <IconCheck size={18} />
            </Button>
            <Button onClick={handleCancel} color='red' className='p-3'>
              <IconX size={18} />
            </Button>
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

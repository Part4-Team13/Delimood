import React, { useState } from 'react';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconCamera, IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import profileIcon from '../../assets/ico_profile.svg';

const UserProfile = () => {
  // 초기 데이터
  const data = {
    id: 110,
    nickname: '채식이',
    teamId: '6-13',
    createdAt: '2024-07-29T12:47:55.605Z',
    updatedAt: '2024-07-29T12:52:16.022Z',
    image:
      'https://media.istockphoto.com/id/1300107681/ko/%EC%82%AC%EC%A7%84/%EB%8C%80%EC%84%9C%EC%96%91-%EC%9D%98-%ED%91%9C%EB%A9%B4.jpg?s=612x612&w=0&k=20&c=p_vW3L_1A7moSNqHpavoW8EmmiiKOM4bwQM7rSvt5OY=',
  };

  const [profileImage, setProfileImage] = useState<string>(data.image);
  const [editing, setEditing] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>(data.nickname);

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
    setNewNickname(data.nickname);
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
            <h2 className='text-base font-medium text-black-950 desktop:text-2xl'>{data.nickname}</h2>
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

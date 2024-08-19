import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/user';
import defaultUserImage from '../../assets/ico_profile.svg';
import closeButton from '../../assets/ico_X.svg';

interface ProfileProps {
  nickname: string;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  profileId?: number;
}

function Modal({ isOpen, onClose, profileId }: ModalProps) {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profileId) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const data = await getUser({ id: profileId });
          setProfile({ nickname: data.nickname, image: data.image });
        } catch (err) {
          setError('프로필을 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [profileId]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black-600 bg-opacity-50 flex items-center justify-center z-50' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='relative bg-white p-10 rounded-3xl text-center shadow-md w-[328px] h-[166px] desktop:w-[360px] desktop:h-[188px]' onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-4 right-8' onClick={onClose}>
          <img src={closeButton} alt='Close' className='w-5 h-5' />
        </button>
        <div className='flex flex-col items-center justify-center h-full'>
          {loading && <p>프로필 로딩 중...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {profile && (
            <div className='flex flex-col items-center mb-1'>
              <img src={profile.image || defaultUserImage} alt={`${profile.nickname}`} className='w-12 h-12 rounded-full mb-6' />
              <p className='text-lg desktop:text-xl font-semibold'>{profile.nickname}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/user';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface ProfileProps {
  nickname: string;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  message: string;
  secondaryMessage?: string;
  button: ButtonProps;
  profileId?: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, profileId }) => {
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
    <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='bg-white p-10 rounded-3xl text-center shadow-md w-[328px] h-[166px] desktop:w-[360px] desktop:h-[188px]' onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col items-center justify-center h-full'>
          {loading && <p>프로필 로딩 중...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {profile && (
            <div className='flex flex-col items-center mb-1'>
              <img src={profile.image} alt={`${profile.nickname}`} className='w-12 :h-12  rounded-full mb-6' />
              <p className='text-lg desktop:text-xl font-semibold'>{profile.nickname}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

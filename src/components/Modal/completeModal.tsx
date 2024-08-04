import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  message: string;
  secondaryMessage?: string;
  button: ButtonProps;
}

/**
 * 조건부로 사용 가능한 Modal 컴포넌트
 *
 * 사용 예시:
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   icon={<img src="/path/to/icon.svg" alt="Icon" />}
 *   message="정말 이 작업을 수행하시겠습니까?"
 *   secondaryMessage="댓글은 삭제 후 복구할 수 없어요."
 *   button={{
 *     text: "확인",
 *     onClick: handleConfirm (본인의 이벤트 헨들러),
 *     variant: "primary",
 *   }}
 * />
 *
 * @param isOpen - 모달의 표시 여부를 결정합니다. true일 때만 모달이 렌더링됩니다.
 * @param onClose - 모달을 닫는 함수입니다. 배경 클릭 시 호출됩니다.
 * @param message - 모달에 표시될 메시지입니다.
 * @param button - 모달 하단에 표시될 단일 버튼의 설정입니다. 버튼은 text(버튼 텍스트), onClick(클릭 핸들러), variant(스타일 변형) 속성을 가집니다.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, button }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='bg-white p-10 rounded-3xl text-center shadow-md w-[304px] h-[146px] desktop:w-[364px] desktop:h-[208px] tablet:w-[316px] tablet:h-[180px] ' onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-lg font-semibold text-gray-800 mb-6 tablet:text-xl tablet:mb-9 desktop:text-2xl desktop:mb-12'>{message}</p>
          <div className='flex justify-center items-center'>
            <button
              className={`px-7 rounded-xl font-semibold transition duration-300 text-lg w-[240px] h-[48px] desktop:w-[288px] desktop:h-[64px] desktop:text-xl ${
                button.variant === 'primary'
                  ? 'border border-yellow-500 bg-white text-black hover:bg-blue-900 hover:text-white'
                  : 'border border-yellow-500 bg-white text-black hover:bg-blue-200 hover:text-black'
              }`}
              onClick={button.onClick}
            >
              {button.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

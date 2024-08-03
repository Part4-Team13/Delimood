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
  buttons: ButtonProps[];
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
 *   buttons={[
 *     {
 *       text: "취소",
 *       onClick: () => setIsModalOpen(false),
 *       variant: "secondary"
 *     },
 *     {
 *       text: "확인",
 *       onClick: handleConfirm (본인의 이벤트 헨들러),
 *       variant: "primary"
 *     }
 *   ]}
 * />
 *
 * @param isOpen - 모달의 표시 여부를 결정합니다. true일 때만 모달이 렌더링됩니다.
 * @param onClose - 모달을 닫는 함수입니다. 배경 클릭 시 호출됩니다.
 * @param icon - (선택적) 모달 상단에 표시될 아이콘입니다.
 * @param message - 모달에 표시될 메시지입니다.
 * @param secondaryMessage - (선택적) 모달에 표시될 추가 메시지입니다.
 * @param buttons - 모달 하단에 표시될 버튼들의 설정입니다. 각 버튼은 text(버튼 텍스트), onClick(클릭 핸들러), variant(스타일 변형) 속성을 가집니다.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, icon, message, secondaryMessage, buttons }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50' onClick={onClose}>
      <div className='bg-white p-10 rounded-3xl w-[452px] h-[332px] text-center shadow-md' onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col items-center justify-center h-full'>
          {icon && <div className='mb-6'>{icon}</div>}
          <p className='text-2xl font-medium mb-2 text-gray-800'>{message}</p>
          {secondaryMessage && <p className='text-2lg text-gray-400 mb-10'>{secondaryMessage}</p>}
          <div className='flex justify-center gap-4'>
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`py-3 px-6 rounded-xl text-xl font-semibold transition duration-300 min-w-[180px] min-h-[58px] ${
                  button.variant === 'primary'
                    ? 'border border-yellow-500 bg-white text-black hover:bg-blue-900 hover:text-white'
                    : 'border border-yellow-500 bg-white text-black hover:bg-blue-200 hover:text-black'
                }`}
                onClick={button.onClick}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

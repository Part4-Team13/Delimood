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
 * @param buttons - 모달 하단에 표시될 버튼들의 설정입니다. 각 버튼은 text(버튼 텍스트), onClick(클릭 핸들러), variant(스타일 변형) 속성을 가집니다.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, icon, message, buttons }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={onClose}>
      <div className='bg-white p-10 rounded-xl w-[320px] h-[238px] text-center shadow-md' onClick={(e) => e.stopPropagation()}>
        {icon && <div className='mb-6'>{icon}</div>}
        <p className='text-xl font-medium mb-8 text-gray-800'>{message}</p>
        <div className='flex justify-center gap-4'>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`py-3 px-6 rounded-lg text-lg font-medium transition duration-300 min-w-[140px] h-12 ${
                button.variant === 'primary'
                  ? 'border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white'
                  : 'border border-yellow-500 bg-white text-red-500 hover:bg-yellow-500 hover:text-white'
              }`}
              onClick={button.onClick}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

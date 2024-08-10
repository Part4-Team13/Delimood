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

function Modal({ isOpen, onClose, message, button }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black-600 bg-opacity-50 flex items-center justify-center z-50' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='bg-white p-10 rounded-3xl text-center shadow-md w-[304px] h-[146px] desktop:w-[364px] desktop:h-[208px] tablet:w-[316px] tablet:h-[180px]' onClick={(e) => e.stopPropagation()}>
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
}

export default Modal;

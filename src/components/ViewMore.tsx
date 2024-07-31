import React, { PropsWithChildren } from 'react';

interface ViewMoreProps extends PropsWithChildren {
  onClick: () => void;
  text: string;
}

function ViewMore({ onClick, text }: ViewMoreProps) {
  return (
    <button onClick={onClick} className='flex items-center gap-[4px] rounded-[100px]'>
      <span>+</span>
      <span>{text}</span>
    </button>
  );
}

export default ViewMore;

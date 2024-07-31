import React, { PropsWithChildren } from 'react';

interface ViewMoreProps extends PropsWithChildren {
  onClick: () => void;
  text: string;
}

function ViewMore({ onClick, text }: ViewMoreProps) {
  return (
    <button onClick={onClick} className='flex items-center gap-[4px] rounded-[100px] bg-background border-[1px] border-line-darker'>
      <span className='text-blue-400 text-md'>+</span>
      <span className='text-blue-400 text-md'>{text}</span>
    </button>
  );
}

export default ViewMore;

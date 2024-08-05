import plus from '../assets/ico_plus.svg';

interface ViewMoreProps {
  onClick?: () => void;
  text?: string;
  disabled?: boolean;
}

function ViewMore({ onClick, text, disabled }: ViewMoreProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-[4px] rounded-[100px] bg-background border-[1px] border-line-darker p-[12px_18px] desktop:[12px_40px] text-md desktop:text-xl text-blue-400 ${disabled && 'bg-blue-200 cursor-default'}`}
    >
      <span>
        <img src={plus} alt='더보기' />
      </span>
      <span>{text}</span>
    </button>
  );
}

export default ViewMore;

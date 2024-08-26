interface HashTagProps {
  tags: string[];
  removeTag: (indexToRemove: number) => void;
  onTagClick?: (tag: string) => void;
}

function HashTag({ tags, removeTag, onTagClick }: HashTagProps) {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='flex flex-wrap gap-2 mb-2'>
        {tags.map((tag, idx) => (
          <div key={idx} className='flex items-center bg-background px-2 py-1 rounded-[22px]'>
            <span className={`p-1 text-base tablet:text-xl desktop:text-2xl font-normal ${onTagClick ? 'cursor-pointer' : ''}`} onClick={() => onTagClick?.(tag)}>
              {tag}
            </span>
            <button type='button' onClick={() => removeTag(idx)} className='ml-2 text-xl text-button-default'>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashTag;

interface HashTagProps {
  tags: string[];
  removeTag: (indexToRemove: number) => void;
  onTagClick?: (tag: string) => void;
}

function HashTag({ tags, removeTag, onTagClick }: HashTagProps) {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='flex flex-wrap gap-2 mb-2 w-full max-w-[640px]'>
        {tags.map((tag, idx) => (
          <div key={idx} className='flex items-center bg-background px-3 py-1 rounded-[22px] text-xl break-words max-w-full'>
            <span className='p-1 text-lg tablet:text-xl desktop:text-2xl break-words'>{tag}</span>
            <button onClick={() => removeTag(idx)} className='ml-2 text-button-default' style={{ cursor: 'pointer' }}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashTag;

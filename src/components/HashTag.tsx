interface HashTagProps {
  tags: string[];
  removeTag: (indexToRemove: number) => void;
}

function HashTag({ tags, removeTag }: HashTagProps) {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <div className='flex flex-wrap gap-2 mb-2'>
        {tags.map((tag, idx) => (
          <div key={idx} className='flex items-center bg-background px-2 py-1 rounded-[22px] text-xl'>
            <span className='p-1 text-2xl'>{tag}</span>
            <button onClick={() => removeTag(idx)} className='ml-2 text-button-default'>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashTag;

interface EpigramCardProps {
  author: string;
  content: string;
  tags: string[];
  isHeightfixed: boolean;
}

const EpigramCard = ({ author, content, tags, isHeightfixed }: EpigramCardProps) => {
  return (
    <>
      <div className='w-[312px]'>
        <div className={`rounded-[16px] p-[23px] flex flex-col overflow-hidden bg-[linear-gradient(yellow_95%,_gray_0)] [background-size:100%_24px] ${isHeightfixed && 'h-[180px]'}`}>
          <p className=''>{content}</p>
          <span className='ml-auto'>- {author} -</span>
        </div>
        <ul className='flex flex-row-reverse gap-[8px] bg-red-100'>
          {tags.map((tag, index) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EpigramCard;

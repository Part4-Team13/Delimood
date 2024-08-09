import ViewMore from '../ViewMore';
import CommentListStyle from './CommentListStyle';
import { ListItemType, ResponseType } from '../../schema/commentSchema';
import { CommentList } from '.';
import { PaginationResponseType } from '../../schema/epigramSchema';

interface CommentListWithButtonProps {
  data: ResponseType | PaginationResponseType | undefined;
  commentList: ListItemType[] | CommentList[];
  isLoading: boolean;
  setCursor: React.Dispatch<React.SetStateAction<number | null>>;
  showButton: boolean;
  buttonText: string;
}

function CommentListWithButton({ data, commentList, isLoading, setCursor, showButton, buttonText }: CommentListWithButtonProps) {
  // 더보기 버튼 클릭 함수
  const handleClickViewMore = () => {
    if (data) {
      setCursor(data.nextCursor);
    }
    // if (nextCursor) {
    //   const parsedCursor = nextCursor !== null ? nextCursor : undefined;
    //   setNextCursor(parsedCursor);
    // }
  };

  return (
    <>
      <CommentListStyle commentList={commentList} />
      {showButton && (
        <div className='flex justify-center mt-[40px] desktop:mt-[70px]'>
          <ViewMore text={buttonText} onClick={handleClickViewMore} disabled={isLoading} />
        </div>
      )}
    </>
  );
}

export default CommentListWithButton;

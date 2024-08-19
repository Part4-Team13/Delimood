import { useParams } from 'react-router-dom';
import ico_like from '../../assets/ico_like.svg';
import ico_external_link from '../../assets/ico_external_link.svg';
import ico_more_vertical from '../../assets/ico_more_vertical.svg';
import ico_profile from '../../assets/ico_profile.svg';
import CommentList from '../../components/CommentList';
import { useGetEpigramCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetEpigramDetailQuery } from '../../hooks/useEpigramQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import { Button, Menu, rem } from '@mantine/core';
import { useRef, useState } from 'react';
import { usePostCommentMutation } from '../../hooks/useCommentQuery';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

function EpigramDetail() {
  const { id } = useParams();
  const { data: userData } = useGetMeQuery();
  const epigramId: number = Number(id);
  const { data: commentData, fetchNextPage, isFetching } = useGetEpigramCommentsInfiniteQuery(epigramId, { limit: 4 });
  const { data, isLoading, isFetched } = useGetEpigramDetailQuery(epigramId);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [isCommentPrivate, setIsCommentPrivate] = useState<boolean>(false);
  const addComment = useRef<HTMLTextAreaElement | null>(null);

  const options = {
    onError: () => {
      showNotification({
        title: '댓글 등록에 실패했습니다.',
        message: '죄송합니다. 다시 시도해주세요.',
        icon: xIcon,
        color: 'red',
        autoClose: 2000,
        styles: () => ({
          root: {
            position: 'fixed',
            top: '10%',
            right: '3%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            width: '40%',
            maxWidth: '70%',
          },
        }),
      });
    },
  };
  const commentMutate = usePostCommentMutation({ epigramId, options });

  const onAddCommentChange = () => {
    // NOTE: 100자 제한
    if ((addComment.current && addComment.current.value.length > 100) || (addComment.current && addComment.current.value.length == 0)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }

    if (addComment.current) {
      setComment(addComment.current.value);
    }
  };

  const onClickAddCommentButton = () => {
    if (comment) commentMutate.mutate({ epigramId, content: comment, isPrivate: isCommentPrivate });
    setComment('');
  };

  if (userData) userData.image = userData.image ? userData.image : ico_profile;
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isFetched) {
    return (
      <>
        <main className='w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto mb-[63px] tablet:mb-[87px] desktop:mb-[103px]'>
          <div className='flex justify-between mt-[40px] text-lg desktop:text-xl'>
            <ul className='flex gap-[16px] text-blue-400'>{data && data.tags.map((tag) => <li key={tag.id}>{tag.name}</li>)}</ul>
            {userData?.id === data?.writerId && (
              <Menu>
                <Menu.Target>
                  <button>
                    <img src={ico_more_vertical} alt='에피그램 수정' className='w-[24px] cursor-pointer' />
                  </button>
                </Menu.Target>
                <Menu.Dropdown className='bg-background rounded-[16px] border-[1px] border-blue-300'>
                  <Menu.Item className='text-md desktop:text-xl p-[8px_24px] desktop:p-[12px_32px]'>수정하기</Menu.Item>
                  <Menu.Item className='text-md desktop:text-xl p-[8px_24px] desktop:p-[12px_32px]'>삭제하기</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
          <p className='text-2xl font-paraph my-[16px] tablet:my-[24px] desktop:my-[32px]'> {data!.content} </p>
          <span className='text-blue-400 font-paraph block text-right text-lg tablet:text-xl desktop:text-2xl'>- {data!.author} -</span>
          <ul className='flex gap-[8px] justify-center items-center mt-[32px] desktop:mt-[36px]'>
            <li className='flex gap-[4px] bg-button-default hover:bg-button-hover text-white rounded-[100px] items-center h-fit p-[6px_14px] cursor-pointer'>
              <img src={ico_like} alt='좋아요' className='w-[20px] desktop:w-[36px]' />
              <span>{data!.likeCount} </span>
            </li>
            <li
              onClick={() => {
                window.open(data!.referenceUrl!, '_blank');
              }}
              className='text-gray-300 bg-line-bright hover:bg-gray-100 rounded-[100px] flex items-center text-md desktop:text-xl p-[6px_14px] h-fit cursor-pointer'
            >
              <span> {data!.referenceTitle}</span>
              {data!.referenceUrl && <img src={ico_external_link} alt='새 창으로 이동' className='w-[20px] desktop:w-[36px]' />}
            </li>
          </ul>
        </main>
        <div>
          {userData && (
            <div className='w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto flex flex-col gap-[16px] tablet:gap-[24px] mb-[12px] tablet:mb-[32px] desktop:mb-[40px]'>
              <span className='text-lg desktop:text-xl font-bold'>댓글({commentData?.pages[0].totalCount})</span>
              <div className='flex flex-col items-center w-full gap-[10px]'>
                <div className='flex gap-[13px] desktop:gap-[21px] items-start w-full '>
                  <img src={userData?.image} alt='내 프로필' className='w-[48px] h-[48px] rounded-full' />
                  <div className='flex flex-col gap-[3px] w-full'>
                    <textarea
                      ref={addComment}
                      placeholder='100자 이내로 입력해주세요'
                      onChange={onAddCommentChange}
                      className='w-full min-h-[100px] focus:outline-none border-[1px] bg-background border-line-darker p-[12px_16px] rounded-[8px]'
                    />
                    <div className='flex justify-between items-center left-[12px] right-[12px] bottom-[5px]'>
                      <span className='h-fit flex gap-[2px]'>
                        <input type='checkbox' onChange={() => setIsCommentPrivate((prev) => !prev)} checked={isCommentPrivate} />
                        <span>비밀글</span>
                      </span>
                      <Button
                        onClick={onClickAddCommentButton}
                        disabled={buttonDisabled}
                        className='text-md desktop:text-lg bg-button-default hover:bg-button-hover w-max mt-[5px] flex-shrink-0 disabled:bg-button-diabled'
                      >
                        확인
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CommentList data={commentData} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll userId={userData?.id} />
        </div>
      </>
    );
  }
}

export default EpigramDetail;

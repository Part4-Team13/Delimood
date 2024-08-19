import { useParams } from 'react-router-dom';
import ico_like from '../../assets/ico_like.svg';
import ico_external_link from '../../assets/ico_external_link.svg';
import ico_more_vertical from '../../assets/ico_more_vertical.svg';
import CommentList from '../../components/CommentList';
import { useGetEpigramCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetEpigramDetailQuery } from '../../hooks/useEpigramQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import { Menu } from '@mantine/core';

function EpigramDetail() {
  const { id } = useParams();
  const { data: userData } = useGetMeQuery();
  const epigramId: number = Number(id);
  const { data: commentData, fetchNextPage, isFetching } = useGetEpigramCommentsInfiniteQuery(epigramId, { limit: 4 });
  const { data, isLoading, isFetched } = useGetEpigramDetailQuery(epigramId);

  if (userData) console.log(userData.id);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isFetched) {
    return (
      <>
        <main className='w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto mb-[63px] tablet:mb-[87px] desktop:mb-[103px]'>
          <div className='flex justify-between mt-[40px] text-lg desktop:text-xl'>
            <ul className='flex gap-[16px] text-blue-400'>
              {data!.tags.map((tag) => (
                <li key={tag.id}>{tag.name}</li>
              ))}
            </ul>
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
            <li className='text-gray-300 bg-line-bright hover:bg-gray-100 rounded-[100px] flex items-center text-md desktop:text-xl p-[6px_14px] h-fit cursor-pointer'>
              <span> {data!.referenceTitle}</span>
              {data!.referenceUrl && (
                <img
                  src={ico_external_link}
                  alt='새 창으로 이동'
                  className='w-[20px] desktop:w-[36px]'
                  onClick={() => {
                    window.open(data!.referenceUrl!, '_blank');
                  }}
                />
              )}
            </li>
          </ul>
        </main>
        <div>
          <CommentList data={commentData} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll userId={userData?.id} />
        </div>
      </>
    );
  }
}

export default EpigramDetail;

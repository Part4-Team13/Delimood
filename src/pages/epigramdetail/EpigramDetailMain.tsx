import { Menu } from '@mantine/core';
import ico_more_vertical from '../../assets/ico_more_vertical.svg';
import ico_like from '../../assets/ico_like.svg';
import ico_external_link from '../../assets/ico_external_link.svg';
import img_zigzag from '../../assets/img_zigzag.png';
import { useDeleteEpigramMutation, useGetEpigramDetailQuery, usePostEpigramLikeDeleteMutation, usePostEpigramLikeMutation } from '../../hooks/useEpigramQuery';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/commentDeleteModal';
import alertMessage from '../../components/AlertMessage';
import { useQueryClient } from '@tanstack/react-query';

function EpigramDetailMain({ epigramId, userId }: { epigramId: number; userId: number }) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [like, setLike] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const options = {
    onError: () => {
      alertMessage({ title: '실패했습니다.', message: '죄송합니다. 다시 시도해주세요.', color: 'red' });
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      if (data) {
        setLike(data.isLiked);
        setLikeCount(data.likeCount);
      }
    },
  };

  const likeMutation = usePostEpigramLikeMutation(epigramId, options);
  const deleteLikeMutation = usePostEpigramLikeDeleteMutation(epigramId, options);
  const deleteEpigramMutation = useDeleteEpigramMutation(epigramId);

  const { data } = useGetEpigramDetailQuery(epigramId);

  //NOTE : 좋아요 관련
  useEffect(() => {
    if (data) {
      setLike(data.isLiked);
      setLikeCount(data.likeCount);
    }
  }, [data, likeCount, like, queryClient]);

  const navigate = useNavigate();

  const onClickLikeButton = () => {
    if (data) {
      if (!data.isLiked) {
        likeMutation.mutate();
      } else {
        deleteLikeMutation.mutate();
      }
    }
  };

  const onClickDeleteEpigram = () => {
    setIsModalOpen(true);
  };

  const deleteEpigram = () => {
    deleteEpigramMutation.mutate();
    navigate('/epigrams');
    alertMessage({ title: '삭제하였습니다.', message: '아쉽네요!', color: 'green' });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message='게시물을 삭제하시겠어요?'
        secondaryMessage='게시물은 삭제 후 복구할 수 없어요.'
        buttons={[
          { text: '취소', onClick: () => setIsModalOpen(false), variant: 'secondary' },
          { text: '확인', onClick: deleteEpigram, variant: 'primary' },
        ]}
      />
      <main className='relative w-screen mb-[63px] tablet:mb-[87px] desktop:mb-[103px] pt-[40px] pb-[16px] tablet:pb-[32px] desktop:pb-[40px] striped desktop:striped-desktop shadow-epigramdetail'>
        <div className='mx-auto w-fit'>
          <div className='flex justify-between text-lg desktop:text-xl'>
            <ul className='flex gap-[16px] text-blue-400 cursor-default'>
              {data.tags.map((tag) => (
                <li key={tag.id}>
                  {tag.name.startsWith('#') ? '' : '#'}
                  {tag.name}
                </li>
              ))}
            </ul>
            {userId === data.writerId && (
              <Menu>
                <Menu.Target>
                  <button>
                    <img src={ico_more_vertical} alt='에피그램 수정' className='w-[24px] cursor-pointer' />
                  </button>
                </Menu.Target>
                <Menu.Dropdown className='bg-background rounded-[16px] border-[1px] border-blue-300'>
                  <Menu.Item className='text-md desktop:text-xl p-[8px_24px] desktop:p-[12px_32px]' onClick={() => navigate(`/editepigram/${epigramId}`)}>
                    수정하기
                  </Menu.Item>
                  <Menu.Item className='text-md desktop:text-xl p-[8px_24px] desktop:p-[12px_32px]' onClick={onClickDeleteEpigram}>
                    삭제하기
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
          <p className='text-2xl font-paraph my-[16px] tablet:my-[24px] desktop:my-[32px] w-[312px] tablet:w-[384px] desktop:w-[640px] cursor-default'>{data!.content}</p>
          <span className='text-blue-400 font-paraph block text-right text-lg tablet:text-xl desktop:text-2xl cursor-default'>- {data!.author} -</span>
          <ul className='flex gap-[8px] justify-center items-center mt-[32px] desktop:mt-[36px]'>
            <li>
              <button
                onClick={onClickLikeButton}
                className={`flex gap-[4px] text-white rounded-[100px] items-center h-fit p-[6px_14px] cursor-pointer ${like ? 'bg-purple-300 hover:bg-purple-400' : 'bg-button-default hover:bg-button-hover'}`}
              >
                <img src={ico_like} alt='좋아요' className='w-[20px] desktop:w-[36px]' />
                <span>{likeCount}</span>
              </button>
            </li>
            {data.referenceTitle && (
              <li
                onClick={() => {
                  window.open(data!.referenceUrl!, '_blank');
                }}
              >
                <button className='text-gray-300 bg-line-bright hover:bg-gray-100 rounded-[100px] flex items-center text-md desktop:text-xl p-[6px_14px] h-fit cursor-pointer'>
                  <span> {data.referenceTitle}</span>
                  {data.referenceUrl && <img src={ico_external_link} alt='새 창으로 이동' className='w-[20px] desktop:w-[36px]' />}
                </button>
              </li>
            )}
          </ul>
        </div>
        <span className='absolute bottom-[-15px] w-screen h-[15px]' style={{ backgroundImage: `url(${img_zigzag})`, backgroundRepeat: 'repeat-x' }} />
      </main>
    </>
  );
}

export default EpigramDetailMain;

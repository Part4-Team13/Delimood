// import { useParams } from 'react-router-dom';
import showMore from '../../assets/ico_more_vertical.svg';
import likeButton from '../../assets/ico_like.svg';
import externalLink from '../../assets/ico_external_link.svg';
import { Menu } from '@mantine/core';

export default function EpigramDetail() {
  //   const { id } = useParams<{ id: string }>();

  const id = '200';

  return (
    <>
      <p className='bg-white w-full h-[52px] tablet:h-[60px] desktop:h-[80px] p-[10px]'>{`${id}번 에피그램 상세 페이지입니다.`}</p>
      <main className='bg-white pb-[32px] desktop:pb-[36px]'>
        <div className='mx-auto w-[312px] tablet:w-[384px] desktop:w-[640px]'>
          <div className='flex justify-between items-center'>
            <ul className='font-paraph flex items-center gap-[16px] text-lg desktop:text-xl text-blue-400'>
              <li>#꿈을이루고싶을때</li>
              <li>#나아가야할때</li>
            </ul>
            <Menu>
              <Menu.Target>
                <button className='w-[24px] desktop-[36px] rounded-full overflow-hidden'>
                  <img src={showMore} alt='더보기' />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>수정하기</Menu.Item>
                <Menu.Item>삭제하기</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <p className='font-paraph text-2xl desktop:text-3xl my-[16px] tablet:my-[24px] desktop:my-[34px]'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</p>
          <span className='block text-right font-paraph ml-auto text-blue-400 text-lg tablet:text-xl desktop:text-2xl'>- 앙드레 말로 -</span>
          <ul className='flex gap-[16px] desktop:gap-[23px] justify-center mt-[32px] desktop:mt-[36px]'>
            <button className='flex gap-[4px] items-center rounded-[100px] bg-button-default hover:bg-button-hover text-white p-[6px_14px] desktop:p-[8px_14px] h-min'>
              <img className='w-[20px] desktop:w-[36px]' src={likeButton} alt='좋아요' />
              <span className='text-lg desktop:text-xl'>123</span>
            </button>
            <button className='flex items-center gap-[5px] rounded-[100px] text-gray-300 bg-line-bright p-[6px_14px] desktop:p-[8px_14px] h-min'>
              <span>왕도로 가는 길</span>
              <img className='w-[20px] desktop:w-[36px]' src={externalLink} alt='새창링크' />
            </button>
          </ul>
        </div>
      </main>

      <div className='mx-auto w-[312px] tablet:w-[384px] desktop:w-[640px]'>
        <span>댓글(3)</span>
        <div></div>
        <ul></ul>
      </div>
    </>
  );
}

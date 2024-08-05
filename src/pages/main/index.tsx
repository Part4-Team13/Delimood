export default function Main() {
  return (
    <>
      <header
        className='flex flex-col items-center pt-[252px] h-[687px] overflow-hidden'
        style={{
          backgroundImage: `url(src/assets/img_bg.png)`,
          backgroundSize: '1920px auto',
        }}
      >
        <div className='flex flex-col items-center mb-[168px] text-center'>
          <h1 className='mb-[8px] text-2xl font-paraph text-black-500'>
            나만 갖고 있기엔 <br /> 아까운 글이 있지 않나요?
          </h1>
          <span className='mb-[24px] text-md font-paraph text-black-300'>다른 사람들과 감정을 공유해보세요.</span>
          <button className='px-[28px] py-[10px] rounded-xl bg-black-500 text-lg text-white'>시작하기</button>
        </div>
        <div className='flex flex-col items-center gap-[4px]'>
          <span className='text-xs text-blue-400'>더 알아보기</span>
          <img src='src/assets/ico_more_arrow_down.svg' alt='더보기 아이콘' />
        </div>
      </header>
      <main className='flex flex-col items-center px-[24px] mt-[124px]'>
        <section className='mb-[196px]'>
          <img src='src/assets/img_pr_epigram_medium.png' alt='에피그램 이미지' className='mb-[40px]' />
          <h1 className='mb-[16px] font-bold text-2xl'>
            명언이나 글귀, <br /> 토막 상식들을 공유해 보세요.
          </h1>
          <p className='text-blue-600'>
            나만 알던 소중한 글들을 <br /> 다른 사람들에게 전파하세요.
          </p>
        </section>
        <section className='mb-[196px] text-right'>
          <img src='src/assets/img_pr_emotions_medium.png' alt='에피그램 이미지' className='mb-[40px]' />
          <h1 className='mb-[16px] font-bold text-2xl'>
            감정 상태에 따라, <br /> 알맞은 위로를 받을 수 있어요.
          </h1>
          <p className='text-blue-600'>태그를 통해 글을 모아 볼 수 있어요.</p>
        </section>
        <section className='mb-[280px]'>
          <img src='src/assets/img_pr_graph_medium.png' alt='감정 이미지' className='mb-[40px]' />
          <h1 className='mb-[16px] font-bold text-2xl'>
            내가 요즘 어떤 감정 상태인지 <br /> 통계로 한 눈에 볼 수 있어요.
          </h1>
          <p className='text-blue-600'>
            감정 달력으로 내 마음에 담긴 <br /> 감정을 확인해보세요.
          </p>
        </section>
        <section>
          <h1 className='mb-[16px] font-bold text-2xl text-center'>
            사용자들이 직접 <br /> 인용한 에피그램들
          </h1>
          <img src='src/assets/img_pr_examples.png' alt='에피그램 이미지' className='mb-[20px]' />
        </section>
      </main>
      <footer
        className='flex flex-col items-center h-[600px] pt-[180px] overflow-hidden'
        style={{
          backgroundImage: `url(src/assets/img_bg.png)`,
          backgroundSize: '1920px auto',
        }}
      >
        <img src='src/assets/img_paraph.png' alt='에피그램 텍스트 로고' className='mb-[32px] w-[122px]' />
        <button className='px-[28px] py-[10px] rounded-xl bg-black-500 text-lg text-white'>시작하기</button>
      </footer>
    </>
  );
}

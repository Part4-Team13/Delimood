const basicStyle = 'flex flex-col items-center';

const buttonStyle = 'px-[28px] py-[10px] rounded-xl bg-black-500 text-lg text-white desktop:px-[108px] desktop:py-[16px]';

const sectionStyle = 'mb-[196px] desktop:flex desktop:items-end desktop:gap-[80px]';
const sectionImgStyle = 'mb-[40px] desktop:mb-0 desktop:shrink-0 desktop:max-w-[50%]';
const sectionHeadingStyle = 'mb-[16px] font-bold text-2xl desktop:text-3xl';
const sectionParagraphStyle = 'text-blue-600 desktop:text-2xl';

export default function Main() {
  return (
    <>
      <header
        className={`${basicStyle} pt-[252px] pb-[48px] overflow-hidden desktop:pt-[400px] desktop:pb-[74px]`}
        style={{
          backgroundImage: `url(src/assets/img_bg_top.png)`,
          backgroundSize: 'cover',
        }}
      >
        <div className={`${basicStyle} mb-[168px] text-center tablet:mb-[106px] desktop:mb-[214px]`}>
          <h1 className='mb-[8px] text-2xl font-paraph text-black-500 tablet:text-3xl tablet:mb-[24px] desktop:mb-[40px]'>
            나만 갖고 있기엔 <br /> 아까운 글이 있지 않나요?
          </h1>
          <span className='mb-[24px] text-md font-paraph text-black-300 tablet:text-xl tablet:mb-[32px] desktop:mb-[48px]'>다른 사람들과 감정을 공유해보세요.</span>
          <button className={buttonStyle}>시작하기</button>
        </div>
        <div className={`${basicStyle} gap-[4px]`}>
          <span className='text-xs text-blue-400 tablet:text-lg'>더 알아보기</span>
          <img src='src/assets/ico_more_arrow_down.svg' alt='더보기 아이콘' />
        </div>
      </header>
      <main className={`${basicStyle} px-[24px] mt-[124px] tablet:px-[180px]`}>
        <section className={sectionStyle}>
          <img src='src/assets/img_pr_epigram_medium.png' alt='에피그램 이미지' className={sectionImgStyle} />
          <div>
            <h1 className={sectionHeadingStyle}>
              명언이나 글귀, <br /> 토막 상식들을 공유해 보세요.
            </h1>
            <p className={sectionParagraphStyle}>
              나만 알던 소중한 글들을&nbsp;
              <br className='tablet:hidden desktop:block' />
              다른 사람들에게 전파하세요.
            </p>
          </div>
        </section>
        <section className={`${sectionStyle} text-right`}>
          <img src='src/assets/img_pr_emotions_medium.png' alt='에피그램 이미지' className={`${sectionImgStyle} order-2 desktop:order-1`} />
          <div>
            <h1 className={sectionHeadingStyle}>
              감정 상태에 따라, <br /> 알맞은 위로를 받을 수 있어요.
            </h1>
            <p className={sectionParagraphStyle}>태그를 통해 글을 모아 볼 수 있어요.</p>
          </div>
        </section>
        <section className={`${sectionStyle} mb-[280px]`}>
          <img src='src/assets/img_pr_graph_medium.png' alt='감정 이미지' className={sectionImgStyle} />
          <div>
            <h1 className={sectionHeadingStyle}>
              내가 요즘 어떤 감정 상태인지 <br /> 통계로 한 눈에 볼 수 있어요.
            </h1>
            <p className={sectionParagraphStyle}>
              감정 달력으로 내 마음에 담긴&nbsp;
              <br className='tablet:hidden desktop:block' />
              감정을 확인해보세요.
            </p>
          </div>
        </section>
        <section className='mb-[22px] tablet:mb-[30px] desktop:mb-[60px]'>
          <h1 className='mb-[40px] font-bold text-2xl text-center desktop:text-3xl'>
            사용자들이 직접 <br /> 인용한 에피그램들
          </h1>
          <img src='src/assets/img_pr_examples.png' alt='에피그램 이미지' className='w-full max-w-[640px]' />
        </section>
      </main>
      <footer
        className={`${basicStyle} justify-center h-[600px] overflow-hidden desktop:h-[1040px]`}
        style={{
          backgroundImage: `url(src/assets/img_bg_bottom.png)`,
          backgroundSize: 'cover',
        }}
      >
        <img src='src/assets/img_paraph.png' alt='에피그램 텍스트 로고' className='mb-[32px] w-[122px] desktop:w-[184px] desktop:mb-[48px]' />
        <button className={buttonStyle}>시작하기</button>
      </footer>
    </>
  );
}

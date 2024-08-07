import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';

const RecentSearches = ({ onSearch, searches }: { onSearch: (term: string) => void; searches: string[] }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>(searches);

  //NOTE : "searches" prop가 변경될 때마다 recentSearches 상태를 업데이트해서 최근 검색어 목록이 업데이트될 때 UI에 반영됨.
  useEffect(() => {
    setRecentSearches(searches);
  }, [searches]);

  const handleSearchClick = (term: string) => {
    onSearch(term);
  };

  //'모두 지우기' 버튼을 클릭할 때 로컬 스토리지에서 recentSearches 항목(최신 검색어 목록)을 삭제됨.
  const clearSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <div className='flex flex-col tablet:w-[384px] w-[312px] desktop:w-[640px] gap-4'>
      <div className='flex items-center justify-between text-black-700'>
        <p className='text-base font-medium tablet:text-xl desktop:text-2xl'>최근 검색어</p>
        <Button onClick={clearSearches} className='text-xs font-semibold bg-white tablet:text-sm text-state-alert hover:bg-white hover:text-state-alert hover:underline desktop:text-base'>
          모두 지우기
        </Button>
      </div>
      <div className='flex flex-wrap justify-start gap-2'>
        {recentSearches.map((search, index) => (
          <div key={index} className='w-auto h-auto px-3 py-2 bg-background rounded-[18px] text-black-300'>
            <button onClick={() => handleSearchClick(search)} className='text-left'>
              {search}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;

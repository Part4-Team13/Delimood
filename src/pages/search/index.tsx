import { useState, useEffect } from 'react';
import { TextInput, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchCard from './SearchCard';
import RecentSearches from './RecentSearches';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';
import { hexConverter } from '../../utils/hexConverter';
import { GetEpigramListType } from '../../schema/epigramSchema';

const Search = () => {
  const SearchIcon = <IconSearch style={{ width: '20px', height: '20px' }} />;
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [epigrams, setEpigrams] = useState<GetEpigramListType[]>([]);

  //NOTE : URL의 쿼리 파라미터에서 'query' 값을 읽어 검색어 상태를 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    setValue(query);
  }, [location.search]);

  //NOTE : 로컬 스토리지에서 최근 검색어 읽기 위한 useEffect
  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(searches);
  }, []);

  //변환된 검색어를 API에 전달하여 데이터 가져오기
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEpigramListInfiniteQuery({
    limit: 10,
    cursor: undefined,
    keyword: hexConverter(debounced),
  });

  //NOTE : 검색어 변경 시 URL 업데이트 및 상태 초기화
  useEffect(() => {
    if (debounced.trim() !== '') {
      navigate(`?query=${encodeURIComponent(debounced)}`, { replace: true });
      setEpigrams([]);
    } else {
      navigate('/search', { replace: true });
    }
  }, [debounced, navigate]);

  //NOTE : 검색어를 처리하고 최근 검색어를 로컬 스토리지에 저장하는 핸들러
  const handleSearch = (term: string) => {
    setValue(term);
    if (term.trim() === '') return;

    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!searches.includes(term)) {
      searches.push(term);
      localStorage.setItem('recentSearches', JSON.stringify(searches));
      setRecentSearches([...searches]);
    }

    //검색어를 URL에 저장
    navigate(`?query=${encodeURIComponent(term)}`);
  };

  //스크롤 이벤트를 핸들링하여 페이지 끝에 도달하면 다음 데이터를 가져옴
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  //NOTE : API로부터 받은 데이터를 업데이트하는 useEffect
  useEffect(() => {
    if (data) {
      const newEpigrams = data.pages.flatMap((page) => page.list);
      setEpigrams(newEpigrams);
    }
  }, [data]);

  return (
    <div className='h-full min-h-screen bg-white pb-[20px]'>
      <div className='flex flex-col items-center justify-center gap-6 tablet:gap-8 desktop:gap-10'>
        <TextInput
          placeholder='검색어를 입력하세요.'
          leftSection={SearchIcon}
          value={value}
          radius='md'
          size='md'
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch(value);
            }
          }}
          classNames={{
            root: 'm-5 tablet:w-[384px] min-w-[312px] desktop:w-[640px]',
            input: 'rounded-none border-0 border-b-2 border-blue-800 text-base font-normal h-[52px] tablet:h-[60px] desktop:h-[80px] tablet:text-xl desktop:text-2xl desktop:border-b-4',
          }}
          rightSection={<CloseButton aria-label='Clear input' onClick={() => setValue('')} style={{ display: value ? undefined : 'none' }} />}
        />

        {recentSearches.length > 0 && <RecentSearches onSearch={handleSearch} searches={recentSearches} />}

        <div className='flex flex-col items-center justify-center font-medium text-blue-800'>
          {debounced.trim() === '' ? (
            <p>검색어를 입력해주세요.</p>
          ) : isLoading ? (
            <p>로딩중</p>
          ) : error ? (
            <p>오류가 발생했습니다. 다시 시도해주세요.</p>
          ) : epigrams.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            epigrams.map((epigram) => <SearchCard key={epigram.id} id={epigram.id} content={epigram.content} author={epigram.author} tags={epigram.tags} searchTerm={debounced} />)
          )}
          {isFetchingNextPage && <p>더 불러오는 중...</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;

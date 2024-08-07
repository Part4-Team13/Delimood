import { useState, useEffect } from 'react';
import { TextInput, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchCard from './SearchCard';
import RecentSearches from './RecentSearches';
import { useGetEpigramListQuery } from '../../hooks/useEpigramQuery';

const Search = () => {
  const SearchIcon = <IconSearch style={{ width: '20px', height: '20px' }} />;
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  //NOTE : URL 쿼리 파라미터에서 검색어 읽기 위한 useEffect로 컴포넌트가 렌더링될 때마다 location.search가 변경되면 실행됨.
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

  //API에 검색어 전달
  const { data, isLoading, error } = useGetEpigramListQuery({ limit: 10, cursor: 0, keyword: debounced });

  //저장 URL에 검색어 저장
  useEffect(() => {
    if (debounced.trim() !== '') {
      navigate(`?query=${encodeURIComponent(debounced)}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  }, [debounced, navigate]);

  //검색어 핸들링 함수
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

        <div className='flex flex-col items-center justify-center'>
          {debounced.trim() === '' ? (
            <p className='font-medium text-blue-800'>검색어를 입력해주세요.</p>
          ) : isLoading ? (
            <p className='font-medium text-blue-800'>입력중</p>
          ) : error ? (
            <p className='font-medium text-blue-800'>오류가 발생했습니다 : {error.message}</p>
          ) : data && data.list.length > 0 ? (
            data.list.map((item) => <SearchCard key={item.id} id={item.id} content={item.content} author={item.author} tags={item.tags} searchTerm={debounced} />)
          ) : (
            <p className='font-medium text-blue-800'>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

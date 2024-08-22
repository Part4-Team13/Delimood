import { useState, useEffect } from 'react';
import { useForm, isNotEmpty, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Input, Text, Textarea, Radio } from '@mantine/core';
import HashTag from '../../components/HashTag';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import { useUpdateEpigramMutation, useGetEpigramDetailQuery } from '../../hooks/useEpigramQuery';
import { useNavigate, useParams } from 'react-router-dom';

export default function EpigramEditPage() {
  const { id } = useParams();
  const { data: userProfile } = useGetMeQuery();
  const { data: epigram } = useGetEpigramDetailQuery(Number(id));
  const updateEpigramMutation = useUpdateEpigramMutation(Number(id));
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      content: epigram?.content || '',
      author: epigram?.author || '',
      source: epigram?.referenceTitle || '',
      sourceUrl: epigram?.referenceUrl || '',
    },
    validate: {
      content: hasLength({ min: 1, max: 500 }, '500자 이내로 입력해주세요'),
      author: isNotEmpty('저자를 입력해주세요.'),
    },
  });

  // NOTE: 라디오 버튼 클릭에 따른 placeholder 값 변경 관리
  const [placeholder, setPlaceholder] = useState('저자 이름 입력');
  const [disabled, setDisabled] = useState(false);

  // NOTE: 사용자 닉네임 데이터 값 받아와서 input placeholder로 넣기
  const handleRadioChange = (value: string) => {
    if (value === '직접 입력') {
      setPlaceholder('저자 이름 입력');
      setDisabled(false);
      form.setFieldValue('author', '');
    } else if (value === '알 수 없음') {
      setPlaceholder('알 수 없음');
      setDisabled(true);
      form.setFieldValue('author', '알 수 없음');
    } else if (value === '본인') {
      setPlaceholder(userProfile?.nickname || '본인');
      setDisabled(true);
      form.setFieldValue('author', userProfile?.nickname || '');
    }
  };

  const [tags, setTags] = useState<string[]>(epigram?.tags?.map((tag) => tag.name) || []);
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    if (epigram?.tags) {
      setTags(epigram.tags.map((tag) => tag.name));
    }
  }, [epigram]);

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && trimmedTag.length <= 10) {
      if (tags.length < 3) {
        setTags((prevTags) => [...prevTags, trimmedTag]);
        setNewTag('');
      } else {
        alert('태그는 최대 3개까지만 추가할 수 있습니다.');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    const { source, sourceUrl, ...rest } = form.values;
    updateEpigramMutation.mutate(
      {
        ...rest,
        referenceUrl: sourceUrl,
        referenceTitle: source,
        tags,
      },
      {
        onSuccess: (data) => {
          navigate(`/epigrams/${data.id}`);
        },
      },
    );
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-white'>
      <div className='flex items-center bg-white justify-center'>
        <form onSubmit={form.onSubmit(handleSubmit)} className='tablet:w-[384px] desktop:w-[640px] w-[312px] vertical-align'>
          <div className='desktop:text-2xl tablet:text-xl text-lg font-semibold mb-4 mt-[56px]'>에피그램 수정</div>

          <Textarea
            label='내용'
            placeholder='500자 이내로 입력해주세요.'
            withAsterisk
            {...form.getInputProps('content')}
            classNames={{
              input: `desktop:text-xl desktop:w-[640px] desktop:h-[148px] tablet:w-[384px] tablet:h-[132px] w-[312px] h-[132px] rounded-[12px] mt-[24px] py-[10px] px-[16px] desktop:placeholder:text-xl placeholder:text-lg `,
              label: 'desktop:text-xl tablet:text-lg text-md mt-[40px]',
              error: 'text-state-alert text-state-alert desktop:text-lg text-sm mt-1 float-right',
            }}
          />

          <Input.Wrapper
            label='저자'
            withAsterisk
            error={!form.errors.author && (form.values.author === '알 수 없음' || form.values.author === '본인') ? null : form.errors.author}
            classNames={{
              label: 'desktop:text-xl tablet:text-lg text-md mt-[54px]',
              error: 'text-state-alert text-state-alert desktop:text-lg text-sm mt-1 float-right',
            }}
          >
            <Radio.Group defaultValue={epigram?.author === '알 수 없음' ? '알 수 없음' : epigram?.author === userProfile?.nickname ? '본인' : '직접 입력'} onChange={handleRadioChange}>
              <Group mt='xl'>
                <Radio
                  value='직접 입력'
                  label='직접 입력'
                  classNames={{
                    label: 'desktop:text-xl text-lg desktop:mt-[-6px] mt-[-5px]',
                  }}
                />
                <Radio
                  value='알 수 없음'
                  label='알 수 없음'
                  classNames={{
                    label: 'desktop:text-xl text-lg desktop:mt-[-6px] mt-[-5px]',
                  }}
                />
                <Radio
                  value='본인'
                  label='본인'
                  classNames={{
                    label: 'desktop:text-xl text-lg desktop:mt-[-6px] mt-[-5px]',
                  }}
                />
              </Group>
            </Radio.Group>

            <Input
              placeholder={placeholder}
              mt='md'
              value={form.values.author}
              {...form.getInputProps('author')}
              onChange={(e) => form.setFieldValue('author', e.currentTarget.value)}
              disabled={disabled}
              classNames={{
                input:
                  'desktop:w-[640px] desktop:h-[64px] desktop:placeholder:text-xl desktop:text-xl text-lg placeholder:text-lg rounded-[12px] mt-[24px] py-[0px] px-[16px] desktop:placeholder:text-xl tablet:w-[384px] tablet:h-[44px] w-[312px] h-44px',
              }}
            />
          </Input.Wrapper>

          <TextInput
            label='출처'
            placeholder='출처 제목 입력'
            mt='md'
            {...form.getInputProps('source')}
            classNames={{
              input:
                'desktop:text-xl desktop:w-[640px] desktop:h-[64px] rounded-[12px] mt-[24px] py-[0px] px-[16px] placeholder:text-lg desktop:placeholder:text-xl tablet:w-[384px] tablet:h-[44px] w-[312px] h-44px text-lg',
              label: 'desktop:text-xl tablet:text-lg text-md mt-[54px]',
            }}
          />

          <Input
            placeholder='URL (ex. https://www.website.com)'
            mt='md'
            {...form.getInputProps('sourceUrl')}
            classNames={{
              input:
                'desktop:text-xl desktop:w-[640px] desktop:h-[64px] rounded-[12px] mt-[24px] py-[0px] px-[16px] placeholder:text-lg desktop:placeholder:text-xl tablet:w-[384px] tablet:h-[44px] w-[312px] h-44px text-lg',
            }}
          />

          <Text className='desktop:text-xl tablet:text-lg text-md mt-[54px]'>태그</Text>
          <div className='mt-4'>
            <Input
              placeholder='입력하여 태그 작성 (최대 10자)'
              value={newTag}
              onChange={(e) => setNewTag(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              classNames={{
                input:
                  'desktop:text-xl desktop:w-[640px] desktop:h-[64px] rounded-[12px] mt-[24px] py-[0px] px-[16px] placeholder:text-lg desktop:placeholder:text-xl tablet:w-[384px] tablet:h-[44px] w-[312px] h-44px text-lg',
              }}
            />
            <HashTag tags={tags} removeTag={removeTag} />
          </div>

          <Group justify='flex-center' mt='md' className='mb-[59px]'>
            <Button
              type='submit'
              className='desktop:w-[640px] desktop:h-[64px] desktop:text-xl tablet:w-[384px] tablet:h-[48px] w-[312px] h-[48px] text-lg rounded-xl bg-button-default hover:bg-button-hover mt-4 py-0 px-4'
            >
              수정 완료
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
}

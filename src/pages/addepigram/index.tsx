import { useForm, isNotEmpty, hasLength } from '@mantine/form';
import { Button, Group, TextInput } from '@mantine/core';

export default function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      content: '',
      author: '',
      source: '',
      tag: '',
    },

    validate: {
      content: hasLength({ min: 1, max: 500 }, '500자 이내로 입력해주세요'),
      author: isNotEmpty('저자를 입력해주세요.'),
    },
  });

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={form.onSubmit(() => {})}>
        <div className='text-2xl font-semibold mb-4'>에피그램 만들기</div>
        <TextInput
          label='내용'
          placeholder='500자 이내로 입력해주세요.'
          withAsterisk
          key={form.key('content')}
          {...form.getInputProps('content')}
          classNames={{
            input: 'w-[640px] h-[148px]',
          }}
        />
        <TextInput label='저자' placeholder='저자 이름 입력' withAsterisk mt='md' key={form.key('author')} {...form.getInputProps('author')} />
        <TextInput label='출처' placeholder='출처 제목 입력' withAsterisk mt='md' key={form.key('source')} {...form.getInputProps('source')} />
        <TextInput label='태그' placeholder='입력하여 태그 작성 (최대 10자)' withAsterisk mt='md' key={form.key('tag')} {...form.getInputProps('tag')} />

        <Group justify='flex-end' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>
    </div>
  );
}

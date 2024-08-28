import { Center, Loader, Text } from '@mantine/core';

function Loading({ text = '잠시만 기다려주세요' }: { text?: string }): JSX.Element {
  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      <Loader size={49} variant='bars' color='#5195EE' />
      {text && (
        <Text mt='md' size='lg'>
          {text}
        </Text>
      )}
    </Center>
  );
}

export default Loading;

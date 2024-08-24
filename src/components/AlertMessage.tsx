import { rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

interface AlertMessageProps {
  title: string;
  message: string;
  color: 'dark' | 'gray' | 'red' | 'pink' | 'grape' | 'violet' | 'indigo' | 'blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'teal';
}

const alertMessage = ({ title = '알림 메시지입니다.', message = '부가 설명입니다.', color = 'dark' }: AlertMessageProps) => {
  const alert = showNotification({
    title,
    message,
    icon: color == 'red' ? xIcon : checkIcon,
    color,
    autoClose: 2000,
    styles: () => ({
      root: {
        position: 'fixed',
        top: '10%',
        right: '3%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        width: '40%',
        maxWidth: '70%',
      },
    }),
  });

  return alert;
};

export default alertMessage;

import { showNotification } from '@mantine/notifications';

interface AlertEmotionProps {
  title: string;
  message: string;
  color?: string;
  icon?: string;
  autoClose?: number | false;
}

const colorMap: { [key: string]: string } = {
  yellow: '#FFF9C4',
  green: '#C8E6C9',
  purple: '#E1BEE7',
  blue: '#B3E5FC',
  red: '#FFCDD2',
};

const AlertEmotion = ({ title, message, color = 'blue', icon, autoClose }: AlertEmotionProps) => {
  const backgroundColor = colorMap[color];

  showNotification({
    title,
    message: `${message} ${autoClose === false ? '*오늘의 감정을 수정하고 싶다면, 마이페이지에서 가능합니다!' : ''}`,
    icon: <img src={icon} alt='emotion icon' style={{ width: '28px', height: '28px' }} />,
    autoClose,
    styles: () => ({
      root: {
        position: 'fixed',
        top: '10%',
        right: '3%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        width: '40%',
        maxWidth: '70%',
        backgroundColor: backgroundColor,
        color: '#000',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        wordBreak: 'break-word',
      },
      message: {
        wordBreak: 'break-word',
      },
      icon: {
        backgroundColor: 'transparent',
        marginBottom: '10px',
      },
    }),
  });
};

export default AlertEmotion;

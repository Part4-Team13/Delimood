import React from 'react';
import { Menu, Button, Flex } from '@mantine/core';
import { emotionIcons, emotionNames } from './emotionData';

interface EmojiDropdownProps {
  onSelect: (emoji: string) => void;
  selectedEmoji: string;
}

const EmojiDropdown: React.FC<EmojiDropdownProps> = ({ onSelect, selectedEmoji }) => {
  const buttonText = selectedEmoji === 'ALL' ? '필터 선택' : `필터: ${emotionNames[selectedEmoji] || '없음'}`;

  return (
    <Flex align='center' gap='xs' className='mt-3'>
      <Menu>
        <Menu.Target>
          <Button>{buttonText}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {Object.entries(emotionIcons).map(([emotion, icon]) => (
            <Menu.Item key={emotion} onClick={() => onSelect(emotion)}>
              <img src={icon} alt={emotionNames[emotion]} style={{ width: '20px', height: '20px', marginRight: '8px', display: 'inline-block' }} />
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <Button variant='outline' onClick={() => onSelect('ALL')}>
        해체
      </Button>
    </Flex>
  );
};

export default EmojiDropdown;

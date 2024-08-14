import { useState, useEffect } from 'react';
import { Calendar } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Group, ActionIcon } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { rawData } from './data';
import { emotionIcons, emotionColors, emotionNames } from './emotionData';

const EmotionCalendar = () => {
  const isTablet = useMediaQuery('(min-width: 744px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({});
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  useEffect(() => {
    const emojiMap = rawData.reduce((acc: { [key: string]: string }, entry: { emotion: string; createdAt: string }) => {
      const date = entry.createdAt.split('T')[0];
      acc[date] = emotionIcons[entry.emotion] || '';
      return acc;
    }, {});

    setEmojis(emojiMap);
  }, []);

  const formatDate = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const CustomDay = ({ date }: { date: Date }) => {
    const dateString = formatDate(date);
    const imageSrc = emojis[dateString] || '';
    const isToday = dayjs().isSame(dayjs(date), 'day');
    const shouldDisplayEmoji = selectedEmojis.length === 0 || (imageSrc && selectedEmojis.includes(Object.keys(emotionIcons).find((e) => emotionIcons[e] === imageSrc) || ''));

    return (
      <div
        style={{
          textAlign: 'center',
          border: isToday ? (isDesktop ? '6px solid #E46E80' : '3px solid #E46E80') : 'none',
          borderRadius: '4px',
          width: isTablet ? '54px' : isDesktop ? '91px' : '44px',
          height: isTablet ? '54px' : isDesktop ? '91px' : '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'middle',
        }}
      >
        <span
          style={{
            color: isToday ? '#E46E80' : '#C4C4C4',
            fontSize: shouldDisplayEmoji ? (isDesktop ? (imageSrc ? '18px' : '24px') : imageSrc ? '10px' : '16px') : isDesktop ? '24px' : '16px',
          }}
        >
          {date.getDate()}
        </span>
        {shouldDisplayEmoji && imageSrc && (
          <img
            src={imageSrc}
            alt='emotion'
            style={{
              width: isTablet ? '24px' : isDesktop ? '36px' : '20px',
              height: isTablet ? '24px' : isDesktop ? '36px' : '20px',
            }}
          />
        )}
      </div>
    );
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmojis((prevSelected) => (prevSelected.includes(emoji) ? prevSelected.filter((e) => e !== emoji) : [...prevSelected, emoji]));
  };

  const handleReset = () => {
    setSelectedEmojis([]);
  };

  return (
    <div>
      <Calendar
        firstDayOfWeek={0}
        renderDay={(date) => <CustomDay date={date} />}
        locale='ko'
        styles={{
          calendarHeader: {
            margin: '0px',
            minWidth: isTablet ? '379px' : isDesktop ? '637px' : '308px',
            height: isTablet ? '54px' : isDesktop ? '91px' : '44px',
            alignItems: 'center',
          },
          calendarHeaderLevel: {
            order: 1,
            justifyContent: 'flex-start',
            fontSize: isDesktop ? '24px' : '16px',
            fontWeight: '600',
          },
          calendarHeaderControl: {
            order: 2,
            justifyContent: 'flex-end',
            marginRight: '15px',
          },
          weekday: {
            fontSize: isDesktop ? '24px' : '16px',
            fontWeight: '600',
          },
          weekdaysRow: {
            fontSize: isDesktop ? '24px' : '16px',
            borderTop: '1px solid #ECEFF4',
            borderBottom: '1px solid #ECEFF4',
          },
          monthRow: {
            borderBottom: '1px solid #ECEFF4',
          },
          monthThead: {
            height: isTablet ? '54px' : isDesktop ? '91px' : '44px',
          },
          month: {
            width: isTablet ? '379px' : isDesktop ? '637px' : '308px',
            height: isTablet ? '326px' : isDesktop ? '548px' : '264px',
          },
          day: {
            width: isTablet ? '54px' : isDesktop ? '91px' : '44px',
            height: isTablet ? '54px' : isDesktop ? '91px' : '44px',
            fontWeight: '600',
          },
        }}
      />
      {/*Refactor : UI부분에서 리펙토링 있을예정*/}
      <div className='w-[308px] tablet:w-[379px] desktop:w-[637px] flex flex-col h-auto my-4 px-1 items-center tablet:mt-10 desktop:mt-16 gap-2 desktop:gap-6'>
        <span className='text-[14px] mb-2 tablet:text-[16px] font-paraph desktop:text-[20px] text-center'>
          당신이 언제 행복한 날이 많았는지 궁금하시다면! <br />
          클릭해보세요!!
        </span>
        <Group className='w-[304px] tablet:w-[379px] desktop:w-[620px] h-[80px] tablet:h-[88px] desktop:h-[128px] justify-center border border-gray-100 rounded-xl gap-2 desktop:gap-5'>
          {Object.entries(emotionIcons).map(([emotion, icon]) => (
            <Button
              key={emotion}
              onClick={() => handleEmojiClick(emotion)}
              variant='subtle'
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                background: selectedEmojis.includes(emotion) ? `${emotionColors[emotion]}` : '#FFFFFF',
                border: selectedEmojis.includes(emotion) ? 'none' : `4px solid ${emotionColors[emotion]}`,
              }}
              className='bg-background h-[40px] w-[40px] tablet:h-[56px] tablet:w-[56px] desktop:h-[80px] desktop:w-[80px] items-center justify-center'
            >
              <img src={icon} alt={emotionNames[emotion]} style={{ width: isTablet ? '32px' : isDesktop ? '40px' : '24px', height: isTablet ? '32px' : isDesktop ? '40px' : '24px' }} />
            </Button>
          ))}
          <ActionIcon onClick={handleReset} variant='subtle' className='w-[30px] h-[30px] desktop:w-[60px] desktop:h-[60px] text-blue-800 text-xs'>
            필터 <br />
            해제
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
};

export default EmotionCalendar;

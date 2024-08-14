import { useState, useEffect } from 'react';
import { Calendar } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { rawData } from './data';
import { emotionIcons } from './emotionData';
import EmojiDropdown from './EmojiDropdown';

const EmotionCalendar = () => {
  const isTablet = useMediaQuery('(min-width: 744px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({});
  const [selectedEmoji, setSelectedEmoji] = useState<string>('ALL'); // 선택한 이모지를 관리하는 상태

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
    const shouldDisplayEmoji = selectedEmoji === 'ALL' || (imageSrc && emotionIcons[selectedEmoji] === imageSrc);

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
      <EmojiDropdown onSelect={setSelectedEmoji} selectedEmoji={selectedEmoji} />
    </div>
  );
};

export default EmotionCalendar;

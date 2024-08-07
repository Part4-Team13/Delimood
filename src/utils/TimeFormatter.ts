const TimeFormatter = (getTime: string) => {
  const initialTime = new Date(getTime);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - initialTime.getTime();
  const timeHours = Math.floor(timeDifference / (1000 * 60 * 60));
  const timeMinutes = Math.floor(timeDifference / (1000 * 60));

  if (timeMinutes < 1) {
    return `방금 전`;
  } else if (timeMinutes < 60 && timeHours < 1) {
    return `${timeMinutes}분 전`;
  } else if (timeHours < 24) {
    return `${timeHours}시간 전`;
  } else {
    const date = initialTime.getFullYear() + '.' + (initialTime.getMonth() + 1) + '.' + initialTime.getDate();
    return date;
  }
};

export default TimeFormatter;

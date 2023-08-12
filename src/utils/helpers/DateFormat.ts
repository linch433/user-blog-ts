import dayjs from 'dayjs';

export const getFormatDate = (date: string) =>
  dayjs(date).format('H:mm, D/MM/YYYY');

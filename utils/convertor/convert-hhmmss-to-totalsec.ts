// import { parse, differenceInMilliseconds, startOfDay } from 'date-fns';
import { parse, differenceInSeconds } from 'date-fns';

export const convertHHMMSStoTotalSec = (timeString: string) => {
  // Parse the time string
  if (!timeString) return 0;
  const time = parse(timeString, 'HH:mm:ss', new Date());
  const startOfDay = parse("00:00:00", "HH:mm:ss", new Date());
  
  // // Calculate the difference in milliseconds from the start of the day
  const milliseconds = differenceInSeconds(time, startOfDay);
  
  return milliseconds;
}
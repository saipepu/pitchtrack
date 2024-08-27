// import { parse, differenceInMilliseconds, startOfDay } from 'date-fns';
const { parse, differenceInSeconds, startOfDay } = require('date-fns');

export const convertHHMMSStoTotalSec = (timeString: any) => {
  // Parse the time string
  const time = parse(timeString, 'HH:mm:ss', new Date());
  const startOfDay = parse("00:00:00", "HH:mm:ss", new Date());
  
  // Calculate the difference in milliseconds from the start of the day
  const milliseconds = differenceInSeconds(time, startOfDay);
  
  return milliseconds;
}
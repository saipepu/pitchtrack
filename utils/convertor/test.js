// import { parse, differenceInMilliseconds, startOfDay } from 'date-fns';
const { parse, differenceInSeconds, startOfDay } = require('date-fns');

const convertHHMMSStoTotalSec = (timeString) => {
  // Parse the time string
  const time = parse(timeString, 'HH:mm:ss', new Date());
  
  // Calculate the difference in milliseconds from the start of the day
  const milliseconds = differenceInSeconds(time, startOfDay(time));
  
  return milliseconds;
}
export const convertTotalSectoHHMMSS = (totalSeconds: number) => {
    let hours: number | string = Math.floor(totalSeconds / 3600);
    let minutes: number | string = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds: number | string = totalSeconds - (hours * 3600) - (minutes * 60);
  
    if (hours < 10) { hours = hours; }
    if (minutes < 10) { minutes = minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
  
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds;
}
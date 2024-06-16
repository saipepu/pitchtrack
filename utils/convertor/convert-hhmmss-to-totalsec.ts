export const convertHHMMSStoTotalSec = (hhmmss: string) => {
    let totalSeconds: any = hhmmss.split(':').reduce((acc: any, time: any): any => (60 * acc) + +time);
    return totalSeconds;
}
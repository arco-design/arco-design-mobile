import { TimeDataType } from './index';

// 定义秒，分，小时，天的转化常量
// @en Define conversion constants for seconds, minutes, hours, days
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// 把毫秒解析成TimeDataType格式
// @en Parse milliseconds into TimeDataType format
export function parseTime(time: number): TimeDataType {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    };
}
// 把TimeDataType解析成毫秒
// @en Parse TimeDataType into milliseconds
export function unParseTime(time: TimeDataType): number {
    const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = time;
    return days * DAY + hours * HOUR + minutes * MINUTE + seconds * SECOND + milliseconds;
}
// 判断是否在浏览器中运行
// @en Determine if it is running in the browser
export const inBrowser = typeof window !== 'undefined';
// 判断根元素
// @en Determine the root element
const root = inBrowser ? window : global;
// 根据id清除对应的animationFrame
// @en Clear the corresponding animationFrame according to the id
export function cancelRaf(id: number) {
    const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
    cancelAnimationFrame.call(root, id);
}
// 计算现在时间
// @en Calculate the current time
let prev = Date.now();
// requestAnimationFrame不存在时用setTimeout代替，得出id
// @en When requestAnimationFrame does not exist, use setTimeout instead to get the id
function rafPolyfill(fn: FrameRequestCallback): number | NodeJS.Timeout {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}
// 得到animationFrame的id
// @en Get the id of animationFrame
export function raf(fn: FrameRequestCallback): number {
    const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
    return requestAnimationFrame.call(root, fn);
}
// 补0成需要的格式
// @en Fill 0 into the required format
export function padZero(num: number | string, targetLength = 2): string {
    let str = `${num}`;
    while (str.length < targetLength) {
        str = `0${str}`;
    }
    return str;
}
// 根据传入的格式解析时间成特定格式
// @en Parse the time into a specific format according to the inputing format
export function parseFormat(formatArg: string, currentTime: TimeDataType): string {
    const { days } = currentTime;
    let format = formatArg;
    let { hours, minutes, seconds, milliseconds } = currentTime;
    if (format.includes('D')) {
        format = format.replace('DD', padZero(days)).replace('D', `${days}`);
    } else {
        hours += days * 24;
    }
    if (format.includes('H')) {
        format = format.replace('HH', padZero(hours)).replace('H', `${hours}`);
    } else {
        minutes += hours * 60;
    }
    if (format.includes('m')) {
        format = format.replace('mm', padZero(minutes)).replace('m', `${minutes}`);
    } else {
        seconds += minutes * 60;
    }
    if (format.includes('s')) {
        format = format.replace('ss', padZero(seconds)).replace('s', `${seconds}`);
    } else {
        milliseconds += seconds * 1000;
    }
    if (format.includes('S')) {
        const ms = padZero(milliseconds, 3);
        format = format
            .replace(/S{3}/, ms)
            .replace(/S{2}/, ms.slice(0, 2))
            .replace(/S{1}/, ms.charAt(0));
    }
    return format;
}

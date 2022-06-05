import { DateWithUTC } from '@arco-design/mobile-utils';
import { ItemType, IDateObj } from './type';

export function convertTsToDateObj(ts: number, utc?: boolean): IDateObj {
    const date = new DateWithUTC(ts, utc);

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };
}

export function convertObjToTs(obj = {} as IDateObj, defaultTs: number, utc?: boolean) {
    const date = new DateWithUTC(defaultTs, utc);
    const defaultDate = date.getDate();

    !isNaN(obj.year) && date.setFullYear(obj.year);
    // bugfix: setMonth后如果日期超限则会自动顺延到下月，此时返回月份就不准了，因此先设置date为1再设置month
    // @en bugfix: After setMonth, if the date exceeds the limit, it will be automatically extended to the next month. At this time, the return month is not allowed, so first set date to 1 and then set month
    if (!isNaN(obj.month)) {
        date.setDate(1);
        date.setMonth(obj.month - 1);
    }
    // date的值可能被修改，需要被还原
    // @en The value of date may be modified and needs to be restored
    date.setDate(isNaN(obj.date) ? defaultDate : obj.date);
    !isNaN(obj.hour) && date.setHours(obj.hour);
    !isNaN(obj.minute) && date.setMinutes(obj.minute);
    !isNaN(obj.second) && date.setSeconds(obj.second);

    return date.getTime();
}

export function oneOf<T>(value: T, validList: T[]): boolean {
    return validList.indexOf(value) !== -1;
}

// 查看两个obj中的keys里的各个值是否都一致
// @en Check whether the values in the keys in the two obj are consistent
export function judgeObj(dateObj1: IDateObj, dateObj2: IDateObj, keys = [] as ItemType[]) {
    return !keys.some(key => dateObj1[key] !== dateObj2[key]);
}

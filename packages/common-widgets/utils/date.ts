export class DateWithUTC {
    date: Date;

    utc?: boolean;

    constructor(ts: string | number | Date, utc?: boolean) {
        this.date = new Date(ts);
        this.utc = utc;
    }

    getFullYear() {
        return this.utc ? this.date.getUTCFullYear() : this.date.getFullYear();
    }

    getMonth() {
        return this.utc ? this.date.getUTCMonth() : this.date.getMonth();
    }

    getDate() {
        return this.utc ? this.date.getUTCDate() : this.date.getDate();
    }

    getHours() {
        return this.utc ? this.date.getUTCHours() : this.date.getHours();
    }

    getMinutes() {
        return this.utc ? this.date.getUTCMinutes() : this.date.getMinutes();
    }

    getSeconds() {
        return this.utc ? this.date.getUTCSeconds() : this.date.getSeconds();
    }

    setFullYear(...args: Parameters<Date['setFullYear']>) {
        return this.utc ? this.date.setUTCFullYear(...args) : this.date.setFullYear(...args);
    }

    setMonth(...args: Parameters<Date['setMonth']>) {
        return this.utc ? this.date.setUTCMonth(...args) : this.date.setMonth(...args);
    }

    setDate(...args: Parameters<Date['setDate']>) {
        return this.utc ? this.date.setUTCDate(...args) : this.date.setDate(...args);
    }

    setHours(...args: Parameters<Date['setHours']>) {
        return this.utc ? this.date.setUTCHours(...args) : this.date.setHours(...args);
    }

    setMinutes(...args: Parameters<Date['setMinutes']>) {
        return this.utc ? this.date.setUTCMinutes(...args) : this.date.setMinutes(...args);
    }

    setSeconds(...args: Parameters<Date['setSeconds']>) {
        return this.utc ? this.date.setUTCSeconds(...args) : this.date.setSeconds(...args);
    }

    getTime() {
        return this.date.getTime();
    }
}

export function formatDateNumber(value: number) {
    return value < 10 ? `0${value}` : String(value);
}

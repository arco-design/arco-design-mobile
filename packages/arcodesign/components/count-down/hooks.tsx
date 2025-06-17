import { useState, useEffect, useRef } from 'react';
import { useRefState } from '../_helpers';
import { startTask, stopTask } from './singleton';
import { CountDownProps, TimeDataType } from './type';
import { parseTime } from './util';

export type UseCountDownOptions = {
    time: number;
} & Pick<CountDownProps, 'millisecond' | 'autoStart' | 'onChange' | 'onFinish'>;

export const useCountDown = (options: UseCountDownOptions) => {
    const taskIdRef = useRef<number>(0);
    const endTimeRef = useRef<number | undefined>(undefined);
    const countingRef = useRef<boolean | undefined>(undefined);
    const [remain, remainRef, setRemain] = useRefState(options.time);
    const [current, setCurrent] = useState<TimeDataType>(parseTime(options.time));
    const taskType = options.millisecond ? 'micro' : 'macro';

    // 暂停
    // @en Pause
    const pause = () => {
        countingRef.current = false;
        stopTask(taskType, taskIdRef.current);
    };
    // 计算当前剩余时间，以毫秒为单位
    // @en Calculate the current remaining time in milliseconds
    const getCurrentRemain = () => {
        const leftTime = Math.max((endTimeRef.current as number) - Date.now(), 0);
        if (options.millisecond) {
            return leftTime;
        }
        return Math.round(leftTime / 1000) * 1000;
    };
    const setRemainCallback = (value: number) => {
        setRemain(value);
        const time: TimeDataType = parseTime(value);
        if (options.onChange && value !== options.time) {
            options.onChange(time, value);
        }
        if (value === 0) {
            setCurrent(time);
            pause();
            options.onFinish?.();
        }
    };
    // 开启任务
    // @en start tasks
    const tick = () => {
        taskIdRef.current = startTask(taskType, () => {
            if (countingRef.current) {
                setRemainCallback(getCurrentRemain());
                return remainRef.current > 0;
            }
            return false;
        });
    };
    // 开始
    // @en Start
    const start = (reStart = false) => {
        if (!countingRef.current) {
            if (reStart) {
                endTimeRef.current = Date.now() + options.time;
            } else {
                endTimeRef.current = Date.now() + remainRef.current;
            }
            countingRef.current = true;
            tick();
        }
    };
    // 重置
    // @en Reset
    const reset = () => {
        const totalTime = options.time;
        endTimeRef.current = Date.now() + totalTime;
        pause();
        setRemainCallback(totalTime);
        if (options.autoStart) {
            start(true);
        }
    };

    useEffect(() => {
        // ummounted时如果正在运行倒计时则暂停
        // @en Pause if the countdown is running when ummounted
        return () => {
            if (countingRef.current) {
                pause();
            }
        };
    }, []);

    // 设置自动开始倒计时时自动启动
    // @en Set to start automatically when the countdown starts automatically
    useEffect(() => {
        if (options.autoStart) {
            start();
        }
    }, [options.autoStart]);

    // 倒计时设置变化时重新计时
    // @en Re-time when countdown settings change
    useEffect(() => {
        reset();
    }, [options.time]);

    // remain变化时同步current 即把毫秒转化为TimeDataType类型
    // @en Synchronize current when remain changes, that is, convert milliseconds to TimeDataType
    useEffect(() => {
        setCurrent(parseTime(remain));
    }, [remain]);

    return {
        start,
        pause,
        reset,
        current,
    };
};

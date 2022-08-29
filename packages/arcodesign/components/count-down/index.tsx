import React, { useRef, forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { unParseTime, parseFormat } from './util';
import { useCountDown } from './hooks';
import { ContextLayout } from '../context-provider';
import { CountDownProps, CountDownRef } from './type';

export * from './type';

/**
 * 倒计时组件
 * @en Countdown Component
 * @name 倒计时
 * @name_en CountDown
 * @type 信息展示
 * @type_en Data Display
 */
const CountDown = forwardRef((props: CountDownProps, ref: Ref<CountDownRef>) => {
    const {
        className = '',
        style = {},
        time = 0,
        format = 'HH:mm:ss',
        autoStart = true,
        millisecond = false,
        onFinish,
        onChange,
        renderChild,
    } = props;
    const domRef = useRef<HTMLDivElement>(null);

    // 传入倒计时等变量得到开始暂停启动三个方法以及目前所剩时间current(TimeDataType格式)
    // @en get start, pause, reset methods and the current remaining time —— current (TimeDataType format) by inputing variables such as countdown
    const { start, pause, reset, current } = useCountDown({
        time: typeof time === 'number' ? time : unParseTime(time),
        millisecond,
        onChange,
        onFinish,
        autoStart,
    });

    // 导出dom以及start,pause,reset三个方法
    // @en Export dom and three methods of start, pause and reset
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        start,
        pause,
        reset,
    }));

    const currentStr = useMemo(() => parseFormat(format, current), [format, current]);

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={`${prefixCls}-count-down ${className}`} style={style} ref={domRef}>
                    {renderChild ? renderChild(current) : currentStr}
                </div>
            )}
        </ContextLayout>
    );
});

export default CountDown;

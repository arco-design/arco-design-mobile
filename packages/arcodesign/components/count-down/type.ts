import { ReactNode } from 'react';

export interface TimeDataType {
    /**
     * 天数
     * @en Days
     */
    days: number;
    /**
     * 小时
     * @en Hour
     * */
    hours: number;
    /**
     * 分钟
     * @en minute
     * */
    minutes: number;
    /**
     * 秒数
     * @en second
     * */
    seconds: number;
    /**
     * 毫秒
     * @en millisecond
     * */
    milliseconds: number;
}

export interface CountDownProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 倒计时时长，单位毫秒
     * @en Countdown time in milliseconds
     * @default 0
     */
    time?: number | TimeDataType;
    /**
     * 自定义格式
     * D:天数 DD:天数（个位数补0）
     * H:小时 HH:小时（个位数补0）
     * m:分钟 mm:分钟（个位数补0）
     * s:秒数 ss:秒数（个位数补0）
     * S:毫秒（1 位）SS:毫秒（2 位）SSS:毫秒（3 位）
     * @en Custom format
     * D: Days DD: Days (1 digit with 0)
     * H: Hours HH: Hours (1 digit with 0)
     * m: Minutes mm: Minutes (1 digit with 0)
     * s: Seconds ss: Seconds (1 digit with 0)
     * S: Milliseconds (1 digit) SS: Milliseconds (2 digits) SSS: Milliseconds (3 digits)
     *
     * @default HH:mm:ss
     */
    format?: string;
    /**
     * 是否自动开始倒计时
     * @en Whether to automatically start the countdown
     * @default true
     */
    autoStart?: boolean;
    /**
     * 是否开启毫秒级渲染
     * @en Whether to enable millisecond rendering
     * @default false
     */
    millisecond?: boolean;
    /**
     * 倒计时结束时触发
     * @en Callback when the countdown ends
     */
    onFinish?: () => void;
    /**
     * 倒计时变化时触发
     * @en Callback when the countdown changes
     */
    onChange?: (val: TimeDataType, ts: number) => void;
    /**
     * 自定义内容
     * @en Custom content
     */
    renderChild?: (val: TimeDataType) => ReactNode;
}

export interface CountDownRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 开始
     * @en Start
     */
    start: () => void;
    /**
     * 暂停
     * @en Pause
     */
    pause: () => void;
    /**
     * 重置
     * @en Reset
     * */
    reset: () => void;
}

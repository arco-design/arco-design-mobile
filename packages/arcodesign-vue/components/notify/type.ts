import { RenderFunction } from 'vue';

export type NotifyType = 'success' | 'info' | 'warning' | 'error';

export interface NotifyProps {
    /**
     * 通知类型
     * @en Notification type
     * @default "info"
     */
    type?: NotifyType;
    /**
     * 将通知放入某个模块
     * @en Get mounted container
     */
    container?: string;
    /**
     * 动画的执行时间 (单位ms)
     * @en Animation execution time (unit: ms)
     * @default 300
     */
    transitionDuration?: number;
    /**
     * 通知自动关闭时延 (单位ms) 设置为0时不会自动关闭
     * @en The delay of notification automatic closing (unit: ms). Will not automatically close when it is set to 0
     * @default 3000
     */
    duration?: number;
}

export interface NotifyEmits {
    (e: 'close'): void;
}

export type NotifyOptions = Omit<NotifyProps, 'type'> & {
    content: string | RenderFunction;
    onClose?: () => void;
    getContainer?: () => HTMLElement;
};

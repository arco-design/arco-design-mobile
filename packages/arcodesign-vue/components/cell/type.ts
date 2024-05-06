export interface CellProps {
    /**
     * 主体文字，如果有标签名则靠右，否则靠左
     * @en The primary text, if there is a label name, it is to the right, otherwise it is to the left
     *  */
    text?: string;
    /**
     * 是否展示右侧箭头
     * @en Whether to show the right arrow
     *  */
    showArrow?: boolean;
    /**
     * 是否有外边框
     * @en Whether there is a border
     * @default true
     */
    bordered?: boolean;
}

export interface CellEmits {
    (e: 'click', event: Event): void;
}

export interface CellGroupProps {
    /**
     * 是否有外边框
     * @en Whether there is a border
     * @default true
     */
    bordered?: boolean;
}

export interface CellGroupEmits {
    (e: 'click', event: Event): void;
}

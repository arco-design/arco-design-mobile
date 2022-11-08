export interface StepProps {
    /**
     * 步骤标题
     * @en Step title
     */
    title?: React.ReactNode;
    /**
     * 步骤说明文字
     * @en Step description
     */
    description?: React.ReactNode;
    /**
     * 自定义步骤图标
     * @en Custom step Icon
     */
    icon?: React.ReactNode;
    /**
     * 指定步骤状态，不配置该项时，会根据 Steps 的 current 属性自动指定状态
     * @en Specify the step status. When this item is not input, the status will be automatically specified according to the current property of steps
     */
    status?: 'finish' | 'error' | 'wait' | 'process';
    /**
     * 指定对齐方式，不配置该项时，会跟随 Steps 的 align 属性值
     * @en Specify the step alignment. When this item is not input, it will be automatically specified according to the align property of steps
     */
    align?: 'center' | 'start';
}

export interface StepsProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式，如果想用 css 控制 icon 颜色，可使用公共 mixin '.set-steps-color(@color)'
     * @en Custom stylesheet. If want to use CSS to control icon color, use public mixin ' set-steps-color(@color)'
     */
    style?: React.CSSProperties;
    /**
     * 步骤条方向
     * @en Step bar direction
     * @default horizontal
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * 步骤条对齐方式
     * @en Step alignment
     * @default direction="horizontal" 时默认为 "center"，direction="vertical" 时默认为 "start"
     * @default_en "center" when direction="horizontal" and "start" when direction="vertical"
     */
    align?: 'center' | 'start';
    /**
     * 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态，传入则受控
     * @en Specify the current step, counting from 0. In the step children elements, the status can be overwritten through the status, and it is controlled if it is input
     */
    current?: number;
    /**
     * 步骤图标类型。在子 Step 元素中，可以通过 icon 属性覆盖图标
     * @en Steps icon type. In the children step elements , the icons can be overridden by the property icon
     * @default number
     */
    iconType?: 'number' | 'dot';
    /**
     * 当前步骤的节点状态
     * @en Status of the current step
     * @default process
     */
    status?: 'finish' | 'error' | 'wait' | 'process';
    /**
     * 初始 step index
     * @en Default step index
     * @default 0
     */
    defaultIndex?: number;
    /**
     * 步骤条自定义数据，优先级高于 Children Step 子元素
     * @en Custom data of step bar, which takes precedence over children elements of steps component
     */
    items?: StepProps[];
    /**
     * 点击步骤触事件
     * @en Callback when clicking the step
     */
    onClick?: (current: number) => void;
    /**
     * step 变化回调
     * @en Callback when step changes
     */
    onChange?: (index: number) => void;
    /**
     * 子元素，优先级低于 items
     * @en Child element, with priority lower than items
     */
    children?: React.ReactNode;
}

export interface StepRef {
    /**
     * Step 最外层元素 DOM
     * @en Outermost element DOM of the Step
     */
    dom: HTMLDivElement | null;
}

export interface StepsRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

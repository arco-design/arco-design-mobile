export interface BadgeProps {
    /**
     * 是否展示徽标，visible切换时有动画过渡
     * @en Whether to display the badge, there is an animation transition when the visible status switch
     * @default true
     */
    visible?: boolean;
    /**
     * 徽标文案
     * @en badge text
     */
    text?: string | number;
    /**
     * 显示为一个小红点
     * @en show as a red dot
     * @default false
     */
    dot?: boolean;
    /**
     * 最大完整展示数字，超出后将展示 +
     * @en Maximum full impression number, it will be displayed "+" beyond the number
     * @default 99
     */
    maxCount?: number;
    /**
     * 是否置于右上角
     * @en Whether the badge is placed in the upper right corner
     * @default false
     */
    absolute?: boolean;
    /**
     * 是否有白色边框
     * @en Whether the badge has a white border
     * @default false
     */
    bordered?: boolean;
    /**
     * 显隐动画名称，如果更换名称需自定义 transition css 动画
     * @en Transition name. If you change the name, you need to customize the transition css rules
     * @default "badge-scale"
     */
    transitionName?: string;
}

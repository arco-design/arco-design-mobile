import { componentWrapper } from '@arco-design/mobile-utils';
import { componentGenerator } from './menu';
import { Popover } from './popover';

export * from './type';

/**
 * 气泡菜单
 * @en Bubble menu
 */
const Menu = componentGenerator(Popover);

/**
 * 气泡卡片，支持六个方向，小箭头在各个方向均基于挂载的子元素居中放置，支持受控和非受控模式。
 * @en Bubble card, supports six directions, small arrows are centered in each direction based on the mounted sub-elements, and supports controlled and uncontrolled modes.
 * @name 气泡卡片
 * @name_en Popover
 * @type 信息展示
 * @type_en Data Display
 */
export default componentWrapper(Popover, {
    Menu,
});

import { componentWrapper } from '@arco-design/mobile-utils';
import { Item } from './item';
import { componentGenerator } from './tab-bar';

export * from './type';

const TabBar = componentGenerator(Item);
/**
 * 标签栏组件，Tabs 的简化版，仅支持标签切换
 * @en TabBar component, a simplified version of Tabs, only supports tab switching.
 * @type 导航
 * @type_en Navigation
 * @name 标签栏
 * @name_en TabBar
 */
export default componentWrapper(TabBar, {
    Item,
});

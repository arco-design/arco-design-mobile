import { componentWrapper } from '@arco-design/mobile-utils';
import { Collapse } from './collapse';
import Group from './group';

export * from './collapse';
export * from './type';

/**
 * 折叠面板组件，支持手风琴模式。
 * @en Collapse supports accordion mode.
 * @type 信息展示
 * @type_en Data Display
 * @name 折叠面板
 * @name_en Collapse
 */
export default componentWrapper(Collapse, { Group });

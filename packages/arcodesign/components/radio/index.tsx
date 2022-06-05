import { componentWrapper } from '@arco-design/mobile-utils';
import { componentGenerator } from './group';
import { Radio } from './radio';

export * from './type';

/**
 * 单选项组
 * @en Radio group
 */
const Group = componentGenerator(Radio);

/**
 * 单选框，可用状态下点击切换选择，支持禁用，支持单选项组。
 * @en Radio button, click to switch selection when available, supports disabled state and radio option group.
 * @name 单选框
 * @name_en Radio
 * @type 数据输入
 * @type_en Data Entry
 */
export default componentWrapper(Radio, {
    Group,
});

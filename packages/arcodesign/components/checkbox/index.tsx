import { componentWrapper } from '@arco-design/mobile-utils';
import { componentGenerator } from './group';
import { Checkbox } from './checkbox';

export * from './type';

/**
 * 复选项组
 * @en Checkbox group
 * @displayName CheckboxGroup
 */
const Group = componentWrapper(componentGenerator(Checkbox), 'CheckboxGroup');

/**
 * 复选框，可用状态下点击切换选择，支持禁用，支持复选项组。
 * @en Checkbox, click to switch selection when available, support disabled status, support checkbox group.
 * @name 复选框
 * @name_en Checkbox
 * @type 数据录入
 * @type_en Data Entry
 * @displayName Checkbox
 */
export default componentWrapper(Checkbox, 'Checkbox', {
    Group,
});

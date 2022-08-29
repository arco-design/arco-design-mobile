import { componentWrapper } from '@arco-design/mobile-utils';
import { componentGenerator } from './list';
import { Tag } from './tag';

export * from './type';

/**
 * 标签列表，支持动态编辑标签
 * @en Tag list, support dynamic editing of tags
 */
const List = componentGenerator(Tag);

/**
 * 标签组件，支持标签和标签组。
 * @en Tag component, supports tags and tag groups.
 * @type 信息展示
 * @type_en Data Display
 * @name 标签
 * @name_en Tag
 */
export default componentWrapper(Tag, {
    List,
});

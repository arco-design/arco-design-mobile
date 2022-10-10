import { componentWrapper } from '@arco-design/mobile-utils';
import { componentGenerator } from './group';
import { Cell } from './cell';

export * from './type';

const Group = componentGenerator(Cell);

/**
 * 单元格组件，含单元格及单元格组合，常用于设置项、表单等。
 * @en Cell, including cells and cell group, are often used to set items, forms, etc.
 * @type 信息展示
 * @type_en Data Display
 * @name 单元格
 * @name_en Cell
 */
export default componentWrapper(Cell, {
    Group,
});

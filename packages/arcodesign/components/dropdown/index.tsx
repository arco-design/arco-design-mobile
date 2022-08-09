import { componentWrapper } from '@arco-design/mobile-utils';
import Options from './options';
import { componentGenerator } from './dropdown';

export * from './type';

const Dropdown = componentGenerator(Options);

/**
 * 下拉面板，展示供选择的选择项
 * @en Dropdown panel, showing options to choose from
 * @type 导航
 * @type_en Navigation
 * @name 下拉面板
 * @name_en Dropdown
 */
export default componentWrapper(Dropdown, {
    Options,
});

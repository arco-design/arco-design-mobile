import { componentGenerator } from './dropdown-menu';
import Dropdown from '../dropdown';

export * from './type';

/**
 * 下拉选择组件，点击选择器(select)展开下拉框(dropdown)，展示选择项(options)，兼容多个选择器的情况。
 * @en Dropdown component, click the selector (select) to expand the dropdown box (dropdown), display the options (options), compatible with multiple selectors.
 * @type 导航
 * @type_en Navigation
 * @name 下拉选择菜单
 * @name_en DropdownMenu
 */
const DropdownMenu = componentGenerator(Dropdown);

export default DropdownMenu;

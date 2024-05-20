import Cell from './Cell.vue';
import CellGroup from './CellGroup.vue';
import { installFactory } from '../_helpers/install';

const install = installFactory(Cell, CellGroup);

export { Cell, CellGroup };

export default {
    install,
};

import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import Masking from '..';
import { testMaskingCase } from './utils';

demoTest('masking', { useFakeTimers: true });

const prefix = `${defaultContext.prefixCls}-masking`;

describe('Masking', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    testMaskingCase('masking', Masking, prefix, 'ARCO_MASKING');
});

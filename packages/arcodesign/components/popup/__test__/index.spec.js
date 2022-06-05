import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import { testMaskingCase } from '../../masking/__test__/utils';
import Popup from '..';

demoTest('popup');

const prefix = `${defaultContext.prefixCls}-popup`;

describe('Popup', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    testMaskingCase('popup', Popup, prefix);

});

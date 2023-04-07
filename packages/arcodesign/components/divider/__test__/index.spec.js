import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Divider from '..';

demoTest('divider');

mountTest(Divider, 'Divider');

const prefix = `${defaultContext.prefixCls}-divider`;

describe('Divider', () => {

});

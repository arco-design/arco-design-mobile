import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Keyboard from '..';

demoTest('keyboard');

mountTest(Keyboard, 'Keyboard');

const prefix = `${defaultContext.prefixCls}-keyboard`;

describe('Keyboard', () => {

});

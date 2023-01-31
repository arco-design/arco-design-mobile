import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import $COMP$ from '..';

demoTest('$comp$');

mountTest($COMP$, '$COMP$');

const prefix = `${defaultContext.prefixCls}-$comp$`;

describe('$COMP$', () => {

});

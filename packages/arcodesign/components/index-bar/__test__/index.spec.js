import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import IndexBar from '..';

demoTest('index-bar');

mountTest(IndexBar, 'IndexBar');

const prefix = `${defaultContext.prefixCls}-index-bar`;

describe('IndexBar', () => {

});

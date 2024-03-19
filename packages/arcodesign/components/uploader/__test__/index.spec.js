import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Uploader from '..';

demoTest('uploader');

mountTest(Uploader, 'Uploader');

const prefix = `${defaultContext.prefixCls}-uploader`;

describe('Uploader', () => {

});

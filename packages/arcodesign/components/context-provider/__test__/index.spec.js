import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import ContextProvider, { defaultContext } from '..';
import Dialog from '../../dialog';

const dialogPrefix = `${defaultContext.prefixCls}-dialog`;

mountTest(ContextProvider, 'ContextProvider');

describe('ConfigProvider', () => {
    it('Global configuration takes effect', () => {
        const wrapper = mount(
            <ContextProvider
                system="android">
                <Dialog
                    visible={true}
                    title="title"
                    footer={[
                        { content: 'content' },
                    ]}
                />
            </ContextProvider>
        );
        expect(wrapper.find(`.${dialogPrefix}-content.${dialogPrefix}-part.android`).length).toBe(1);
    });
});

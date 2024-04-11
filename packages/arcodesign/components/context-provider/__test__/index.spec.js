import React from 'react';
import { render } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import { mockMatchMedia } from '../../../tests/helpers/mockEvent';
import ContextProvider, { defaultContext } from '..';
import Button from '../../button';
import Dialog from '../../dialog';
import '@testing-library/jest-dom';

const dialogPrefix = `${defaultContext.prefixCls}-dialog`;

mountTest(ContextProvider, 'ContextProvider');

describe('ConfigProvider', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('Global configuration takes effect', () => {
        render(
            <ContextProvider system="android">
                <Dialog visible title="title" footer={[{ content: 'content' }]} />
            </ContextProvider>,
        );
        expect(
            document.querySelectorAll(`.${dialogPrefix}-content.${dialogPrefix}-part.android`)
                .length,
        ).toBe(1);
    });
    it('Set theme correctly', () => {
        const createElementSpy = jest
            .spyOn(document.documentElement, 'appendChild')
            .mockReturnValueOnce(document.createElement('style'));
        jest.spyOn(document.documentElement, 'removeChild').mockImplementation(jest.fn);
        render(
            <ContextProvider theme={{ a: 1 }}>
                <Button>content</Button>
            </ContextProvider>,
        );
        expect(createElementSpy.mock.calls[0][0].innerHTML).toBe(':root {--a: 1;}');
        jest.clearAllMocks();
    });
    it('isDarkMode takes effect', () => {
        render(
            <ContextProvider isDarkMode theme={{ abcde: 1 }}>
                <Dialog visible title="title" footer={[{ content: 'content' }]} />
            </ContextProvider>,
        );
        expect(document.body).toHaveClass('arco-theme-dark');
    });
    it('useDarkMode takes effect', () => {
        render(
            <ContextProvider useDarkMode>
                <Button>content</Button>
            </ContextProvider>,
        );
        expect(document.body).toHaveClass('arco-theme-dark');
    });
});

import React from 'react';
import { act, render } from '@testing-library/react';
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
    it('removes dark class when isDarkMode is false', () => {
        document.body.classList.add('arco-theme-dark');
        render(
            <ContextProvider isDarkMode={false}>
                <Button>content</Button>
            </ContextProvider>,
        );
        expect(document.body).not.toHaveClass('arco-theme-dark');
    });
    it('responds to dark mode change events', () => {
        const handlers = {};
        window.matchMedia = jest.fn().mockReturnValue({
            matches: true,
            addEventListener: jest.fn((event, cb) => {
                handlers[event] = cb;
            }),
            removeEventListener: jest.fn(),
        });
        const onDarkModeChange = jest.fn();
        render(
            <ContextProvider useDarkMode onDarkModeChange={onDarkModeChange}>
                <Button>content</Button>
            </ContextProvider>,
        );
        expect(document.body).toHaveClass('arco-theme-dark');
        act(() => {
            handlers.change({ matches: false });
        });
        expect(document.body).not.toHaveClass('arco-theme-dark');
        expect(onDarkModeChange).toBeCalledWith(false);
        act(() => {
            handlers.change({ matches: true });
        });
        expect(document.body).toHaveClass('arco-theme-dark');
        expect(onDarkModeChange).toBeCalledWith(true);
    });
    it('falls back to legacy matchMedia listener api', () => {
        const legacyMql = {
            matches: true,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
        window.matchMedia = jest.fn().mockReturnValue(legacyMql);
        const { unmount } = render(
            <ContextProvider useDarkMode>
                <Button>content</Button>
            </ContextProvider>,
        );
        expect(legacyMql.addListener).toBeCalledWith(expect.any(Function));
        unmount();
        expect(legacyMql.removeListener).toBeCalledWith(expect.any(Function));
    });
});

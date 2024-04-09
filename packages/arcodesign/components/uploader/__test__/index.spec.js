import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Uploader from '..';
import '@testing-library/jest-dom';

demoTest('uploader');

mountTest(Uploader, 'Uploader');

const prefix = `${defaultContext.prefixCls}-uploader`;

const FILE_DATA =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQzIiBoZWlnaHQ9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMy44NzggMTEuOThsNy4zNzItNy41NWE1LjA5NiA1LjA5NiAwIDAxNy4yOTIgMGwuMDguMDgzYTUuMjI2IDUuMjI2IDAgMDEwIDcuMzAybC03LjM3MiA3LjU1YTUuMDk2IDUuMDk2IDAgMDEtNy4yOTIgMGwtLjA4LS4wODNhNS4yMjYgNS4yMjYgMCAwMTAtNy4zMDJ6IiBmaWxsPSIjMTJEMkFDIj48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTE4LjU0OCA0LjQzbDcuMjkyIDcuNDY3YTUuMzQ0IDUuMzQ0IDAgMDEwIDcuNDY3IDUuMDk2IDUuMDk2IDAgMDEtNy4yOTIgMGwtNy4yOTItNy40NjdhNS4zNDQgNS4zNDQgMCAwMTAtNy40NjcgNS4wOTYgNS4wOTYgMCAwMTcuMjkyIDB6IiBmaWxsPSIjMzA3QUYyIj48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTE4LjYzMiA0LjUyMmwzLjU1MyAzLjYzOC03LjI5MiA3LjQ2N0w3LjYwMSA4LjE2bDMuNTUzLTMuNjM4YTUuMjI2IDUuMjI2IDAgMDE3LjQ3OCAweiIgZmlsbD0iIzAwNTdGRSI+PC9wYXRoPgogICAgICAgIDxnIGZpbGw9IiMxZDIxMjkiPjxwYXRoIGQ9Ik03OC42NDQgMTkuMjY4YTEuODUgMS44NSAwIDEwMC0zLjcgMS44NSAxLjg1IDAgMDAwIDMuN3oiPjwvcGF0aD48L2c+CiAgICAgICAgPHBhdGggZD0iTTQ1LjQ1NCA4LjMzNXYxMC42NTloLTIuODA1di0xLjE3N2MtLjY5My44NTgtMS43MjcgMS40NTItMy4xOSAxLjQ1Mi0yLjkzNyAwLTUuMTU5LTIuNDA5LTUuMTU5LTUuNjEgMC0zLjIwMSAyLjIyMi01LjYxIDUuMTU5LTUuNjEgMS40NjMgMCAyLjQ4Ni41OTQgMy4xOSAxLjQ2M1Y4LjMzNWgyLjgwNXptLTUuNDY3IDIuMzg3Yy0xLjY4MyAwLTIuNzUgMS4zMDktMi43NSAyLjkzN3MxLjA2NyAyLjkzNyAyLjc1IDIuOTM3YzEuNjM5IDAgMi43NS0xLjI1NCAyLjc1LTIuOTM3IDAtMS42ODMtMS4xMTEtMi45MzctMi43NS0yLjkzN3ptMTMuMTY3LTIuNjczYy42MTYgMCAxLjEuMDg4IDEuNDk2LjIzMWwtLjQyOSAyLjg0OWMtLjQ3My0uMjA5LTEuMTU1LS4zNDEtMS43MzgtLjM0MS0xLjMzMSAwLTIuMjQ0LjgxNC0yLjI0NCAyLjM5OHY1LjgwOGgtMi44NzFWOC4zMzVoMi43ODN2MS4xNjZjLjY3MS0xLjAwMSAxLjY5NC0xLjQ1MiAzLjAwMy0xLjQ1MnptNy4wMDcgMGMxLjc4MiAwIDMuMjg5LjcyNiA0LjI2OCAyLjAxM2wtMi4wNjggMS43MjdjLS42NDktLjY5My0xLjM0Mi0xLjA2Ny0yLjI3Ny0xLjA2Ny0xLjQ4NSAwLTIuNjczIDEuMTY2LTIuNjczIDIuOTM3IDAgMS43ODIgMS4xNzcgMi45MzcgMi42NjIgMi45MzcuOTI0IDAgMS43MTYtLjQxOCAyLjMyMS0xLjA3OGwyLjA0NiAxLjc0OWMtMS4wMDEgMS4yODctMi40OTcgMi4wMDItNC4yNzkgMi4wMDItMy4zOTkgMC01LjY3Ni0yLjM3Ni01LjY3Ni01LjYxIDAtMy4yMjMgMi4yNzctNS42MSA1LjY3Ni01LjYxem0xMC4xMiAwYzMuMzIyIDAgNS43NzUgMi4zOTggNS43NzUgNS42MXMtMi40NTMgNS42MS01Ljc3NSA1LjYxYy0zLjMxMSAwLTUuNzUzLTIuMzk4LTUuNzUzLTUuNjFzMi40NDItNS42MSA1Ljc1My01LjYxem0wIDIuNjczYy0xLjYxNyAwLTIuODI3IDEuMjEtMi44MjcgMi45MzcgMCAxLjcyNyAxLjIxIDIuOTM3IDIuODI3IDIuOTM3czIuODM4LTEuMjEgMi44MzgtMi45MzdjMC0xLjcyNy0xLjIyMS0yLjkzNy0yLjgzOC0yLjkzN3ptMTYuMjQ3LTIuNjczYzEuNDMgMCAyLjQ0Mi41NjEgMy4xMzUgMS4zOTdWMy4xNTRoMi44NnYxNS44NGgtMi44MDV2LTEuMTc3Yy0uNjkzLjg1OC0xLjcyNyAxLjQ1Mi0zLjE5IDEuNDUyLTIuOTM3IDAtNS4xNTktMi40MDktNS4xNTktNS42MSAwLTMuMjAxIDIuMjIyLTUuNjEgNS4xNTktNS42MXptLjUyOCAyLjY3M2MtMS42ODMgMC0yLjc1IDEuMzA5LTIuNzUgMi45MzdzMS4wNjcgMi45MzcgMi43NSAyLjkzN2MxLjYzOSAwIDIuNzUtMS4yNTQgMi43NS0yLjkzNyAwLTEuNjgzLTEuMTExLTIuOTM3LTIuNzUtMi45Mzd6bTEyLjExMS0yLjY3M2MzLjA2OSAwIDUuMTcgMi4yNzcgNS4xODEgNS41OTkgMCAuMzMtLjAyMi43MjYtLjA1NS45NjhoLTcuNTU3Yy4zMDggMS41NCAxLjM4NiAyLjIxMSAyLjczOSAyLjIxMS45MjQgMCAxLjkyNS0uMzc0IDIuNjk1LTEuMDIzbDEuNjgzIDEuODQ4Yy0xLjIxIDEuMTExLTIuNzUgMS42MTctNC41NDMgMS42MTctMy4yNjcgMC01LjUzMy0yLjIyMi01LjUzMy01LjU3N3MyLjItNS42NDMgNS4zOS01LjY0M3ptLS4wMjIgMi40NzVjLTEuMzUzIDAtMi4xNDUuODE0LTIuMzk4IDIuMTM0aDQuNzE5Yy0uMjY0LTEuMzY0LTEuMDg5LTIuMTM0LTIuMzIxLTIuMTM0em0xNC45ODItMS40NTJsLS45NjggMi4yMzNjLS44NDctLjQxOC0yLjItLjg1OC0zLjM5OS0uODY5LTEuMDg5IDAtMS42MzkuMzg1LTEuNjM5Ljk2OCAwIC42MTYuNzcuNzcgMS43MzguOTEzbC45NDYuMTQzYzIuMzEuMzUyIDMuNTk3IDEuMzg2IDMuNTk3IDMuMTkgMCAyLjItMS44MDQgMy42MTktNC44OTUgMy42MTktMS40NTIgMC0zLjM1NS0uMjc1LTQuNzQxLTEuMjU0bDEuMTMzLTIuMTc4Yy45MTMuNjA1IDIuMDI0IDEuMDQ1IDMuNjMgMS4wNDUgMS4zMzEgMCAxLjk2OS0uMzc0IDEuOTY5LTEuMDAxIDAtLjUxNy0uNTM5LS44MDMtMS43NzEtLjk3OWwtLjg2OS0uMTIxYy0yLjQ2NC0uMzQxLTMuNjg1LTEuNDE5LTMuNjg1LTMuMjM0IDAtMi4xODkgMS42OTQtMy40ODcgNC40OTktMy40ODcgMS43MDUgMCAzLjAzNi4zMTkgNC40NTUgMS4wMTJ6bTQuMzEyLS43Mzd2MTAuNjU5aC0yLjg3MVY4LjMzNWgyLjg3MXptLTEuNDUyLTUuMTgxYzEuMDM0IDAgMS44MzcuODE0IDEuODM3IDEuODQ4IDAgMS4wMzQtLjgwMyAxLjgyNi0xLjgzNyAxLjgyNmExLjc5NCAxLjc5NCAwIDAxLTEuODI2LTEuODI2YzAtMS4wMzQuNzkyLTEuODQ4IDEuODI2LTEuODQ4em03LjYxMiA0Ljg5NWMxLjQ4NSAwIDIuNTc0LjU3MiAzLjMgMS40NzRWOC4zMzVoMi44MTZ2OS43NzljMCAzLjQyMS0yLjIzMyA1LjQ4OS01Ljc1MyA1LjQ4OS0xLjY4MyAwLTMuNDY1LS40NC00LjY2NC0xLjI4N2wxLjAyMy0yLjM0M2MxLjA2Ny43MDQgMi4yNDQgMS4wODkgMy41MiAxLjA4OSAxLjc4MiAwIDMuMDM2LS45OSAzLjAzNi0yLjgyN3YtLjc0OGMtLjcyNi44OTEtMS44MDQgMS40NDEtMy4yNzggMS40NDEtMi41OTYgMC00LjkwNi0yLjE2Ny00LjkwNi01LjQzNCAwLTMuMjc4IDIuMzEtNS40NDUgNC45MDYtNS40NDV6bS43MjYgMi42NGMtMS42MzkgMC0yLjY4NCAxLjI1NC0yLjY4NCAyLjgwNSAwIDEuNTQgMS4wNDUgMi43OTQgMi42ODQgMi43OTQgMS41OTUgMCAyLjY3My0xLjIxIDIuNjczLTIuNzk0IDAtMS41OTUtMS4wNzgtMi44MDUtMi42NzMtMi44MDV6bTEzLjIzMy0yLjY0YzIuNDIgMCA0LjE0NyAxLjY4MyA0LjE0NyA0LjE1OHY2Ljc4N2gtMi44NzF2LTUuODYzYzAtMS41NC0uNzctMi4zODctMi4wNzktMi4zODctMS4yMzIgMC0yLjI1NS44MDMtMi4yNTUgMi40MDl2NS44NDFoLTIuODcxVjguMzM1aDIuNzk0djEuMjU0Yy43NTktMS4xMzMgMS45MjUtMS41NCAzLjEzNS0xLjU0eiIgZmlsbD0iIzFkMjEyOSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';

const mockFile = new File([FILE_DATA], 'img.png', { type: 'image/png' });

describe('Uploader', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'FileReader').mockImplementation(function () {
            this.readAsDataURL = jest.fn();
            this.onload = jest.fn();
            this.onerror = jest.fn();
        });
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });
    it('Uploader renders correctly', () => {
        const { container } = render(<Uploader files={[]} />);
        expect(container.querySelectorAll(`.${prefix}-add`).length).toBe(1);
    });
    it('Uploader renders correctly', () => {
        const { container } = render(<Uploader files={[{ file: mockFile }, { file: mockFile }]} />);
        expect(container.querySelectorAll(`.${prefix}-list`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(2);
    });
    it('Uploader renders correctly', () => {
        const { container } = render(
            <Uploader files={[{ file: mockFile }, { file: mockFile }]} limit={1} />,
        );
        expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(1);
    });
    it('Uploader renders correctly', () => {
        const { container, rerender } = render(
            <Uploader files={[{ file: mockFile }, { file: mockFile }]} limit={1} />,
        );
        expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(1);
        rerender(<Uploader files={[]} limit={1} />);
        expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(0);
    });
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const { container } = render(
            <Uploader files={[{ file: mockFile }]} onChange={onChange} />,
        );
        container.querySelector(`.${prefix}-list-item-delete`);
        userEvent.click(container.querySelector(`.${prefix}-list-item-delete`));
        expect(onChange.mock.calls.length).toBe(1);
    });
    it('upload correctly', async () => {
        function App() {
            const [files, setFiles] = React.useState([]);
            return <Uploader files={files} onChange={setFiles} />;
        }
        const { container } = render(<App />);
        const selector = container.querySelector(`.${prefix}-add`);
        await userEvent.click(selector);
        const input = container.querySelector('input');
        await userEvent.upload(input, mockFile);
        const reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        await waitFor(() => {
            expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(1);
        });
    });
    it('custom upload', async () => {
        function App() {
            async function mockUpload() {
                return {
                    file: mockFile,
                };
            }
            const [files, setFiles] = React.useState([]);
            return <Uploader files={files} onChange={setFiles} upload={mockUpload} />;
        }
        const { container } = render(<App />);
        const selectors = container.querySelectorAll(`.${prefix}-add`);
        const inputs = container.querySelectorAll('input');
        await userEvent.click(selectors[0]);
        await userEvent.upload(inputs[0], mockFile);
        const reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        await waitFor(() => {
            expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(1);
        });
    });
    it('upload maxSize', async () => {
        function App({ onMaxSizeExceed }) {
            const [files, setFiles] = React.useState([]);
            return (
                <Uploader
                    maxSize={1}
                    files={files}
                    onChange={setFiles}
                    onMaxSizeExceed={onMaxSizeExceed}
                />
            );
        }
        const handleMaxSizeExceed = jest.fn();
        const { container } = render(<App onMaxSizeExceed={handleMaxSizeExceed} />);
        const selector = container.querySelector(`.${prefix}-add`);
        await userEvent.click(selector);
        const input = container.querySelector('input');
        await userEvent.upload(input, mockFile);
        await waitFor(() => {
            expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(0);
        });
        await waitFor(() => {
            expect(handleMaxSizeExceed).toBeCalledTimes(1);
        });
    });
    it('upload limit', async () => {
        function App({ onLimitExceed }) {
            const [files, setFiles] = React.useState([]);
            return (
                <Uploader
                    multiple
                    limit={1}
                    files={files}
                    onChange={setFiles}
                    onLimitExceed={onLimitExceed}
                />
            );
        }
        const handlLimitExceed = jest.fn();
        const { container } = render(<App onLimitExceed={handlLimitExceed} />);
        const selector = container.querySelector(`.${prefix}-add`);
        await userEvent.click(selector);
        const input = container.querySelector('input');
        await userEvent.upload(input, [mockFile, mockFile, mockFile]);
        const reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        await waitFor(() => {
            expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(1);
        });
        await waitFor(() => {
            expect(handlLimitExceed).toBeCalledTimes(1);
        });
    });
    it('click file list item correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(
            <Uploader files={[{ file: mockFile }]} onClick={handleClick} />,
        );
        userEvent.click(container.querySelector(`.${prefix}-list-item`));
        expect(handleClick).toBeCalledTimes(1);
    });
    it('selectAdapter', async () => {
        const handleMaxSizeExceed = jest.fn();
        const handleLimitExceed = jest.fn();
        function App({ onMaxSizeExceed, onLimitExceed }) {
            const [files, setFiles] = React.useState([{ file: mockFile }, { file: mockFile }]);
            const selectAdapter = () => {
                return new Promise(resolve => {
                    const files = [
                        {
                            name: '11vnpmryrl4.jpeg',
                            size: 789020,
                            type: 'image/jpeg',
                            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg',
                        },
                        {
                            name: '11vnpmryrl2.jpeg',
                            size: 7820,
                            type: 'image/jpeg',
                            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg',
                        },
                        {
                            name: '11vnpmryrl1.jpeg',
                            size: 7820,
                            type: 'image/jpeg',
                            url: 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_3.jpg',
                        },
                    ];
                    resolve({ files });
                });
            };
            return (
                <Uploader
                    files={files}
                    onChange={setFiles}
                    selectAdapter={selectAdapter}
                    limit={3}
                    maxSize={100}
                    multiple
                    onMaxSizeExceed={onMaxSizeExceed}
                    onLimitExceed={onLimitExceed}
                />
            );
        }
        const { container } = render(
            <App onMaxSizeExceed={handleMaxSizeExceed} onLimitExceed={handleLimitExceed} />,
        );
        const selector = container.querySelector(`.${prefix}-add`);
        await userEvent.click(selector);
        await waitFor(() => {
            expect(container.querySelectorAll(`.${prefix}-list-item`).length).toBe(3);
        });
        await waitFor(() => {
            expect(handleMaxSizeExceed).toBeCalledTimes(1);
        });
        await waitFor(() => {
            expect(handleLimitExceed).toBeCalledTimes(1);
        });
    });
});

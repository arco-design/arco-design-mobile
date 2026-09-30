import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '..';
import Button from '../../button';
import { defaultContext } from '../../context-provider';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import '@testing-library/jest-dom';

const prefix = `${defaultContext.prefixCls}-dropdown`;
const buttonPrefix = `${defaultContext.prefixCls}-button`;

demoTest('dropdown');

mountTest(Dropdown, 'Dropdown');

const options = [
    {
        label: 'title1',
        value: 0,
        disabled: false,
    },
    {
        label: 'title2',
        value: 1,
    },
    {
        label: 'title3',
        value: 2,
        disabled: true,
    },
];

function TestDemo() {
    const [value, setValue] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setValue(!value)}>Click Me</Button>
            <Dropdown
                touchToClose={false}
                useColumn={3}
                multiple={true}
                defaultSelectedValue={[0]}
                options={options}
                height={300}
                showDropdown={value}
                onOptionClick={() => {
                    console.info('click');
                }}
                onOptionChange={(value, item) => {
                    console.info(value, item);
                    setValue(false);
                }}
                onCancel={() => setValue(false)}
            />
        </div>
    );
}

describe('Dropdown', () => {
    it('should open correctly', async () => {
        const { container } = render(<TestDemo />);
        expect(document.querySelector(`.${prefix}`)).toBeNull();
        fireEvent.click(container.querySelector(`.${buttonPrefix}`));
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).not.toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('can be properly closed', async () => {
        const { container } = render(<TestDemo />);
        expect(document.querySelector(`.${prefix}`)).toBeNull();
        fireEvent.click(container.querySelector(`.${buttonPrefix}`));
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).not.toBeNull();
            },
            { timeout: 1000 },
        );
        fireEvent.click(container.querySelector(`.${buttonPrefix}`));
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('should call onCancel when touching outside', async () => {
        const onCancel = jest.fn();
        render(
            <Dropdown options={options} showDropdown={true} height={300} onCancel={onCancel} />,
        );
        await waitFor(() => {
            expect(document.querySelector(`.${prefix}`)).not.toBeNull();
        });
        fireEvent.touchStart(document.body);
        expect(onCancel).toBeCalledTimes(1);
    });

    it('should not close when isStopTouchEl returns true', async () => {
        const onCancel = jest.fn();
        render(
            <Dropdown
                options={options}
                showDropdown={true}
                height={300}
                onCancel={onCancel}
                isStopTouchEl={() => true}
            />,
        );
        await waitFor(() => {
            expect(document.querySelector(`.${prefix}`)).not.toBeNull();
        });
        fireEvent.touchStart(document.body);
        expect(onCancel).not.toBeCalled();
    });

    it('should drop up when direction is up', async () => {
        render(
            <Dropdown
                direction="up"
                top={400}
                height={100}
                options={options}
                showDropdown={true}
            />,
        );
        await waitFor(() => {
            expect(document.querySelector(`.${prefix}`).className).toContain('drop-up');
        });
    });

    it('should expose dom via ref', async () => {
        const ref = React.createRef();
        render(<Dropdown ref={ref} options={options} showDropdown={true} height={300} />);
        await waitFor(() => {
            expect(ref.current.dom).not.toBeNull();
        });
    });

    it('disabled option is not selectable', async () => {
        const onOptionChange = jest.fn();
        render(
            <Dropdown
                options={options}
                showDropdown={true}
                height={300}
                onOptionChange={onOptionChange}
            />,
        );
        await waitFor(() => {
            expect(document.querySelectorAll(`.${prefix}-options-item`).length).toBe(3);
        });
        fireEvent.click(document.querySelectorAll(`.${prefix}-options-item`)[2]);
        expect(onOptionChange).not.toBeCalled();
    });

    it('multiple mode with non-array selectedValue ignores clicks', async () => {
        const onOptionChange = jest.fn();
        render(
            <Dropdown
                options={options}
                showDropdown={true}
                height={300}
                multiple
                selectedValue={0}
                onOptionChange={onOptionChange}
            />,
        );
        await waitFor(() => {
            expect(document.querySelectorAll(`.${prefix}-options-item`).length).toBe(3);
        });
        fireEvent.click(document.querySelectorAll(`.${prefix}-options-item`)[0]);
        expect(onOptionChange).not.toBeCalled();
    });

    it('should track scroll container when touching inside dropdown', async () => {
        const { rerender } = render(
            <Dropdown options={options} showDropdown={true} height={300} onCancel={jest.fn()} />,
        );
        await waitFor(() => {
            expect(document.querySelector(`.${prefix}`)).not.toBeNull();
        });
        rerender(<Dropdown options={options} showDropdown={true} height={300} onCancel={jest.fn()} />);
        fireEvent.touchStart(document.querySelector(`.${prefix}`));
    });

    it('Options exposes dom via ref and renders fake columns', () => {
        const ref = React.createRef();
        const fourOptions = [...options, { label: 'title4', value: 3 }];
        const { container } = render(
            <Dropdown.Options ref={ref} options={fourOptions} useColumn={3} />,
        );
        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}-options-wrap`));
        expect(container.querySelectorAll(`.${prefix}-options-item-fake-col`).length).toBe(2);
    });
});

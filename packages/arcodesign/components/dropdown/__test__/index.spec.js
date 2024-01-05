import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '..';
import Button from '../../button';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-dropdown`;

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
  }
];


function TestDemo () {
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
                    onOptionClick={() => { console.info('click'); }}
                    onOptionChange={(value, item) => {
                        console.info(value, item);
                        setValue(false);
                    }}
                    onCancel={() => setValue(false)}
                />
            </div>
        );
}

test('should open correctly', async () => {
    const { container } = render(
        <TestDemo />
    );
    expect(document.querySelector(`.${prefix}`)).toBeNull();
    fireEvent.click(container.querySelector(`.arco-button`));

    await waitFor(
        () => {
            expect(document.querySelector(`.${prefix}`)).not.toBeNull();
        },
        { timeout: 1000 },
    );
});

test('can be properly closed', async () => {
    const { container } = render(
        <TestDemo />
    );
    expect(document.querySelector(`.${prefix}`)).toBeNull();
    fireEvent.click(container.querySelector(`.arco-button`));

    await waitFor(
        () => {
            fireEvent.click(container.querySelector(`.arco-button`));
        },
        { timeout: 1000 },
    );
});

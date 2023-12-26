import React from 'react';
import { render } from '@testing-library/react';
import glob from 'glob';
import path from 'path';

export default function demoTest(comp, { useFakeTimers = false } = {}) {
    describe(`${comp} demo test`, () => {
        beforeEach(() => {
            useFakeTimers && jest.useFakeTimers();
        });

        afterEach(() => {
            useFakeTimers && jest.useRealTimers();
        });
        const files = glob.sync(path.resolve(__dirname, `../components/${comp}/demo/*.md`));
        files.forEach(file => {
            const filename = file.split('/').slice(-1)[0];
            it(`${comp} demo: ${filename} renders correctly`, () => {
                const demo = require(file).default;
                const { asFragment } = render(React.createElement(demo));
                expect(asFragment()).toMatchSnapshot();
            });
        });
    });
}

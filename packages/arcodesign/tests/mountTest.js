import React from 'react';
import { render } from '@testing-library/react';

export default function mountTest(Component, compName) {
    describe(`${compName} mount and unmount`, () => {
        it(`${compName} could be updated and unmounted without errors`, () => {
            const { rerender, unmount } = render(<Component />);
            expect(() => {
                const props = {};
                rerender(<Component {...props} />);
                unmount();
            }).not.toThrow();
        });
    });
}

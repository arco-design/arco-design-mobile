export const defineHtmlRefProperties = properties => {
    const originalValues = {};

    Object.keys(properties).forEach(key => {
        originalValues[key] = Object.getOwnPropertyDescriptor(HTMLElement.prototype, key);
    });

    const setHTMLProperties = () => {
        Object.entries(properties).forEach(([key, value]) => {
            Object.defineProperty(HTMLElement.prototype, key, {
                configurable: true,
                value,
            });
        });
    };
    const unsetHTMLProperties = () => {
        Object.keys(properties).forEach(key => {
            if (originalValues[key]) {
                // @ts-ignore
                Object.defineProperty(HTMLElement.prototype, key, originalValues[key]);
            }
        });
    };

    return {
        setHTMLProperties,

        unsetHTMLProperties,
    };
};

export function mockElementProperty(element, prop, value) {
    Object.defineProperty(element, prop, {
        value,
        configurable: true,
    });
}

export function resetElementPropertyMock(element, prop) {
    Object.defineProperty(element, prop, Object.getOwnPropertyDescriptor(element, prop));
}

export function mockContainerSize(width = 375, height = 200) {
    mockElementProperty(HTMLElement.prototype, 'offsetWidth', width);
    mockElementProperty(HTMLElement.prototype, 'offsetHeight', height);
}

export function resetContainerSizeMock() {
    resetElementPropertyMock(HTMLElement.prototype, 'offsetWidth');
    resetElementPropertyMock(HTMLElement.prototype, 'offsetHeight');
}

export const defineProperties = (element, properties) => {
    const originalValues = {};

    Object.keys(properties).forEach(key => {
        originalValues[key] = Object.getOwnPropertyDescriptor(element, key);
    });

    const setProperties = () => {
        Object.entries(properties).forEach(([key, value]) => {
            Object.defineProperty(element, key, {
                configurable: true,
                value,
            });
        });
    };
    const unsetProperties = () => {
        Object.keys(properties).forEach(key => {
            if (originalValues[key]) {
                Object.defineProperty(element, key, originalValues[key]);
            }
        });
    };

    return {
        setProperties,
        unsetProperties,
    };
};

export const defineHtmlRefProperties = properties => {
    const {
        setProperties,
        unsetProperties,
    } = defineProperties(HTMLElement.prototype, properties);
    return {
        setHTMLProperties: setProperties,
        unsetHTMLProperties: unsetProperties
    }
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

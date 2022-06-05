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

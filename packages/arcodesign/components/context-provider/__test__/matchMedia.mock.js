// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

export const changeEvent = jest.fn();

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: changeEvent,
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

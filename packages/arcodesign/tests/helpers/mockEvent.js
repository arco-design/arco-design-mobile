export function createClientXY(x, y) {
    return { clientX: x, clientY: y };
}

export function createPageXY(x, y) {
    return { pageX: x, pageY: y };
}

export const eventCommonProps = {
    stopPropagation: () => {},
    preventDefault: () => {},
};

export const touchEventCommonProps = {
    cancelable: true,
    ...eventCommonProps,
};

export function createStartTouchEventObject({ x = 0, y = 0, px = 0, py = 0 }) {
    return {
        touches: [{ ...createClientXY(x, y), ...createPageXY(px, py) }],
        ...touchEventCommonProps,
    };
}

export function createMoveTouchEventObject({ x = 0, y = 0, px = 0, py = 0 }) {
    return {
        touches: [{ ...createClientXY(x, y), ...createPageXY(px, py) }],
        changedTouches: [{ ...createClientXY(x, y), ...createPageXY(px, py) }],
        ...touchEventCommonProps,
    };
}

export function mockAddListener(namedByRefDomNode) {
    const map = {
        touchstart: () => {},
        touchmove: () => {},
        touchend: () => {},
    };
    namedByRefDomNode.addEventListener = jest.fn((event, cb) => {
        if (event === 'scroll') {
            // replace the value with offsetTop, cause `scrollTop` returns undefined
            const originalScrollTop = Object.getOwnPropertyDescriptor(
                HTMLElement.prototype,
                'offsetTop',
            );
            Object.defineProperty(
                namedByRefDomNode === window ? document.documentElement : namedByRefDomNode,
                'scrollTop',
                {
                    get() {
                        return originalScrollTop.get.apply(this, arguments);
                    },
                    set() {
                        cb();
                    },
                    configurable: true,
                },
            );
        }
        map[event] = cb;
    });
    namedByRefDomNode.removeEventListener = jest.fn((event, cb) => {
        if (map[event] === cb) {
            delete map[event];
        }
    });
    return map;
}

export function mockDocumentVisibility(visible) {
    Object.defineProperty(document, 'visibilityState', { value: visible, writable: true });
    document.dispatchEvent(new Event('visibilitychange'));
}

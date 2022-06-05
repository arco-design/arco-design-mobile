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

export function createStartTouchEventObject({ x = 0, y = 0, px = 0, py = 0}) {
    return {
        touches: [{...createClientXY(x, y), ...createPageXY(px, py)}],
        ...touchEventCommonProps,
    };
}

export function createMoveTouchEventObject({ x = 0, y = 0, px = 0, py = 0}) {
    return {
        touches: [{...createClientXY(x, y), ...createPageXY(px, py)}],
        changedTouches: [{...createClientXY(x, y), ...createPageXY(px, py)}],
        ...touchEventCommonProps,
    };
}

export function mockAddListener(component, isDomNode) {
    const map = {
        touchstart: () => {},
        touchmove: () => {},
        touchend: () => {}
    };
    const namedByRefDomNode = isDomNode ? component : component.getDOMNode();
    namedByRefDomNode.addEventListener = jest.fn((event, cb) => {
        if (event === 'scroll') {
            // replace the value with offsetTop, cause `scrollTop` returns undefined
            var originalScrollTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetTop");
            Object.defineProperty(
                namedByRefDomNode === window ? document.documentElement : namedByRefDomNode,
                'scrollTop',
                {
                    get: function() {
                        return originalScrollTop.get.apply(this, arguments);
                    },
                    set: function() {
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

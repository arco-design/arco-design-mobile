/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
export function frameThrottle(fn: () => void) {
    let lock = false;
    return function () {
        if (lock) {
            return;
        }
        lock = true;
        const context = this;
        const args = arguments;
        window.requestAnimationFrame(() => {
            fn.apply(context, args);
            lock = false;
        });
    };
}
/* eslint-enable prefer-rest-params */
/* eslint-enable @typescript-eslint/no-this-alias */

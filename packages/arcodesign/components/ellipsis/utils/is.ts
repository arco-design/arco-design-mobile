export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/** Whether the environment support -webkit-line-clamp. */
export const isSupportWebkitLineClamp = () =>
    isBrowser() && typeof document.body.style.webkitLineClamp !== 'undefined';

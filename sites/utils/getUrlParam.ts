export default function (name: string, url: string = window.location.href) {
    const decodeUrl = decodeURIComponent(url);
    const reg = new RegExp(`(\\?|&|#)${name}=([^#&]*)(#|&|$)`);
    const r = decodeUrl.match(reg);
    if (r != null) {
        return r[2];
    }
    return '';
}
export const getUrlParams = (url: string = window.location.href): Record<string, string> => {
    const newUrl = new URL(url);
    const params = newUrl.search;
    if (!params) {
        return {};
    }
    return params
        .slice(1)
        .split('&')
        .reduce((pre, val) => {
            const [key, value] = val.split('=');
            pre[key] = value;
            return pre;
        }, {});
};

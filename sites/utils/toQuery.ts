export default function (obj: Record<string, unknown>) {
    return Object.keys(obj)
        .map(k => [k, obj[k]].join('='))
        .join('&');
}

export function parseUrlQuery<T = any>(search?: string): T | {} {
    if (!search && typeof window !== 'undefined' && window.location.search) {
        search = window.location.search;
    }
    if (!search || typeof search !== 'string') return {};
    const query: T | {} = {};
    const searchStrs = /^\?/.test(search) ? search.substr(1).split('&') : search.split('&');
    searchStrs.forEach(str => {
        const rslt = str.match(/(.*?)=(.*)/);
        if (rslt) {
            query[rslt[1]] = decodeURIComponent(rslt[2]);
        }
    });
    return query;
}

export default function(obj: Record<string, unknown>) {
    return Object.keys(obj)
        .map(k => [k, obj[k]].join('='))
        .join('&');
}

// used to Google Analytics for page data statistics
function pidFromPathName(path: string) {
    const dotPos = path.lastIndexOf('.');
    return path.slice(1, dotPos).replace('/', '-');
}

function getPidFromUrl(url: string) {
    const { pathname, hash } = new URL(url);
    if (!hash) {
        if (!pathname) {
            return 'arco-unknown-page';
        }
        return pathname.toLowerCase().includes('home')
            ? 'arco-home-page'
            : pidFromPathName(pathname);
    }
    const matchRes = url.match(/\/([\w-]+)\/#\/([\w-\/]*)\?*/); // 匹配hash前的路由值
    if (matchRes && matchRes.length > 2) {
        const prefix = matchRes[1];
        const suffix = matchRes[2];
        const route =
            suffix[suffix.length - 1] === '/' ? suffix.slice(0, suffix.length - 1) : suffix;
        return `${prefix}-${route.replace(/\//g, '-')}`;
    }
    return 'arco-unknown-page';
}

export function showGA() {
    try {
        const { href, pathname, hash } = window.location;
        window.gtag('event', 'page_view', {
            page_title: getPidFromUrl(href),
            page_location: href,
            page_path: `${pathname}${hash}`,
        });
    } catch (e) {
        console.error(e);
    }
}

export function clickReportGA(reportParams: Record<string, any>) {
    try {
        window.gtag('event', 'click_event', {
            path_name: `${window.location.pathname}${window.location.hash}`,
            ...reportParams,
        });
    } catch (e) {
        console.error(e);
    }
}

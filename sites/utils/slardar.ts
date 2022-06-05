function pidFromPathName(path: string) {
    const dotPos = path.lastIndexOf('.');
    return path.slice(1, dotPos).replace('/', '-');
}

function getPidFromUrl(url: string) {
    const { pathname, hash } = new URL(url);
    console.log(url, pathname, hash);
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

export function initSlardar() {
    try {
        if (process.env.NODE_ENV !== 'production' || !window.Slardar) {
            return;
        }
        const plugins = {
            jsError: {
                onerror: true,
                onunhandledrejection: true,
                dedupe: true,
            },
            resource: {
                slowSessionThreshold: 4000,
            },
            pageview: {
                routeMode: 'hash',
                extractPid: url => getPidFromUrl(url),
            },
        };

        const slardarConfig = {
            plugins,
            bid: 'arco_design_mobile',
            release: process.env.COMMIT_HASH,
            sample: {
                sample_rate: 1, // 采样率
            },
        };
        window.Slardar('init' as any, slardarConfig);
        window.Slardar('start');
    } catch (e) {
        console.log(e);
    }
}

export function clickReportSlardar(reportParams: Record<string, any>) {
    window.Slardar('sendEvent', {
        name: 'clickEvent',
        metrics: {},
        categories: {
            bid: 'arco_design_mobile',
            pathname: `${window.location.pathname}${window.location.hash}`,
            ...reportParams,
        },
    });
}

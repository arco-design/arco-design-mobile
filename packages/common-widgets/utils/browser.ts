export function getSystem() {
    try {
        const u = navigator.userAgent;
        const android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        const ios = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        const pc = !android && !ios;
        const system = android ? 'android' : 'ios';
        return pc ? 'pc' : system;
    } catch (e) {
        return '';
    }
}

export const iPhoneScreenMap = {
    'iPhoneXR iPhone11 iPhoneXsMax iPhone11ProMax': {
        width: 414,
        height: 896,
    },
    iPhone11Pro: {
        width: 375,
        height: 812,
    },
    iPhone12mini: {
        width: 360,
        height: 780,
    },
    'iPhone12 iPhone12Pro': {
        width: 390,
        height: 844,
    },
    iPhone12ProMax: {
        width: 428,
        height: 926,
    },
};

export function checkIPhoneX(width: number, height: number) {
    return (
        Object.keys(iPhoneScreenMap).filter(key => {
            const item = iPhoneScreenMap[key];
            return (
                (item.height === height && item.width === width) ||
                (item.height === width && item.width === height)
            );
        }).length > 0
    );
}

export function isIPhoneX() {
    try {
        const u = navigator.userAgent;
        const { width, height } = window.screen;
        return u.indexOf('iPhone') > -1 && checkIPhoneX(width, height);
    } catch (e) {
        return false;
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function init() {
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
    };

    const slardarConfig = {
        plugins,
        pid: 'adm-home',
        bid: 'arco_design_mobile',
        release: process.env.COMMIT_HASH,
        sample: {
            sample_rate: 1, // 采样率
        },
    };
    window.Slardar('init' as any, slardarConfig);
    window.Slardar('start');
}

try {
    init();
} catch (e) {
    console.error(e);
}

ReactDOM.render(<App />, document.querySelector('#root'));

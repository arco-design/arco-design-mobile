import { Promise } from 'es6-promise';
import getUrlParam from './getUrlParam';

export function isFromDesignLab() {
    const fromDesignLab = +getUrlParam('from_design_lab');
    return fromDesignLab;
}

export function sendDesignLabMessage(params: Record<string, any>) {
    if (!isFromDesignLab()) {
        return;
    }
    window.parent.postMessage(params, '*');
}

// 获取当前页面的完整stylesheets，处理跨域时无法获取stylesheets内容的情况
// refer to https://juejin.cn/post/7149842757903712293
export function prepareValidStyleSheets() {
    const sheets = document.styleSheets;
    const promises: Promise<void>[] = [];
    for (const i in sheets) {
        try {
            // @ts-ignore: no-unused-vars
            const rules = sheets[i].rules || sheets[i].cssRules;
        } catch (e) {
            // 当stylesheets来自跨域资源时，取cssRules会报错
            // 此时用fetch请求资源，用style标签承接内容，并替换掉原有的资源引入
            const href = sheets[i].href;
            const curNode = sheets[i].ownerNode;
            if (href) {
                promises.push(
                    new Promise(resolve =>
                        fetch(href)
                            .then(res => res.text())
                            .then(text => {
                                const newStyle = document.createElement('style');
                                newStyle.textContent = text;
                                document.head.appendChild(newStyle);
                                curNode && curNode.parentNode?.removeChild(curNode);
                            })
                            .finally(() => resolve),
                    ),
                );
            }
        }
    }
    return Promise.all(promises);
}

// 从stylesheets中获取当前页面使用到的css vars，并转为小驼峰格式供designlab使用
// refer to https://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element/37958301#37958301
export function getUsedCssVars(el: HTMLElement, vars: string[]) {
    if (!el) {
        return;
    }
    try {
        const sheets = document.styleSheets;
        el.matches = el.matches || el.webkitMatchesSelector;
        if (typeof el.matches !== 'function') {
            return;
        }
        for (const i in sheets) {
            const rules = sheets[i].rules || sheets[i].cssRules;
            for (const r in rules) {
                const rule = rules[r] as CSSStyleRule;
                if (el.matches(rule.selectorText)) {
                    const matchedVars = rule.cssText.match(/var\(--.*?\)/g);
                    matchedVars &&
                        matchedVars.forEach(currentVar => {
                            const varName = currentVar.replace(/var\(--(.*?)\)/, (_, $1) =>
                                ($1 || '').replace(/-(\w)/g, (_, l) => (l || '').toUpperCase()),
                            );
                            if (!vars.includes(varName)) {
                                vars.push(varName);
                            }
                        });
                }
            }
        }
    } catch (e) {}
    if (el.childNodes) {
        el.childNodes.forEach(childEl => getUsedCssVars(childEl as HTMLElement, vars));
    }
}

export function analyseStyleSheets(name: string) {
    const needUsedVars = +getUrlParam('need_used_token');
    if (!isFromDesignLab() || !needUsedVars) {
        return;
    }
    const demos = document.querySelectorAll(
        '.arcodesign-mobile-demo-content',
    ) as NodeListOf<HTMLElement>;
    const demoTitles = document.querySelectorAll(
        '.arcodesign-mobile-title',
    ) as NodeListOf<HTMLElement>;
    prepareValidStyleSheets().then(() => {
        const demoTokenInfoList: { title: string; tokens: string[] }[] = [];
        // 获取移动端demo中使用到的css变量，并通知给designlab
        if (demos && demos.length) {
            demos.forEach((demo, index) => {
                const vars: string[] = [];
                getUsedCssVars(demo, vars);
                demoTokenInfoList.push({
                    title: demoTitles && demoTitles[index] ? demoTitles[index].innerText : '',
                    tokens: vars,
                });
            });
        }
        sendDesignLabMessage({
            event: 'get_used_token',
            name,
            tokens: demoTokenInfoList,
        });
    });
}

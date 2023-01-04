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

// refer to https://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element/37958301#37958301
export function getUsedCssVars(el: HTMLElement, vars: string[]) {
    if (!el) {
        return;
    }
    try {
        const sheets = document.styleSheets; // TODO fetch
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
    const demoTokenInfoList: { title: string; tokens: string[] }[] = [];
    if (demos && demos.length) {
        demos.forEach((demo, index) => {
            const vars: string[] = [];
            getUsedCssVars(demo, vars);
            demoTokenInfoList.push({
                title: demoTitles && demoTitles[index] ? demoTitles[index].innerText : '未命名示例',
                tokens: vars,
            });
        });
    }
    sendDesignLabMessage({
        event: 'get_used_token',
        name,
        tokens: demoTokenInfoList,
    });
}

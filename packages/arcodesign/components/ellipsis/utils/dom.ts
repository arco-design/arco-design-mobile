export function getLineHeight(element: HTMLElement) {
    const style = window.getComputedStyle(element, null);
    const lineHeight = style.getPropertyValue('line-height');
    if (lineHeight === 'normal') {
        // Create a temp element to get line-height
        const dom = document.createElement('span');
        dom.style.width = '300px';
        dom.style.position = 'absolute';
        dom.style.visibility = 'hidden';
        dom.innerText = 'Test';
        element.appendChild(dom);
        const height = dom.clientHeight;
        element.removeChild(dom);
        return height;
    }
    return parseFloat(lineHeight);
}

function createSpan(text: string, className = '') {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    return span;
}
export function wrapTextChildNodesWithSpan(node: Node, className = '') {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent) {
            node.parentNode?.replaceChild(createSpan(node.textContent, className), node);
        }
    } else {
        node.childNodes.forEach(item => {
            wrapTextChildNodesWithSpan(item, className);
        });
    }
}

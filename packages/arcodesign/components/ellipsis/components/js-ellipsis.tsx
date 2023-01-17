import React, { Ref, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { JsEllipsisProps, JsEllipsisRef } from '../type';
import { getLineHeight, wrapTextChildNodesWithSpan } from '../utils/dom';

const JsEllipsis = forwardRef((props: JsEllipsisProps, ref: Ref<JsEllipsisRef>) => {
    const {
        prefixCls,
        text,
        ellipsis,
        dangerouslyUseInnerHTML,
        maxLine = 1,
        maxHeight,
        ellipsisNode,
        collapseNode,
        endExcludes,
        reflowOnResize,
        onReflow,
        onEllipsisNodeClick,
        onCollapseNodeClick,
    } = props;
    const truncating = useRef(false);
    const domRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const ellipsisRef = useRef<HTMLSpanElement>(null);

    const lineHeightRef = useRef(0);
    const setCurLineHeight = useCallback(() => {
        if (domRef.current) {
            lineHeightRef.current = getLineHeight(domRef.current);
        }
    }, []);
    useEffect(() => {
        setCurLineHeight();
    }, []);

    function handleOnReflow(isEllipsis: boolean, result: string) {
        if (onReflow && typeof onReflow === 'function') {
            onReflow(isEllipsis, result);
        }
    }
    function truncateText(container: HTMLElement, textContainer: HTMLElement, max: number) {
        const content = textContainer.textContent || '';
        let currentText = '';
        let l = 0;
        let r = content.length - 1;
        // Binary truncate text until get the max limit fragment of text.
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (l === m) {
                break;
            }
            const temp = content.slice(l, m);
            textContainer.innerText = currentText + temp;
            const { height } = container.getBoundingClientRect();
            if (height > max) {
                r = m;
            } else {
                currentText += temp;
                l = m;
            }
        }
        // Remove the exclude char at the end of the content.
        while (endExcludes && endExcludes.includes(currentText[currentText.length - 1])) {
            currentText = currentText.slice(0, -1);
        }
        // Callback after reflow.
        handleOnReflow(true, currentText);
        textContainer.innerText = currentText;
    }
    function truncateHTML(container: HTMLElement, textContainer: HTMLElement, max: number) {
        // only enter this function when container overflow.
        const children = textContainer.childNodes;
        if (children.length === 1) {
            const node = children[0] as HTMLElement;
            if (node.nodeType === Node.TEXT_NODE) {
                truncateText(container, textContainer, max);
            } else {
                const html = node.innerHTML;
                // clear content to determine whether the empty node can be placed.
                node.innerHTML = '';
                const { height } = container.getBoundingClientRect();
                if (height > max) {
                    // return after remove the node, if overflow with empty node.
                    textContainer.removeChild(node);
                    handleOnReflow(true, textContainer.innerHTML);
                    return;
                }
                node.innerHTML = html;
                // recursive truncate node
                truncateHTML(container, node, max);
            }
        } else {
            const nodes = [].slice.call(children);
            textContainer.innerHTML = '';
            let i = 0;
            // find the critical node
            while (i < nodes.length) {
                textContainer.appendChild(nodes[i]);
                const { height } = container.getBoundingClientRect();
                if (height > max) {
                    if (nodes[i].childNodes && nodes[i].childNodes.length) {
                        break;
                    } else {
                        textContainer.removeChild(nodes[i]);
                        handleOnReflow(true, textContainer.innerHTML);
                        return;
                    }
                }
                i++;
            }
            if (textContainer.childNodes[i]) {
                // truncate the critical node
                truncateHTML(container, textContainer.childNodes[i] as HTMLElement, max);
            }
        }
    }
    // reflow when the main props change.
    const reflow = useCallback(() => {
        if (!domRef.current || !textRef.current || !ellipsisRef.current || truncating.current) {
            return;
        }
        ellipsisRef.current.style.display = 'none';
        if (dangerouslyUseInnerHTML) {
            textRef.current.innerHTML = text;
            textRef.current.classList.add(`${prefixCls}-js-content-text-pre`);
        } else {
            textRef.current.innerText = text;
        }
        if (!ellipsis) {
            return;
        }
        textRef.current.classList.remove(`${prefixCls}-js-content-text-pre`);
        const { height } = domRef.current.getBoundingClientRect();
        const max = isNaN(Number(maxHeight)) ? lineHeightRef.current * maxLine : Number(maxHeight);
        if (height <= max) {
            handleOnReflow(false, text);
            return;
        }
        truncating.current = true;
        ellipsisRef.current.style.display = 'inline';
        if (dangerouslyUseInnerHTML) {
            // wrap the text children node with span element.
            wrapTextChildNodesWithSpan(textRef.current, `${prefixCls}-js-content-text`);
            truncateHTML(domRef.current, textRef.current, max);
        } else {
            truncateText(domRef.current, textRef.current, max);
        }
        truncating.current = false;
    }, [text, ellipsis, dangerouslyUseInnerHTML, maxLine, maxHeight, ellipsisNode, endExcludes]);

    useEffect(() => {
        reflow();
    }, [reflow]);

    const observerRef = useRef<ResizeObserver | null>(null);
    // Observe resize event of container if reflowOnResize is true.
    useEffect(() => {
        if (domRef.current && reflowOnResize) {
            if (!observerRef.current && ellipsis) {
                observerRef.current = new ResizeObserver(reflow);
                observerRef.current.observe(domRef.current);
            }
        }
        return () => {
            // Remove observer when component unmounted.
            if (observerRef.current && domRef.current) {
                observerRef.current.unobserve(domRef.current);
                observerRef.current = null;
            }
        };
    }, [ellipsis]);

    useImperativeHandle(
        ref,
        () => ({
            dom: domRef.current,
            reflow,
        }),
        [reflow],
    );

    return (
        <div ref={domRef} className={`${prefixCls}-js`}>
            <span ref={textRef} className={`${prefixCls}-js-content`}>
                {dangerouslyUseInnerHTML ? (
                    <span
                        className={`${prefixCls}-js-content-initial`}
                        style={{
                            WebkitLineClamp: maxLine,
                        }}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ) : (
                    <span
                        className={`${prefixCls}-js-content-initial`}
                        style={{
                            WebkitLineClamp: maxLine,
                        }}
                    >
                        {text}
                    </span>
                )}
            </span>
            <span
                ref={ellipsisRef}
                className={`${prefixCls}-js-content-ellipsis`}
                onClick={onEllipsisNodeClick}
            >
                {ellipsisNode}
            </span>
            {!ellipsis && collapseNode && (
                <span className={`${prefixCls}-js-content-collapse`} onClick={onCollapseNodeClick}>
                    {collapseNode}
                </span>
            )}
        </div>
    );
});
export default React.memo(JsEllipsis);

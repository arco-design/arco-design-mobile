import React, { useRef, useState } from 'react';
import { Button, Message, Tooltip, Tabs } from 'arco';
import { LanguageSupport } from '../../../utils/language';
import { localeMap } from '../../../utils/locale';
import CodeSandbox from './codeSandbox';
import CodePen from './codePen';
import { clickReportGA } from '../../../utils/ga';
import './index.less';

export interface IDocProps {
    code?: JSX.Element;
    codeSource: string;
    styleSource?: string;
    name?: string;
    demoKey?: string;
    version?: string;
    language?: LanguageSupport;
    compKey?: string;
    showWebIDE?: boolean;
    paragraphSlotContent?: JSX.Element;
    tsxTitle?: string;
    tsxContent?: JSX.Element;
    lessContent?: JSX.Element | null;
}

export default function Code(props: IDocProps) {
    const {
        code,
        language = LanguageSupport.CH,
        version,
        demoKey,
        showWebIDE = true,
        name,
        paragraphSlotContent,
        tsxTitle,
        tsxContent,
        lessContent,
        codeSource = '',
        styleSource = '',
    } = props;
    const [showAll, setShowAll] = useState(false);
    const copySource = useRef(decodeURIComponent(codeSource));

    function handleClickSpreadBtn() {
        clickReportGA({
            click_content: 'expand',
            component_name: `${demoKey}${name}`,
        });
        setShowAll(!showAll);
    }

    function handleClickCopyBtn() {
        clickReportGA({
            click_content: 'copy',
            component_name: `${demoKey}${name}`,
        });
        window.copyToClipboard(copySource.current);
        Message.success(localeMap.CopySuccess[language]);
    }

    function handleTabsChange(key: string) {
        copySource.current = decodeURIComponent(key === 'tsx' ? codeSource : styleSource);
    }

    return (
        <div className={`demo-code-container ${showAll ? 'show-all' : ''}`}>
            {code || (
                <div className="demo-code-wrapper">
                    <h2 className="demo-code-title">{name}</h2>
                    {paragraphSlotContent}
                    <Tabs onChange={handleTabsChange}>
                        <Tabs.TabPane key="tsx" title={tsxTitle || 'index.tsx'}>
                            {tsxContent}
                        </Tabs.TabPane>
                        {lessContent ? (
                            <Tabs.TabPane key="less" title="index.less">
                                {lessContent}
                            </Tabs.TabPane>
                        ) : null}
                    </Tabs>
                </div>
            )}
            <div className="demo-code-operations">
                <Tooltip content={localeMap.Copy[language]}>
                    <Button
                        shape="circle"
                        size="small"
                        className="demo-code-operations-copy demo-code-operations-btn"
                        style={{ fontSize: '14px' }}
                        onClick={handleClickCopyBtn}
                        icon={
                            <svg
                                viewBox="0 0 48 48"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                className="arco-icon arco-icon-copy"
                            >
                                <path fill="none" d="M0 0h48v48H0z" />
                                <path d="M32 12c1.1 0 2 .9 2 2v28.2c0 1-.8 1.8-1.9 1.8H7.9c-1 0-1.9-.8-1.9-1.8V13.8c0-1 .8-1.8 1.9-1.8H32zm-2 4H10v24h20V16zM40 4c1.1 0 2 .9 2 2v25c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V8H19c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h21z" />
                            </svg>
                        }
                    />
                </Tooltip>
                <Tooltip
                    content={showAll ? localeMap.Collapse[language] : localeMap.Expand[language]}
                >
                    <Button
                        shape="circle"
                        size="small"
                        className="demo-code-operations-spread demo-code-operations-btn"
                        style={{ fontSize: '12px' }}
                        onClick={handleClickSpreadBtn}
                        icon={
                            <svg
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="arco-icon"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.119229 5.97028L0.40124 5.5574C0.473125 5.45216 0.611199 5.4191 0.721691 5.47589L0.748685 5.49197L4.99981 8.39562L9.24455 5.49228C9.34975 5.42033 9.4904 5.43967 9.57273 5.53271L9.59204 5.55749L9.87432 5.97019C9.94627 6.07539 9.92693 6.21604 9.83389 6.29837L9.80911 6.31768L5.14124 9.51042C5.06564 9.56213 4.96874 9.5679 4.88838 9.52773L4.85909 9.51051L0.184664 6.31773C0.0794207 6.24584 0.0463627 6.10777 0.10315 5.99727L0.119229 5.97028L0.40124 5.5574L0.119229 5.97028ZM9.75 3C9.88807 3 10 3.11193 10 3.25V3.75C10 3.88807 9.88807 4 9.75 4H0.25C0.111929 4 0 3.88807 0 3.75V3.25C0 3.11193 0.111929 3 0.25 3H9.75ZM9.75 0C9.88807 0 10 0.111929 10 0.25V0.75C10 0.888071 9.88807 1 9.75 1H0.250001C0.111929 1 5.44957e-07 0.888071 5.44957e-07 0.75V0.25C5.44957e-07 0.111929 0.111929 0 0.250001 0H9.75Z"
                                />
                            </svg>
                        }
                    />
                </Tooltip>

                {showWebIDE && (
                    <>
                        <CodePen
                            codeSource={codeSource}
                            demoKey={demoKey}
                            name={name}
                            version={version}
                        />
                        <CodeSandbox
                            codeSource={codeSource}
                            styleSource={styleSource}
                            demoKey={demoKey}
                            name={name}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

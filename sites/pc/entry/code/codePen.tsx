import React, { useRef } from 'react';
import { Tooltip, Button } from 'arco';
import { getCodePenData } from './utils';
import { clickReportGA } from '../../../utils/ga';

interface Props {
    codeSource: string;
    demoKey?: string;
    name?: string;
    version?: string;
}

export default function CodePen({
    codeSource = '',
    demoKey = 'root',
    name = 'Component Example',
    version = '',
}: Props) {
    const formRef = useRef(null);

    function toCodePen() {
        (formRef.current as any).submit();
        if (!formRef?.current) {
            return;
        }
        clickReportGA({
            click_content: 'codePen',
            component_name: `${demoKey}${name}`,
        });
        (formRef.current as any).submit();
    }

    return (
        <>
            <Tooltip content="在 CodePen 打开">
                <Button
                    onClick={toCodePen}
                    size="small"
                    shape="circle"
                    className="demo-code-operations-btn"
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            viewBox="0 0 48 48"
                            className="arco-icon arco-icon-codepen"
                        >
                            <path
                                fill="currentColor"
                                stroke="none"
                                d="M45 15.7v17.1L24.5 44.7c-.3.2-.7.2-1 0l-20-11.5c-.3-.2-.5-.5-.5-.9V15.7c0-.4.2-.7.5-.9l20-11.6c.3-.2.7-.2 1 0l20 11.6c.3.2.5.5.5.9zM26 9v9.8l5.5 3.2 8.5-4.9L26 9zm-4 0L8 17.1l8.4 4.9 5.6-3.2V9zm0 21.2L16.5 27 9 31.4 22 39v-8.8zm17 1.2L31.4 27 26 30.2V39l13-7.6zm2-3.4v-6l-5 3 5 3zm-29-3-5-3v6l5-3zm8 0 4 2 4-2-4-2-4 2z"
                            />
                        </svg>
                    }
                />
            </Tooltip>
            <form
                className="demo-code-operations-ide-form"
                action="https://codepen.io/pen/define"
                method="POST"
                target="_blank"
                ref={formRef}
            >
                <input
                    type="hidden"
                    name="data"
                    value={JSON.stringify(
                        getCodePenData({
                            version,
                            codeSource: decodeURIComponent(codeSource),
                            key: demoKey,
                            name,
                        }),
                    )}
                />
            </form>
        </>
    );
}

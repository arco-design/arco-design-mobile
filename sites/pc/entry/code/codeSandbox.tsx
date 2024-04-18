import React, { useRef } from 'react';
import { Tooltip, Button } from 'arco';
import LZString from 'lz-string';
import { getCodeSandboxData } from './utils';
import { clickReportGA } from '../../../utils/ga';

interface Props {
    codeSource: string;
    styleSource: string;
    demoKey?: string;
    name?: string;
}

function serialize(data: Record<string, any>) {
    return LZString.compressToBase64(JSON.stringify(data))
        .replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_') // Convert '/' to '_'
        .replace(/=+$/, ''); // Remove ending '='
}

export default function CodeSandbox({
    codeSource,
    styleSource,
    demoKey = 'root',
    name = 'Component Example',
}: Props) {
    const formRef = useRef(null);

    clickReportGA({
        click_content: 'codeSandBox',
        component_name: `${demoKey}${name}`,
    });

    function toCodeSandbox() {
        (formRef.current as any).submit();
    }

    return (
        <>
            <Tooltip content="在 CodeSandBox 打开">
                <Button
                    onClick={toCodeSandbox}
                    size="small"
                    shape="circle"
                    className="demo-code-operations-btn"
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                            focusable="false"
                            className="arco-icon arco-icon-code-sandbox"
                        >
                            <path
                                fill="currentColor"
                                stroke="none"
                                d="m25.002 1.6 17.9 10.3c.6.4 1 1 1 1.7v20.7c0 .7-.4 1.4-1 1.7l-17.9 10.4c-.6.4-1.4.4-2 0l-17.9-10.3c-.6-.4-1-1-1-1.7V13.7c0-.7.4-1.4 1-1.7l17.9-10.4c.6-.4 1.4-.4 2 0Zm13.5 12.4-7.9-4.5-6.6 4.5-6.5-4-7.3 4.3 13.8 8.7 14.5-9Zm-16.5 26.4V26.3l-14-8.9v7.9l8 5.5V37l6 3.4Zm4 0 6-3.5v-5.2l8-5.5v-8.9l-14 8.9v14.2Z"
                            />
                        </svg>
                    }
                />
            </Tooltip>
            <form
                className="demo-code-operations-ide-form"
                action="https://codesandbox.io/api/v1/sandboxes/define"
                method="POST"
                target="_blank"
                ref={formRef}
            >
                <input
                    type="hidden"
                    name="parameters"
                    value={serialize(getCodeSandboxData(codeSource, styleSource))}
                />
            </form>
        </>
    );
}

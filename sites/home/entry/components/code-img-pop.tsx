import React, { ReactNode, useContext } from 'react';
import CodePopover from '../../../components/code-popover';
import { GlobalContext, isMobileBrowser } from '../setting';
import { localeMap } from '../locale';

export interface ICodeImgPopoverProps {
    appName: string;
    children: ReactNode;
    className?: string;
    popoverClass?: string;
}
export default function CodeImgPopover({
    appName,
    children,
    className,
    popoverClass,
}: ICodeImgPopoverProps) {
    const { language } = useContext(GlobalContext);
    const isMobile = isMobileBrowser();
    const url = `https://arco.design/mobile/react/${appName}/mobile/`;
    if (isMobile) {
        return (
            <div className={className} onClick={() => (window.location.href = url)}>
                {children}
            </div>
        );
    }
    return (
        <CodePopover
            url={url}
            text={
                <>
                    {localeMap.HomeQRCodePopover1[language]}
                    <br />
                    {localeMap.HomeQRCodePopover2[language]}
                </>
            }
            className={className}
            popoverClass={popoverClass}
        >
            {children}
        </CodePopover>
    );
}

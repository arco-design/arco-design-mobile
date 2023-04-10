import React, { useEffect } from 'react';
import IconArrowBack from '../../../packages/arcodesign/components/icon/IconArrowBack';
import getUrlParam from '../../utils/getUrlParam';
import { analyseStyleSheets, isFromDesignLab, sendDesignLabMessage } from '../../utils/designlab';

export interface IDemoProps {
    name: string;
    doc: any;
}

export default function Demo(props: IDemoProps) {
    const { name, doc } = props;
    const isFromWeb = Boolean(getUrlParam('from_web'));
    const hideBack = +getUrlParam('hide_back');
    const hideHeader = isFromDesignLab();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const navName = document.querySelector('.arcodesign-mobile-demo-nav-inner');
        sendDesignLabMessage({
            event: 'page_change',
            type: 'demo',
            name: navName ? navName.innerHTML : name,
            route: name,
        });
        analyseStyleSheets(name);
        return () => {
            if (window.modalInstance && window.modalInstance.close) {
                window.modalInstance.close();
                window.modalInstance = null;
            }
        };
    }, [name]);

    return (
        <div className={`arcodesign-mobile-demo-wrapper${hideHeader ? ' hide-header' : ''}`}>
            {isFromWeb ? <div className="status-bar" /> : null}
            <div className="demo-content" id={`demo-${name}`}>
                {!hideBack ? (
                    <div
                        className="arrow-back"
                        onClick={() => history.back()}
                        style={{
                            top: isFromWeb ? '20px' : 0,
                        }}
                    >
                        <IconArrowBack />
                    </div>
                ) : null}
                {doc}
            </div>
        </div>
    );
}
